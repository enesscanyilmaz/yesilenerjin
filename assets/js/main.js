let iller = [];
$.getJSON("assets/js/cities.json", function(data){
    // JSON şehirlerini normalize edip sakla
    iller = data.map(city => ({
        original: city,
        normalized: normalizeTurkish(city).toLowerCase() // arama için normalize ve küçük harf
    }));
});

function normalizeTurkish(str) {
    const map = {
        'ç':'c','Ç':'C',
        'ğ':'g','Ğ':'G',
        'ı':'i','İ':'I',
        'ö':'o','Ö':'O',
        'ş':'s','Ş':'S',
        'ü':'u','Ü':'U'
    };
    return str.replace(/[çÇğĞıİöÖşŞüÜ]/g, c => map[c] || c);
}

function setupCitySearch(inputId, listId, buttonId, redirectPath) {
    const $input = $("#" + inputId);
    const $list = $("#" + listId);
    const $btn = $("#" + buttonId);

    $input.on("input", () => {
        const val = normalizeTurkish($input.val()).toLowerCase(); // input normalize ve küçük harf
        $list.empty();
        if (!val) return;

        iller.forEach(city => {
            if(city.normalized.includes(val)){ // normalize edilmiş JSON ile karşılaştır
                $list.append(`<button type="button" class="list-group-item list-group-item-action cityBtn" data-city="${city.normalized}">${city.original}</button>`);
            }
        });
    });

    $(document).on("click", "#" + listId + " .cityBtn", function(){
        const city = $(this).data("city"); // normalize edilmiş sürümü al
        $input.val(city);
        $list.empty();
    });

    $btn.click(() => {
        let city = $input.val();
        if(city) {
            city = normalizeTurkish(city).toLowerCase(); // API’ye normalize edilmiş sürümü gönder
            window.location.href = redirectPath + "?city=" + encodeURIComponent(city);
        }
    });
}

// Kurulum
setupCitySearch("citySearchMain", "cityListMain", "searchBtnMain", "tools/calc");
setupCitySearch("citySearchNav", "cityListNav", "searchBtnNav", "tools/calc");
	