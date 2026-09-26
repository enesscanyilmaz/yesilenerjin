<?php
include __DIR__ . '/../config.php';

$page_title = "Hakkımızda | {$site_name}";
$page_description = "Bu proje, rüzgar ve güneş enerjisinin günlük elektrik üretimini hesaplamak amacıyla geliştirilmiş, eğitim odaklı bir yeşil enerji simülasyonudur.";
$page_image = "assets/img/solar.webp";
$page_robots = "index,follow";

include '../partials/header.php';
include '../partials/nav.php';
?>

<div class="container mt-5">
    <h1 class="text-success mb-4">📖 Hakkında</h1>

    <!-- Proje Misyonu -->
    <div class="card shadow p-4 mb-4">
        <h3>Proje Misyonu</h3>
        <p>
            Bu proje, Türkiye’de yeşil enerji kullanımını ve potansiyelini göstermek amacıyla geliştirilmiştir.
            Rüzgar ve güneş enerjisi tahminleri sunarak, ziyaretçilere enerji üretimi hakkında bilgilendirici
            bir kaynak sağlar. Amaç, sürdürülebilir enerji bilincini artırmak ve enerji üretimini görselleştirmektir.
        </p>
    </div>

    <!-- Tahmin Nasıl Yapılır -->
    <div class="card shadow p-4 mb-4">
        <h4>Tahmin Nasıl Yapılır?</h4>
        <p>

            <strong>Rüzgar Enerjisi:</strong><br>
            Kullanılan formül:<br>
            <code>P = 0.5 × ρ × A × v³ × η</code><br><br>

            <strong>Bu terimler ne demek?</strong>
            <ul>
                <li><b>ρ (ro)</b>: Hava yoğunluğunu ifade eder. Havada ne kadar “kütle” olduğunu gösterir.</li>
                <li><b>A</b>: Türbin pervanesinin kapladığı alan. Alan büyüdükçe yakalanan rüzgar artar.</li>
                <li><b>v</b>: Rüzgar hızı. Hız arttıkça üretilen enerji kübik olarak artar.</li>
                <li><b>η (eta)</b>: Türbin verimi. Türbinin rüzgarı elektriğe ne kadar iyi çevirdiğini gösterir.</li>
            </ul>

            <strong>Basitçe açıklama:</strong><br>
            Rüzgar → pervaneye çarpar → pervane döner → elektrik üretilir.<br>
            Rüzgar hızlıysa üretim artar, yavaşsa azalır.<br><br>

            <hr>

            <strong>Güneş Enerjisi:</strong><br>
            Kullanılan formül:<br>
            <code>Günlük enerji = GHI × Panel Alanı × Panel Verimi × Sistem Kaybı</code><br>

            <strong>Bu terimler ne demek?</strong>
            <ul>
                <li><b>GHI</b>: Türkiye geneli aylık ortalamalara göre tahmin edilen, bir günde yere ulaşan güneş enerjisi miktarıdır.</li>
                <li><b>Panel Alanı</b>: Panel yüzeyi ne kadar büyükse, o kadar fazla güneş ışığı toplanır.</li>
                <li><b>Panel Verimi</b>: Toplanan güneş ışığının ne kadarının elektriğe çevrilebildiğini gösterir.</li>
                <li><b>Sistem Kaybı</b>: İnverter, kablolar, sıcaklık ve kirlenme gibi nedenlerle oluşan enerji kayıplarıdır.</li>
            </ul>

            <strong>Basitçe açıklama:</strong><br>
            Güneş → panele ışık gönderir → panel ışığı toplar → bir kısmı kaybolur → kalan elektrik olur.<br>
            Güneş fazla ise üretim artar, az ise düşer.
        </p>
    </div>

    <!-- Proje Hedefleri -->
    <div class="card shadow p-4 mb-4">
        <h3>Proje Hedefleri</h3>
        <ul>
            <li>Yeşil enerji farkındalığını artırmak</li>
            <li>Rüzgar ve güneş enerjisi üretim tahminlerini görselleştirmek</li>
            <li>Eğitim amaçlı, anlaşılır bir enerji simülasyonu sunmak</li>
        </ul>
    </div>
</div>

<?php include '../partials/footer.php'; ?>
