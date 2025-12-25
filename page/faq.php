<?php
include __DIR__ . '/../config.php';

$page_title = "Sıkça Sorulan Sorular | {$site_name}";
$page_description = "Rüzgar ve güneş enerjisi hesaplamaları hakkında sıkça sorulan sorular, kullanılan formüller ve varsayımlar bu sayfada açıklanmaktadır.";
$page_image = "assets/img/solar.webp";
$page_robots = "index,follow";

include '../partials/header.php';
include '../partials/nav.php';
?>

<div class="container mt-5">
    <h1 class="text-success mb-4">❓ Sık Sorulan Sorular</h1>

    <div class="card shadow p-4 mb-4">
        <h5>1. Enerji tahminleri ne kadar doğru?</h5>
        <p>Tahminler API ve basit simülasyonlarla yapılır, gerçek üretim saatlik değişimler ve hava koşullarına bağlı olarak farklılık gösterebilir.</p>

        <h5>2. Güneş enerjisi gece neden 0?</h5>
        <p>Gece saatlerinde güneş ışığı olmadığından panelden enerji üretimi olmaz. Gün içi tahminlerde güneş ışınımı simüle edilir.</p>

        <h5>3. İletişim için nasıl ulaşabilirim?</h5>
        <p>Şimdilik sadece e-posta üzerinden iletişim mümkündür: <a href="mailto:info@yesilenerji.com">info@yesilenerji.com</a></p>
    </div>
</div>

<?php include '../partials/footer.php'; ?>
