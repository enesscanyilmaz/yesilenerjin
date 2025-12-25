<div align="center">

# 🌿 YeşilEnerjin Dashboard (v1)

YeşilEnerjin, rüzgar ve güneş enerjisinden günlük ne kadar elektrik üretilebileceğini
tahmini olarak hesaplayan web tabanlı bir yeşil enerji simülasyon projesidir.

Bu proje bir üniversite dersi kapsamında geliştirilmiştir.
Amaç, yenilenebilir enerji sistemlerinin nasıl hesaplandığını
basit ve anlaşılır bir şekilde göstermektir.

</div>

---

## 📌 Projenin Amacı

Günümüzde yenilenebilir enerji giderek daha önemli hale gelmektedir.
Ancak çoğu kişi rüzgar türbini veya güneş paneli kurulduğunda
gerçekte ne kadar enerji üretileceğini tam olarak bilmemektedir.

Bu proje;
- Rüzgar ve güneş enerjisi üretiminin mantığını göstermek
- Fiziksel formülleri sadeleştirerek anlaşılır hale getirmek
- Kullanıcıya kendi şehrine göre tahmini sonuçlar sunmak
amacıyla hazırlanmıştır.

Kesin sonuç üretmekten ziyade **eğitici ve simülasyon amaçlıdır**.

---

## ⚙️ Neler Yapabiliyor?

- Şehir bazlı hava durumu verisini Weather API üzerinden alır
- Rüzgar türbini parametrelerine göre günlük rüzgar enerjisi üretimini hesaplar
- Güneş paneli alanı ve verimine göre günlük güneş enerjisi üretimini tahmin eder
- Toplam günlük enerji üretimini (kWh) gösterir
- Elektrikli araçlar için yaklaşık şarj süresi ve menzil tahmini yapar
- Kullanıcının girdiği parametreleri çerezlerle hatırlar

---

## 🧠 Enerji Hesabı Nasıl Yapıldı?

### 🌬️ Rüzgar Enerjisi

Kullanılan formül:

P = 0.5 × ρ × A × v³ × η

Bu terimler ne anlama geliyor?

- ρ (ro): Havanın yoğunluğunu ifade eder. Hava ne kadar yoğunsa, taşınan enerji de o kadar fazladır.
- A: Türbin pervanesinin süpürdüğü alan. Pervane büyüdükçe yakalanan rüzgar miktarı artar.
- v: Rüzgar hızı. Rüzgar hızı arttıkça üretilen enerji küp şeklinde artar.
- η (eta): Türbin verimi. Rüzgar enerjisinin ne kadarının elektriğe çevrilebildiğini gösterir.

Basitçe:
Rüzgar pervaneye çarpar, pervane döner ve jeneratör elektrik üretir.
Rüzgar hızlandıkça üretilen elektrik ciddi şekilde artar.

---

### ☀️ Güneş Enerjisi

Kullanılan formül:

Günlük enerji = GHI × Panel Alanı × Panel Verimi × Sistem Kaybı

Bu terimler ne anlama geliyor?

- GHI: Türkiye geneli aylık ortalamalara göre tahmin edilen günlük güneşlenme enerjisidir.
- Panel Alanı: Panel alanı büyüdükçe toplanan güneş ışığı artar.
- Panel Verimi: Güneş ışığının ne kadarının elektriğe dönüştürülebildiğini ifade eder.
- Sistem Kaybı: İnverter, kablolar, sıcaklık ve kirlenme gibi nedenlerle oluşan enerji kayıplarıdır.

Basitçe:
Güneş ışığı panele ulaşır, panel ışığı toplar.
Kayıplar düşüldükten sonra kalan enerji elektrik olarak hesaplanır.

---

## 🚗 Elektrikli Araç Hesaplaması

Hesaplanan günlük toplam enerji,
ortalama bir elektrikli aracın batarya kapasitesine bölünerek
yaklaşık şarj süresi hesaplanır.

Ayrıca:
- Ortalama tüketim değeri kullanılarak
- Günlük enerjiyle kaç kilometre yol gidilebileceği tahmin edilir

Bu değerler bilgilendirme amaçlıdır.

---

## 🛠️ Kullanılan Teknolojiler

- PHP
- WeatherAPI
- Bootstrap 5
- Chart.js
- JavaScript
- HTML / CSS

---

## 📈 Proje Durumu

Sürüm: v1  
Proje geliştirilmeye açıktır.

İleride;
- Saatlik güneş hesaplaması
- Konum bazlı daha hassas GHI verileri
- Karbon tasarrufu hesaplamaları
eklenmesi planlanmaktadır.

---

## 🌍 Demo

Demo:
https://yesilenerjin.com

---

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
Ticari kullanım için uygun değildir.

© 2025 YeşilEnerjin
