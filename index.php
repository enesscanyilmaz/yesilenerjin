<?php 
include __DIR__ . '/config.php';
$page_title = "Türkiye Yeşil Enerji Hesaplama Tahmin Platformu | {$site_name}";
$page_description = "Türkiye geneli rüzgar ve güneş enerjisi üretimini hesaplayan yeşil enerji simülasyon aracı. Günlük kWh, araç şarj süresi ve menzil tahmini.";
$page_image = "assets/img/solar.webp";
$page_robots = "index,follow"; 
?>

<?php include 'partials/header.php'; ?>
<?php include 'partials/nav.php'; ?>

<main class="container mt-5 text-center">

    <div class="p-5 bg-light rounded shadow-lg">
        <h1 class="display-4 mb-4 text-success">🌿 Yeşil Enerjin</h1>
        <h2 class="mb-3">Türkiye'nin <strong>yeşil enerji potansiyelini</strong> keşfedin</h2>
        <h3 class="mb-3">Şehrinize göre enerji kaynaklarınızı hesaplayın</h3>
        <p class="lead mb-4">
            Artan enerji ihtiyacına karşı çevre dostu çözümler sunuyoruz. Gerçek zamanlı verilerle kendi enerji planınızı oluşturun.
        </p>
        <a href="tools/calc" class="btn btn-success btn-lg px-5 py-3 shadow rounded-pill">
            Hesaplamaya Başla
        </a>
    </div>

    <section class="row mt-5">
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h4 class="card-title text-success">Kolay Hesaplama</h4>
                    <h5 class="card-subtitle mb-2 text-muted">Hızlı ve Pratik</h5>
                    <p class="card-text">Sadece birkaç tıklama ile şehrinizin enerji profilini öğrenin ve çevre dostu adımlar atın.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h4 class="card-title text-success">Gerçek Zamanlı Veriler</h4>
                    <h5 class="card-subtitle mb-2 text-muted">Canlı Hava ve Enerji Analizi</h5>
                    <p class="card-text">Hava durumu ve enerji üretim verilerini anlık olarak takip ederek daha bilinçli kararlar alın.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 mb-4">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h4 class="card-title text-success">Mobil Uyumlu</h4>
                    <h5 class="card-subtitle mb-2 text-muted">Her Cihazda Çalışır</h5>
                    <p class="card-text">Web sitemiz tüm cihazlara uyumlu tasarlandı; masaüstü, tablet ve mobilde sorunsuz çalışır.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="mt-5">
        <h2 class="text-success mb-4">Neden Yeşil Enerji?</h2>
        <h3 class="mb-3">Enerji Geleceğimizdir</h3>
        <p class="mb-4">Fosil yakıtlara bağımlılık azaltmak, çevreyi korumak ve sürdürülebilir enerji kaynaklarını teşvik etmek için yeşil enerji kritik öneme sahiptir.</p>
        <h4 class="mb-2">Bizim Misyonumuz</h4>
        <p class="mb-4">YeşilEnerjin olarak hedefimiz, herkesin kendi şehrindeki enerji potansiyelini anlamasını sağlamak ve sürdürülebilir bir gelecek inşa etmeye katkıda bulunmaktır.</p>
    </section>

</main>

<?php include 'partials/footer.php'; ?>
