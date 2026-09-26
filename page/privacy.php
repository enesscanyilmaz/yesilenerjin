<?php
include __DIR__ . '/../config.php';
$page_title = "Gizlilik Politikası | {$site_name}";
$page_description = "Rüzgar ve güneş enerjisi kullanarak günlük elektrik üretimini hesaplayan gerçekçi enerji simülasyon aracı.";
$page_image = "assets/img/solar.webp";
$page_robots = "index,follow";

include '../partials/header.php';
include '../partials/nav.php';

?>

<div class="container mt-5">
    <h1 class="text-success mb-4">🔒 Gizlilik Politikası</h1>

    <div class="card shadow p-4 mb-4">
        <p>Web sitemiz, kullanıcıların gizliliğini önemsemektedir. Bu politikada aşağıdaki hususlar belirtilmiştir:</p>
        <ul>
            <li>Kullanıcı verileri üçüncü şahıslarla paylaşılmaz.</li>
            <li>Toplanan bilgiler yalnızca tahmin ve istatistik amacıyla kullanılır.</li>
            <li>Çerezler (cookies) site deneyimini geliştirmek için kullanılabilir.</li>
            <li>İletişim bilgileriniz yalnızca sizinle iletişime geçmek için kullanılır.</li>
        </ul>
        <p>Daha fazla bilgi için bize e-posta gönderebilirsiniz: <a href="mailto:info@yesilenerji.com">info@yesilenerji.com</a></p>
    </div>
</div>

<?php include '../partials/footer.php'; ?>
