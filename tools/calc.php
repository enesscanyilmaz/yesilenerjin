<?php
$config = include __DIR__ . '/../config.php';

$page_title = "Enerji Tahmin Aracı | {$site_name}";
$page_description = "Rüzgar türbini ve güneş paneli verilerine göre günlük enerji üretimini hesaplayan simülasyon aracı. Gerçekçi formüllerle kWh tahmini.";
$page_image = "assets/img/solar.webp";
$page_robots = "index,follow";

// === CONFIG ===
$apiKey = $weather_api_key ?? null;
if (!$apiKey) die("HATA: Weather API anahtarı bulunamadı.");

// === GERÇEKÇİ DEFAULTLAR ===
$DEFAULT_KWH_PER_100KM  = 15.0;
$rho                    = 1.225;   // hava yoğunluğu kg/m3

// türbin ve panel varsayılanları (kurumsal)
$defaultRadius          = 25.0;    // m
$defaultWindEfficiency  = 0.42;    // 42%
$defaultPanelArea       = 300.0;   // m2
$defaultSolarEfficiency = 0.205;   // 20.5%

// === GİRİŞLER (virgül/dot destekli) ===
function getRaw($k,$d=null){
    $v = filter_input(INPUT_POST,$k,FILTER_DEFAULT);
    if ($v===null) $v = filter_input(INPUT_GET,$k,FILTER_DEFAULT);
    if ($v===null) return $d;
    $v = trim((string)$v);
    $v = str_replace(',', '.', $v);
    return $v === '' ? $d : $v;
}
$city = htmlspecialchars((string)getRaw('city','Ankara'));

// rotor yarıçapı, verimler, panel alanı
$windRadius = max(0.1, floatval(getRaw('windRadius',$defaultRadius)));
$windEfficiency = floatval(getRaw('windEfficiency',$defaultWindEfficiency*100.0))/100.0;
if ($windEfficiency <= 0 || $windEfficiency > 0.99) $windEfficiency = $defaultWindEfficiency;

$panelArea = max(0.1, floatval(getRaw('panelArea',$defaultPanelArea)));
$solarEfficiency = floatval(getRaw('solarEfficiency',$defaultSolarEfficiency*100.0))/100.0;
if ($solarEfficiency <= 0 || $solarEfficiency > 0.99) $solarEfficiency = $defaultSolarEfficiency;

// === WEATHER API ===
$apiUrl = "https://api.weatherapi.com/v1/current.json?key={$apiKey}&q=" . urlencode($city) . "&aqi=no&lang=tr";
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
]);
$resp = curl_exec($ch);
$http = curl_getinfo($ch,CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);
$data = json_decode($resp, true);
if (!$resp || $http !== 200 || !isset($data['current'])) {
    die("API Hatası: " . ($data['error']['message'] ?? $err ?: 'Hava verisi alınamadı.'));
}

// hava verileri
$tempC     = (float)$data['current']['temp_c'];
$humidity  = (int)$data['current']['humidity'];
$windKph   = (float)$data['current']['wind_kph'];
$condition = $data['current']['condition']['text'] ?? '';
$icon      = $data['current']['condition']['icon'] ?? '';
$uvIndex   = isset($data['current']['uv']) ? (float)$data['current']['uv'] : 0.0;
$cloudCover= isset($data['current']['cloud']) ? (int)$data['current']['cloud'] : 0;
date_default_timezone_set($data['location']['tz_id'] ?? 'Europe/Istanbul');
$currentHour = (int)date('G');

// ----------------------
// FİZİKSEL HESAPLAR
// ----------------------

// Rüzgar gücü: P = 0.5 * rho * A * v^3 * eta  (W) -> kW
function windPowerKW($windKph, $radius, $eff){
    global $rho;
    $v = max(0.0, $windKph / 3.6); // m/s
    $A = M_PI * $radius * $radius; // m2
    $P = 0.5 * $rho * $A * pow($v,3) * $eff;
    return $P / 1000.0;
}

// Güneş enerjisi:
// Aylık ortalama GHI (kWh/m2/gün).
// Şehir bilinmese de mevsime göre tahmin:
// - Sonbahar/Kış aylari düşük, İlkbahar/Yaz yüksek. Ortalama ~4.5 kWh/m2/gün.
function estimateDailyGHI_byMonth($tz=null){
    // lokal zaman kullanarak ay
    $m = (int)date('n');
    // Grafiğe göre Türkiye geneli aylık ortalama GHI değerleri (kWh/m²/gün)
    $map = [
        1  => 1.79,  // Ocak
        2  => 2.50,  // Şubat
        3  => 3.87,  // Mart
        4  => 4.93,  // Nisan
        5  => 6.14,  // Mayıs
        6  => 6.57,  // Haziran
        7  => 6.50,  // Temmuz
        8  => 5.81,  // Ağustos
        9  => 4.81,  // Eylül
        10 => 3.46,  // Ekim
        11 => 2.14,  // Kasım
        12 => 1.59   // Aralık
    ];
    return $map[$m] ?? 4.1;  // Varsayılan yıllık ortalama ~4.1
}

// tipik sistem kaybı %15
function systemLossFactor(){ return 0.85; }

// güneş üretimi (kWh/gün) = GHI (kWh/m²/gün) × Panel Alanı × Panel Verimi × Sistem Kaybı
$ghi_day = estimateDailyGHI_byMonth();
$lossFactor = systemLossFactor();
$solarDaily = round($ghi_day * $panelArea * $solarEfficiency * $lossFactor, 2); // kWh/gün

// rüzgar hesap: saatlik basit model (sabit rüzgar hızına göre)
$windHourly = windPowerKW($windKph, $windRadius, $windEfficiency); // kW
$windDaily = round($windHourly * 24.0, 2); // kWh/gün

// toplam
$totalDailyEnergy = round($windDaily + $solarDaily, 2);

// araç şarj hesapları
$evModels = [
    'Togg T10F (Standart)' => 52.4,
    'Tesla Model Y (LR)'   => 75.0,
    'Renault ZOE'          => 52.0,
    'Elektrikli Motosiklet'=> 5.0
];
$chargeCalculations = [];
foreach($evModels as $label => $cap){
    if ($totalDailyEnergy <= 0.0){
        $chargeCalculations[] = ['model'=>$label,'capacity'=>$cap,'displayTime'=>'Yetersiz Üretim'];
        continue;
    }
    $hours = ($cap / $totalDailyEnergy) * 24.0;
    if ($hours < 1.0) $display = round($hours*60) . " dakika";
    elseif ($hours <= 24.0) $display = round($hours,1) . " saat";
    else $display = round($hours/24.0,1) . " gün";
    $chargeCalculations[] = ['model'=>$label,'capacity'=>$cap,'displayTime'=>$display];
}

// menzil
$dailyKMRange = $totalDailyEnergy > 0 ? round($totalDailyEnergy / $DEFAULT_KWH_PER_100KM * 100) : 0;

// Betz limiti kontrolü (uyarı amaçlı)
$betzLimit = 0.593;
$betz_ok = $windEfficiency < $betzLimit;

include __DIR__ . '/../partials/header.php';
include __DIR__ . '/../partials/nav.php';
?>

<div class="container mt-5 text-center">
    <h1 class="text-success mb-4">🌿 Yeşil Enerji Hesaplama</h1>

    <div class="mb-4">
        <input type="text" id="citySearchMain" class="form-control w-50 mx-auto" placeholder="Şehir arayın..." value="<?= htmlspecialchars($city) ?>">
        <div id="cityListMain" class="list-group w-50 mx-auto"></div>
        <button id="searchBtnMain" class="btn btn-success mt-3" onclick="document.getElementById('simulationForm').submit()">Hesapla</button>
    </div>

    <hr class="mb-5">

<div class="mb-5">
    <button class="btn btn-outline-primary w-100 p-3" type="button" data-bs-toggle="collapse" data-bs-target="#simulationParamsCollapse" aria-expanded="false">
        <h4 class="m-0">🛠️ Simülasyon Parametreleri</h4>
        <small class="text-muted">Varsayılanları düzenlemek için tıklayın.</small>
    </button>

    <div class="collapse border p-4" id="simulationParamsCollapse">
        <form method="POST" id="simulationForm" class="row g-4 justify-content-center">

            <input type="hidden" name="city" value="<?= htmlspecialchars($city) ?>">

            <!-- RUZGAR -->
            <div class="col-md-5 text-start">
                <h5 class="text-success border-bottom pb-1 mb-3">Rüzgar Türbini</h5>

                <label class="fw-bold">Rotor Yarıçapı (r) [m]:</label>
                <input type="number" step="0.1" name="windRadius" id="windRadius"
                       class="form-control form-control-sm"
                       value="<?= htmlspecialchars((string)$windRadius) ?>" required>
                <small class="text-muted d-block mt-1">
                    <b>Ev Tipi:</b> 3m (6m çap)<br>
                    <b>Kurumsal:</b> 12.5m (25m çap)
                </small>

                <label class="fw-bold mt-3">Türbin Verimi [%]:</label>
                <input type="number" step="0.1" name="windEfficiency" id="windEfficiency"
                       class="form-control form-control-sm"
                       value="<?= number_format($windEfficiency*100,1,'.',',') ?>" required>
                <small class="text-muted d-block mt-1">
                    <b>Not:</b> Betz limiti ≈ <?= ($betzLimit*100) ?>%
                </small>
            </div>

            <!-- GUNES -->
            <div class="col-md-5 text-start">
                <h5 class="text-success border-bottom pb-1 mb-3">Güneş Paneli Sistemi</h5>

                <label class="fw-bold">Panel Alanı (A) [m²]:</label>
                <input type="number" step="0.1" name="panelArea" id="panelArea"
                       class="form-control form-control-sm"
                       value="<?= htmlspecialchars((string)$panelArea) ?>" required>
                <small class="text-muted d-block mt-1">
                    <b>Ev Tipi:</b> 18m² (~3 kW)<br>
                    <b>Kurumsal:</b> 300m² (~50 kW)
                </small>

                <label class="fw-bold mt-3">Panel Verimi [%]:</label>
                <input type="number" step="0.1" name="solarEfficiency" id="solarEfficiency"
                       class="form-control form-control-sm"
                       value="<?= number_format($solarEfficiency*100,1,'.',',') ?>" required>
            </div>

            <div class="col-12 mt-4 text-center">
                <button type="submit" class="btn btn-primary btn-lg">
                    Parametrelere Göre SİMULE ET
                </button>
            </div>
        </form>
    </div>
</div>


    <hr>

    <div class="row justify-content-center g-4">
        <div class="col-lg-6">
            <div class="card shadow p-3 h-100">
                <div class="card-body">
                    <h4 class="card-title">📊 <?= htmlspecialchars($city) ?> İçin Enerji Tahmini</h4>
                    <div class="d-flex justify-content-center align-items-center mb-3">
                        <img src="https:<?= $icon ?>" alt="Weather Icon" style="width:50px;height:50px;">
                        <h5 class="m-0 ms-2"><?= htmlspecialchars($condition) ?>, <?= htmlspecialchars($tempC) ?>°C</h5>
                    </div>

                    <p><b>Rüzgar Enerjisi (Saatlik):</b> <?= number_format($windHourly,3) ?> kW</p>
                    <p><b>Rüzgar Enerjisi (Günlük):</b> <?= number_format($windDaily,2) ?> kWh</p>
                    <hr>

                    <?php if ($currentHour < 6 || $currentHour > 18): ?>
                        <p class="text-warning"><b>Güneş Enerjisi:</b> Şu anda gece. Günlük tahmin tüm gün simülasyonunu içerir.</p>
                    <?php endif; ?>

                    <p><b>Güneş Enerjisi (Tahmini Günlük):</b> <?= number_format($solarDaily,2) ?> kWh</p>

                    <p class="mt-3"><span class="badge bg-success fs-5 p-2">Günlük Toplam Üretim: <?= number_format($totalDailyEnergy,2) ?> kWh</span></p>

                    <small class="d-block mt-2">Not: GHI tahmini (aylık) kullanıldı: <?= number_format($ghi_day,2) ?> kWh/m²/gün. Sistem kaybı varsayılan: <?= ((1-$lossFactor)*100) ?>%.</small>

                    <div class="mt-3">
                        <?php if (!$betz_ok): ?>
                            <div class="alert alert-danger p-2">Uyarı: Girilen türbin verimi Betz limitinin (%<?= number_format($betzLimit*100,1) ?>) üzerine çıkmış. Lütfen verimi düşürün.</div>
                        <?php endif; ?>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card shadow p-3 h-100">
                <div class="card-body">
                    <h3 class="text-success mb-3">🔋 Üretiminizle Araç Şarj Süresi Hesaplama</h3>
                    <p class="text-muted">Günlük toplam üretiminiz <b>(<?= number_format($totalDailyEnergy,2) ?> kWh)</b> baz alınarak hesaplandı.</p>

                    <?php if ($dailyKMRange > 0): ?>
                        <div class="alert alert-info py-2"><b>Eşdeğer Menzil:</b> Yaklaşık <?= $dailyKMRange ?> km</div>
                    <?php endif; ?>

                    <div class="row mt-4 text-start g-2">
                        <?php foreach ($chargeCalculations as $c): ?>
                            <div class="col-6 col-md-6">
                                <div class="p-2 border rounded bg-light h-100">
                                    <small class="d-block text-muted" style="font-size:0.75rem;"><?= htmlspecialchars($c['model']) ?> (<?= $c['capacity'] ?> kWh)</small>
                                    <strong class="text-success"><?= htmlspecialchars($c['displayTime']) ?></strong>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <hr class="mt-5">

    <div class="row">
        <div class="col-md-6">
            <h3><?= htmlspecialchars($city) ?> için Hava Durumu Özeti</h3>
            <div class="card shadow p-3 mb-3">
                <div class="card-body">
                    <p><b>Sıcaklık:</b> <?= htmlspecialchars($tempC) ?>°C</p>
                    <p><b>Nem:</b> <?= htmlspecialchars($humidity) ?>%</p>
                    <p><b>Rüzgar Hızı:</b> <?= htmlspecialchars($windKph) ?> km/h</p>
                    <p><b>Bulutluluk:</b> <?= htmlspecialchars($cloudCover) ?>%</p>
                    <p><b>UV İndeksi:</b> <?= htmlspecialchars($uvIndex) ?></p>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <h3 class="mb-3">Mevcut Durum Grafiği</h3>
            <canvas id="weatherChart"></canvas>
        </div>
    </div>

<div class="mt-4 text-start p-4 border rounded bg-light">
    <h4>🔍 Enerji Hesabı Nasıl Yapıldı?</h4>
    <p class="text-muted">

        <strong>Rüzgar Enerjisi:</strong><br>
        Kullanılan formül: <br>
        <code>P = 0.5 × ρ × A × v³ × η</code><br><br>

        <strong>Bu terimler ne demek?</strong><br>
        • <b>ρ (ro)</b>: Havada ne kadar “ağırlık” olduğunu gösterir. (Hava yoğunluğu)<br>
        • <b>A</b>: Pervanenin kapladığı alan. Pervane büyükse daha çok rüzgar yakalar.<br>
        • <b>v</b>: Rüzgarın hızı. Rüzgar biraz hızlanınca bile elektrik çok daha fazla artar.<br>
        • <b>η (eta)</b>: Türbinin verimi. “Ne kadar iyi çalışıyor?” demek.<br><br>

        <strong>Basitçe açıklama:</strong><br>
        Rüzgar → pervaneye çarpar → pervane döner → elektrik olur.<br>
        Rüzgar hızlıysa çok, yavaşsa az elektrik çıkar.<br><br>

        <hr>

		<strong>Güneş Enerjisi:</strong><br>
		Kullanılan formül: <br>
		<code>Günlük enerji = GHI × panel alanı × panel verimi × sistem kaybı</code><br><br>

		<strong>Bu terimler ne demek?</strong><br>
		• <b>GHI</b>: Türkiye geneli aylık ortalamaya göre tahmin edilen, bir günde yere ulaşan güneş enerjisi miktarıdır.<br>
		• <b>Panel Alanı</b>: Panel ne kadar büyükse, o kadar fazla güneş ışığı toplar.<br>
		• <b>Panel Verimi</b>: Toplanan ışığın ne kadarının elektriğe çevrilebildiğini gösterir.<br>
		• <b>Sistem Kaybı</b>: İnverter, kablolar, sıcaklık ve kirlenme gibi nedenlerle oluşan enerji kayıplarıdır.<br><br>

		<strong>Basitçe açıklama:</strong><br>
		Güneş → panele ışık gönderir → panel ışığı toplar → bir kısmı kaybolur → kalan elektrik olur.<br>
		Güneş fazla ise üretim artar, az ise düşer.<br>

    </p>
</div>

    <div class="mt-5">
        <h2 class="text-success">Yeşil Enerji Araçları ve Sistemleri</h2>
        <div class="row">
            <?php
            $vehicles = [
                ['car.webp','Elektrikli Araç','Temiz enerji ile çalışan araç.'],
                ['solar.webp','Güneş Panelleri','Çatı, arazi veya araç üstü sistemler ile enerji üretimi.'],
                ['drone.webp','Güneş Enerjili Dronlar','Güneş enerjisi ile çalışan, uzun uçuş süresi sağlayan çevre dostu dronlar.']
            ];
            foreach ($vehicles as [$img,$title,$desc]): ?>
                <div class="col-md-4">
                    <div class="card shadow p-3 mb-3">
                        <img src="assets/img/<?= $img ?>" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title"><?= $title ?></h5>
                            <p class="card-text"><?= $desc ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="mt-5">
        <h2>Yeşil Enerji ve Gelecek</h2>
        <p>Türkiye'nin enerji geleceği yeşil enerji ile şekilleniyor. Bu proje, rüzgar ve güneş enerjisi tahminlerini gösterir ve ziyaretçilere bilgilendirici bir kaynak sunar.</p>
    </div>
</div>

</div>

<!-- SCRIPTS: chart + cookie persistence -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const ctx = document.getElementById('weatherChart')?.getContext('2d');
if (ctx){
    new Chart(ctx, {
        type:'bar',
        data:{
            labels:['Sıcaklık (°C)','Nem (%)','Rüzgar (km/h)'],
            datasets:[{ label:'Mevcut', data:[<?= json_encode($tempC)?>, <?= json_encode($humidity)?>, <?= json_encode($windKph)?>] }]
        },
        options:{ scales:{ y:{ beginAtZero:true } } }
    });
}

// cookie helpers (basit)
function setCookie(n,v,d=365){ const e=new Date(Date.now()+d*864e5).toUTCString(); document.cookie = n+"="+encodeURIComponent(v)+"; expires="+e+"; path=/"; }
function getCookie(n){ return document.cookie.split('; ').reduce((r,s)=>{const p=s.split('='); return p[0]===n?decodeURIComponent(p.slice(1).join('=')):r},''); }
['windRadius','windEfficiency','panelArea','solarEfficiency'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    const v=getCookie('yesil_'+id);
    if(v) el.value=v;
    el.addEventListener('input', ()=> setCookie('yesil_'+id, el.value, 365));
});
</script>

<?php include __DIR__ . '/../partials/footer.php'; ?>
