<?php
declare(strict_types=1);

function ye_env_map(): array
{
    static $map = null;
    if ($map !== null) {
        return $map;
    }
    $map = [];
    foreach (['config.ssfdjsdf789j.env', '.env'] as $fname) {
        $p = __DIR__ . '/' . $fname;
        if (!is_file($p) || !is_readable($p)) {
            continue;
        }
        $lines = @file($p, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!is_array($lines)) {
            continue;
        }
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || $line[0] === '#' || !str_contains($line, '=')) {
                continue;
            }
            [$k, $v] = explode('=', $line, 2);
            $k = trim($k);
            $v = trim($v, " \t\n\r\0\x0B\"'");
            if ($k !== '' && !isset($map[$k])) {
                $map[$k] = $v;
            }
        }
    }
    return $map;
}

function ye_cfg(string $key, string $default = ''): string
{
    $v = getenv($key);
    if ($v !== false && $v !== '') {
        return (string)$v;
    }
    $map = ye_env_map();
    return $map[$key] ?? $_ENV[$key] ?? $default;
}

function ye_esc(string|int|float|null $v): string
{
    return htmlspecialchars((string)($v ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function ye_boot_token(): string
{
    $secret = ye_cfg('APP_SECRET', 'ye_v4_hmac_key_9f35c1ad');
    $bucket = (string)floor(time() / 900);
    $ua     = substr((string)($_SERVER['HTTP_USER_AGENT'] ?? 'ua'), 0, 64);
    $prefix = substr(hash_hmac('sha256', $bucket, $secret), 0, 6);
    $sig    = substr(hash_hmac('sha256', $prefix . '|' . $bucket . '|' . $ua, $secret), 0, 28);
    return $prefix . '.' . $sig;
}

$siteName     = ye_cfg('SITE_NAME', 'YeşilEnerjin');
$defaultHost  = ye_cfg('SITE_DOMAIN', 'example.com');
$contactEmail = ye_cfg('CONTACT_EMAIL', 'info@example.com');
$base         = rtrim(ye_cfg('SITE_BASE', '/'), '/') . '/';
$assetVer     = '20261021v5';

$https = (
    (!empty($_SERVER['HTTPS']) && strtolower((string)$_SERVER['HTTPS']) !== 'off') ||
    (isset($_SERVER['SERVER_PORT']) && (int)$_SERVER['SERVER_PORT'] === 443) ||
    (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower((string)$_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https')
);
$scheme  = $https ? 'https' : 'http';
$rawHost = (string)($_SERVER['HTTP_HOST'] ?? $defaultHost);
$host    = preg_replace('/[^a-zA-Z0-9.\-:]/', '', $rawHost) ?: $defaultHost;
$origin  = $scheme . '://' . $host;

$uriPath = (string)(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/');
$bTrim   = trim($base, '/');
$relPath = trim($uriPath, '/');
if ($bTrim !== '' && str_starts_with($relPath, $bTrim)) {
    $relPath = trim(substr($relPath, strlen($bTrim)), '/');
}
if (str_ends_with($relPath, '.php')) {
    $relPath = substr($relPath, 0, -4);
}

$routeMap = [
    ''             => 'home',
    'index'        => 'home',
    'tools/calc'   => 'calc',
    'calc'         => 'calc',
    'page/about'   => 'about',
    'about'        => 'about',
    'page/contact' => 'contact',
    'contact'      => 'contact',
    'page/faq'     => 'faq',
    'faq'          => 'faq',
    'page/privacy' => 'privacy',
    'privacy'      => 'privacy',
    'page/terms'   => 'terms',
    'terms'        => 'terms',
];

$initRoute = $routeMap[$relPath] ?? 'home';
$langs     = ['tr', 'en', 'de', 'es', 'ru', 'ja'];
$reqLang   = strtolower(trim((string)($_GET['lang'] ?? 'tr')));
$initLang  = in_array($reqLang, $langs, true) ? $reqLang : 'tr';
$rawCity   = preg_replace('/[^a-zA-Z0-9çÇğĞıİöÖşŞüÜ]/u', '', (string)($_GET['city'] ?? 'ankara')) ?: 'ankara';

$seoTitles = [
    'tr' => [
        'home'    => "YeşilEnerjin — Tahmini Rüzgar & Güneş Enerjisi Simülasyon Platformu",
        'calc'    => "Enerji Tahmin ve Simülasyon Aracı | YeşilEnerjin",
        'about'   => "Hakkımızda ve Metodoloji | YeşilEnerjin",
        'faq'     => "Sıkça Sorulan Sorular | YeşilEnerjin",
        'contact' => "İletişim | YeşilEnerjin",
        'privacy' => "Gizlilik ve Çerez Politikası | YeşilEnerjin",
        'terms'   => "Kullanım Şartları ve Sorumluluk Reddi | YeşilEnerjin",
    ],
    'en' => [
        'home'    => "YeşilEnerjin — Estimated Wind & Solar Energy Simulation Platform",
        'calc'    => "Renewable Energy Estimation Simulator | YeşilEnerjin",
        'about'   => "About & Methodology | YeşilEnerjin",
        'faq'     => "Frequently Asked Questions | YeşilEnerjin",
        'contact' => "Contact | YeşilEnerjin",
        'privacy' => "Privacy & Cookie Policy | YeşilEnerjin",
        'terms'   => "Terms of Use & Legal Disclaimer | YeşilEnerjin",
    ],
    'de' => [
        'home'    => "YeşilEnerjin — Simulationsplattform für Wind- & Solarenergie",
        'calc'    => "Erneuerbare-Energien-Simulator | YeşilEnerjin",
        'about'   => "Über uns & Methodik | YeşilEnerjin",
        'faq'     => "Häufig gestellte Fragen (FAQ) | YeşilEnerjin",
        'contact' => "Kontakt | YeşilEnerjin",
        'privacy' => "Datenschutz- & Cookie-Richtlinie | YeşilEnerjin",
        'terms'   => "Nutzungsbedingungen & Haftungsausschluss | YeşilEnerjin",
    ],
    'es' => [
        'home'    => "YeşilEnerjin — Plataforma de Simulación de Energía Eólica y Solar",
        'calc'    => "Simulador de Estimación de Energía Renovable | YeşilEnerjin",
        'about'   => "Acerca de y Metodología | YeşilEnerjin",
        'faq'     => "Preguntas Frecuentes (FAQ) | YeşilEnerjin",
        'contact' => "Contacto | YeşilEnerjin",
        'privacy' => "Política de Privacidad y Cookies | YeşilEnerjin",
        'terms'   => "Términos de Uso y Aviso Legal | YeşilEnerjin",
    ],
    'ru' => [
        'home'    => "YeşilEnerjin — Платформа моделирования ветровой и солнечной энергии",
        'calc'    => "Симулятор оценки возобновляемой энергии | YeşilEnerjin",
        'about'   => "О проекте и методологии | YeşilEnerjin",
        'faq'     => "Часто задаваемые вопросы (FAQ) | YeşilEnerjin",
        'contact' => "Контакты | YeşilEnerjin",
        'privacy' => "Политика конфиденциальности и файлов Cookie | YeşilEnerjin",
        'terms'   => "Условия использования и отказ от ответственности | YeşilEnerjin",
    ],
    'ja' => [
        'home'    => "YeşilEnerjin — 風力・太陽光エネルギー推定シミュレーション",
        'calc'    => "再生可能エネルギー推定シミュレーター | YeşilEnerjin",
        'about'   => "プロジェクト概要と計算手法 | YeşilEnerjin",
        'faq'     => "よくある質問 (FAQ) | YeşilEnerjin",
        'contact' => "お問い合わせ | YeşilEnerjin",
        'privacy' => "プライバシーとCookieポリシー | YeşilEnerjin",
        'terms'   => "利用規約および免責事項 | YeşilEnerjin",
    ],
];

$seoDescs = [
    'tr' => 'Türkiye geneli 81 il için rüzgar türbini ve güneş paneli (PV) yaklaşık günlük elektrik üretim tahmini, elektrikli araç şarj süresi ve karbon kazanımı simülasyon platformu.',
    'en' => 'Educational renewable energy simulator providing approximate wind turbine and solar PV daily generation estimates, EV charging durations, and carbon offset projections across 81 provinces of Türkiye.',
    'de' => 'Bildungssimulator für erneuerbare Energien zur unverbindlichen Schätzung der täglichen Wind- und Solarstromerzeugung, E-Auto-Ladezeiten und CO2-Einsparungen in 81 Provinzen der Türkei.',
    'es' => 'Simulador educativo de energía renovable que ofrece estimaciones aproximadas de generación eólica y solar fotovoltaica, tiempos de carga de vehículos eléctricos y ahorro de CO2 en 81 provincias de Turquía.',
    'ru' => 'Образовательный симулятор возобновляемой энергетики для ориентировочного расчета суточной выработки ветровой и солнечной энергии, времени зарядки электромобилей и снижения выбросов CO2 в 81 провинции Турции.',
    'ja' => 'トルコ全81県における風力タービンおよび太陽光パネル(PV)の1日あたりの推定発電量、EV充電時間、CO2削減効果を算出する教育用シミュレーションプラットフォーム。',
];

$ogLocales = [
    'tr' => 'tr_TR',
    'en' => 'en_US',
    'de' => 'de_DE',
    'es' => 'es_ES',
    'ru' => 'ru_RU',
    'ja' => 'ja_JP',
];

$titleGroup = $seoTitles[$initLang] ?? $seoTitles['tr'];
$pageTitle  = $titleGroup[$initRoute] ?? $titleGroup['home'];
$pageDesc   = $seoDescs[$initLang] ?? $seoDescs['tr'];
$ogLocale   = $ogLocales[$initLang] ?? 'tr_TR';

$canonSlug = $initRoute === 'home' ? '' : ($initRoute === 'calc' ? 'tools/calc' : 'page/' . $initRoute);
$canonUrl  = $origin . rtrim($base, '/') . '/' . ltrim($canonSlug, '/');
$ogImg     = $origin . rtrim($base, '/') . '/assets/solar.webp';

$nonce   = base64_encode(random_bytes(16));
$bootKey = ye_boot_token();

header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');

$ldJson = json_encode([
    '@context'            => 'https://schema.org',
    '@type'               => 'WebApplication',
    'name'                => $siteName,
    'url'                 => $origin . rtrim($base, '/') . '/',
    'description'         => $pageDesc,
    'applicationCategory' => 'EducationalApplication',
    'operatingSystem'     => 'All',
    'inLanguage'          => ['tr', 'en', 'de', 'es', 'ru', 'ja'],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

echo '<!doctype html><html lang="' . ye_esc($initLang) . '" data-theme="dark"><head>'
    . '<meta charset="UTF-8" />'
    . '<base href="' . ye_esc($base) . '" />'
    . '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=overlays-content" />'
    . '<meta name="theme-color" content="#07130e" />'
    . '<meta name="color-scheme" content="dark light" />'
    . '<meta name="apple-mobile-web-app-capable" content="yes" />'
    . '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'
    . '<meta name="apple-mobile-web-app-title" content="' . ye_esc($siteName) . '" />'
    . '<meta name="robots" content="index, follow, max-image-preview:large" />'
    . '<meta name="author" content="' . ye_esc($siteName) . '" />'
    . '<meta name="keywords" content="yeşil enerji simülasyonu, tahmini güneş enerjisi hesaplama, tahmini rüzgar enerjisi hesaplama, elektrikli araç şarj tahmini, yenilenebilir enerji eğitimi" />'
    . '<meta name="description" content="' . ye_esc($pageDesc) . '" />'
    . '<meta property="og:type" content="website" />'
    . '<meta property="og:title" content="' . ye_esc($pageTitle) . '" />'
    . '<meta property="og:description" content="' . ye_esc($pageDesc) . '" />'
    . '<meta property="og:image" content="' . ye_esc($ogImg) . '" />'
    . '<meta property="og:url" content="' . ye_esc($canonUrl) . '" />'
    . '<meta property="og:site_name" content="' . ye_esc($siteName) . '" />'
    . '<meta property="og:locale" content="' . ye_esc($ogLocale) . '" />'
    . '<meta name="twitter:card" content="summary_large_image" />'
    . '<meta name="twitter:title" content="' . ye_esc($pageTitle) . '" />'
    . '<meta name="twitter:description" content="' . ye_esc($pageDesc) . '" />'
    . '<meta name="twitter:image" content="' . ye_esc($ogImg) . '" />'
    . '<link rel="canonical" href="' . ye_esc($canonUrl) . '" />'
    . '<link rel="alternate" hreflang="tr" href="' . ye_esc($canonUrl . '?lang=tr') . '" />'
    . '<link rel="alternate" hreflang="en" href="' . ye_esc($canonUrl . '?lang=en') . '" />'
    . '<link rel="alternate" hreflang="de" href="' . ye_esc($canonUrl . '?lang=de') . '" />'
    . '<link rel="alternate" hreflang="es" href="' . ye_esc($canonUrl . '?lang=es') . '" />'
    . '<link rel="alternate" hreflang="ru" href="' . ye_esc($canonUrl . '?lang=ru') . '" />'
    . '<link rel="alternate" hreflang="ja" href="' . ye_esc($canonUrl . '?lang=ja') . '" />'
    . '<link rel="alternate" hreflang="x-default" href="' . ye_esc($canonUrl) . '" />'
    . '<link rel="icon" href="favicon.ico" sizes="any" />'
    . '<link rel="apple-touch-icon" href="assets/logo.png" />'
    . '<link rel="manifest" href="site.webmanifest" />'
    . '<title>' . ye_esc($pageTitle) . '</title>'
    . '<script type="application/ld+json">' . $ldJson . '</script>'
    . '<script nonce="' . $nonce . '">!function(){try{var m=localStorage.getItem("ye_theme");if(m==="light"||m==="dark"){document.documentElement.setAttribute("data-theme",m);var tc=document.querySelector(\'meta[name="theme-color"]\');if(tc)tc.setAttribute("content",m==="light"?"#f3f7f4":"#07130e")}}catch(e){}var t=Date.now();window.addEventListener("error",function(e){if(e.target&&e.target!==window&&"SCRIPT"===e.target.tagName&&!window.location.pathname.endsWith("/crash.html")&&e.target.hasAttribute("data-critical")){if(Date.now()-t<4e3&&!window.__criticalRetried){window.__criticalRetried=!0;var r=document.createElement("script");return r.type="module",r.crossOrigin="anonymous",r.setAttribute("data-critical","1"),r.src=e.target.src.split("?")[0]+"?retry="+Date.now(),r.onerror=function(){window.location.replace("crash.html")},void document.head.appendChild(r)}window.location.replace("crash.html")}},!0)}();</script>'
    . '<script nonce="' . $nonce . '">!function(){var k="' . $bootKey . '";window.__bootKey=k;window.__initLang="' . ye_esc($initLang) . '";window.__initRoute="' . ye_esc($initRoute) . '";window.__initCity="' . ye_esc($rawCity) . '";window.__contactEmail="' . ye_esc($contactEmail) . '";function s(){return encodeURIComponent(k.slice(-10)+"_"+Math.random().toString(36).slice(2,9))}function b(n){return fetch("api.php?r=boot&city="+encodeURIComponent(window.__initCity)+"&k="+s(),{cache:"no-store",credentials:"same-origin",referrerPolicy:"same-origin",headers:{"X-Requested-With":"XMLHttpRequest","X-Boot-Key":k}}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){if(!d||!d.config||!d.config.profile)throw 0;d.__at=Date.now();return d}).catch(function(){return n>0?new Promise(function(r){setTimeout(r,450)}).then(function(){return b(n-1)}):null})}window.__bootP=b(2).then(function(d){try{if(d){window.__bootData=d;var p=d.config.profile;var a=document.querySelector(\'meta[name="apple-mobile-web-app-title"]\');a&&a.setAttribute("content",p.name)}}catch(e){}return d})}();</script>'
    . '<script type="module" crossorigin data-critical="1" src="assets/app-k4mz8wq1.min.js?v=' . $assetVer . '"></script>'
    . '<link rel="stylesheet" crossorigin href="assets/app-k4mz8wq1.min.css?v=' . $assetVer . '" />'
    . '</head><body><div id="root"></div><noscript>' . ye_esc($pageDesc) . '</noscript></body></html>';
