<?php
/**
 * ============================================
 *   YeşilEnerjin - Site Genel Yapılandırması
 * ============================================
 * Bu dosya site genelinde kullanılan temel ayarları içerir.
 */

// Site Bilgileri
$site_name        = "YeşilEnerjin"; // Sitenin adı
$site_description = "Rüzgar ve güneş enerjisi üretimini hesaplayan, eğitim amaçlı geliştirilmiş yeşil enerji simülasyon platformu."; // Kısa açıklama
$footer_description = "Bu platform, anlık hava durumu verilerini kullanarak rüzgar ve güneş enerjisine dayalı elektrik üretim tahminleri sunar. Hesaplamalar fiziksel formüllere ve gerçekçi sistem varsayımlarına dayanır."; // footer açıklama
$contact_email    = "info@yesilenerjin.com"; // İletişim e-posta adresi
$default_image = "assets/img/logo.png"; // Meta için default resim

// Sistem Ayarları
$base = "/"; // Eğer proje klasördeyse /klasoradi/, değilse sadece /
$weather_api_key = ""; // WeatherAPI anahtarı https://www.weatherapi.com
?>
