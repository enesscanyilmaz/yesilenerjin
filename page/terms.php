<?php

include __DIR__ . '/../config.php';

$page_title = "Kullanım Şartları | {$site_name}";
$page_description = "Yeşil enerji simülasyon aracının kullanım koşulları, sorumluluk sınırları ve kullanıcı yükümlülükleri bu sayfada belirtilmiştir.";
$page_image = "assets/img/solar.webp";
$page_robots = "index,follow";

include '../partials/header.php';
include '../partials/nav.php';

?>

<div class="container mt-5">
    <h1 class="text-success mb-4">📄 Kullanım Şartları</h1>

    <div class="card shadow p-4 mb-4">
        <p>Bu web sitesini kullanarak, aşağıdaki şartları kabul etmiş olursunuz:</p>
        <ul>
            <li>Site içeriği yalnızca bilgi ve eğitim amaçlıdır.</li>
            <li>Paylaşılan veriler tahmini olup kesin sonuç garantisi yoktur.</li>
            <li>Siteyi kötü amaçlı kullanmak, zararlı yazılım yaymak veya hizmeti engellemek yasaktır.</li>
            <li>İçeriğin izinsiz çoğaltılması veya dağıtılması yasaktır.</li>
        </ul>
        <p>Detaylı bilgiler için bizimle iletişime geçebilirsiniz.</p>
    </div>
</div>

<?php include '../partials/footer.php'; ?>
