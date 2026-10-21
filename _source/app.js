// YeşilEnerjin v5 — Tam 6 Dil Destekli (TR, EN, DE, ES, RU, JA) Tahmini Enerji Simülatörü
(() => {
    "use strict";

    const DEFAULT_PROVINCES = [
        { code: "01", name: "Adana", slug: "adana", region: "Akdeniz", lat: 37.0, lon: 35.32, ghi: 5.1, wind: 13.5 },
        { code: "02", name: "Adıyaman", slug: "adiyaman", region: "Güneydoğu Anadolu", lat: 37.76, lon: 38.28, ghi: 5.2, wind: 12.8 },
        { code: "03", name: "Afyonkarahisar", slug: "afyonkarahisar", region: "Ege", lat: 38.75, lon: 30.56, ghi: 4.6, wind: 13.2 },
        { code: "04", name: "Ağrı", slug: "agri", region: "Doğu Anadolu", lat: 39.72, lon: 43.05, ghi: 4.5, wind: 14.0 },
        { code: "05", name: "Amasya", slug: "amasya", region: "Karadeniz", lat: 40.65, lon: 35.84, ghi: 4.1, wind: 12.5 },
        { code: "06", name: "Ankara", slug: "ankara", region: "İç Anadolu", lat: 39.93, lon: 32.86, ghi: 4.5, wind: 13.4 },
        { code: "07", name: "Antalya", slug: "antalya", region: "Akdeniz", lat: 36.9, lon: 30.71, ghi: 5.4, wind: 14.2 },
        { code: "08", name: "Artvin", slug: "artvin", region: "Karadeniz", lat: 41.18, lon: 41.82, ghi: 3.7, wind: 13.8 },
        { code: "09", name: "Aydın", slug: "aydin", region: "Ege", lat: 37.86, lon: 27.84, ghi: 5.1, wind: 16.5 },
        { code: "10", name: "Balıkesir", slug: "balikesir", region: "Marmara", lat: 39.65, lon: 27.88, ghi: 4.5, wind: 21.4 },
        { code: "11", name: "Bilecik", slug: "bilecik", region: "Marmara", lat: 40.15, lon: 29.98, ghi: 4.2, wind: 13.6 },
        { code: "12", name: "Bingöl", slug: "bingol", region: "Doğu Anadolu", lat: 38.89, lon: 40.5, ghi: 4.7, wind: 13.0 },
        { code: "13", name: "Bitlis", slug: "bitlis", region: "Doğu Anadolu", lat: 38.4, lon: 42.11, ghi: 4.8, wind: 14.5 },
        { code: "14", name: "Bolu", slug: "bolu", region: "Karadeniz", lat: 40.74, lon: 31.61, ghi: 4.0, wind: 11.8 },
        { code: "15", name: "Burdur", slug: "burdur", region: "Akdeniz", lat: 37.72, lon: 30.29, ghi: 5.0, wind: 13.5 },
        { code: "16", name: "Bursa", slug: "bursa", region: "Marmara", lat: 40.19, lon: 29.06, ghi: 4.3, wind: 15.8 },
        { code: "17", name: "Çanakkale", slug: "canakkale", region: "Marmara", lat: 40.16, lon: 26.41, ghi: 4.5, wind: 24.6 },
        { code: "18", name: "Çankırı", slug: "cankiri", region: "İç Anadolu", lat: 40.6, lon: 33.61, ghi: 4.3, wind: 12.4 },
        { code: "19", name: "Çorum", slug: "corum", region: "Karadeniz", lat: 40.55, lon: 34.96, ghi: 4.2, wind: 13.0 },
        { code: "20", name: "Denizli", slug: "denizli", region: "Ege", lat: 37.78, lon: 29.09, ghi: 5.0, wind: 14.0 },
        { code: "21", name: "Diyarbakır", slug: "diyarbakir", region: "Güneydoğu Anadolu", lat: 37.91, lon: 40.23, ghi: 5.2, wind: 13.2 },
        { code: "22", name: "Edirne", slug: "edirne", region: "Marmara", lat: 41.68, lon: 26.56, ghi: 4.2, wind: 17.5 },
        { code: "23", name: "Elazığ", slug: "elazig", region: "Doğu Anadolu", lat: 38.68, lon: 39.23, ghi: 4.9, wind: 13.4 },
        { code: "24", name: "Erzincan", slug: "erzincan", region: "Doğu Anadolu", lat: 39.75, lon: 39.5, ghi: 4.6, wind: 12.6 },
        { code: "25", name: "Erzurum", slug: "erzurum", region: "Doğu Anadolu", lat: 39.9, lon: 41.27, ghi: 4.6, wind: 14.8 },
        { code: "26", name: "Eskişehir", slug: "eskisehir", region: "İç Anadolu", lat: 39.78, lon: 30.52, ghi: 4.5, wind: 14.2 },
        { code: "27", name: "Gaziantep", slug: "gaziantep", region: "Güneydoğu Anadolu", lat: 37.07, lon: 37.38, ghi: 5.2, wind: 13.8 },
        { code: "28", name: "Giresun", slug: "giresun", region: "Karadeniz", lat: 40.91, lon: 38.39, ghi: 3.7, wind: 13.5 },
        { code: "29", name: "Gümüşhane", slug: "gumushane", region: "Karadeniz", lat: 40.44, lon: 39.51, ghi: 4.2, wind: 13.0 },
        { code: "30", name: "Hakkari", slug: "hakkari", region: "Doğu Anadolu", lat: 37.58, lon: 43.73, ghi: 5.0, wind: 14.2 },
        { code: "31", name: "Hatay", slug: "hatay", region: "Akdeniz", lat: 36.4, lon: 36.35, ghi: 5.1, wind: 20.8 },
        { code: "32", name: "Isparta", slug: "isparta", region: "Akdeniz", lat: 37.76, lon: 30.56, ghi: 5.0, wind: 13.6 },
        { code: "33", name: "Mersin", slug: "mersin", region: "Akdeniz", lat: 36.81, lon: 34.64, ghi: 5.3, wind: 14.5 },
        { code: "34", name: "İstanbul", slug: "istanbul", region: "Marmara", lat: 41.01, lon: 28.98, ghi: 4.2, wind: 19.8 },
        { code: "35", name: "İzmir", slug: "izmir", region: "Ege", lat: 38.42, lon: 27.14, ghi: 5.0, wind: 22.5 },
        { code: "36", name: "Kars", slug: "kars", region: "Doğu Anadolu", lat: 40.62, lon: 43.1, ghi: 4.4, wind: 15.2 },
        { code: "37", name: "Kastamonu", slug: "kastamonu", region: "Karadeniz", lat: 41.39, lon: 33.78, ghi: 4.0, wind: 13.2 },
        { code: "38", name: "Kayseri", slug: "kayseri", region: "İç Anadolu", lat: 38.73, lon: 35.48, ghi: 4.8, wind: 13.6 },
        { code: "39", name: "Kırklareli", slug: "kirklareli", region: "Marmara", lat: 41.73, lon: 27.22, ghi: 4.2, wind: 18.4 },
        { code: "40", name: "Kırşehir", slug: "kirsehir", region: "İç Anadolu", lat: 39.14, lon: 34.17, ghi: 4.7, wind: 14.0 },
        { code: "41", name: "Kocaeli", slug: "kocaeli", region: "Marmara", lat: 40.85, lon: 29.88, ghi: 4.1, wind: 16.2 },
        { code: "42", name: "Konya", slug: "konya", region: "İç Anadolu", lat: 37.87, lon: 32.49, ghi: 5.1, wind: 13.8 },
        { code: "43", name: "Kütahya", slug: "kutahya", region: "Ege", lat: 39.42, lon: 29.98, ghi: 4.5, wind: 13.4 },
        { code: "44", name: "Malatya", slug: "malatya", region: "Doğu Anadolu", lat: 38.36, lon: 38.31, ghi: 5.0, wind: 13.5 },
        { code: "45", name: "Manisa", slug: "manisa", region: "Ege", lat: 38.62, lon: 27.43, ghi: 4.9, wind: 18.6 },
        { code: "46", name: "Kahramanmaraş", slug: "kahramanmaras", region: "Akdeniz", lat: 37.59, lon: 36.94, ghi: 5.0, wind: 14.4 },
        { code: "47", name: "Mardin", slug: "mardin", region: "Güneydoğu Anadolu", lat: 37.32, lon: 40.72, ghi: 5.4, wind: 15.2 },
        { code: "48", name: "Muğla", slug: "mugla", region: "Ege", lat: 37.22, lon: 28.36, ghi: 5.2, wind: 18.2 },
        { code: "49", name: "Muş", slug: "mus", region: "Doğu Anadolu", lat: 38.95, lon: 41.75, ghi: 4.7, wind: 13.0 },
        { code: "50", name: "Nevşehir", slug: "nevsehir", region: "İç Anadolu", lat: 38.69, lon: 34.69, ghi: 4.8, wind: 13.8 },
        { code: "51", name: "Niğde", slug: "nigde", region: "İç Anadolu", lat: 37.97, lon: 34.68, ghi: 5.0, wind: 14.2 },
        { code: "52", name: "Ordu", slug: "ordu", region: "Karadeniz", lat: 40.98, lon: 37.88, ghi: 3.8, wind: 13.6 },
        { code: "53", name: "Rize", slug: "rize", region: "Karadeniz", lat: 41.02, lon: 40.52, ghi: 3.5, wind: 12.8 },
        { code: "54", name: "Sakarya", slug: "sakarya", region: "Marmara", lat: 40.76, lon: 30.38, ghi: 4.1, wind: 14.0 },
        { code: "55", name: "Samsun", slug: "samsun", region: "Karadeniz", lat: 41.29, lon: 36.33, ghi: 4.0, wind: 15.0 },
        { code: "56", name: "Siirt", slug: "siirt", region: "Güneydoğu Anadolu", lat: 37.93, lon: 41.95, ghi: 5.1, wind: 12.8 },
        { code: "57", name: "Sinop", slug: "sinop", region: "Karadeniz", lat: 42.02, lon: 35.15, ghi: 4.0, wind: 17.8 },
        { code: "58", name: "Sivas", slug: "sivas", region: "İç Anadolu", lat: 39.75, lon: 37.02, ghi: 4.6, wind: 15.0 },
        { code: "59", name: "Tekirdağ", slug: "tekirdag", region: "Marmara", lat: 40.98, lon: 27.52, ghi: 4.3, wind: 18.8 },
        { code: "60", name: "Tokat", slug: "tokat", region: "Karadeniz", lat: 40.32, lon: 36.55, ghi: 4.3, wind: 13.0 },
        { code: "61", name: "Trabzon", slug: "trabzon", region: "Karadeniz", lat: 41.0, lon: 39.72, ghi: 3.7, wind: 13.8 },
        { code: "62", name: "Tunceli", slug: "tunceli", region: "Doğu Anadolu", lat: 39.11, lon: 39.54, ghi: 4.8, wind: 13.2 },
        { code: "63", name: "Şanlıurfa", slug: "sanliurfa", region: "Güneydoğu Anadolu", lat: 37.16, lon: 38.8, ghi: 5.5, wind: 13.6 },
        { code: "64", name: "Uşak", slug: "usak", region: "Ege", lat: 38.68, lon: 29.41, ghi: 4.8, wind: 14.4 },
        { code: "65", name: "Van", slug: "van", region: "Doğu Anadolu", lat: 38.49, lon: 43.41, ghi: 5.1, wind: 14.6 },
        { code: "66", name: "Yozgat", slug: "yozgat", region: "İç Anadolu", lat: 39.82, lon: 34.81, ghi: 4.5, wind: 14.5 },
        { code: "67", name: "Zonguldak", slug: "zonguldak", region: "Karadeniz", lat: 41.46, lon: 31.8, ghi: 3.9, wind: 15.2 },
        { code: "68", name: "Aksaray", slug: "aksaray", region: "İç Anadolu", lat: 38.37, lon: 34.04, ghi: 4.9, wind: 14.2 },
        { code: "69", name: "Bayburt", slug: "bayburt", region: "Karadeniz", lat: 40.26, lon: 40.22, ghi: 4.4, wind: 13.8 },
        { code: "70", name: "Karaman", slug: "karaman", region: "İç Anadolu", lat: 37.18, lon: 33.23, ghi: 5.3, wind: 15.0 },
        { code: "71", name: "Kırıkkale", slug: "kirikkale", region: "İç Anadolu", lat: 39.85, lon: 33.52, ghi: 4.6, wind: 13.5 },
        { code: "72", name: "Batman", slug: "batman", region: "Güneydoğu Anadolu", lat: 37.88, lon: 41.14, ghi: 5.2, wind: 12.6 },
        { code: "73", name: "Şırnak", slug: "sirnak", region: "Güneydoğu Anadolu", lat: 37.52, lon: 42.46, ghi: 5.2, wind: 13.8 },
        { code: "74", name: "Bartın", slug: "bartin", region: "Karadeniz", lat: 41.63, lon: 32.34, ghi: 3.9, wind: 14.2 },
        { code: "75", name: "Ardahan", slug: "ardahan", region: "Doğu Anadolu", lat: 41.11, lon: 42.7, ghi: 4.3, wind: 14.5 },
        { code: "76", name: "Iğdır", slug: "igdir", region: "Doğu Anadolu", lat: 39.92, lon: 44.03, ghi: 4.7, wind: 12.8 },
        { code: "77", name: "Yalova", slug: "yalova", region: "Marmara", lat: 40.65, lon: 29.27, ghi: 4.2, wind: 15.6 },
        { code: "78", name: "Karabük", slug: "karabuk", region: "Karadeniz", lat: 41.21, lon: 32.62, ghi: 4.0, wind: 12.8 },
        { code: "79", name: "Kilis", slug: "kilis", region: "Güneydoğu Anadolu", lat: 36.72, lon: 37.12, ghi: 5.3, wind: 14.5 },
        { code: "80", name: "Osmaniye", slug: "osmaniye", region: "Akdeniz", lat: 37.07, lon: 36.25, ghi: 5.1, wind: 14.8 },
        { code: "81", name: "Düzce", slug: "duzce", region: "Karadeniz", lat: 40.84, lon: 31.16, ghi: 4.0, wind: 12.2 }
    ];

    const SEASONAL_MULTS = [0.48, 0.62, 0.84, 1.08, 1.28, 1.45, 1.56, 1.48, 1.22, 0.92, 0.64, 0.45];

    const I18N = {
        tr: {
            navHome: "Ana Sayfa", navCalc: "Tahmin Simülatörü", navAbout: "Hakkımızda", navFaq: "SSS", navContact: "İletişim",
            navPrivacy: "Gizlilik Politikası", navTerms: "Kullanım Şartları & Sorumluluk Reddi", themeTitle: "Tema Değiştir",
            searchPlaceholder: "81 ilde ara (ör. İzmir, 34)...",
            disclaimerBanner: "⚠️ Bilgilendirme: Bu platformdaki tüm üretim, şarj süresi ve tasarruf değerleri meteorolojik modellere dayanan yaklaşık tahminlerdir; kesin saha verisi veya yatırım tavsiyesi değildir.",
            disclaimerLink: "Yasal Uyarı & Şartlar →",
            heroBadge: "🌿 81 İl İçin Eğitsel Yenilenebilir Enerji Tahmin Simülatörü",
            heroTitle: "Şehrinizin Yeşil Enerji Potansiyelini Tahmin Edin",
            heroDesc: "Meteorolojik tahmin modelleri ve fiziksel denklemlerle rüzgar türbini ve güneş paneli (PV) sistemlerinin yaklaşık günlük üretimini, elektrikli araç şarj süresini ve tahmini karbon kazanımını simüle edin.",
            startBtn: "Tahmin Aracını Aç", popularCities: "Hızlı İl Seçimi:",
            feat1Title: "Gerçekçi Fiziksel Modelleme", feat1Desc: "Rotor süpürme alanı, Betz sınırı (%59.3), panel eğim/yön çarpanı ve sıcaklık kaynaklı hücre kayıplarını hesaba katar.",
            feat2Title: "Meteorolojik Tahmin Verileri", feat2Desc: "81 ilin koordinatlarına göre atmosferik ışınım (GHI) ve 10m/80m rüzgar tahminlerini önbellekli olarak işler.",
            feat3Title: "Yaklaşık EV Şarj & Etki Analizi", feat3Desc: "Tahmini günlük üretimin elektrikli araç bataryalarını ne kadar sürede doldurabileceğini ve yaklaşık CO₂ etkisini gösterir.",
            card1Title: "Yaklaşık Elektrikli Araç Şarj Simülasyonu", card1Desc: "Tahmini günlük üretimle Togg T10F, Tesla Model Y ve Renault ZOE batarya dolum sürelerini yaklaşık olarak kıyaslayın.",
            card2Title: "Fotovoltaik (PV) Güneş Tahmin Modeli", card2Desc: "Çatı yönü, eğim açısı ve hava sıcaklığı etkilerini hesaba katan eğitici fotovoltaik üretim tahmini.",
            card3Title: "Sürdürülebilir Enerji Farkındalığı", card3Desc: "Farklı şehirlerin mevsimsel rüzgar ve güneş potansiyellerini etkileşimli grafiklerle inceleyin.",
            hub10: "10m Rüzgar", hub80: "80m Kule (Türbin)", resetBtn: "Varsayılanlara Dön",
            presetsTitle: "Hazır Sistem Profilleri (Tahmini Ölçek)",
            presetRes: "🏠 Ev Tipi (Konut)", presetResSub: "3m Türbin • 18 m² Panel (~3.7 kWp)",
            presetCom: "🏢 Kurumsal Ölçek", presetComSub: "12.5m Türbin • 300 m² Panel (~61 kWp)",
            presetInd: "🏭 Endüstriyel Saha", presetIndSub: "25m Türbin • 1000 m² Panel (~215 kWp)",
            presetOff: "🚐 Bağ Evi / Karavan", presetOffSub: "1.5m Türbin • 8 m² Panel (~1.6 kWp)",
            lblRadius: "Rotor Yarıçapı (r)", lblWindEff: "Türbin Verimi (η)", lblPanelArea: "Panel Alanı (A)", lblSolarEff: "Panel Verimi (η)",
            monoNote: "Monokristal ~%21",
            lblTilt: "Panel Yön & Eğim Çarpanı",
            tiltOpt1: "Güney Cephe — Optimum Eğim (~30°) [%100]",
            tiltOpt2: "Güneydoğu / Güneybatı Cephe [%94]",
            tiltOpt3: "Düz Çatı / Düşük Eğim (~10°) [%89]",
            tiltOpt4: "Doğu / Batı Cephe [%84]",
            lblTariff: "Birim Elektrik Fiyatı (TL/kWh)", lblCompare: "Karşılaştırılan İl (Tahmini Kıyas)",
            betzWarn: "Uyarı: Seçilen türbin verimi teorik Betz sınırını (%59.3) aşıyor! Gerçekçi tahmin için %35-%48 arası önerilir.",
            resTitle: "Yaklaşık Enerji Üretim Tahmini", estBadge: "~Tahmini Simülasyon Verisi",
            windDaily: "Tahmini Rüzgar Üretimi", solarDaily: "Tahmini Güneş Üretimi",
            instantPower: "Yaklaşık Güç", cloudAdj: "Bulut/Sıcaklık Düzeltmeli", totalDaily: "TAHMİNİ GÜNLÜK TOPLAM ÜRETİM (YAKLAŞIK)",
            evTitle: "🔋 Yaklaşık Araç Şarj Süresi ve Çevresel Etki Tahmini",
            eqRange: "Tahmini Günlük Menzil", eqRangeSub: "Varsayılan: 15 kWh / 100 km",
            co2Saved: "Yaklaşık Karbon Kazanımı", co2Sub: "Yaklaşık 0.43 kg CO₂ / kWh",
            econSaved: "Tahmini Aylık Fatura Karşılığı", econSub: "Tahmini Değer — Yatırım Tavsiyesi Değildir",
            annualEst: "Tahmini Yıllık Üretim", annualSub: "Mevsimsel Yaklaşık Projeksiyon",
            evModel1: "Togg T10F (Standart)", evModel2: "Tesla Model Y (LR)", evModel3: "Renault ZOE", evModel4: "Elektrikli Motosiklet",
            chartBarTitle: "📊 Meteorolojik Tahmin Verileri ve Üretim Dağılımı",
            chartHourlyTitle: "⏱️ 24 Saatlik Tahmini Güneş ve Rüzgar Eğrisi (kW)",
            chartMonthlyTitle: "📅 12 Aylık Mevsimsel Üretim Tahmini (kWh/gün) ve İl Kıyaslaması",
            barWindSpeed: "Rüzgar (km/s)", barWindKwh: "~Rüzgar (kWh)", barSolarKwh: "~Güneş (kWh)",
            months: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
            weatherSummary: "Meteorolojik Tahmin Özeti", temp: "Tahmini Sıcaklık", humidity: "Bağıl Nem", windSpeed: "Tahmini Rüzgar Hızı",
            cloudCover: "Bulutluluk Oranı", ghiLabel: "Tahmini Günlük Işınım (GHI)", tempLossLabel: "Sıcaklık Verim Etkisi",
            unitHour: "saat", unitMin: "dk", unitDay: "gün", unitTrees: "ağaç/yıl", unitHomes: "hane", unitYr: "MWh/yıl", unitMo: "TL/ay",
            formulaTitle: "🧠 Tahmini Enerji Hesabı Nasıl Yapılıyor?",
            windFormulaHead: "🌬️ Tahmini Rüzgar Gücü: P ≈ 0.5 × ρ × A × v³ × η",
            windFormulaBody: "• <b>ρ (1.225 kg/m³):</b> Standart deniz seviyesi hava yoğunluğu varsayımı.<br>• <b>A (π × r²):</b> Rotor kanatlarının süpürdüğü dairesel alan.<br>• <b>v³:</b> Tahmini rüzgar hızının küpü (Anlık türbülans ve topoğrafik engeller hariçtir).<br>• <b>η (Betz ≤ %59.3):</b> Teorik aerodinamik ve mekanik dönüşüm verimi.",
            solarFormulaHead: "☀️ Tahmini Güneş Üretimi: E ≈ GHI × A × η_pv × f_kayıp × f_eğim",
            solarFormulaBody: "• <b>GHI (kWh/m²/gün):</b> İlin koordinatları için tahmin edilen günlük güneş ışınımı.<br>• <b>A & η_pv:</b> Toplam panel alanı ve seçilen fotovoltaik hücre verimi.<br>• <b>f_kayıp & Sıcaklık:</b> %15 inverter/kablo kaybı ve 25°C üzeri hücre ısınma etkisi.<br>• <b>Önemli Not:</b> Sonuçlar yaklaşık simülasyon değerleridir; kesin ölçüm yerine geçmez.",
            aboutTitle: "📖 Hakkımızda ve Simülasyon Metodolojisi",
            aboutP1: "<b>YeşilEnerjin</b>, yenilenebilir enerji kaynaklarının (rüzgar türbinleri ve fotovoltaik güneş panelleri) temel çalışma prensiplerini ve yaklaşık üretim potansiyellerini anlaşılır biçimde göstermek amacıyla geliştirilmiş, <b>eğitim ve farkındalık odaklı</b> bir web simülasyon projesidir.",
            aboutH1: "1. Neden Tahmini Simülasyon?",
            aboutP2: "Gerçek hayatta bir güneş paneli veya rüzgar türbininin üreteceği elektrik; arazinin mikro-topoğrafyası, çevredeki bina veya ağaçların oluşturduğu gölgelenme, atmosferik türbülans, tozlanma, kar yükü, kablo kesit kayıpları ve inverter dönüşüm eğrileri gibi onlarca değişkene bağlıdır. Bu nedenle hiçbir web tabanlı yazılım %100 kesin üretim garantisi veremez. YeşilEnerjin, uluslararası kabul görmüş temel fizik denklemlerini kullanarak <b>yaklaşık ve eğitici bir projeksiyon</b> sunar.",
            aboutH2: "2. Kullanılan Matematiksel Modeller",
            aboutLi1: "<b>Rüzgar Türbini Modeli:</b> Kinetik enerji akısı denklemi (<code>P = 0.5 × ρ × A × v³ × η</code>) ve teorik Betz limiti (<code>%59.3</code>) esas alınır. 10m meteorolojik rüzgar hızı ile 80m kule yüksekliği rüzgar profili arasında yaklaşık kayma (wind shear) katsayısı uygulanır.",
            aboutLi2: "<b>Fotovoltaik (PV) Güneş Modeli:</b> Günlük yatay düzlem güneş ışınımı (GHI), panel yüzey alanı, hücre dönüşüm verimi, yön/eğim çarpanı, 25°C üzerindeki sıcaklık kaybı (<code>-0.4%/°C</code>) ve <code>%15</code> genel sistem kaybı üzerinden yaklaşık hesaplama yapılır.",
            faqTitle: "❓ Sıkça Sorulan Sorular",
            faqQ1: "1. Gösterilen üretim ve tasarruf değerleri kesin midir?",
            faqA1: "Hayır. Ekranda yer alan tüm kWh üretim, elektrikli araç şarj süresi, karbon kazanımı ve fatura karşılığı değerleri <b>yaklaşık simülasyon tahminleridir</b>. Ticari yatırım, fizibilite raporu veya resmi mühendislik projesi olarak kullanılamaz.",
            faqQ2: "2. Hava durumu verileri nereden alınıyor?",
            faqA2: "Sistem, il merkezlerinin coğrafi koordinatları için açık meteorolojik tahmin modellerinden (Open-Meteo kısa dalga güneş radyasyonu ve rüzgar tahminleri ile yedek hava durumu servisleri) yararlanır. Dış servislere erişilemediği durumlarda ilin uzun yıllar mevsimsel iklim ortalamalarını kullanır.",
            faqQ3: "3. Betz sınırı (%59.3) neden önemlidir?",
            faqA3: "Alman fizikçi Albert Betz tarafından kanıtlandığı üzere, açık akışlı bir rüzgar türbini rüzgardaki kinetik enerjinin teorik olarak en fazla %59.3'ünü yakalayabilir. Modern ticari türbinler pratikte %35 ile %48 arasında verimle çalışır.",
            faqQ4: "4. Sıcaklık arttığında güneş paneli verimi neden düşer?",
            faqA4: "Fotovoltaik paneller standart olarak 25°C hücre sıcaklığında test edilir. Yaz aylarında panel yüzeyi aşırı ısındığında yarı iletken fiziği gereği voltaj düşer ve her 1°C artış için yaklaşık %0.4 verim kaybı oluşur.",
            contactTitle: "📬 İletişim",
            contactP1: "Proje metodolojisi, eğitim iş birlikleri, hata bildirimleri veya önerileriniz için aşağıdaki e-posta adresinden bize ulaşabilirsiniz:",
            contactEmailLbl: "E-posta:",
            contactNote: "Not: Bu platform ticari güneş/rüzgar kurulum hizmeti veya yatırım danışmanlığı vermemektedir.",
            privacyTitle: "🔒 Gizlilik ve Çerez (Veri Koruma) Politikası",
            privacyIntro: "YeşilEnerjin olarak ziyaretçilerimizin gizliliğine ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ile genel veri koruma ilkelerine azami özen göstermekteyiz.",
            privacyH1: "1. Toplanan ve İşlenen Veriler",
            privacyLi1: "<b>Kimlik Bilgisi Toplanmaması:</b> Sitemizi kullanmak için üyelik, ad, soyad, telefon veya konum izni talep edilmez.",
            privacyLi2: "<b>Yerel Tarayıcı Depolaması (LocalStorage):</b> Seçtiğiniz dil, karanlık/aydınlık tema ve simülasyon kaydırıcı ayarları yalnızca kendi cihazınızın tarayıcı belleğinde saklanır; sunucularımıza gönderilmez veya üçüncü taraflarla paylaşılmaz.",
            privacyLi3: "<b>Kötüye Kullanım ve Bot Koruması:</b> Servisin otomatik botlar tarafından istismar edilmesini önlemek amacıyla, istemci IP adresleri geri döndürülemez kriptografik özet (SHA-256 hash) işlemine tabi tutularak yalnızca geçici hız sınırlandırma sayacında kullanılır.",
            privacyH2: "2. Üçüncü Taraf Servisler",
            privacyP2: "Şehir bazlı meteorolojik tahminler sunucu tarafında önbelleklenerek çağrılır; ziyaretçilerin tarayıcılarından üçüncü taraf reklam veya takip ağlarına veri aktarılmaz.",
            privacyH3: "3. İletişim",
            privacyP3: "Gizlilik politikamızla ilgili her türlü sorunuz için bizimle e-posta üzerinden iletişime geçebilirsiniz:",
            termsTitle: "📄 Kullanım Şartları ve Yasal Sorumluluk Reddi Beyanı",
            termsIntro: "Bu web sitesine erişerek ve simülasyon aracını kullanarak aşağıdaki kullanım koşullarını ve yasal sorumluluk reddi beyanını açıkça kabul etmiş sayılırsınız:",
            termsH1: "1. Eğitim ve Simülasyon Amaçlı Kullanım (Kesin Veri Değildir)",
            termsP1: "<b>YeşilEnerjin</b> üzerinde sunulan tüm elektrik üretim değerleri (kWh/MWh), rüzgar hızı ve güneş ışınımı (GHI) verileri, elektrikli araç şarj süreleri, karbon azaltım tahminleri ve ekonomik karşılık hesaplamaları <b>tamamen teorik formüllere dayanan yaklaşık tahminlerdir</b>. Hiçbir sonuç kesin saha ölçümü veya garanti niteliği taşımaz.",
            termsH2: "2. Yatırım ve Mühendislik Tavsiyesi Olmaması",
            termsP2: "Sitedeki hiçbir bilgi, grafik veya hesaplama çıktısı; ticari yatırım tavsiyesi, finansal fizibilite raporu, resmi enerji lisans başvurusu veya profesyonel mühendislik projesi yerine geçmez. Yatırım yapmadan önce yetkili mühendislik firmalarından yerinde ölçüm ve resmi proje hizmeti alınmalıdır.",
            termsH3: "3. Sorumluluk Sınırlandırması (Sorumluluk Reddi)",
            termsP3: "Bu platform 'OLDUĞU GİBİ' (AS-IS) sunulmaktadır. Site geliştiricileri; simülasyon sonuçlarının kullanımından, veri gecikmelerinden veya bu verilere güvenilerek alınan kararlardan doğabilecek <b>hiçbir doğrudan veya dolaylı maddi/manevi zarardan, gelir kaybından veya ekipman hasarından hukuki ya da mali olarak sorumlu tutulamaz</b>.",
            termsH4: "4. Güvenlik ve Kullanım Kısıtlamaları",
            termsP4: "Sitenin arka plan API uç noktalarını otomatik botlarla taramak (scraping), hız sınırlarını aşmaya çalışmak veya servisi aksatacak istekler göndermek yasaktır.",
            footerDesc: "Eğitim amaçlı yenilenebilir enerji tahmin simülatörü. Tüm sonuçlar yaklaşık tahmindir; kesin veri veya yatırım tavsiyesi değildir.",
            footerLegalTitle: "Yasal & Kurumsal",
            footerCopy: "YeşilEnerjin — Eğitim Amaçlı Simülasyon Platformu"
        },
        en: {
            navHome: "Home", navCalc: "Estimation Simulator", navAbout: "About", navFaq: "FAQ", navContact: "Contact",
            navPrivacy: "Privacy Policy", navTerms: "Terms of Use & Disclaimer", themeTitle: "Toggle Theme",
            searchPlaceholder: "Search 81 provinces (e.g. Izmir, 34)...",
            disclaimerBanner: "⚠️ Disclaimer: All generation, EV charging, and savings figures on this platform are approximate simulations based on meteorological models; they are not guaranteed field data or investment advice.",
            disclaimerLink: "Legal Disclaimer & Terms →",
            heroBadge: "🌿 Educational Renewable Energy Estimation Simulator for 81 Provinces",
            heroTitle: "Estimate Your City's Green Energy Potential",
            heroDesc: "Simulate approximate daily wind turbine and solar PV output, estimated EV charging times, and projected carbon offset using meteorological forecast models and physics equations.",
            startBtn: "Open Simulator", popularCities: "Quick Select:",
            feat1Title: "Realistic Physics Modeling", feat1Desc: "Accounts for rotor swept area, Betz limit (59.3%), panel tilt/orientation factor, and thermal cell derating.",
            feat2Title: "Meteorological Forecast Models", feat2Desc: "Processes cached atmospheric solar irradiance (GHI) and 10m/80m wind telemetry across all 81 provinces.",
            feat3Title: "Estimated EV & Carbon Impact", feat3Desc: "Shows approximate EV battery charging durations and projected CO₂ reduction for educational analysis.",
            card1Title: "Approximate EV Charging Simulation", card1Desc: "Compare estimated battery charging times for Togg T10F, Tesla Model Y, and Renault ZOE using daily output.",
            card2Title: "Photovoltaic (PV) Solar Estimation Model", card2Desc: "Educational PV generation estimate accounting for roof orientation, tilt angle, and ambient temperature losses.",
            card3Title: "Sustainable Energy Awareness", card3Desc: "Explore seasonal wind and solar potential across different provinces with interactive charts.",
            hub10: "10m Wind", hub80: "80m Hub (Turbine)", resetBtn: "Reset Defaults",
            presetsTitle: "System Presets (Approximate Scale)",
            presetRes: "🏠 Residential", presetResSub: "3m Rotor • 18 m² PV (~3.7 kWp)",
            presetCom: "🏢 Commercial", presetComSub: "12.5m Rotor • 300 m² PV (~61 kWp)",
            presetInd: "🏭 Utility Scale", presetIndSub: "25m Rotor • 1000 m² PV (~215 kWp)",
            presetOff: "🚐 Off-Grid Cabin", presetOffSub: "1.5m Rotor • 8 m² PV (~1.6 kWp)",
            lblRadius: "Rotor Radius (r)", lblWindEff: "Turbine Efficiency (η)", lblPanelArea: "Panel Area (A)", lblSolarEff: "Panel Efficiency (η)",
            monoNote: "Monocrystalline ~21%",
            lblTilt: "Panel Orientation & Tilt Factor",
            tiltOpt1: "South Facing — Optimal Tilt (~30°) [100%]",
            tiltOpt2: "Southeast / Southwest Facing [94%]",
            tiltOpt3: "Flat Roof / Low Tilt (~10°) [89%]",
            tiltOpt4: "East / West Facing [84%]",
            lblTariff: "Unit Electricity Tariff (TRY/kWh)", lblCompare: "Compare Province (Estimated)",
            betzWarn: "Warning: Selected turbine efficiency exceeds theoretical Betz limit (59.3%)! 35%-48% is recommended for realistic estimates.",
            resTitle: "Approximate Generation Estimate", estBadge: "~Approximate Simulation Data",
            windDaily: "Est. Daily Wind Output", solarDaily: "Est. Daily Solar Output",
            instantPower: "Est. Power", cloudAdj: "Cloud/Thermal Adjusted", totalDaily: "ESTIMATED DAILY TOTAL OUTPUT (APPROX.)",
            evTitle: "🔋 Estimated EV Charging Duration & Environmental Impact",
            eqRange: "Est. Daily Driving Range", eqRangeSub: "Default: 15 kWh / 100 km",
            co2Saved: "Est. Carbon Offset", co2Sub: "Approx. 0.43 kg CO₂ / kWh",
            econSaved: "Est. Monthly Bill Offset", econSub: "Approximate Estimate — Not Investment Advice",
            annualEst: "Est. Annual Generation", annualSub: "Seasonal Approximate Projection",
            evModel1: "Togg T10F (Standard)", evModel2: "Tesla Model Y (LR)", evModel3: "Renault ZOE", evModel4: "Electric Motorcycle",
            chartBarTitle: "📊 Meteorological Estimates & Generation Breakdown",
            chartHourlyTitle: "⏱️ 24-Hour Estimated Solar & Wind Curve (kW)",
            chartMonthlyTitle: "📅 12-Month Seasonal Projection (kWh/day) & City Comparison",
            barWindSpeed: "Wind (km/h)", barWindKwh: "~Wind (kWh)", barSolarKwh: "~Solar (kWh)",
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weatherSummary: "Meteorological Estimate Summary", temp: "Est. Temperature", humidity: "Relative Humidity", windSpeed: "Est. Wind Speed",
            cloudCover: "Cloud Cover", ghiLabel: "Est. Daily Irradiance (GHI)", tempLossLabel: "Thermal Cell Derating",
            unitHour: "hrs", unitMin: "min", unitDay: "days", unitTrees: "trees/yr", unitHomes: "homes", unitYr: "MWh/yr", unitMo: "TRY/mo",
            formulaTitle: "🧠 How Are Energy Estimates Calculated?",
            windFormulaHead: "🌬️ Estimated Wind Power: P ≈ 0.5 × ρ × A × v³ × η",
            windFormulaBody: "• <b>ρ (1.225 kg/m³):</b> Standard sea-level air density assumption.<br>• <b>A (π × r²):</b> Circular area swept by the turbine rotor blades.<br>• <b>v³:</b> Cube of estimated wind speed (excludes local turbulence and terrain obstacles).<br>• <b>η (Betz ≤ 59.3%):</b> Theoretical aerodynamic and mechanical conversion efficiency.",
            solarFormulaHead: "☀️ Estimated Solar Output: E ≈ GHI × A × η_pv × f_loss × f_tilt",
            solarFormulaBody: "• <b>GHI (kWh/m²/day):</b> Estimated daily global horizontal solar irradiance for the province.<br>• <b>A & η_pv:</b> Total photovoltaic panel surface area and selected cell efficiency.<br>• <b>f_loss & Thermal:</b> 15% inverter/wiring loss plus thermal cell derating above 25°C.<br>• <b>Important Note:</b> All outputs are approximate educational simulations, not guaranteed measurements.",
            aboutTitle: "📖 About & Simulation Methodology",
            aboutP1: "<b>YeşilEnerjin</b> is an open-access, <b>educational and awareness-oriented</b> web simulation project designed to illustrate the fundamental physics and approximate generation potential of wind turbines and solar photovoltaic (PV) panels across all 81 provinces of Türkiye.",
            aboutH1: "1. Why Approximate Simulation?",
            aboutP2: "Actual electricity generation from a wind turbine or solar panel depends on dozens of local variables including micro-topography, shading from nearby structures or trees, atmospheric turbulence, dust, snow load, cable losses, and inverter efficiency curves. Therefore, no web calculator can guarantee 100% exact field output. YeşilEnerjin provides an <b>approximate educational projection</b> using standard physical equations.",
            aboutH2: "2. Mathematical Models Used",
            aboutLi1: "<b>Wind Turbine Model:</b> Based on the kinetic energy flux equation (<code>P = 0.5 × ρ × A × v³ × η</code>) and the theoretical Betz limit (<code>59.3%</code>), applying an approximate wind shear factor between 10m meteorological wind and 80m hub height.",
            aboutLi2: "<b>Photovoltaic (PV) Solar Model:</b> Estimates daily output using Global Horizontal Irradiance (GHI), panel area, cell efficiency, orientation/tilt factor, thermal derating above 25°C (<code>-0.4%/°C</code>), and a <code>15%</code> system loss factor.",
            faqTitle: "❓ Frequently Asked Questions",
            faqQ1: "1. Are the displayed generation and savings figures exact?",
            faqA1: "No. All kWh generation, EV charging times, carbon offset, and bill equivalent figures are <b>approximate simulation estimates</b>. They cannot be used as a commercial feasibility report, investment guide, or official engineering project.",
            faqQ2: "2. Where does the weather data come from?",
            faqA2: "The platform queries open meteorological forecast models (Open-Meteo shortwave solar radiation and wind forecasts plus backup weather services) for provincial coordinates, falling back to long-term seasonal climatology if external services are unreachable.",
            faqQ3: "3. Why is the Betz limit (59.3%) important?",
            faqA3: "As proven by physicist Albert Betz, an open-flow wind turbine can theoretically capture at most 59.3% (16/27) of the kinetic energy in wind. Modern commercial turbines typically operate at 35% to 48% efficiency.",
            faqQ4: "4. Why does solar panel efficiency drop in hot weather?",
            faqA4: "Solar panels are rated at 25°C cell temperature. When panels overheat in summer, semiconductor voltage drops, reducing output by approximately 0.4% for every 1°C above 25°C.",
            contactTitle: "📬 Contact",
            contactP1: "For questions regarding simulation methodology, educational collaborations, bug reports, or feedback, you can reach us via email:",
            contactEmailLbl: "Email:",
            contactNote: "Note: This platform does not provide commercial solar/wind installation services or investment consulting.",
            privacyTitle: "🔒 Privacy & Cookie (Data Protection) Policy",
            privacyIntro: "At YeşilEnerjin, we respect visitor privacy and adhere to data protection principles (KVKK & GDPR).",
            privacyH1: "1. Data Processed",
            privacyLi1: "<b>No Personal Identity Collection:</b> We do not request registration, names, phone numbers, or precise GPS permissions.",
            privacyLi2: "<b>Local Browser Storage (LocalStorage):</b> Your language, theme, and simulation slider preferences are stored strictly inside your own browser memory and are never shared with third parties.",
            privacyLi3: "<b>Anti-Abuse & Bot Protection:</b> To prevent automated scraping and DoS abuse, client IP addresses are processed as irreversible cryptographic hashes (SHA-256) solely for temporary rate-limiting counters.",
            privacyH2: "2. Third-Party Services",
            privacyP2: "Provincial meteorological forecasts are fetched and cached server-side; no visitor data is transmitted to third-party advertising or tracking networks.",
            privacyH3: "3. Contact",
            privacyP3: "For any inquiries regarding our privacy policy, please contact us via email:",
            termsTitle: "📄 Terms of Use & Legal Disclaimer",
            termsIntro: "By accessing this website and using the simulation tool, you explicitly agree to the following terms of use and legal disclaimer:",
            termsH1: "1. Educational & Simulation Purpose Only (Not Exact Data)",
            termsP1: "All electricity generation values (kWh/MWh), wind speed and solar irradiance (GHI) figures, EV charging times, carbon reduction projections, and financial estimates on <b>YeşilEnerjin</b> are <b>approximate simulations based on theoretical formulas</b>. No output represents a guaranteed field measurement.",
            termsH2: "2. Not Investment or Engineering Advice",
            termsP2: "Nothing on this website constitutes commercial investment advice, a financial feasibility study, or a certified engineering design. Always consult licensed engineering professionals and conduct on-site measurements before making any renewable energy investment.",
            termsH3: "3. Limitation of Liability (Disclaimer)",
            termsP3: "This platform is provided 'AS IS' without warranties of any kind. The developers and contributors <b>shall not be held legally or financially liable for any direct or indirect damages, financial losses, or equipment issues</b> arising from reliance on simulation estimates.",
            termsH4: "4. Security & Acceptable Use",
            termsP4: "Automated scraping of backend API endpoints, attempting to bypass rate limits, or disrupting service availability is strictly prohibited.",
            footerDesc: "Educational renewable energy estimation simulator. All results are approximate estimates and do not constitute exact measurements or investment advice.",
            footerLegalTitle: "Legal & Information",
            footerCopy: "YeşilEnerjin — Educational Simulation Platform"
        },
        de: {
            navHome: "Startseite", navCalc: "Schätz-Simulator", navAbout: "Über uns", navFaq: "FAQ", navContact: "Kontakt",
            navPrivacy: "Datenschutzrichtlinie", navTerms: "Nutzungsbedingungen & Haftungsausschluss", themeTitle: "Design wechseln",
            searchPlaceholder: "81 Provincias durchsuchen (z.B. Izmir, 34)...",
            disclaimerBanner: "⚠️ Hinweis: Alle Erzeugungs-, Ladezeit- und Einsparungswerte auf dieser Plattform sind unverbindliche Näherungswerte auf Basis meteorologischer Modelle; sie stellen keine garantierten Messdaten oder Anlageberatung dar.",
            disclaimerLink: "Haftungsausschluss & Bedingungen →",
            heroBadge: "🌿 Bildungssimulator für Erneuerbare Energien in 81 Provincias",
            heroTitle: "Schätzen Sie das Grüne Energiepotenzial Ihrer Stadt",
            heroDesc: "Simulieren Sie näherungsweise die tägliche Windkraft- und Photovoltaik-Erzeugung, geschätzte E-Auto-Ladezeiten und CO₂-Einsparungen anhand meteorologischer Prognosemodelle und physikalischer Gleichungen.",
            startBtn: "Simulator Öffnen", popularCities: "Schnellauswahl:",
            feat1Title: "Realistische Physikmodellierung", feat1Desc: "Berücksichtigt Rotorfläche, Betz-Grenze (59,3 %), Modulneigung/Ausrichtung sowie temperaturbedingte Zellverluste.",
            feat2Title: "Meteorologische Prognosemodelle", feat2Desc: "Verarbeitet zwischengespeicherte Globalstrahlung (GHI) und 10m/80m-Winddaten für alle 81 Provincias.",
            feat3Title: "Geschätzte E-Auto- & CO₂-Wirkung", feat3Desc: "Zeigt ungefähre Batterieladezeiten für Elektrofahrzeuge und die geschätzte CO₂-Minderung zu Bildungszwecken.",
            card1Title: "Ungefähre E-Auto-Ladesimulation", card1Desc: "Vergleichen Sie geschätzte Ladezeiten für Togg T10F, Tesla Model Y und Renault ZOE anhand der Tagesproduktion.",
            card2Title: "Photovoltaik (PV) Schätzmodell", card2Desc: "Lehrreiche PV-Ertragsprognose unter Berücksichtigung von Dachausrichtung, Neigungswinkel und Sommertemperaturverlusten.",
            card3Title: "Bewusstsein für Nachhaltige Energie", card3Desc: "Untersuchen Sie das saisonale Wind- und Solarpotenzial verschiedener Provinzen mit interaktiven Diagrammen.",
            hub10: "10m Wind", hub80: "80m Nabenhöhe", resetBtn: "Zurücksetzen",
            presetsTitle: "Systemprofile (Ungefähre Größenordnung)",
            presetRes: "🏠 Wohngebäude", presetResSub: "3m Rotor • 18 m² PV (~3,7 kWp)",
            presetCom: "🏢 Gewerbeanlage", presetComSub: "12,5m Rotor • 300 m² PV (~61 kWp)",
            presetInd: "🏭 Industriepark", presetIndSub: "25m Rotor • 1000 m² PV (~215 kWp)",
            presetOff: "🚐 Autark / Ferienhaus", presetOffSub: "1,5m Rotor • 8 m² PV (~1,6 kWp)",
            lblRadius: "Rotorradius (r)", lblWindEff: "Turbinenwirkungsgrad (η)", lblPanelArea: "Modulfläche (A)", lblSolarEff: "Modulwirkungsgrad (η)",
            monoNote: "Monokristallin ~21%",
            lblTilt: "Modulausrichtung & Neigungsfaktor",
            tiltOpt1: "Südausrichtung — Optimale Neigung (~30°) [100%]",
            tiltOpt2: "Südost- / Südwestausrichtung [94%]",
            tiltOpt3: "Flachdach / Geringe Neigung (~10°) [89%]",
            tiltOpt4: "Ost- / Westausrichtung [84%]",
            lblTariff: "Stromtarif (TRY/kWh)", lblCompare: "Provinz vergleichen (Schätzung)",
            betzWarn: "Warnung: Der gewählte Wirkungsgrad überschreitet das theoretische Betz-Limit (59,3 %)! Für realistische Schätzungen werden 35 %–48 % empfohlen.",
            resTitle: "Ungefähre Erzeugungsprognose", estBadge: "~Unverbindliche Simulationsdaten",
            windDaily: "Geschätzte Windenergie", solarDaily: "Geschätzte Solarenergie",
            instantPower: "Geschätzte Leistung", cloudAdj: "Bewölkungs-/Temperaturkorrigiert", totalDaily: "GESCHÄTZTE TAGESPRODUKTION (CA.)",
            evTitle: "🔋 Geschätzte E-Auto-Ladezeit & Umweltwirkung",
            eqRange: "Geschätzte Tagesreichweite", eqRangeSub: "Standard: 15 kWh / 100 km",
            co2Saved: "Geschätzte CO₂-Einsparung", co2Sub: "Ca. 0,43 kg CO₂ / kWh",
            econSaved: "Geschätzter Monatsgegenwert", econSub: "Näherungswert — Keine Anlageberatung",
            annualEst: "Geschätzter Jahresertrag", annualSub: "Saisonale Näherungsprojektion",
            evModel1: "Togg T10F (Standard)", evModel2: "Tesla Model Y (LR)", evModel3: "Renault ZOE", evModel4: "Elektromotorrad",
            chartBarTitle: "📊 Meteorologische Schätzwerte & Erzeugungsverteilung",
            chartHourlyTitle: "⏱️ Geschätzte 24-Stunden-Solar- & Windkurve (kW)",
            chartMonthlyTitle: "📅 12-Monats-Saisonprognose (kWh/Tag) & Provinzvergleich",
            barWindSpeed: "Wind (km/h)", barWindKwh: "~Wind (kWh)", barSolarKwh: "~Solar (kWh)",
            months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
            weatherSummary: "Meteorologische Übersicht (Schätzung)", temp: "Geschätzte Temperatur", humidity: "Relative Luftfeuchte", windSpeed: "Geschätzter Wind",
            cloudCover: "Bewölkungsgrad", ghiLabel: "Geschätzte Globalstrahlung (GHI)", tempLossLabel: "Temperatur-Zellverlust",
            unitHour: "Std.", unitMin: "Min.", unitDay: "Tage", unitTrees: "Bäume/J.", unitHomes: "Haushalte", unitYr: "MWh/Jahr", unitMo: "TRY/Mon.",
            formulaTitle: "🧠 Wie werden die Energiewerte geschätzt?",
            windFormulaHead: "🌬️ Geschätzte Windleistung: P ≈ 0.5 × ρ × A × v³ × η",
            windFormulaBody: "• <b>ρ (1,225 kg/m³):</b> Annahme der Standardluftdichte auf Meereshöhe.<br>• <b>A (π × r²):</b> Vom Rotor überstrichene Kreisfläche.<br>• <b>v³:</b> Dritte Potenz der geschätzten Windgeschwindigkeit (ohne lokale Turbulenzen und Hindernisse).<br>• <b>η (Betz ≤ 59,3 %):</b> Theoretischer aerodynamischer und mechanischer Wirkungsgrad.",
            solarFormulaHead: "☀️ Geschätzter Solarertrag: E ≈ GHI × A × η_pv × f_verlust × f_neigung",
            solarFormulaBody: "• <b>GHI (kWh/m²/Tag):</b> Geschätzte tägliche Globalstrahlung für die gewählte Provinz.<br>• <b>A & η_pv:</b> Gesamte Modulfläche und gewählter Zellwirkungsgrad.<br>• <b>f_verlust & Temperatur:</b> 15 % Wechselrichter-/Kabelverluste sowie Temperaturminderung über 25 °C.<br>• <b>Wichtiger Hinweis:</b> Alle Werte sind ungefähre Bildungssimulationen und keine exakten Messungen.",
            aboutTitle: "📖 Über uns & Simulationsmethodik",
            aboutP1: "<b>YeşilEnerjin</b> ist ein frei zugängliches, <b>bildungs- und aufklärungsorientiertes</b> Web-Simulationsprojekt, das die physikalischen Grundlagen und das ungefähre Erzeugungspotenzial von Windkraftanlagen und Photovoltaikmodulen in allen 81 Provincias der Türkei veranschaulicht.",
            aboutH1: "1. Warum eine Näherungssimulation?",
            aboutP2: "Die tatsächliche Stromerzeugung hängt vor Ort von zahlreichen Faktoren wie Mikrotopografie, Verschattung durch Gebäude oder Bäume, Turbulenzen, Verschmutzung, Schneelast, Kabelverlusten und Wechselrichterkurven ab. Daher kann keine Web-App eine 100 % exakte Ertragsgarantie geben. YeşilEnerjin liefert mithilfe anerkannter physikalischer Grundgleichungen eine <b>realitätsnahe, lehrreiche Schätzung</b>.",
            aboutH2: "2. Verwendete mathematische Modelle",
            aboutLi1: "<b>Windkraftmodell:</b> Basiert auf der kinetischen Energieflussgleichung (<code>P = 0.5 × ρ × A × v³ × η</code>) und dem Betz-Limit (<code>59,3 %</code>) unter Berücksichtigung des Höhenprofils zwischen 10 m und 80 m Nabenhöhe.",
            aboutLi2: "<b>Photovoltaikmodell:</b> Berechnet den geschätzten Tagesertrag aus Globalstrahlung (GHI), Modulfläche, Zellwirkungsgrad, Ausrichtungs-/Neigungsfaktor, Temperaturkoeffizient über 25 °C (<code>-0,4 %/°C</code>) und <code>15 %</code> Systemverlusten.",
            faqTitle: "❓ Häufig gestellte Fragen (FAQ)",
            faqQ1: "1. Sind die angezeigten Erzeugungs- und Einsparungswerte verbindlich?",
            faqA1: "Nein. Alle kWh-Erträge, E-Auto-Ladezeiten, CO₂-Einsparungen und Rechnungsgegenwerte sind <b>unverbindliche Simulationsschätzungen</b>. Sie ersetzen keine kommerzielle Machbarkeitsstudie, Anlageberatung oder Ingenieurplanung.",
            faqQ2: "2. Woher stammen die Wetterdaten?",
            faqA2: "Das System nutzt offene meteorologische Prognosemodelle (Open-Meteo Kurzwellenstrahlung und Windprognosen sowie Backup-Wetterdienste) für die Provinzkoordinaten oder greift bei Nichterreichbarkeit auf langjährige saisonale Klimamittelwerte zurück.",
            faqQ3: "3. Warum ist die Betz-Grenze (59,3 %) wichtig?",
            faqA3: "Wie der Physiker Albert Betz bewies, kann eine frei durchströmte Windturbine theoretisch maximal 59,3 % (16/27) der kinetischen Windenergie aufnehmen. Moderne Anlagen erreichen in der Praxis meist 35 % bis 48 %.",
            faqQ4: "4. Warum sinkt der Solarmodul-Wirkungsgrad bei Hitze?",
            faqA4: "Solarmodule werden bei 25 °C Zelltemperatur spezifiziert. Bei starker Erwärmung im Sommer sinkt die Halbleiterspannung, was den Ertrag um ca. 0,4 % pro Grad über 25 °C reduziert.",
            contactTitle: "📬 Kontakt",
            contactP1: "Für Fragen zur Methodik, Bildungskooperationen, Fehlermeldungen oder Feedback erreichen Sie uns per E-Mail:",
            contactEmailLbl: "E-Mail:",
            contactNote: "Hinweis: Diese Plattform bietet keine kommerzielle Anlageninstallation oder Investitionsberatung an.",
            privacyTitle: "🔒 Datenschutz- und Cookie-Richtlinie",
            privacyIntro: "Bei YeşilEnerjin legen wir größten Wert auf den Schutz Ihrer Daten gemäß DSGVO und KVKK.",
            privacyH1: "1. Verarbeitete Daten",
            privacyLi1: "<b>Keine Erhebung personenbezogener Identitätsdaten:</b> Für die Nutzung sind weder Registrierung noch Name, Telefonnummer oder GPS-Standortfreigabe erforderlich.",
            privacyLi2: "<b>Lokaler Browserspeicher (LocalStorage):</b> Ihre Sprach-, Design- und Schieberegler-Einstellungen werden ausschließlich lokal in Ihrem Browser gespeichert und niemals an Dritte weitergegeben.",
            privacyLi3: "<b>Missbrauchs- und Bot-Schutz:</b> Zum Schutz vor automatisiertem Scraping werden IP-Adressen ausschließlich als nicht umkehrbare SHA-256-Hashes für temporäre Ratenbegrenzungszähler (Rate-Limiting) verarbeitet.",
            privacyH2: "2. Drittanbieter-Dienste",
            privacyP2: "Wetterprognosen werden serverseitig zwischengespeichert abgerufen; es findet keine Datenübertragung an Werbe- oder Tracking-Netzwerke statt.",
            privacyH3: "3. Kontakt",
            privacyP3: "Bei Fragen zum Datenschutz kontaktieren Sie uns bitte per E-Mail:",
            termsTitle: "📄 Nutzungsbedingungen & Rechtlicher Haftungsausschluss",
            termsIntro: "Durch den Zugriff auf diese Website und die Nutzung des Simulators erklären Sie sich ausdrücklich mit den folgenden Bedingungen und dem Haftungsausschluss einverstanden:",
            termsH1: "1. Nutzung nur zu Bildungs- und Simulationszwecken (Keine exakten Daten)",
            termsP1: "Alle auf <b>YeşilEnerjin</b> dargestellten Stromerzeugungswerte (kWh/MWh), Wind- und Strahlungsdaten (GHI), E-Auto-Ladezeiten, CO₂-Prognosen und finanziellen Gegenwerte sind <b>rein theoretische Näherungsschätzungen</b> und stellen keine garantierten Messwerte dar.",
            termsH2: "2. Keine Investitions- oder Ingenieurberatung",
            termsP2: "Keine Angabe auf dieser Website stellt eine kommerzielle Anlageberatung, Finanzstudie oder zertifizierte Fachplanung dar. Vor einer Investition sind stets Messungen vor Ort durch zugelassene Ingenieurbüros erforderlich.",
            termsH3: "3. Haftungsbeschränkung (Haftungsausschluss)",
            termsP3: "Diese Plattform wird 'WIE BESEHEN' (AS-IS) ohne jegliche Gewährleistung bereitgestellt. Die Entwickler <b>übernehmen keinerlei rechtliche oder finanzielle Haftung für direkte oder indirekte Schäden, finanzielle Verluste oder Folgeschäden</b>, die aus der Nutzung der Simulationswerte entstehen.",
            termsH4: "4. Sicherheit & Zulässige Nutzung",
            termsP4: "Automatisiertes Auslesen (Scraping) der API-Endpunkte, das Umgehen von Ratenbegrenzungen oder Störungen des Betriebs sind untersagt.",
            footerDesc: "Bildungssimulator für erneuerbare Energien. Alle Ergebnisse sind unverbindliche Schätzungen und keine Anlageberatung.",
            footerLegalTitle: "Rechtliches & Info",
            footerCopy: "YeşilEnerjin — Bildungssimulationsplattform"
        },
        es: {
            navHome: "Inicio", navCalc: "Simulador", navAbout: "Acerca de", navFaq: "Preguntas", navContact: "Contacto",
            navPrivacy: "Política de Privacidad", navTerms: "Términos de Uso y Aviso Legal", themeTitle: "Cambiar Tema",
            searchPlaceholder: "Buscar en 81 provincias (ej. Izmir, 34)...",
            disclaimerBanner: "⚠️ Aviso: Todos los valores de generación, carga de vehículos y ahorro en esta plataforma son estimaciones aproximadas basadas en modelos meteorológicos; no son mediciones garantizadas ni asesoramiento de inversión.",
            disclaimerLink: "Aviso Legal y Términos →",
            heroBadge: "🌿 Simulador Educativo de Energía Renovable para 81 Provincias",
            heroTitle: "Estima el Potencial de Energía Verde de tu Ciudad",
            heroDesc: "Simula de forma aproximada la producción diaria de turbinas eólicas y paneles solares (PV), el tiempo estimado de carga de vehículos eléctricos y la reducción de CO₂ mediante modelos meteorológicos y ecuaciones físicas.",
            startBtn: "Abrir Simulador", popularCities: "Selección Rápida:",
            feat1Title: "Modelado Físico Realista", feat1Desc: "Considera el área de barrido del rotor, el límite de Betz (59,3%), el factor de inclinación/orientación y las pérdidas térmicas celulares.",
            feat2Title: "Modelos de Pronóstico Meteorológico", feat2Desc: "Procesa la irradiación solar (GHI) y el viento a 10m/80m en caché para las 81 provincias de Turquía.",
            feat3Title: "Impacto Estimado en EV y Carbono", feat3Desc: "Muestra tiempos aproximados de carga de baterías eléctricas y reducción estimada de CO₂ con fines educativos.",
            card1Title: "Simulación Aproximada de Carga EV", card1Desc: "Compara tiempos estimados de carga para Togg T10F, Tesla Model Y y Renault ZOE según la producción diaria.",
            card2Title: "Modelo de Estimación Solar Fotovoltaica (PV)", card2Desc: "Estimación educativa de generación fotovoltaica considerando orientación del techo, ángulo de inclinación y temperatura.",
            card3Title: "Conciencia sobre Energía Sostenible", card3Desc: "Explora el potencial estacional eólico y solar de diferentes provincias mediante gráficos interactivos.",
            hub10: "Viento 10m", hub80: "Torre 80m (Turbina)", resetBtn: "Restablecer",
            presetsTitle: "Perfiles del Sistema (Escala Aproximada)",
            presetRes: "🏠 Residencial", presetResSub: "Rotor 3m • 18 m² PV (~3,7 kWp)",
            presetCom: "🏢 Comercial", presetComSub: "Rotor 12,5m • 300 m² PV (~61 kWp)",
            presetInd: "🏭 Planta Industrial", presetIndSub: "Rotor 25m • 1000 m² PV (~215 kWp)",
            presetOff: "🚐 Aislado / Cabaña", presetOffSub: "Rotor 1,5m • 8 m² PV (~1,6 kWp)",
            lblRadius: "Radio del Rotor (r)", lblWindEff: "Eficiencia de Turbina (η)", lblPanelArea: "Área de Paneles (A)", lblSolarEff: "Eficiencia de Panel (η)",
            monoNote: "Monocristalino ~21%",
            lblTilt: "Orientación y Factor de Inclinación",
            tiltOpt1: "Orientación Sur — Inclinación Óptima (~30°) [100%]",
            tiltOpt2: "Orientación Sureste / Suroeste [94%]",
            tiltOpt3: "Techo Plano / Baja Inclinación (~10°) [89%]",
            tiltOpt4: "Orientación Este / Oeste [84%]",
            lblTariff: "Tarifa Eléctrica (TRY/kWh)", lblCompare: "Comparar Provincia (Estimado)",
            betzWarn: "¡Advertencia: La eficiencia seleccionada supera el límite teórico de Betz (59,3%)! Se recomienda entre 35% y 48%.",
            resTitle: "Estimación Aproximada de Generación", estBadge: "~Datos de Simulación Aproximados",
            windDaily: "Generación Eólica Estimada", solarDaily: "Generación Solar Estimada",
            instantPower: "Potencia Est.", cloudAdj: "Ajustado por Nubes/Temp.", totalDaily: "PRODUCCIÓN DIARIA TOTAL ESTIMADA (APROX.)",
            evTitle: "🔋 Tiempo Estimado de Carga EV e Impacto Ambiental",
            eqRange: "Autonomía Diaria Estimada", eqRangeSub: "Por defecto: 15 kWh / 100 km",
            co2Saved: "Ahorro Estimado de CO₂", co2Sub: "Aprox. 0,43 kg CO₂ / kWh",
            econSaved: "Equivalente Mensual Estimado", econSub: "Valor Aproximado — No es Asesoramiento de Inversión",
            annualEst: "Generación Anual Estimada", annualSub: "Proyección Estacional Aproximada",
            evModel1: "Togg T10F (Estándar)", evModel2: "Tesla Model Y (LR)", evModel3: "Renault ZOE", evModel4: "Motocicleta Eléctrica",
            chartBarTitle: "📊 Estimaciones Meteorológicas y Distribución",
            chartHourlyTitle: "⏱️ Curva Horaria Estimada de 24 Horas (kW)",
            chartMonthlyTitle: "📅 Proyección Estacional de 12 Meses (kWh/día) y Comparación",
            barWindSpeed: "Viento (km/h)", barWindKwh: "~Eólica (kWh)", barSolarKwh: "~Solar (kWh)",
            months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            weatherSummary: "Resumen Meteorológico Estimado", temp: "Temperatura Est.", humidity: "Humedad Relativa", windSpeed: "Velocidad del Viento Est.",
            cloudCover: "Nubosidad", ghiLabel: "Irradiación Diaria Est. (GHI)", tempLossLabel: "Efecto Térmico Celular",
            unitHour: "h", unitMin: "min", unitDay: "días", unitTrees: "árboles/año", unitHomes: "hogares", unitYr: "MWh/año", unitMo: "TRY/mes",
            formulaTitle: "🧠 ¿Cómo se Calculan las Estimaciones de Energía?",
            windFormulaHead: "🌬️ Potencia Eólica Estimada: P ≈ 0.5 × ρ × A × v³ × η",
            windFormulaBody: "• <b>ρ (1,225 kg/m³):</b> Suposición de densidad del aire estándar al nivel del mar.<br>• <b>A (π × r²):</b> Área circular barrida por las palas del rotor.<br>• <b>v³:</b> Cubo de la velocidad estimada del viento (excluye turbulencias y obstáculos locales).<br>• <b>η (Betz ≤ 59,3%):</b> Eficiencia teórica de conversión aerodinámica y mecánica.",
            solarFormulaHead: "☀️ Producción Solar Estimada: E ≈ GHI × A × η_pv × f_pérdida × f_inclinación",
            solarFormulaBody: "• <b>GHI (kWh/m²/día):</b> Irradiación solar diaria estimada para la provincia.<br>• <b>A y η_pv:</b> Área total de paneles fotovoltaicos y eficiencia celular seleccionada.<br>• <b>f_pérdida y Temperatura:</b> 15% de pérdida en inversor/cableado más reducción térmica sobre 25°C.<br>• <b>Nota Importante:</b> Todos los resultados son simulaciones educativas aproximadas, no mediciones exactas.",
            aboutTitle: "📖 Acerca de y Metodología de Simulación",
            aboutP1: "<b>YeşilEnerjin</b> es un proyecto web de simulación <b>educativo y de concienciación</b> diseñado para mostrar de forma clara los principios físicos y el potencial aproximado de generación de turbinas eólicas y paneles solares fotovoltaicos en las 81 provincias de Turquía.",
            aboutH1: "1. ¿Por qué es una Simulación Aproximada?",
            aboutP2: "La electricidad real generada en campo depende de decenas de variables como la microtopografía, sombras de edificios o árboles, turbulencia atmosférica, polvo, nieve, pérdidas en cables y curvas de inversores. Por ello, ningún programa web puede garantizar resultados exactos al 100%. YeşilEnerjin ofrece una <b>proyección educativa aproximada</b> basada en ecuaciones físicas estándar.",
            aboutH2: "2. Modelos Matemáticos Utilizados",
            aboutLi1: "<b>Modelo de Turbina Eólica:</b> Basado en la ecuación de flujo de energía cinética (<code>P = 0.5 × ρ × A × v³ × η</code>) y el límite de Betz (<code>59,3%</code>), aplicando un factor de cizalladura del viento entre 10m y 80m de altura de torre.",
            aboutLi2: "<b>Modelo Solar Fotovoltaico (PV):</b> Calcula la producción diaria aproximada mediante la irradiación horizontal global (GHI), área de paneles, eficiencia celular, factor de inclinación, pérdida térmica sobre 25°C (<code>-0,4%/°C</code>) y <code>15%</code> de pérdidas del sistema.",
            faqTitle: "❓ Preguntas Frecuentes (FAQ)",
            faqQ1: "1. ¿Son exactos los valores de producción y ahorro mostrados?",
            faqA1: "No. Todos los valores de kWh, tiempos de carga de vehículos eléctricos, ahorro de CO₂ y equivalentes de factura son <b>estimaciones aproximadas de simulación</b>. No pueden utilizarse como informe comercial ni proyecto oficial de ingeniería.",
            faqQ2: "2. ¿De dónde provienen los datos meteorológicos?",
            faqA2: "El sistema consulta modelos meteorológicos abiertos (radiación solar de onda corta y viento de Open-Meteo junto con servicios de respaldo) para las coordenadas provinciales, utilizando promedios climáticos estacionales si los servicios externos no están disponibles.",
            faqQ3: "3. ¿Por qué es importante el límite de Betz (59,3%)?",
            faqA3: "Como demostró el físico Albert Betz, una turbina eólica de flujo abierto puede capturar como máximo el 59,3% (16/27) de la energía cinética del viento. Las turbinas modernas operan en la práctica entre el 35% y el 48%.",
            faqQ4: "4. ¿Por qué disminuye la eficiencia del panel solar con el calor?",
            faqA4: "Los paneles solares se prueban a una temperatura celular de 25°C. Cuando se calientan en verano, el voltaje del semiconductor disminuye, reduciendo el rendimiento aproximadamente un 0,4% por cada 1°C por encima de 25°C.",
            contactTitle: "📬 Contacto",
            contactP1: "Para consultas sobre la metodología, colaboraciones educativas, reportes de errores o sugerencias, puede contactarnos por correo electrónico:",
            contactEmailLbl: "Correo electrónico:",
            contactNote: "Nota: Esta plataforma no ofrece servicios comerciales de instalación ni asesoramiento de inversión.",
            privacyTitle: "🔒 Política de Privacidad y Cookies (Protección de Datos)",
            privacyIntro: "En YeşilEnerjin respetamos la privacidad de los visitantes y cumplimos con los principios de protección de datos (RGPD y KVKK).",
            privacyH1: "1. Datos Procesados",
            privacyLi1: "<b>Sin Recopilación de Identidad Personal:</b> No solicitamos registro, nombres, teléfonos ni permisos de ubicación GPS.",
            privacyLi2: "<b>Almacenamiento Local (LocalStorage):</b> Sus preferencias de idioma, tema y controles deslizantes se guardan únicamente en la memoria de su propio navegador y nunca se comparten con terceros.",
            privacyLi3: "<b>Protección contra Abuso y Bots:</b> Para evitar el scraping automatizado, las direcciones IP se procesan como hashes criptográficos irreversibles (SHA-256) solo para contadores temporales de límite de peticiones.",
            privacyH2: "2. Servicios de Terceros",
            privacyP2: "Los pronósticos meteorológicos provinciales se almacenan en caché en el servidor; no se envían datos de visitantes a redes publicitarias o de rastreo.",
            privacyH3: "3. Contacto",
            privacyP3: "Para cualquier consulta sobre nuestra política de privacidad, escríbanos a:",
            termsTitle: "📄 Términos de Uso y Aviso Legal (Descargo de Responsabilidad)",
            termsIntro: "Al acceder a este sitio web y utilizar el simulador, usted acepta expresamente los siguientes términos de uso y descargo de responsabilidad:",
            termsH1: "1. Uso Exclusivamente Educativo y de Simulación (No son Datos Exactos)",
            termsP1: "Todos los valores de generación eléctrica (kWh/MWh), datos de viento e irradiación (GHI), tiempos de carga EV, ahorro de carbono y estimaciones económicas en <b>YeşilEnerjin</b> son <b>simulaciones aproximadas basadas en fórmulas teóricas</b> y no representan mediciones garantizadas.",
            termsH2: "2. No Constituye Asesoramiento de Inversión ni de Ingeniería",
            termsP2: "Ninguna información en este sitio sustituye un estudio de viabilidad financiera ni un proyecto de ingeniería certificado. Antes de realizar cualquier inversión, consulte a empresas de ingeniería autorizadas para realizar mediciones en el sitio.",
            termsH3: "3. Limitación de Responsabilidad",
            termsP3: "Esta plataforma se proporciona 'TAL CUAL' (AS-IS) sin garantías de ningún tipo. Los desarrolladores <b>no asumen ninguna responsabilidad legal o financiera por daños directos o indirectos, pérdidas económicas o daños materiales</b> derivados del uso de las estimaciones.",
            termsH4: "4. Seguridad y Uso Aceptable",
            termsP4: "Queda prohibido el rastreo automatizado (scraping) de la API, intentar eludir los límites de velocidad o interferir con el funcionamiento del servicio.",
            footerDesc: "Simulador educativo de estimación de energía renovable. Todos los resultados son aproximados y no constituyen asesoramiento de inversión.",
            footerLegalTitle: "Legal e Información",
            footerCopy: "YeşilEnerjin — Plataforma de Simulación Educativa"
        },
        ru: {
            navHome: "Главная", navCalc: "Симулятор", navAbout: "О проекте", navFaq: "Вопросы (FAQ)", navContact: "Контакты",
            navPrivacy: "Политика конфиденциальности", navTerms: "Условия и отказ от ответственности", themeTitle: "Сменить тему",
            searchPlaceholder: "Поиск по 81 провинции (напр. Izmir, 34)...",
            disclaimerBanner: "⚠️ Уведомление: Все показатели выработки, времени зарядки и экономии на платформе являются ориентировочными расчетами на основе метеомоделей и не являются точными замерами или инвест-рекомендацией.",
            disclaimerLink: "Правовое уведомление →",
            heroBadge: "🌿 Образовательный симулятор возобновляемой энергии для 81 провинции",
            heroTitle: "Оцените потенциал зеленой энергии вашего города",
            heroDesc: "Рассчитайте ориентировочную суточную выработку ветрогенераторов и солнечных панелей (PV), примерное время зарядки электромобилей и снижение выбросов CO₂ с помощью метеорологических моделей и физических формул.",
            startBtn: "Открыть симулятор", popularCities: "Быстрый выбор:",
            feat1Title: "Реалистичное физическое моделирование", feat1Desc: "Учитывает площадь ометания ротора, предел Бетца (59,3%), угол наклона/ориентацию панелей и температурные потери ячеек.",
            feat2Title: "Метеорологические модели прогноза", feat2Desc: "Обрабатывает кэшированные данные солнечной радиации (GHI) и скорости ветра на высоте 10м/80м для всех 81 провинций.",
            feat3Title: "Оценка зарядки EV и экологии", feat3Desc: "Показывает примерное время зарядки аккумуляторов электромобилей и расчетное снижение CO₂ в образовательных целях.",
            card1Title: "Ориентировочный расчет зарядки EV", card1Desc: "Сравните примерное время зарядки Togg T10F, Tesla Model Y и Renault ZOE на основе суточной выработки.",
            card2Title: "Модель оценки солнечных панелей (PV)", card2Desc: "Образовательный расчет генерации PV с учетом ориентации крыши, угла наклона и нагрева панелей летом.",
            card3Title: "Популяризация зеленой энергетики", card3Desc: "Изучайте сезонный ветровой и солнечный потенциал различных регионов с помощью интерактивных графиков.",
            hub10: "Ветер 10м", hub80: "Мачта 80м (Турбина)", resetBtn: "Сбросить",
            presetsTitle: "Готовые профили системы (Ориентировочный масштаб)",
            presetRes: "🏠 Домашний (Бытовой)", presetResSub: "Ротор 3м • 18 м² PV (~3,7 кВт·п)",
            presetCom: "🏢 Коммерческий объект", presetComSub: "Ротор 12,5м • 300 м² PV (~61 кВт·п)",
            presetInd: "🏭 Промышленная площадка", presetIndSub: "Ротор 25м • 1000 м² PV (~215 кВт·п)",
            presetOff: "🚐 Автономный дом / Кемпер", presetOffSub: "Ротор 1,5м • 8 м² PV (~1,6 кВт·п)",
            lblRadius: "Радиус ротора (r)", lblWindEff: "КПД турбины (η)", lblPanelArea: "Площадь панелей (A)", lblSolarEff: "КПД панелей (η)",
            monoNote: "Монокристалл ~21%",
            lblTilt: "Ориентация и угол наклона панелей",
            tiltOpt1: "Южная сторона — Оптимальный наклон (~30°) [100%]",
            tiltOpt2: "Юго-восток / Юго-запад [94%]",
            tiltOpt3: "Плоская крыша / Малый наклон (~10°) [89%]",
            tiltOpt4: "Восток / Запад [84%]",
            lblTariff: "Тариф на электроэнергию (TRY/кВт·ч)", lblCompare: "Сравнить провинцию (Прогноз)",
            betzWarn: "Внимание: Выбранный КПД превышает теоретический предел Бетца (59,3%)! Для реалистичной оценки рекомендуется 35%–48%.",
            resTitle: "Ориентировочный прогноз выработки", estBadge: "~Расчетные данные симуляции",
            windDaily: "Прогноз ветровой выработки", solarDaily: "Прогноз солнечной выработки",
            instantPower: "Расчетная мощность", cloudAdj: "С учетом облаков/темп.", totalDaily: "ОРИЕНТИРОВОЧНАЯ СУТОЧНАЯ ВЫРАБОТКА (ПРИМЕРНО)",
            evTitle: "🔋 Примерное время зарядки электромобилей и эко-эффект",
            eqRange: "Расчетный запас хода в день", eqRangeSub: "По умолчанию: 15 кВт·ч / 100 км",
            co2Saved: "Примерное снижение CO₂", co2Sub: "Около 0,43 кг CO₂ / кВт·ч",
            econSaved: "Расчетный месячный эквивалент", econSub: "Оценочное значение — Не инвест-совет",
            annualEst: "Прогноз годовой выработки", annualSub: "Сезонная ориентировочная проекция",
            evModel1: "Togg T10F (Стандарт)", evModel2: "Tesla Model Y (LR)", evModel3: "Renault ZOE", evModel4: "Электромотоцикл",
            chartBarTitle: "📊 Метеорологические оценки и структура выработки",
            chartHourlyTitle: "⏱️ 24-часовой расчетный профиль солнца и ветра (кВт)",
            chartMonthlyTitle: "📅 12-месячный сезонный прогноз (кВт·ч/день) и сравнение",
            barWindSpeed: "Ветер (км/ч)", barWindKwh: "~Ветер (кВт·ч)", barSolarKwh: "~Солнце (кВт·ч)",
            months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            weatherSummary: "Сводка метеопрогноза", temp: "Расчетная температура", humidity: "Относительная влажность", windSpeed: "Расчетная скорость ветра",
            cloudCover: "Облачность", ghiLabel: "Суточная радиация (GHI)", tempLossLabel: "Температурные потери PV",
            unitHour: "ч", unitMin: "мин", unitDay: "дн.", unitTrees: "дер./год", unitHomes: "домов", unitYr: "МВт·ч/год", unitMo: "TRY/мес",
            formulaTitle: "🧠 Как рассчитываются ориентировочные показатели?",
            windFormulaHead: "🌬️ Расчетная ветровая мощность: P ≈ 0.5 × ρ × A × v³ × η",
            windFormulaBody: "• <b>ρ (1,225 кг/м³):</b> Стандартная плотность воздуха на уровне моря.<br>• <b>A (π × r²):</b> Площадь круга, ометаемая лопастями ротора.<br>• <b>v³:</b> Куб расчетной скорости ветра (без учета локальной турбулентности и рельефа).<br>• <b>η (Предел Бетца ≤ 59,3%):</b> Теоретический аэродинамический и механический КПД.",
            solarFormulaHead: "☀️ Расчетная солнечная выработка: E ≈ GHI × A × η_pv × f_потерь × f_наклона",
            solarFormulaBody: "• <b>GHI (кВт·ч/м²/день):</b> Оценочная суточная солнечная радиация для координат провинции.<br>• <b>A и η_pv:</b> Общая площадь солнечных панелей и выбранный КПД ячеек.<br>• <b>f_потерь и температура:</b> 15% потерь в инверторе/кабелях плюс температурное снижение КПД выше 25°C.<br>• <b>Важное примечание:</b> Все результаты являются приблизительным образовательным моделированием.",
            aboutTitle: "📖 О проекте и методологии моделирования",
            aboutP1: "<b>YeşilEnerjin</b> — это открытый <b>образовательный и просветительский</b> веб-проект, созданный для наглядной демонстрации физических принципов работы и ориентировочного потенциала выработки ветрогенераторов и солнечных панелей во всех 81 провинциях Турции.",
            aboutH1: "1. Почему расчеты являются ориентировочными?",
            aboutP2: "Фактическая выработка электроэнергии на объекте зависит от десятков локальных факторов: микрорельефа, затенения от зданий и деревьев, турбулентности, запыленности, снежного покрова, потерь в кабелях и кривых КПД инвертора. Поэтому ни один онлайн-калькулятор не может гарантировать 100% точность. YeşilEnerjin дает <b>приблизительную образовательную оценку</b> на основе базовых физических уравнений.",
            aboutH2: "2. Используемые математические модели",
            aboutLi1: "<b>Модель ветротурбины:</b> Основана на уравнении потока кинетической энергии (<code>P = 0.5 × ρ × A × v³ × η</code>) и пределе Бетца (<code>59,3%</code>) с поправкой на высотный профиль ветра между 10 м и 80 м.",
            aboutLi2: "<b>Фотоэлектрическая (PV) модель:</b> Оценивает суточную выработку по глобальной горизонтальной радиации (GHI), площади панелей, КПД ячеек, коэффициенту ориентации/наклона, температурным потерям выше 25°C (<code>-0,4%/°C</code>) и <code>15%</code> системным потерям.",
            faqTitle: "❓ Часто задаваемые вопросы (FAQ)",
            faqQ1: "1. Являются ли показанные значения выработки и экономии точными?",
            faqA1: "Нет. Все значения кВт·ч, времени зарядки электромобилей, снижения CO₂ и экономии являются <b>приблизительными оценками симуляции</b>. Они не могут служить коммерческим ТЭО или официальным инженерным проектом.",
            faqQ2: "2. Откуда берутся погодные данные?",
            faqA2: "Система использует открытые метеорологические модели (коротковолновую солнечную радиацию и прогноз ветра Open-Meteo, а также резервные метеосервисы), а при отсутствии связи — многолетние сезонные климатические нормы региона.",
            faqQ3: "3. Почему важен предел Бетца (59,3%)?",
            faqA3: "Как доказал физик Альберт Бетц, ветротурбина в открытом потоке теоретически может преобразовать не более 59,3% (16/27) кинетической энергии ветра. Современные турбины на практике работают с КПД 35%–48%.",
            faqQ4: "4. Почему в жару падает КПД солнечных панелей?",
            faqA4: "Номинальная мощность панелей измеряется при температуре ячеек 25°C. При сильном нагреве летом напряжение полупроводника падает, снижая выработку примерно на 0,4% на каждый градус выше 25°C.",
            contactTitle: "📬 Контакты",
            contactP1: "По вопросам методологии, образовательного сотрудничества, сообщений об ошибках или предложений вы можете связаться с нами по электронной почте:",
            contactEmailLbl: "Эл. почта:",
            contactNote: "Примечание: Платформа не оказывает коммерческих услуг по монтажу оборудования или инвестиционному консультированию.",
            privacyTitle: "🔒 Политика конфиденциальности и защиты данных",
            privacyIntro: "В YeşilEnerjin мы бережно относимся к конфиденциальности посетителей и соблюдаем принципы защиты данных (KVKK и GDPR).",
            privacyH1: "1. Обрабатываемые данные",
            privacyLi1: "<b>Отсутствие сбора личных данных:</b> Для работы с сайтом не требуется регистрация, имя, телефон или доступ к GPS-геолокации.",
            privacyLi2: "<b>Локальное хранилище браузера (LocalStorage):</b> Выбранный язык, тема оформления и положения ползунков сохраняются исключительно в памяти вашего браузера и никому не передаются.",
            privacyLi3: "<b>Защита от ботов и перегрузки:</b> Для предотвращения автоматического парсинга (scraping) IP-адреса преобразуются в необратимые криптографические хеши (SHA-256) исключительно для временного счетчика ограничения запросов (rate-limiting).",
            privacyH2: "2. Сторонние сервисы",
            privacyP2: "Метеорологические сводки запрашиваются и кэшируются на стороне сервера; данные посетителей не передаются рекламным или трекинговым сетям.",
            privacyH3: "3. Связь с нами",
            privacyP3: "По любым вопросам, связанным с политикой конфиденциальности, пишите нам на:",
            termsTitle: "📄 Условия использования и Правовой отказ от ответственности",
            termsIntro: "Используя данный веб-сайт и симулятор, вы безоговорочно соглашаетесь со следующими условиями и отказом от ответственности:",
            termsH1: "1. Исключительно образовательное назначение (Не точные данные)",
            termsP1: "Все значения выработки электроэнергии (кВт·ч/МВт·ч), скорости ветра и солнечной радиации (GHI), времени зарядки EV, снижения CO₂ и финансовых оценок на <b>YeşilEnerjin</b> являются <b>приблизительными расчетами по теоретическим формулам</b> и не являются гарантированными замерами.",
            termsH2: "2. Не является инвестиционной или инженерной рекомендацией",
            termsP2: "Никакая информация на сайте не заменяет финансовое ТЭО или сертифицированный инженерный проект. Перед инвестированием в солнечную или ветровую энергетику необходимо провести инструментальные замеры на местности с привлечением лицензированных инженеров.",
            termsH3: "3. Ограничение ответственности (Отказ от ответственности)",
            termsP3: "Платформа предоставляется «КАК ЕСТЬ» (AS-IS) без каких-либо гарантий. Разработчики <b>не несут юридической или материальной ответственности за любой прямой или косвенный ущерб, финансовые потери или повреждение оборудования</b>, возникшие вследствие использования результатов симуляции.",
            termsH4: "4. Безопасность и правила использования",
            termsP4: "Автоматический сбор данных (scraping) с API-интерфейсов, попытки обхода ограничений частоты запросов или нарушение работы сервиса строго запрещены.",
            footerDesc: "Образовательный симулятор оценки возобновляемой энергии. Все результаты являются ориентировочными и не являются инвест-рекомендацией.",
            footerLegalTitle: "Правовая информация",
            footerCopy: "YeşilEnerjin — Образовательная платформа моделирования"
        },
        ja: {
            navHome: "ホーム", navCalc: "推定シミュレーター", navAbout: "概要・手法", navFaq: "よくある質問", navContact: "お問い合わせ",
            navPrivacy: "プライバシーポリシー", navTerms: "利用規約・免責事項", themeTitle: "テーマ切替",
            searchPlaceholder: "81県を検索 (例: Izmir, 34)...",
            disclaimerBanner: "⚠️ ご注意：本プラットフォーム上のすべての発電量、充電時間、節約額は気象モデルに基づく概算推定値であり、保証された実測値や投資アドバイスではありません。",
            disclaimerLink: "免責事項と利用規約 →",
            heroBadge: "🌿 トルコ全81県対応・再生可能エネルギー教育用推定シミュレーター",
            heroTitle: "あなたの街のグリーンエネルギー潜在力を推定",
            heroDesc: "気象予測モデルと物理方程式を用いて、風力タービンや太陽光パネル(PV)の1日あたりの概算発電量、EV充電時間、推定CO₂削減量をシミュレーションします。",
            startBtn: "シミュレーターを開く", popularCities: "クイック選択:",
            feat1Title: "リアルな物理モデリング", feat1Desc: "ローター受風面積、ベッツ限界(59.3%)、パネルの向き・傾斜角係数、温度上昇によるセル出力低下を考慮します。",
            feat2Title: "気象予測モデル連携", feat2Desc: "全81県の座標に応じた日射量(GHI)および高度10m/80mの風速予測データをキャッシュ処理します。",
            feat3Title: "EV充電とCO₂削減の概算評価", feat3Desc: "推定日量発電による電気自動車バッテリーの充電時間とCO₂削減目安を教育目的で可視化します。",
            card1Title: "EV充電時間の概算シミュレーション", card1Desc: "Togg T10F、Tesla Model Y、Renault ZOEの推定フル充電時間を日量発電量から比較します。",
            card2Title: "太陽光発電(PV)推定モデル", card2Desc: "屋根の方角、傾斜角度、夏場のパネル温度上昇ロスを反映した教育用発電推定モデルです。",
            card3Title: "持続可能なエネルギーへの理解", card3Desc: "インタラクティブなグラフで各都市の季節ごとの風力・太陽光ポテンシャルを比較できます。",
            hub10: "10m 風速", hub80: "80m タワー高 (タービン)", resetBtn: "初期値に戻す",
            presetsTitle: "システムプリセット (概算スケール)",
            presetRes: "🏠 家庭用 (住宅)", presetResSub: "半径3m • 18 m² PV (~3.7 kWp)",
            presetCom: "🏢 法人・商業施設", presetComSub: "半径12.5m • 300 m² PV (~61 kWp)",
            presetInd: "🏭 産業用メガサイト", presetIndSub: "半径25m • 1000 m² PV (~215 kWp)",
            presetOff: "🚐 オフグリッド・山小屋", presetOffSub: "半径1.5m • 8 m² PV (~1.6 kWp)",
            lblRadius: "ローター半径 (r)", lblWindEff: "タービン効率 (η)", lblPanelArea: "パネル面積 (A)", lblSolarEff: "パネル変換効率 (η)",
            monoNote: "単結晶シリコン ~21%",
            lblTilt: "パネルの方角・傾斜角係数",
            tiltOpt1: "南向き — 最適傾斜角 (~30°) [100%]",
            tiltOpt2: "南東 / 南西向き [94%]",
            tiltOpt3: "陸屋根 / 低傾斜 (~10°) [89%]",
            tiltOpt4: "東 / 西向き [84%]",
            lblTariff: "電力単価目安 (TRY/kWh)", lblCompare: "比較する県 (概算比較)",
            betzWarn: "警告：選択されたタービン効率がベッツの理論上限(59.3%)を超えています！現実的な推定には35%〜48%が推奨されます。",
            resTitle: "概算エネルギー発電予測", estBadge: "~概算シミュレーション値",
            windDaily: "推定風力発電量 (日量)", solarDaily: "推定太陽光発電量 (日量)",
            instantPower: "推定出力", cloudAdj: "雲量・温度補正後", totalDaily: "1日の推定総発電量 (概算)",
            evTitle: "🔋 EV推定充電時間と環境貢献度",
            eqRange: "推定日量走行距離", eqRangeSub: "基準燃費: 15 kWh / 100 km",
            co2Saved: "推定CO₂削減量", co2Sub: "約 0.43 kg CO₂ / kWh",
            econSaved: "月間電気代換算目安", econSub: "概算試算 — 投資助言ではありません",
            annualEst: "年間推定発電量", annualSub: "季節変動を考慮した概算予測",
            evModel1: "Togg T10F (標準)", evModel2: "Tesla Model Y (LR)", evModel3: "Renault ZOE", evModel4: "電動バイク",
            chartBarTitle: "📊 気象推定データと発電内訳",
            chartHourlyTitle: "⏱️ 24時間推定太陽光・風力出力カーブ (kW)",
            chartMonthlyTitle: "📅 12ヶ月季節別発電予測 (kWh/日) と都市比較",
            barWindSpeed: "風速 (km/h)", barWindKwh: "~風力 (kWh)", barSolarKwh: "~太陽光 (kWh)",
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            weatherSummary: "気象推定サマリー", temp: "推定気温", humidity: "相対湿度", windSpeed: "推定風速",
            cloudCover: "雲量", ghiLabel: "推定日射量 (GHI)", tempLossLabel: "温度上昇による出力影響",
            unitHour: "時間", unitMin: "分", unitDay: "日", unitTrees: "本/年", unitHomes: "世帯", unitYr: "MWh/年", unitMo: "TRY/月",
            formulaTitle: "🧠 エネルギー推定値はどのように計算されますか？",
            windFormulaHead: "🌬️ 推定風力出力: P ≈ 0.5 × ρ × A × v³ × η",
            windFormulaBody: "• <b>ρ (1.225 kg/m³):</b> 海面上の標準空気密度の仮定値。<br>• <b>A (π × r²):</b> ローターブレードが掃く円形面積。<br>• <b>v³:</b> 推定風速の3乗（局所的な乱気流や地形障害物は除く）。<br>• <b>η (ベッツ限界 ≤ 59.3%):</b> 理論上の空力・機械変換効率。",
            solarFormulaHead: "☀️ 推定太陽光発電量: E ≈ GHI × A × η_pv × f_loss × f_tilt",
            solarFormulaBody: "• <b>GHI (kWh/m²/日):</b> 県の座標に対する1日の推定全天日射量。<br>• <b>A & η_pv:</b> 太陽光パネルの総面積と選択されたセル変換効率。<br>• <b>f_loss & 温度補正:</b> パワコン・配線損失(15%)および25°C以上のセル温度低下補正。<br>• <b>重要事項:</b> すべての数値は教育目的の概算シミュレーションであり、実測保証値ではありません。",
            aboutTitle: "📖 プロジェクト概要とシミュレーション手法",
            aboutP1: "<b>YeşilEnerjin</b>は、トルコ全81県における風力タービンおよび太陽光パネル(PV)の基本原理と概算発電ポテンシャルを分かりやすく示すために開発された、<b>教育・啓発目的</b>のWebシミュレーションプロジェクトです。",
            aboutH1: "1. なぜ「概算シミュレーション」なのですか？",
            aboutP2: "実際の現場での発電量は、微地形、建物や樹木による日陰、乱気流、砂塵、積雪、ケーブル損失、インバータ効率曲線など多数の要因に左右されます。そのため、Web上の計算ツールが100%正確な発電量を保証することは不可能です。YeşilEnerjinは標準的な物理方程式を用いて<b>教育的かつ現実的な概算予測</b>を提供します。",
            aboutH2: "2. 使用している数理モデル",
            aboutLi1: "<b>風力タービンモデル:</b> 運動エネルギー流束式(<code>P = 0.5 × ρ × A × v³ × η</code>)とベッツ限界(<code>59.3%</code>)に基づき、高度10mと80mタワー高の風速シアー係数を適用します。",
            aboutLi2: "<b>太陽光発電(PV)モデル:</b> 全天日射量(GHI)、パネル面積、セル効率、方角・傾斜係数、25°C超の温度損失(<code>-0.4%/°C</code>)、および<code>15%</code>のシステム損失から日量発電量を概算します。",
            faqTitle: "❓ よくある質問 (FAQ)",
            faqQ1: "1. 表示される発電量や節約額は確定値ですか？",
            faqA1: "いいえ。表示されるkWh発電量、EV充電時間、CO₂削減量、電気代換算額はすべて<b>概算のシミュレーション推定値</b>です。商業的な採算性調査や公式な設計図書としては使用できません。",
            faqQ2: "2. 気象データはどこから取得していますか？",
            faqA2: "各県の座標に対してオープン気象予測モデル(Open-Meteoの短波日射量・風速予測およびバックアップ気象API)を参照し、外部通信ができない場合は季節別の長期気候平均値を使用します。",
            faqQ3: "3. ベッツ限界(59.3%)とは何ですか？",
            faqA3: "物理学者アルベルト・ベッツが証明した通り、開放流中の風力タービンは風の運動エネルギーの最大59.3%(16/27)しか回収できません。実用的な商用タービンは通常35%〜48%で稼働します。",
            faqQ4: "4. 夏場に太陽光パネルの効率が下がるのはなぜですか？",
            faqA4: "太陽光パネルはセル温度25°Cを基準に測定されます。夏場にパネル表面が高温になると半導体の電圧が低下し、25°Cを1°C上回るごとに約0.4%出力が低下します。",
            contactTitle: "📬 お問い合わせ",
            contactP1: "計算手法、教育連携、バグ報告、ご意見などについては、以下のメールアドレスまでご連絡ください：",
            contactEmailLbl: "メール:",
            contactNote: "注：本プラットフォームは商業的な施工サービスや投資コンサルティングは行っておりません。",
            privacyTitle: "🔒 プライバシーおよびCookie（データ保護）ポリシー",
            privacyIntro: "YeşilEnerjinは訪問者のプライバシーを尊重し、データ保護原則(KVKKおよびGDPR)を遵守します。",
            privacyH1: "1. 処理されるデータ",
            privacyLi1: "<b>個人識別情報の非収集:</b> 利用にあたり会員登録、氏名、電話番号、GPS位置情報の許可は一切不要です。",
            privacyLi2: "<b>ブラウザのローカル保存 (LocalStorage):</b> 選択した言語、テーマ、スライダー設定はお使いのブラウザ内にのみ保存され、外部や第三者に送信されることはありません。",
            privacyLi3: "<b>不正アクセス・ボット対策:</b> 自動スクレイピングや過負荷攻撃を防ぐため、クライアントIPアドレスは不可逆な暗号化ハッシュ(SHA-256)に変換され、一時的なレート制限カウンターにのみ使用されます。",
            privacyH2: "2. 第三者サービス",
            privacyP2: "都市別の気象予測データはサーバー側でキャッシュ取得され、訪問者のデータが広告ネットワークや追跡ツールに送信されることはありません。",
            privacyH3: "3. お問い合わせ先",
            privacyP3: "プライバシーポリシーに関するご質問はメールにてお問い合わせください：",
            termsTitle: "📄 利用規約および法的免責事項",
            termsIntro: "本ウェブサイトにアクセスしシミュレーターを利用することで、以下の利用規約および免責事項に同意したものとみなされます：",
            termsH1: "1. 教育およびシミュレーション目的限定（確定データではありません）",
            termsP1: "<b>YeşilEnerjin</b>上で提供されるすべての発電量(kWh/MWh)、風速・日射量(GHI)、EV充電時間、CO₂削減予測、経済換算値は<b>理論式に基づく概算推定値</b>であり、実測値を保証するものではありません。",
            termsH2: "2. 投資・設計助言の否定",
            termsP2: "本サイトのいかなる情報も、商業的な投資助言、財務採算レポート、または公式な電気・建設設計に代わるものではありません。実際の導入前には必ず専門のエンジニアリング会社による現地調査を行ってください。",
            termsH3: "3. 責任の制限（免責事項）",
            termsP3: "本プラットフォームは「現状有姿(AS-IS)」で提供されます。開発者は、シミュレーション結果の利用や気象予測の誤差に起因する<b>いかなる直接的・間接的損害、金銭的損失、機器トラブルに対しても法的・財政的責任を一切負いません</b>。",
            termsH4: "4. セキュリティと禁止事項",
            termsP4: "バックエンドAPIの自動スクレイピング、レート制限の回避、またはサービス運営を妨害する行為は固く禁じられています。",
            footerDesc: "教育用再生可能エネルギー推定シミュレーター。すべての結果は概算値であり、実測データや投資助言ではありません。",
            footerLegalTitle: "法務・案内",
            footerCopy: "YeşilEnerjin — 教育用シミュレーションプラットフォーム"
        }
    };

    const PRESETS = {
        residential: { windRadius: 3.0, windEfficiency: 35.0, panelArea: 18.0, solarEfficiency: 20.5, hubHeight: 10, tiltFactor: 1.0 },
        commercial:  { windRadius: 12.5, windEfficiency: 42.0, panelArea: 300.0, solarEfficiency: 21.0, hubHeight: 80, tiltFactor: 1.0 },
        industrial:  { windRadius: 25.0, windEfficiency: 46.0, panelArea: 1000.0, solarEfficiency: 22.0, hubHeight: 80, tiltFactor: 1.0 },
        offgrid:     { windRadius: 1.5, windEfficiency: 30.0, panelArea: 8.0, solarEfficiency: 20.0, hubHeight: 10, tiltFactor: 0.94 }
    };

    const TR_MAP = {
        "ç": "c", "Ç": "c", "ğ": "g", "Ğ": "g",
        "ı": "i", "I": "i", "İ": "i", "i": "i",
        "ö": "o", "Ö": "o", "ş": "s", "Ş": "s", "ü": "u", "Ü": "u"
    };

    function normTr(s) {
        return String(s || "")
            .trim()
            .replace(/[çÇğĞıIİiöÖşŞüÜ]/g, c => TR_MAP[c] || c)
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    }

    const state = {
        lang: window.__initLang || localStorage.getItem("ye_lang") || "tr",
        theme: document.documentElement.getAttribute("data-theme") || localStorage.getItem("ye_theme") || "dark",
        route: window.__initRoute || "home",
        provinces: DEFAULT_PROVINCES,
        citySlug: normTr(window.__initCity || "ankara") || "ankara",
        compareSlug: "antalya",
        preset: "commercial",
        params: {
            windRadius: Number(localStorage.getItem("ye_windRadius")) || 12.5,
            windEfficiency: Number(localStorage.getItem("ye_windEfficiency")) || 42.0,
            panelArea: Number(localStorage.getItem("ye_panelArea")) || 300.0,
            solarEfficiency: Number(localStorage.getItem("ye_solarEfficiency")) || 21.0,
            hubHeight: Number(localStorage.getItem("ye_hubHeight")) || 80,
            tiltFactor: Number(localStorage.getItem("ye_tiltFactor")) || 1.0,
            tariffTl: Number(localStorage.getItem("ye_tariffTl")) || 2.60
        },
        weatherCache: new Map()
    };

    function t(key) {
        const dict = I18N[state.lang] || I18N.tr;
        return dict[key] !== undefined ? dict[key] : (I18N.tr[key] || key);
    }

    function getProvince(slug) {
        const norm = normTr(slug);
        return state.provinces.find(p => p.slug === norm || p.code === norm) || state.provinces[5];
    }

    function buildEstimatedWeather(prov) {
        const m = new Date().getMonth();
        const factor = SEASONAL_MULTS[m] || 1.0;
        const ghi = +(prov.ghi * factor).toFixed(2);
        const latDiff = 39.0 - prov.lat;
        const tempC = +(18.0 + latDiff * 1.3).toFixed(1);
        const wind10 = +(prov.wind).toFixed(1);
        const wind80 = +(wind10 * 1.34).toFixed(1);
        const cloud = Math.max(12, Math.min(82, Math.round(45 - latDiff * 3)));
        const hum = Math.max(35, Math.min(85, Math.round(58 - latDiff * 2)));

        const hourlySolar = [];
        const hourlyWind = [];
        const peakWm2 = (ghi * 1000) / 5.2;
        for (let h = 0; h < 24; h++) {
            if (h >= 6 && h <= 19) {
                hourlySolar.push(Math.round(Math.max(0, Math.sin(((h - 6) / 13) * Math.PI) * peakWm2)));
            } else {
                hourlySolar.push(0);
            }
            hourlyWind.push(+(wind10 * (1 + 0.16 * Math.sin(((h - 9) / 24) * 2 * Math.PI))).toFixed(1));
        }

        return {
            temp_c: tempC,
            humidity: hum,
            wind_kph: wind10,
            wind_80m_kph: wind80,
            cloud,
            ghi_kwh_m2: ghi,
            hourly_solar: hourlySolar,
            hourly_wind: hourlyWind,
            is_estimation: true
        };
    }

    function calculateEnergy(prov, weather, params) {
        const rho = 1.225;
        const baseLoss = 0.85;
        const r = Math.max(0.5, Number(params.windRadius) || 12.5);
        const wEff = Math.min(99, Math.max(1, Number(params.windEfficiency) || 42)) / 100;
        const pArea = Math.max(1, Number(params.panelArea) || 300);
        const sEff = Math.min(99, Math.max(1, Number(params.solarEfficiency) || 21)) / 100;
        const tilt = Number(params.tiltFactor) || 1.0;
        const tariff = Math.max(0.1, Number(params.tariffTl) || 2.60);

        const activeWindKph = params.hubHeight === 80 ? (weather.wind_80m_kph || weather.wind_kph * 1.34) : weather.wind_kph;
        const vMs = Math.max(0, activeWindKph / 3.6);
        const sweptArea = Math.PI * r * r;

        const windHourlyKw = (0.5 * rho * sweptArea * Math.pow(vMs, 3) * wEff) / 1000;
        const windDailyKwh = windHourlyKw * 24;

        const cellTemp = (weather.temp_c || 20) + 18 * (1 - (weather.cloud || 25) / 150);
        const tempFactor = cellTemp > 25 ? Math.max(0.78, 1 - (cellTemp - 25) * 0.004) : 1.0;
        const tempLossPct = +((1 - tempFactor) * 100).toFixed(1);

        const ghi = Number(weather.ghi_kwh_m2) || prov.ghi || 4.5;
        const solarDailyKwh = ghi * pArea * sEff * baseLoss * tilt * tempFactor;
        const cloudMod = 1 - 0.55 * (Math.min(100, Math.max(0, weather.cloud || 0)) / 100);
        const solarCloudKwh = solarDailyKwh * cloudMod;

        const totalDailyKwh = windDailyKwh + solarDailyKwh;
        const annualEstMwh = +((totalDailyKwh * 365) / 1000).toFixed(1);
        const monthlySavingsTl = Math.round(totalDailyKwh * 30 * tariff);
        const betzOk = wEff < 0.593;

        const hSolarKw = (weather.hourly_solar || []).map(wm2 => +(((wm2 / 1000) * pArea * sEff * baseLoss * tilt * tempFactor)).toFixed(2));
        const hWindKw = (weather.hourly_wind || []).map(kph => {
            const mult = params.hubHeight === 80 ? 1.34 : 1.0;
            const v = (kph * mult) / 3.6;
            return +(((0.5 * rho * sweptArea * Math.pow(v, 3) * wEff) / 1000)).toFixed(2);
        });

        const monthlySeries = SEASONAL_MULTS.map(mult => {
            const mSolar = prov.ghi * mult * pArea * sEff * baseLoss * tilt;
            const mWind = windDailyKwh * (1.12 - (mult - 1.0) * 0.25);
            return Math.round(mSolar + mWind);
        });

        const evDefs = [
            { name: t("evModel1"), cap: 52.4 },
            { name: t("evModel2"), cap: 75.0 },
            { name: t("evModel3"), cap: 52.0 },
            { name: t("evModel4"), cap: 5.0 }
        ];

        const evList = evDefs.map(m => {
            if (totalDailyKwh <= 0.01) return { ...m, text: "-" };
            const hrs = (m.cap / totalDailyKwh) * 24;
            let text;
            if (hrs < 1) text = `~${Math.max(1, Math.round(hrs * 60))} ${t("unitMin")}`;
            else if (hrs <= 24) text = `~${hrs.toFixed(1)} ${t("unitHour")}`;
            else text = `~${(hrs / 24).toFixed(1)} ${t("unitDay")}`;
            return { ...m, text };
        });

        const kmRange = Math.round((totalDailyKwh / 15.0) * 100);
        const co2Kg = +(totalDailyKwh * 0.43).toFixed(1);
        const treesYr = Math.max(1, Math.round((co2Kg * 365) / 21));
        const homesPowered = +(totalDailyKwh / 8.5).toFixed(1);

        return {
            sweptArea: +sweptArea.toFixed(1),
            vMs: +vMs.toFixed(2),
            activeWindKph: +activeWindKph.toFixed(1),
            windHourlyKw: +windHourlyKw.toFixed(2),
            windDailyKwh: +windDailyKwh.toFixed(1),
            solarDailyKwh: +solarDailyKwh.toFixed(1),
            solarCloudKwh: +solarCloudKwh.toFixed(1),
            totalDailyKwh: +totalDailyKwh.toFixed(1),
            annualEstMwh,
            monthlySavingsTl,
            tempLossPct,
            ghi,
            betzOk,
            evList,
            kmRange,
            co2Kg,
            treesYr,
            homesPowered,
            hSolarKw,
            hWindKw,
            monthlySeries
        };
    }

    async function fetchWeatherForCity(slug) {
        const prov = getProvince(slug);
        if (state.weatherCache.has(prov.slug)) {
            return state.weatherCache.get(prov.slug);
        }
        try {
            const cachedSession = sessionStorage.getItem(`ye_v5_${prov.slug}`);
            if (cachedSession) {
                const parsed = JSON.parse(cachedSession);
                if (parsed && Date.now() - parsed._ts < 900000) {
                    state.weatherCache.set(prov.slug, parsed.data);
                    return parsed.data;
                }
            }
        } catch (_) {}

        try {
            const resp = await fetch(`api.php?r=weather&city=${encodeURIComponent(prov.slug)}`, {
                credentials: "same-origin",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-Boot-Key": window.__bootKey || ""
                }
            });
            if (resp.ok) {
                const json = await resp.json();
                if (json && json.ok && json.weather) {
                    state.weatherCache.set(prov.slug, json.weather);
                    try {
                        sessionStorage.setItem(`ye_v5_${prov.slug}`, JSON.stringify({ _ts: Date.now(), data: json.weather }));
                    } catch (_) {}
                    if (state.route === "calc" && state.citySlug === prov.slug) {
                        refreshSimulatorMetrics();
                    }
                    return json.weather;
                }
            }
        } catch (_) {}
        const est = buildEstimatedWeather(prov);
        state.weatherCache.set(prov.slug, est);
        return est;
    }

    function getActiveWeather(slug = state.citySlug) {
        const prov = getProvince(slug);
        return state.weatherCache.get(prov.slug) || buildEstimatedWeather(prov);
    }

    function prepareCanvas(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        const rect = canvas.parentElement.getBoundingClientRect();
        const width = Math.max(260, Math.floor(rect.width || 420));
        const height = Math.max(220, Math.floor(rect.height || 250));
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx, width, height };
    }

    function drawBarChart(weather, calc) {
        const surface = prepareCanvas("chartBar");
        if (!surface) return;
        const { ctx, width, height } = surface;
        const isDark = state.theme === "dark";
        const textColor = isDark ? "#cfe9dc" : "#1e3a2f";
        const gridColor = isDark ? "rgba(16,185,129,0.12)" : "rgba(5,150,105,0.12)";

        ctx.clearRect(0, 0, width, height);

        const items = [
            { label: t("temp") + " (°C)", val: weather.temp_c, color: "#ef4444" },
            { label: t("humidity") + " (%)", val: weather.humidity, color: "#3b82f6" },
            { label: t("barWindSpeed"), val: calc.activeWindKph, color: "#10b981" },
            { label: t("cloudCover") + " (%)", val: weather.cloud, color: "#64748b" },
            { label: t("barWindKwh"), val: Math.min(220, calc.windDailyKwh), raw: calc.windDailyKwh, color: "#059669" },
            { label: t("barSolarKwh"), val: Math.min(220, calc.solarDailyKwh), raw: calc.solarDailyKwh, color: "#f59e0b" }
        ];

        const padL = 38, padR = 14, padT = 26, padB = 42;
        const plotW = width - padL - padR;
        const plotH = height - padT - padB;
        const maxVal = Math.max(100, ...items.map(i => i.val)) * 1.14;

        ctx.strokeStyle = gridColor;
        ctx.fillStyle = textColor;
        ctx.font = "11px system-ui, sans-serif";
        for (let s = 0; s <= 4; s++) {
            const y = padT + plotH - (s / 4) * plotH;
            ctx.beginPath();
            ctx.moveTo(padL, y);
            ctx.lineTo(width - padR, y);
            ctx.stroke();
            ctx.fillText(String(Math.round((maxVal * s) / 4)), 4, y + 4);
        }

        const step = plotW / items.length;
        const barW = Math.min(42, step * 0.56);

        items.forEach((it, idx) => {
            const x = padL + idx * step + (step - barW) / 2;
            const h = Math.max(4, (Math.max(0, it.val) / maxVal) * plotH);
            const y = padT + plotH - h;

            ctx.fillStyle = it.color;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x, y, barW, h, [6, 6, 0, 0]);
            else ctx.rect(x, y, barW, h);
            ctx.fill();

            ctx.fillStyle = textColor;
            ctx.font = "bold 11px system-ui, sans-serif";
            ctx.textAlign = "center";
            const disp = it.raw !== undefined ? it.raw : it.val;
            ctx.fillText("~" + disp, x + barW / 2, y - 6);

            ctx.font = "10.5px system-ui, sans-serif";
            ctx.fillText(it.label.slice(0, 13), x + barW / 2, padT + plotH + 18);
        });
    }

    function drawHourlyCurveChart(calc) {
        const surface = prepareCanvas("chartHourly");
        if (!surface) return;
        const { ctx, width, height } = surface;
        const isDark = state.theme === "dark";
        const textColor = isDark ? "#cfe9dc" : "#1e3a2f";
        const gridColor = isDark ? "rgba(16,185,129,0.12)" : "rgba(5,150,105,0.12)";

        ctx.clearRect(0, 0, width, height);

        const solar = calc.hSolarKw.length === 24 ? calc.hSolarKw : new Array(24).fill(0);
        const wind = calc.hWindKw.length === 24 ? calc.hWindKw : new Array(24).fill(0);
        const maxVal = Math.max(5, ...solar, ...wind) * 1.18;

        const padL = 40, padR = 14, padT = 24, padB = 34;
        const plotW = width - padL - padR;
        const plotH = height - padT - padB;

        ctx.strokeStyle = gridColor;
        ctx.fillStyle = textColor;
        ctx.font = "11px system-ui, sans-serif";
        ctx.textAlign = "left";
        for (let s = 0; s <= 4; s++) {
            const y = padT + plotH - (s / 4) * plotH;
            ctx.beginPath();
            ctx.moveTo(padL, y);
            ctx.lineTo(width - padR, y);
            ctx.stroke();
            ctx.fillText(((maxVal * s) / 4).toFixed(1), 2, y + 4);
        }

        function plotSeries(arr, strokeCol, fillCol) {
            ctx.beginPath();
            arr.forEach((v, i) => {
                const x = padL + (i / 23) * plotW;
                const y = padT + plotH - (v / maxVal) * plotH;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = strokeCol;
            ctx.lineWidth = 2.4;
            ctx.stroke();

            ctx.lineTo(padL + plotW, padT + plotH);
            ctx.lineTo(padL, padT + plotH);
            ctx.closePath();
            ctx.fillStyle = fillCol;
            ctx.fill();
        }

        plotSeries(solar, "#f59e0b", "rgba(245, 158, 11, 0.2)");
        plotSeries(wind, "#10b981", "rgba(16, 185, 129, 0.2)");

        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        for (let h = 0; h < 24; h += 4) {
            const x = padL + (h / 23) * plotW;
            ctx.fillText(`${String(h).padStart(2, "0")}:00`, x, height - 10);
        }
    }

    function drawMonthlyComparisonChart(calcMain, calcComp, mainName, compName) {
        const surface = prepareCanvas("chartMonthly");
        if (!surface) return;
        const { ctx, width, height } = surface;
        const isDark = state.theme === "dark";
        const textColor = isDark ? "#cfe9dc" : "#1e3a2f";
        const gridColor = isDark ? "rgba(16,185,129,0.12)" : "rgba(5,150,105,0.12)";

        ctx.clearRect(0, 0, width, height);

        const s1 = calcMain.monthlySeries;
        const s2 = calcComp.monthlySeries;
        const maxVal = Math.max(20, ...s1, ...s2) * 1.15;

        const padL = 44, padR = 14, padT = 28, padB = 34;
        const plotW = width - padL - padR;
        const plotH = height - padT - padB;

        ctx.strokeStyle = gridColor;
        ctx.fillStyle = textColor;
        ctx.font = "10.5px system-ui, sans-serif";
        ctx.textAlign = "left";
        for (let s = 0; s <= 4; s++) {
            const y = padT + plotH - (s / 4) * plotH;
            ctx.beginPath();
            ctx.moveTo(padL, y);
            ctx.lineTo(width - padR, y);
            ctx.stroke();
            ctx.fillText(String(Math.round((maxVal * s) / 4)), 2, y + 4);
        }

        const step = plotW / 12;
        const barW = Math.max(6, step * 0.34);
        const months = t("months");

        for (let m = 0; m < 12; m++) {
            const xBase = padL + m * step + step * 0.14;
            const h1 = Math.max(3, (s1[m] / maxVal) * plotH);
            const h2 = Math.max(3, (s2[m] / maxVal) * plotH);

            ctx.fillStyle = "#10b981";
            ctx.fillRect(xBase, padT + plotH - h1, barW, h1);

            ctx.fillStyle = "#f59e0b";
            ctx.fillRect(xBase + barW + 2, padT + plotH - h2, barW, h2);

            ctx.fillStyle = textColor;
            ctx.textAlign = "center";
            ctx.fillText(months[m] || String(m + 1), xBase + barW, height - 10);
        }

        ctx.textAlign = "left";
        ctx.font = "bold 11px system-ui, sans-serif";
        ctx.fillStyle = "#10b981";
        ctx.fillRect(padL, 6, 10, 10);
        ctx.fillStyle = textColor;
        ctx.fillText(`~${mainName}`, padL + 14, 15);

        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(padL + 125, 6, 10, 10);
        ctx.fillStyle = textColor;
        ctx.fillText(`~${compName}`, padL + 139, 15);
    }

    function bindCitySearch(inputEl, dropdownEl, onSelectCity) {
        if (!inputEl || !dropdownEl) return;
        let activeIdx = -1;

        function closeDrop() {
            dropdownEl.classList.remove("open");
            dropdownEl.replaceChildren();
            activeIdx = -1;
        }

        function renderMatches(rawQuery) {
            const q = normTr(rawQuery);
            dropdownEl.replaceChildren();
            activeIdx = -1;

            let matches = [];
            if (!q) {
                matches = state.provinces.slice(0, 8);
            } else {
                const starts = [];
                const contains = [];
                for (const p of state.provinces) {
                    if (p.code === q || p.slug.startsWith(q)) starts.push(p);
                    else if (p.slug.includes(q) || normTr(p.region).includes(q)) contains.push(p);
                }
                matches = starts.concat(contains).slice(0, 12);
            }

            if (matches.length === 0) {
                closeDrop();
                return;
            }

            matches.forEach(prov => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "ye-drop-item";

                const left = document.createElement("span");
                left.textContent = `${prov.code} — ${prov.name}`;

                const right = document.createElement("span");
                right.className = "ye-drop-meta";
                right.textContent = `${prov.region} • ~☀️${prov.ghi}`;

                btn.append(left, right);
                btn.addEventListener("click", () => {
                    inputEl.value = prov.name;
                    closeDrop();
                    onSelectCity(prov);
                });
                dropdownEl.appendChild(btn);
            });

            dropdownEl.classList.add("open");
        }

        inputEl.addEventListener("input", () => renderMatches(inputEl.value));
        inputEl.addEventListener("focus", () => {
            if (inputEl.value.trim() !== "") renderMatches(inputEl.value);
        });

        inputEl.addEventListener("keydown", e => {
            const items = dropdownEl.querySelectorAll(".ye-drop-item");
            if (!items.length) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                activeIdx = (activeIdx + 1) % items.length;
                items.forEach((el, i) => el.classList.toggle("active", i === activeIdx));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                activeIdx = (activeIdx - 1 + items.length) % items.length;
                items.forEach((el, i) => el.classList.toggle("active", i === activeIdx));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const target = activeIdx >= 0 ? items[activeIdx] : items[0];
                if (target) target.click();
            } else if (e.key === "Escape") {
                closeDrop();
            }
        });

        document.addEventListener("click", e => {
            if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
                closeDrop();
            }
        });
    }

    function refreshSimulatorMetrics() {
        const prov = getProvince(state.citySlug);
        const weather = getActiveWeather(state.citySlug);
        const calc = calculateEnergy(prov, weather, state.params);

        const compProv = getProvince(state.compareSlug);
        const compWeather = getActiveWeather(state.compareSlug);
        const compCalc = calculateEnergy(compProv, compWeather, state.params);

        const setTxt = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(val);
        };

        setTxt("simCityName", `${prov.name} (${prov.region})`);
        setTxt("simSourceBadge", t("estBadge"));
        setTxt("valRadius", `${state.params.windRadius} m`);
        setTxt("valWindEff", `%${state.params.windEfficiency}`);
        setTxt("valPanelArea", `${state.params.panelArea} m²`);
        setTxt("valSolarEff", `%${state.params.solarEfficiency}`);

        setTxt("kpiWindDaily", `~${calc.windDailyKwh} kWh`);
        setTxt("kpiWindSub", `${t("instantPower")}: ~${calc.windHourlyKw} kW (~${calc.vMs} m/s)`);
        setTxt("kpiSolarDaily", `~${calc.solarDailyKwh} kWh`);
        setTxt("kpiSolarSub", `${t("cloudAdj")}: ~${calc.solarCloudKwh} kWh (~GHI: ${calc.ghi})`);
        setTxt("kpiTotalDaily", `~${calc.totalDailyKwh} kWh`);
        setTxt("kpiTrees", `~${calc.annualEstMwh} ${t("unitYr")} • ~${calc.treesYr} ${t("unitTrees")} • ~${calc.homesPowered} ${t("unitHomes")}`);

        setTxt("kpiRange", `~${calc.kmRange} km`);
        setTxt("kpiCo2", `~${calc.co2Kg} kg CO₂`);
        setTxt("kpiEcon", `~${calc.monthlySavingsTl.toLocaleString()} ${t("unitMo")}`);
        setTxt("kpiAnnual", `~${calc.annualEstMwh} ${t("unitYr")}`);

        setTxt("wTemp", `~${weather.temp_c} °C`);
        setTxt("wHum", `~%${weather.humidity}`);
        setTxt("wWind", `~${calc.activeWindKph} km/h (~${calc.vMs} m/s)`);
        setTxt("wCloud", `~%${weather.cloud}`);
        setTxt("wGhi", `~${calc.ghi} kWh/m²`);
        setTxt("wTempLoss", `-%${calc.tempLossPct}`);

        const betzEl = document.getElementById("betzWarnBanner");
        if (betzEl) betzEl.style.display = calc.betzOk ? "none" : "block";

        const evWrap = document.getElementById("evCardsContainer");
        if (evWrap) {
            evWrap.replaceChildren();
            calc.evList.forEach(item => {
                const box = document.createElement("div");
                box.className = "ye-kpi";
                box.innerHTML = `<div class="ye-kpi-label">${item.name} (${item.cap} kWh)</div><div class="ye-kpi-val" style="color:var(--accent)">${item.text}</div>`;
                evWrap.appendChild(box);
            });
        }

        document.querySelectorAll(".ye-preset-card").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.preset === state.preset);
        });

        drawBarChart(weather, calc);
        drawHourlyCurveChart(calc);
        drawMonthlyComparisonChart(calc, compCalc, prov.name, compProv.name);
    }

    function navigate(route, citySlug = null, pushUrl = true) {
        state.route = route;
        if (citySlug) state.citySlug = normTr(citySlug) || "ankara";

        if (pushUrl) {
            let url = route === "home" ? "." : (route === "calc" ? `tools/calc?city=${state.citySlug}` : `page/${route}`);
            if (state.lang !== "tr") {
                url += (url.includes("?") ? "&" : "?") + `lang=${state.lang}`;
            }
            try {
                window.history.pushState({ route: state.route, city: state.citySlug }, "", url);
            } catch (_) {}
        }

        renderApp();
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (state.route === "calc") {
            fetchWeatherForCity(state.citySlug);
        }
    }

    function setTheme(newTheme) {
        state.theme = newTheme === "light" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", state.theme);
        localStorage.setItem("ye_theme", state.theme);
        const tc = document.querySelector('meta[name="theme-color"]');
        if (tc) tc.setAttribute("content", state.theme === "light" ? "#f3f7f4" : "#07130e");
        renderApp();
    }

    function setLang(newLang) {
        if (!I18N[newLang]) return;
        state.lang = newLang;
        localStorage.setItem("ye_lang", newLang);
        document.documentElement.setAttribute("lang", newLang);
        renderApp();
    }

    function saveParams() {
        Object.entries(state.params).forEach(([k, v]) => {
            try { localStorage.setItem(`ye_${k}`, String(v)); } catch (_) {}
        });
    }

    function renderFormulaSection() {
        return `
        <section class="ye-card" style="margin-top:20px">
            <h3 class="ye-card-title">${t("formulaTitle")}</h3>
            <div class="ye-grid-2" style="margin-bottom:0">
                <div class="ye-param-box">
                    <div style="font-weight:700;color:var(--accent);margin-bottom:6px">${t("windFormulaHead")}</div>
                    <p style="font-size:0.86rem;color:var(--text-muted);margin:0">${t("windFormulaBody")}</p>
                </div>
                <div class="ye-param-box">
                    <div style="font-weight:700;color:var(--amber);margin-bottom:6px">${t("solarFormulaHead")}</div>
                    <p style="font-size:0.86rem;color:var(--text-muted);margin:0">${t("solarFormulaBody")}</p>
                </div>
            </div>
        </section>`;
    }

    function renderHomeView() {
        const popular = ["Ankara", "İstanbul", "İzmir", "Antalya", "Çanakkale", "Kocaeli", "Konya", "Şanlıurfa"];
        return `
        <div class="ye-disclaimer-bar">
            <span>${t("disclaimerBanner")}</span>
            <a href="page/terms" data-nav="terms" style="font-weight:700;white-space:nowrap">${t("disclaimerLink")}</a>
        </div>

        <section class="ye-hero">
            <div class="ye-badge">${t("heroBadge")}</div>
            <h1>${t("heroTitle")}</h1>
            <p>${t("heroDesc")}</p>
            <div class="ye-hero-search">
                <div class="ye-hero-search-box">
                    <input type="search" id="heroCityInput" placeholder="${t("searchPlaceholder")}" autocomplete="off" />
                    <button type="button" id="heroStartBtn" class="ye-btn-primary">${t("startBtn")}</button>
                </div>
                <div id="heroCityDropdown" class="ye-dropdown"></div>
            </div>
            <div class="ye-quick-tags">
                <span style="font-size:0.8rem;color:var(--text-muted);align-self:center">${t("popularCities")}</span>
                ${popular.map(c => `<button type="button" class="ye-tag cityQuickTag" data-city="${normTr(c)}">📍 ${c}</button>`).join("")}
            </div>
        </section>

        <section class="ye-grid-3">
            <div class="ye-card">
                <div class="ye-card-title">⚡ ${t("feat1Title")}</div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin:0">${t("feat1Desc")}</p>
            </div>
            <div class="ye-card">
                <div class="ye-card-title">🛰️ ${t("feat2Title")}</div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin:0">${t("feat2Desc")}</p>
            </div>
            <div class="ye-card">
                <div class="ye-card-title">🔋 ${t("feat3Title")}</div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin:0">${t("feat3Desc")}</p>
            </div>
        </section>

        <section class="ye-grid-3">
            <div class="ye-card ye-media-card">
                <img src="assets/car.webp" alt="${t("card1Title")}" loading="lazy" />
                <div class="ye-media-body">
                    <h3 style="margin:0 0 6px;font-size:1.02rem;color:var(--accent)">${t("card1Title")}</h3>
                    <p style="margin:0;font-size:0.86rem;color:var(--text-muted)">${t("card1Desc")}</p>
                </div>
            </div>
            <div class="ye-card ye-media-card">
                <img src="assets/solar.webp" alt="${t("card2Title")}" loading="lazy" />
                <div class="ye-media-body">
                    <h3 style="margin:0 0 6px;font-size:1.02rem;color:var(--accent)">${t("card2Title")}</h3>
                    <p style="margin:0;font-size:0.86rem;color:var(--text-muted)">${t("card2Desc")}</p>
                </div>
            </div>
            <div class="ye-card ye-media-card">
                <img src="assets/drone.webp" alt="${t("card3Title")}" loading="lazy" />
                <div class="ye-media-body">
                    <h3 style="margin:0 0 6px;font-size:1.02rem;color:var(--accent)">${t("card3Title")}</h3>
                    <p style="margin:0;font-size:0.86rem;color:var(--text-muted)">${t("card3Desc")}</p>
                </div>
            </div>
        </section>
        ${renderFormulaSection()}`;
    }

    function renderCalcView() {
        const prov = getProvince(state.citySlug);
        return `
        <div class="ye-disclaimer-bar">
            <span>${t("disclaimerBanner")}</span>
            <a href="page/terms" data-nav="terms" style="font-weight:700;white-space:nowrap">${t("disclaimerLink")}</a>
        </div>

        <section class="ye-card" style="margin-bottom:18px">
            <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-bottom:12px">
                <div style="position:relative;flex:1;min-width:240px;max-width:380px">
                    <input type="search" id="calcCityInput" class="ye-search-input" style="width:100%;padding:10px 15px;font-size:0.94rem"
                           value="${prov.name}" placeholder="${t("searchPlaceholder")}" autocomplete="off" />
                    <span class="ye-search-icon">🔍</span>
                    <div id="calcCityDropdown" class="ye-dropdown"></div>
                </div>
                <div style="display:flex;gap:7px;align-items:center;flex-wrap:wrap">
                    <button type="button" id="hub10Btn" class="ye-tag ${state.params.hubHeight === 10 ? "active" : ""}">${t("hub10")}</button>
                    <button type="button" id="hub80Btn" class="ye-tag ${state.params.hubHeight === 80 ? "active" : ""}">${t("hub80")}</button>
                    <button type="button" id="resetSimBtn" class="ye-tag">↺ ${t("resetBtn")}</button>
                </div>
            </div>

            <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase">${t("presetsTitle")}</div>
            <div class="ye-preset-bar">
                <button type="button" class="ye-preset-card" data-preset="residential">
                    <div class="ye-preset-name">${t("presetRes")}</div>
                    <div class="ye-preset-sub">${t("presetResSub")}</div>
                </button>
                <button type="button" class="ye-preset-card" data-preset="commercial">
                    <div class="ye-preset-name">${t("presetCom")}</div>
                    <div class="ye-preset-sub">${t("presetComSub")}</div>
                </button>
                <button type="button" class="ye-preset-card" data-preset="industrial">
                    <div class="ye-preset-name">${t("presetInd")}</div>
                    <div class="ye-preset-sub">${t("presetIndSub")}</div>
                </button>
                <button type="button" class="ye-preset-card" data-preset="offgrid">
                    <div class="ye-preset-name">${t("presetOff")}</div>
                    <div class="ye-preset-sub">${t("presetOffSub")}</div>
                </button>
            </div>

            <div class="ye-param-grid">
                <div class="ye-param-box">
                    <div class="ye-param-head">
                        <span>${t("lblRadius")}</span>
                        <span id="valRadius" class="ye-param-val">${state.params.windRadius} m</span>
                    </div>
                    <input type="range" id="rngRadius" class="ye-range" min="1" max="60" step="0.5" value="${state.params.windRadius}" />
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <small style="color:var(--text-soft)">1m – 60m</small>
                        <input type="number" id="numRadius" class="ye-num-input" min="0.5" max="150" step="0.5" value="${state.params.windRadius}" />
                    </div>
                </div>

                <div class="ye-param-box">
                    <div class="ye-param-head">
                        <span>${t("lblWindEff")}</span>
                        <span id="valWindEff" class="ye-param-val">%${state.params.windEfficiency}</span>
                    </div>
                    <input type="range" id="rngWindEff" class="ye-range" min="15" max="65" step="0.5" value="${state.params.windEfficiency}" />
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <small style="color:var(--text-soft)">Betz: %59.3</small>
                        <input type="number" id="numWindEff" class="ye-num-input" min="5" max="95" step="0.5" value="${state.params.windEfficiency}" />
                    </div>
                </div>

                <div class="ye-param-box">
                    <div class="ye-param-head">
                        <span>${t("lblPanelArea")}</span>
                        <span id="valPanelArea" class="ye-param-val">${state.params.panelArea} m²</span>
                    </div>
                    <input type="range" id="rngPanelArea" class="ye-range" min="2" max="2000" step="2" value="${state.params.panelArea}" />
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <small style="color:var(--text-soft)">2m² – 2000m²</small>
                        <input type="number" id="numPanelArea" class="ye-num-input" min="1" max="50000" step="1" value="${state.params.panelArea}" />
                    </div>
                </div>

                <div class="ye-param-box">
                    <div class="ye-param-head">
                        <span>${t("lblSolarEff")}</span>
                        <span id="valSolarEff" class="ye-param-val">%${state.params.solarEfficiency}</span>
                    </div>
                    <input type="range" id="rngSolarEff" class="ye-range" min="12" max="28" step="0.5" value="${state.params.solarEfficiency}" />
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <small style="color:var(--text-soft)">${t("monoNote")}</small>
                        <input type="number" id="numSolarEff" class="ye-num-input" min="5" max="45" step="0.5" value="${state.params.solarEfficiency}" />
                    </div>
                </div>
            </div>

            <div class="ye-param-grid" style="margin-top:12px">
                <div class="ye-param-box">
                    <div class="ye-param-head"><span>${t("lblTilt")}</span></div>
                    <select id="selTilt" class="ye-select">
                        <option value="1" ${state.params.tiltFactor === 1 ? "selected" : ""}>${t("tiltOpt1")}</option>
                        <option value="0.94" ${state.params.tiltFactor === 0.94 ? "selected" : ""}>${t("tiltOpt2")}</option>
                        <option value="0.89" ${state.params.tiltFactor === 0.89 ? "selected" : ""}>${t("tiltOpt3")}</option>
                        <option value="0.84" ${state.params.tiltFactor === 0.84 ? "selected" : ""}>${t("tiltOpt4")}</option>
                    </select>
                </div>

                <div class="ye-param-box">
                    <div class="ye-param-head"><span>${t("lblTariff")}</span></div>
                    <input type="number" id="numTariff" class="ye-select" step="0.1" min="0.5" max="50" value="${state.params.tariffTl}" />
                </div>

                <div class="ye-param-box">
                    <div class="ye-param-head"><span>${t("lblCompare")}</span></div>
                    <select id="selCompareCity" class="ye-select">
                        ${state.provinces.map(p => `<option value="${p.slug}" ${p.slug === state.compareSlug ? "selected" : ""}>${p.code} — ${p.name}</option>`).join("")}
                    </select>
                </div>
            </div>
        </section>

        <div id="betzWarnBanner" class="ye-alert" style="display:none">${t("betzWarn")}</div>

        <div class="ye-grid-2">
            <div class="ye-card">
                <div class="ye-card-title">
                    <span>📍 <span id="simCityName">${prov.name}</span> — ${t("resTitle")}</span>
                    <span id="simSourceBadge" class="ye-badge" style="margin:0"></span>
                </div>

                <div class="ye-kpi-grid">
                    <div class="ye-kpi">
                        <div class="ye-kpi-label">🌬️ ${t("windDaily")}</div>
                        <div id="kpiWindDaily" class="ye-kpi-val">~0 kWh</div>
                        <div id="kpiWindSub" class="ye-kpi-sub"></div>
                    </div>
                    <div class="ye-kpi">
                        <div class="ye-kpi-label">☀️ ${t("solarDaily")}</div>
                        <div id="kpiSolarDaily" class="ye-kpi-val">~0 kWh</div>
                        <div id="kpiSolarSub" class="ye-kpi-sub"></div>
                    </div>
                </div>

                <div class="ye-total-banner">
                    <div style="font-size:0.76rem;font-weight:700;opacity:0.92">${t("totalDaily")}</div>
                    <div id="kpiTotalDaily" class="ye-total-val">~0 kWh</div>
                    <div id="kpiTrees" style="font-size:0.8rem;opacity:0.92"></div>
                </div>
            </div>

            <div class="ye-card">
                <div class="ye-card-title">${t("evTitle")}</div>
                <div class="ye-kpi-grid">
                    <div class="ye-kpi">
                        <div class="ye-kpi-label">🚗 ${t("eqRange")}</div>
                        <div id="kpiRange" class="ye-kpi-val">~0 km</div>
                        <div class="ye-kpi-sub">${t("eqRangeSub")}</div>
                    </div>
                    <div class="ye-kpi">
                        <div class="ye-kpi-label">🌱 ${t("co2Saved")}</div>
                        <div id="kpiCo2" class="ye-kpi-val">~0 kg</div>
                        <div class="ye-kpi-sub">${t("co2Sub")}</div>
                    </div>
                    <div class="ye-kpi">
                        <div class="ye-kpi-label">💡 ${t("econSaved")}</div>
                        <div id="kpiEcon" class="ye-kpi-val">~0 TL</div>
                        <div class="ye-kpi-sub">${t("econSub")}</div>
                    </div>
                    <div class="ye-kpi">
                        <div class="ye-kpi-label">📅 ${t("annualEst")}</div>
                        <div id="kpiAnnual" class="ye-kpi-val">~0 MWh</div>
                        <div class="ye-kpi-sub">${t("annualSub")}</div>
                    </div>
                </div>
                <div id="evCardsContainer" class="ye-kpi-grid" style="margin-bottom:0"></div>
            </div>
        </div>

        <div class="ye-grid-2">
            <div class="ye-card">
                <div class="ye-card-title">${t("chartBarTitle")}</div>
                <div class="ye-chart-wrap"><canvas id="chartBar"></canvas></div>
            </div>
            <div class="ye-card">
                <div class="ye-card-title">${t("chartHourlyTitle")}</div>
                <div class="ye-chart-wrap"><canvas id="chartHourly"></canvas></div>
            </div>
        </div>

        <div class="ye-grid-2">
            <div class="ye-card">
                <div class="ye-card-title">${t("weatherSummary")}</div>
                <div class="ye-kpi-grid" style="margin-bottom:0">
                    <div class="ye-kpi"><div class="ye-kpi-label">${t("temp")}</div><div id="wTemp" class="ye-kpi-val">-</div></div>
                    <div class="ye-kpi"><div class="ye-kpi-label">${t("humidity")}</div><div id="wHum" class="ye-kpi-val">-</div></div>
                    <div class="ye-kpi"><div class="ye-kpi-label">${t("windSpeed")}</div><div id="wWind" class="ye-kpi-val">-</div></div>
                    <div class="ye-kpi"><div class="ye-kpi-label">${t("cloudCover")}</div><div id="wCloud" class="ye-kpi-val">-</div></div>
                    <div class="ye-kpi"><div class="ye-kpi-label">${t("ghiLabel")}</div><div id="wGhi" class="ye-kpi-val">-</div></div>
                    <div class="ye-kpi"><div class="ye-kpi-label">${t("tempLossLabel")}</div><div id="wTempLoss" class="ye-kpi-val">-</div></div>
                </div>
            </div>
            <div class="ye-card">
                <div class="ye-card-title">${t("chartMonthlyTitle")}</div>
                <div class="ye-chart-wrap"><canvas id="chartMonthly"></canvas></div>
            </div>
        </div>
        ${renderFormulaSection()}`;
    }

    function renderInfoPage(type) {
        const email = window.__contactEmail || "info@example.com";
        if (type === "about") {
            return `
            <div class="ye-card ye-legal-block">
                <h1 style="margin-top:0;color:var(--accent)">${t("aboutTitle")}</h1>
                <p>${t("aboutP1")}</p>
                <h2>${t("aboutH1")}</h2>
                <p>${t("aboutP2")}</p>
                <h2>${t("aboutH2")}</h2>
                <ul>
                    <li>${t("aboutLi1")}</li>
                    <li>${t("aboutLi2")}</li>
                </ul>
            </div>
            ${renderFormulaSection()}`;
        }
        if (type === "faq") {
            return `
            <div class="ye-card ye-legal-block">
                <h1 style="margin-top:0;color:var(--accent)">${t("faqTitle")}</h1>
                <h2>${t("faqQ1")}</h2>
                <p>${t("faqA1")}</p>
                <h2>${t("faqQ2")}</h2>
                <p>${t("faqA2")}</p>
                <h2>${t("faqQ3")}</h2>
                <p>${t("faqA3")}</p>
                <h2>${t("faqQ4")}</h2>
                <p>${t("faqA4")}</p>
            </div>`;
        }
        if (type === "contact") {
            return `
            <div class="ye-card ye-legal-block" style="max-width:720px;margin:0 auto">
                <h1 style="margin-top:0;color:var(--accent)">${t("contactTitle")}</h1>
                <p>${t("contactP1")}</p>
                <div class="ye-param-box" style="display:inline-block;margin:10px 0">
                    <strong>${t("contactEmailLbl")}</strong> <a href="mailto:${email}">${email}</a>
                </div>
                <p style="font-size:0.82rem;color:var(--text-soft)">${t("contactNote")}</p>
            </div>`;
        }
        if (type === "privacy") {
            return `
            <div class="ye-card ye-legal-block">
                <h1 style="margin-top:0;color:var(--accent)">${t("privacyTitle")}</h1>
                <p>${t("privacyIntro")}</p>
                <h2>${t("privacyH1")}</h2>
                <ul>
                    <li>${t("privacyLi1")}</li>
                    <li>${t("privacyLi2")}</li>
                    <li>${t("privacyLi3")}</li>
                </ul>
                <h2>${t("privacyH2")}</h2>
                <p>${t("privacyP2")}</p>
                <h2>${t("privacyH3")}</h2>
                <p>${t("privacyP3")} <a href="mailto:${email}">${email}</a></p>
            </div>`;
        }
        return `
        <div class="ye-card ye-legal-block">
            <h1 style="margin-top:0;color:var(--accent)">${t("termsTitle")}</h1>
            <p>${t("termsIntro")}</p>
            <h2>${t("termsH1")}</h2>
            <p>${t("termsP1")}</p>
            <h2>${t("termsH2")}</h2>
            <p>${t("termsP2")}</p>
            <h2>${t("termsH3")}</h2>
            <p>${t("termsP3")}</p>
            <h2>${t("termsH4")}</h2>
            <p>${t("termsP4")}</p>
        </div>`;
    }

    function renderApp() {
        const root = document.getElementById("root");
        if (!root) return;
        const email = window.__contactEmail || "info@example.com";

        let mainHtml = "";
        if (state.route === "home") mainHtml = renderHomeView();
        else if (state.route === "calc") mainHtml = renderCalcView();
        else mainHtml = renderInfoPage(state.route);

        root.innerHTML = `
        <header class="ye-header">
            <div class="ye-container">
                <div class="ye-nav-row">
                    <div class="ye-brand" data-nav="home">
                        <img src="assets/logo.png" alt="YeşilEnerjin" />
                    </div>

                    <nav class="ye-nav-links">
                        <button type="button" class="ye-nav-btn ${state.route === "home" ? "active" : ""}" data-nav="home">${t("navHome")}</button>
                        <button type="button" class="ye-nav-btn ${state.route === "calc" ? "active" : ""}" data-nav="calc">⚡ ${t("navCalc")}</button>
                        <button type="button" class="ye-nav-btn ${state.route === "about" ? "active" : ""}" data-nav="about">${t("navAbout")}</button>
                        <button type="button" class="ye-nav-btn ${state.route === "faq" ? "active" : ""}" data-nav="faq">${t("navFaq")}</button>
                        <button type="button" class="ye-nav-btn ${state.route === "contact" ? "active" : ""}" data-nav="contact">${t("navContact")}</button>
                    </nav>

                    <div class="ye-toolbar">
                        <div class="ye-search-wrap">
                            <input type="search" id="navCityInput" class="ye-search-input" placeholder="${t("searchPlaceholder")}" autocomplete="off" />
                            <span class="ye-search-icon">⌕</span>
                            <div id="navCityDropdown" class="ye-dropdown"></div>
                        </div>

                        <select id="langSelect" class="ye-lang-select" aria-label="Language">
                            <option value="tr" ${state.lang === "tr" ? "selected" : ""}>🇹🇷 TR</option>
                            <option value="en" ${state.lang === "en" ? "selected" : ""}>🇬🇧 EN</option>
                            <option value="de" ${state.lang === "de" ? "selected" : ""}>🇩🇪 DE</option>
                            <option value="es" ${state.lang === "es" ? "selected" : ""}>🇪🇸 ES</option>
                            <option value="ru" ${state.lang === "ru" ? "selected" : ""}>🇷🇺 RU</option>
                            <option value="ja" ${state.lang === "ja" ? "selected" : ""}>🇯🇵 JA</option>
                        </select>

                        <button type="button" id="themeToggleBtn" class="ye-icon-btn" title="${t("themeTitle")}">
                            ${state.theme === "dark" ? "☀️" : "🌙"}
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <main class="ye-main">
            <div class="ye-container">${mainHtml}</div>
        </main>

        <footer class="ye-footer">
            <div class="ye-container">
                <div class="ye-footer-grid">
                    <div>
                        <strong style="color:var(--text-main);font-size:1rem">🌿 YeşilEnerjin</strong>
                        <p style="margin:6px 0 0;font-size:0.82rem">${t("footerDesc")}</p>
                    </div>
                    <div>
                        <strong style="color:var(--text-main)">${t("footerLegalTitle")}</strong>
                        <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap">
                            <a href="page/about" data-nav="about">${t("navAbout")}</a>
                            <a href="page/faq" data-nav="faq">${t("navFaq")}</a>
                            <a href="page/privacy" data-nav="privacy">${t("navPrivacy")}</a>
                            <a href="page/terms" data-nav="terms">${t("navTerms")}</a>
                        </div>
                    </div>
                    <div>
                        <strong style="color:var(--text-main)">${t("navContact")}</strong>
                        <p style="margin:6px 0 0"><a href="mailto:${email}">${email}</a></p>
                    </div>
                </div>
                <div style="border-top:1px solid var(--border);padding-top:14px;text-align:center;font-size:0.78rem">
                    &copy; ${new Date().getFullYear()} ${t("footerCopy")}
                </div>
            </div>
        </footer>`;

        bindEvents();
        if (state.route === "calc") {
            refreshSimulatorMetrics();
        }
    }

    function bindEvents() {
        document.querySelectorAll("[data-nav]").forEach(el => {
            el.addEventListener("click", e => {
                e.preventDefault();
                navigate(el.getAttribute("data-nav"));
            });
        });

        const langSel = document.getElementById("langSelect");
        if (langSel) langSel.addEventListener("change", () => setLang(langSel.value));

        const themeBtn = document.getElementById("themeToggleBtn");
        if (themeBtn) themeBtn.addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));

        bindCitySearch(document.getElementById("navCityInput"), document.getElementById("navCityDropdown"), prov => {
            navigate("calc", prov.slug);
        });

        if (state.route === "home") {
            const heroInput = document.getElementById("heroCityInput");
            const heroDrop = document.getElementById("heroCityDropdown");
            bindCitySearch(heroInput, heroDrop, prov => navigate("calc", prov.slug));

            const startBtn = document.getElementById("heroStartBtn");
            if (startBtn) {
                startBtn.addEventListener("click", () => {
                    const q = heroInput ? heroInput.value : "";
                    const found = getProvince(q);
                    navigate("calc", found.slug);
                });
            }

            document.querySelectorAll(".cityQuickTag").forEach(btn => {
                btn.addEventListener("click", () => navigate("calc", btn.dataset.city));
            });
        }

        if (state.route === "calc") {
            bindCitySearch(document.getElementById("calcCityInput"), document.getElementById("calcCityDropdown"), prov => {
                state.citySlug = prov.slug;
                try { window.history.replaceState({}, "", `tools/calc?city=${prov.slug}`); } catch (_) {}
                refreshSimulatorMetrics();
                fetchWeatherForCity(prov.slug);
            });

            document.querySelectorAll(".ye-preset-card").forEach(btn => {
                btn.addEventListener("click", () => {
                    const key = btn.dataset.preset;
                    const p = PRESETS[key];
                    if (!p) return;
                    state.preset = key;
                    state.params = { ...state.params, ...p };
                    saveParams();
                    syncSliderInputs();
                    refreshSimulatorMetrics();
                });
            });

            const hub10 = document.getElementById("hub10Btn");
            const hub80 = document.getElementById("hub80Btn");
            if (hub10 && hub80) {
                hub10.addEventListener("click", () => {
                    state.params.hubHeight = 10;
                    hub10.classList.add("active");
                    hub80.classList.remove("active");
                    saveParams();
                    refreshSimulatorMetrics();
                });
                hub80.addEventListener("click", () => {
                    state.params.hubHeight = 80;
                    hub80.classList.add("active");
                    hub10.classList.remove("active");
                    saveParams();
                    refreshSimulatorMetrics();
                });
            }

            const selTilt = document.getElementById("selTilt");
            if (selTilt) {
                selTilt.addEventListener("change", () => {
                    state.params.tiltFactor = Number(selTilt.value) || 1.0;
                    saveParams();
                    refreshSimulatorMetrics();
                });
            }

            const numTariff = document.getElementById("numTariff");
            if (numTariff) {
                numTariff.addEventListener("input", () => {
                    state.params.tariffTl = Math.max(0.1, Number(numTariff.value) || 2.6);
                    saveParams();
                    refreshSimulatorMetrics();
                });
            }

            const selComp = document.getElementById("selCompareCity");
            if (selComp) {
                selComp.addEventListener("change", () => {
                    state.compareSlug = selComp.value;
                    fetchWeatherForCity(state.compareSlug);
                    refreshSimulatorMetrics();
                });
            }

            const resetBtn = document.getElementById("resetSimBtn");
            if (resetBtn) {
                resetBtn.addEventListener("click", () => {
                    state.preset = "commercial";
                    state.params = { ...PRESETS.commercial, tariffTl: 2.60 };
                    saveParams();
                    syncSliderInputs();
                    refreshSimulatorMetrics();
                });
            }

            const pairs = [
                ["rngRadius", "numRadius", "windRadius"],
                ["rngWindEff", "numWindEff", "windEfficiency"],
                ["rngPanelArea", "numPanelArea", "panelArea"],
                ["rngSolarEff", "numSolarEff", "solarEfficiency"]
            ];

            pairs.forEach(([rId, nId, key]) => {
                const rEl = document.getElementById(rId);
                const nEl = document.getElementById(nId);
                if (rEl && nEl) {
                    rEl.addEventListener("input", () => {
                        state.preset = "custom";
                        state.params[key] = Number(rEl.value);
                        nEl.value = rEl.value;
                        saveParams();
                        refreshSimulatorMetrics();
                    });
                    nEl.addEventListener("input", () => {
                        state.preset = "custom";
                        const v = Number(nEl.value);
                        if (v > 0) {
                            state.params[key] = v;
                            rEl.value = String(Math.min(Number(rEl.max), Math.max(Number(rEl.min), v)));
                            saveParams();
                            refreshSimulatorMetrics();
                        }
                    });
                }
            });
        }
    }

    function syncSliderInputs() {
        const map = [
            ["rngRadius", "numRadius", state.params.windRadius],
            ["rngWindEff", "numWindEff", state.params.windEfficiency],
            ["rngPanelArea", "numPanelArea", state.params.panelArea],
            ["rngSolarEff", "numSolarEff", state.params.solarEfficiency]
        ];
        map.forEach(([rId, nId, val]) => {
            const rEl = document.getElementById(rId);
            const nEl = document.getElementById(nId);
            if (rEl) rEl.value = String(val);
            if (nEl) nEl.value = String(val);
        });
        const selTilt = document.getElementById("selTilt");
        if (selTilt) selTilt.value = String(state.params.tiltFactor);
    }

    window.addEventListener("popstate", e => {
        if (e.state && e.state.route) {
            navigate(e.state.route, e.state.city || state.citySlug, false);
        }
    });

    window.addEventListener("resize", () => {
        if (state.route === "calc") refreshSimulatorMetrics();
    });

    renderApp();
    if (state.route === "calc") {
        fetchWeatherForCity(state.citySlug);
    }

    if (window.__bootP && typeof window.__bootP.then === "function") {
        window.__bootP.then(d => {
            if (!d || !d.ok) return;
            if (d.config && Array.isArray(d.config.provinces) && d.config.provinces.length === 81) {
                state.provinces = d.config.provinces;
            }
            if (d.initial && d.initial.province && d.initial.weather) {
                state.weatherCache.set(d.initial.province.slug, d.initial.weather);
                if (state.route === "calc" && state.citySlug === d.initial.province.slug) {
                    refreshSimulatorMetrics();
                }
            }
        });
    }
})();
