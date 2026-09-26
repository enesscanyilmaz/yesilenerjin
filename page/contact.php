<?php
include __DIR__ . '/../config.php';

$page_title = "İletişim | {$site_name}";
$page_description = "Yeşil enerji hesaplama projesi hakkında görüş, öneri ve geri bildirimlerinizi iletebileceğiniz iletişim sayfası.";
$page_image = "assets/img/solar.webp";
$page_robots = "index,follow";

include '../partials/header.php';
include '../partials/nav.php';
?>

<div class="container mt-5">
    <h1 class="text-success mb-4">📬 İletişim</h1>

    <div class="card shadow p-4">
        <p>Her türlü soru veya geri bildirim için aşağıdaki e-posta adresinden bize ulaşabilirsiniz:</p>
        <p><strong>Email:</strong> <a href="mailto:info@yesilenerji.com">info@yesilenerji.com</a></p>
        <small>Not: Şimdilik iletişim sadece e-posta ile sağlanmaktadır.</small>
    </div>
</div>

<?php include '../partials/footer.php'; ?>
