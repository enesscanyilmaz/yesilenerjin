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

define('YE_CACHE_DIR', __DIR__ . '/cache');
define('YE_CACHE_TTL', max(300, (int)ye_cfg('CACHE_TTL_SECONDS', '1800')));
define('YE_CACHE_STALE_TTL', max(3600, (int)ye_cfg('CACHE_STALE_SECONDS', '86400')));
define('YE_RL_MAX', max(15, (int)ye_cfg('RATE_LIMIT_MAX_REQUESTS', '90')));
define('YE_RL_WINDOW', max(10, (int)ye_cfg('RATE_LIMIT_WINDOW_SECONDS', '60')));

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');

function ye_verify_boot_key(string $provided): bool
{
    if ($provided === '' || !str_contains($provided, '.')) {
        return false;
    }
    $secret = ye_cfg('APP_SECRET', 'ye_v4_hmac_key_9f35c1ad');
    $ua     = substr((string)($_SERVER['HTTP_USER_AGENT'] ?? 'ua'), 0, 64);
    $nowB   = (int)floor(time() / 900);

    // Mevcut ve bir önceki 15 dakikalık pencereyi kabul et
    foreach ([$nowB, $nowB - 1, $nowB + 1] as $b) {
        $bStr   = (string)$b;
        $prefix = substr(hash_hmac('sha256', $bStr, $secret), 0, 6);
        $sig    = substr(hash_hmac('sha256', $prefix . '|' . $bStr . '|' . $ua, $secret), 0, 28);
        if (hash_equals($prefix . '.' . $sig, $provided)) {
            return true;
        }
    }
    return false;
}

function ye_is_bot_request(): bool
{
    $ua = strtolower((string)($_SERVER['HTTP_USER_AGENT'] ?? ''));
    if ($ua === '' || preg_match('/(curl|wget|python|scrapy|httpclient|libwww|httrack|postman|insomnia|go-http-client)/i', $ua)) {
        return true;
    }
    $xrw = strtolower((string)($_SERVER['HTTP_X_REQUESTED_WITH'] ?? ''));
    if ($xrw !== 'xmlhttprequest') {
        return true;
    }
    $secSite = strtolower((string)($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
    if ($secSite !== '' && !in_array($secSite, ['same-origin', 'none'], true)) {
        return true;
    }
    $bootKey = (string)($_SERVER['HTTP_X_BOOT_KEY'] ?? '');
    if (!ye_verify_boot_key($bootKey)) {
        return true;
    }
    return false;
}

function ye_rate_limit(): array
{
    if (!is_dir(YE_CACHE_DIR)) {
        @mkdir(YE_CACHE_DIR, 0750, true);
    }
    $ip   = filter_var($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1', FILTER_VALIDATE_IP) ?: '127.0.0.1';
    $hash = substr(hash('sha256', $ip . '|ye_v4'), 0, 20);
    $file = YE_CACHE_DIR . '/rl_' . $hash . '.dat';
    $now  = time();

    $fp = @fopen($file, 'c+');
    if ($fp === false) {
        return ['ok' => true, 'rem' => YE_RL_MAX];
    }
    $ok  = true;
    $rem = YE_RL_MAX - 1;
    if (@flock($fp, LOCK_EX)) {
        $raw = stream_get_contents($fp);
        $st  = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
        if (!is_array($st) || (int)($st['r'] ?? 0) <= $now) {
            $st = ['c' => 1, 'r' => $now + YE_RL_WINDOW];
        } else {
            $st['c'] = (int)$st['c'] + 1;
        }
        if ($st['c'] > YE_RL_MAX) {
            $ok  = false;
            $rem = 0;
        } else {
            $rem = max(0, YE_RL_MAX - $st['c']);
        }
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, (string)json_encode($st));
        fflush($fp);
        @flock($fp, LOCK_UN);
    }
    fclose($fp);
    return ['ok' => $ok, 'rem' => $rem];
}

function ye_provinces(): array
{
    return [
        ['code' => '01', 'name' => 'Adana',          'slug' => 'adana',          'region' => 'Akdeniz',            'lat' => 37.0000, 'lon' => 35.3213, 'ghi' => 5.1, 'wind' => 13.5],
        ['code' => '02', 'name' => 'Adıyaman',       'slug' => 'adiyaman',       'region' => 'Güneydoğu Anadolu',  'lat' => 37.7648, 'lon' => 38.2786, 'ghi' => 5.2, 'wind' => 12.8],
        ['code' => '03', 'name' => 'Afyonkarahisar', 'slug' => 'afyonkarahisar', 'region' => 'Ege',                'lat' => 38.7507, 'lon' => 30.5567, 'ghi' => 4.6, 'wind' => 13.2],
        ['code' => '04', 'name' => 'Ağrı',           'slug' => 'agri',           'region' => 'Doğu Anadolu',       'lat' => 39.7191, 'lon' => 43.0503, 'ghi' => 4.5, 'wind' => 14.0],
        ['code' => '05', 'name' => 'Amasya',         'slug' => 'amasya',         'region' => 'Karadeniz',          'lat' => 40.6499, 'lon' => 35.8353, 'ghi' => 4.1, 'wind' => 12.5],
        ['code' => '06', 'name' => 'Ankara',         'slug' => 'ankara',         'region' => 'İç Anadolu',         'lat' => 39.9334, 'lon' => 32.8597, 'ghi' => 4.5, 'wind' => 13.4],
        ['code' => '07', 'name' => 'Antalya',        'slug' => 'antalya',        'region' => 'Akdeniz',            'lat' => 36.8969, 'lon' => 30.7133, 'ghi' => 5.4, 'wind' => 14.2],
        ['code' => '08', 'name' => 'Artvin',         'slug' => 'artvin',         'region' => 'Karadeniz',          'lat' => 41.1828, 'lon' => 41.8183, 'ghi' => 3.7, 'wind' => 13.8],
        ['code' => '09', 'name' => 'Aydın',          'slug' => 'aydin',          'region' => 'Ege',                'lat' => 37.8560, 'lon' => 27.8416, 'ghi' => 5.1, 'wind' => 16.5],
        ['code' => '10', 'name' => 'Balıkesir',      'slug' => 'balikesir',      'region' => 'Marmara',            'lat' => 39.6484, 'lon' => 27.8826, 'ghi' => 4.5, 'wind' => 21.4],
        ['code' => '11', 'name' => 'Bilecik',        'slug' => 'bilecik',        'region' => 'Marmara',            'lat' => 40.1451, 'lon' => 29.9799, 'ghi' => 4.2, 'wind' => 13.6],
        ['code' => '12', 'name' => 'Bingöl',         'slug' => 'bingol',         'region' => 'Doğu Anadolu',       'lat' => 38.8854, 'lon' => 40.4966, 'ghi' => 4.7, 'wind' => 13.0],
        ['code' => '13', 'name' => 'Bitlis',         'slug' => 'bitlis',         'region' => 'Doğu Anadolu',       'lat' => 38.4006, 'lon' => 42.1095, 'ghi' => 4.8, 'wind' => 14.5],
        ['code' => '14', 'name' => 'Bolu',           'slug' => 'bolu',           'region' => 'Karadeniz',          'lat' => 40.7392, 'lon' => 31.6089, 'ghi' => 4.0, 'wind' => 11.8],
        ['code' => '15', 'name' => 'Burdur',         'slug' => 'burdur',         'region' => 'Akdeniz',            'lat' => 37.7203, 'lon' => 30.2906, 'ghi' => 5.0, 'wind' => 13.5],
        ['code' => '16', 'name' => 'Bursa',          'slug' => 'bursa',          'region' => 'Marmara',            'lat' => 40.1885, 'lon' => 29.0610, 'ghi' => 4.3, 'wind' => 15.8],
        ['code' => '17', 'name' => 'Çanakkale',      'slug' => 'canakkale',      'region' => 'Marmara',            'lat' => 40.1553, 'lon' => 26.4142, 'ghi' => 4.5, 'wind' => 24.6],
        ['code' => '18', 'name' => 'Çankırı',        'slug' => 'cankiri',        'region' => 'İç Anadolu',         'lat' => 40.6013, 'lon' => 33.6134, 'ghi' => 4.3, 'wind' => 12.4],
        ['code' => '19', 'name' => 'Çorum',          'slug' => 'corum',          'region' => 'Karadeniz',          'lat' => 40.5506, 'lon' => 34.9556, 'ghi' => 4.2, 'wind' => 13.0],
        ['code' => '20', 'name' => 'Denizli',        'slug' => 'denizli',        'region' => 'Ege',                'lat' => 37.7765, 'lon' => 29.0864, 'ghi' => 5.0, 'wind' => 14.0],
        ['code' => '21', 'name' => 'Diyarbakır',     'slug' => 'diyarbakir',     'region' => 'Güneydoğu Anadolu',  'lat' => 37.9144, 'lon' => 40.2306, 'ghi' => 5.2, 'wind' => 13.2],
        ['code' => '22', 'name' => 'Edirne',         'slug' => 'edirne',         'region' => 'Marmara',            'lat' => 41.6818, 'lon' => 26.5623, 'ghi' => 4.2, 'wind' => 17.5],
        ['code' => '23', 'name' => 'Elazığ',         'slug' => 'elazig',         'region' => 'Doğu Anadolu',       'lat' => 38.6810, 'lon' => 39.2264, 'ghi' => 4.9, 'wind' => 13.4],
        ['code' => '24', 'name' => 'Erzincan',       'slug' => 'erzincan',       'region' => 'Doğu Anadolu',       'lat' => 39.7500, 'lon' => 39.5000, 'ghi' => 4.6, 'wind' => 12.6],
        ['code' => '25', 'name' => 'Erzurum',        'slug' => 'erzurum',        'region' => 'Doğu Anadolu',       'lat' => 39.9000, 'lon' => 41.2700, 'ghi' => 4.6, 'wind' => 14.8],
        ['code' => '26', 'name' => 'Eskişehir',      'slug' => 'eskisehir',      'region' => 'İç Anadolu',         'lat' => 39.7767, 'lon' => 30.5206, 'ghi' => 4.5, 'wind' => 14.2],
        ['code' => '27', 'name' => 'Gaziantep',      'slug' => 'gaziantep',      'region' => 'Güneydoğu Anadolu',  'lat' => 37.0662, 'lon' => 37.3833, 'ghi' => 5.2, 'wind' => 13.8],
        ['code' => '28', 'name' => 'Giresun',        'slug' => 'giresun',        'region' => 'Karadeniz',          'lat' => 40.9128, 'lon' => 38.3895, 'ghi' => 3.7, 'wind' => 13.5],
        ['code' => '29', 'name' => 'Gümüşhane',      'slug' => 'gumushane',      'region' => 'Karadeniz',          'lat' => 40.4386, 'lon' => 39.5086, 'ghi' => 4.2, 'wind' => 13.0],
        ['code' => '30', 'name' => 'Hakkari',        'slug' => 'hakkari',        'region' => 'Doğu Anadolu',       'lat' => 37.5833, 'lon' => 43.7333, 'ghi' => 5.0, 'wind' => 14.2],
        ['code' => '31', 'name' => 'Hatay',          'slug' => 'hatay',          'region' => 'Akdeniz',            'lat' => 36.4018, 'lon' => 36.3498, 'ghi' => 5.1, 'wind' => 20.8],
        ['code' => '32', 'name' => 'Isparta',        'slug' => 'isparta',        'region' => 'Akdeniz',            'lat' => 37.7648, 'lon' => 30.5566, 'ghi' => 5.0, 'wind' => 13.6],
        ['code' => '33', 'name' => 'Mersin',         'slug' => 'mersin',         'region' => 'Akdeniz',            'lat' => 36.8121, 'lon' => 34.6415, 'ghi' => 5.3, 'wind' => 14.5],
        ['code' => '34', 'name' => 'İstanbul',       'slug' => 'istanbul',       'region' => 'Marmara',            'lat' => 41.0082, 'lon' => 28.9784, 'ghi' => 4.2, 'wind' => 19.8],
        ['code' => '35', 'name' => 'İzmir',          'slug' => 'izmir',          'region' => 'Ege',                'lat' => 38.4237, 'lon' => 27.1428, 'ghi' => 5.0, 'wind' => 22.5],
        ['code' => '36', 'name' => 'Kars',           'slug' => 'kars',           'region' => 'Doğu Anadolu',       'lat' => 40.6167, 'lon' => 43.1000, 'ghi' => 4.4, 'wind' => 15.2],
        ['code' => '37', 'name' => 'Kastamonu',      'slug' => 'kastamonu',      'region' => 'Karadeniz',          'lat' => 41.3887, 'lon' => 33.7827, 'ghi' => 4.0, 'wind' => 13.2],
        ['code' => '38', 'name' => 'Kayseri',        'slug' => 'kayseri',        'region' => 'İç Anadolu',         'lat' => 38.7312, 'lon' => 35.4787, 'ghi' => 4.8, 'wind' => 13.6],
        ['code' => '39', 'name' => 'Kırklareli',     'slug' => 'kirklareli',     'region' => 'Marmara',            'lat' => 41.7333, 'lon' => 27.2167, 'ghi' => 4.2, 'wind' => 18.4],
        ['code' => '40', 'name' => 'Kırşehir',       'slug' => 'kirsehir',       'region' => 'İç Anadolu',         'lat' => 39.1425, 'lon' => 34.1709, 'ghi' => 4.7, 'wind' => 14.0],
        ['code' => '41', 'name' => 'Kocaeli',        'slug' => 'kocaeli',        'region' => 'Marmara',            'lat' => 40.8533, 'lon' => 29.8815, 'ghi' => 4.1, 'wind' => 16.2],
        ['code' => '42', 'name' => 'Konya',          'slug' => 'konya',          'region' => 'İç Anadolu',         'lat' => 37.8746, 'lon' => 32.4932, 'ghi' => 5.1, 'wind' => 13.8],
        ['code' => '43', 'name' => 'Kütahya',        'slug' => 'kutahya',        'region' => 'Ege',                'lat' => 39.4167, 'lon' => 29.9833, 'ghi' => 4.5, 'wind' => 13.4],
        ['code' => '44', 'name' => 'Malatya',        'slug' => 'malatya',        'region' => 'Doğu Anadolu',       'lat' => 38.3552, 'lon' => 38.3095, 'ghi' => 5.0, 'wind' => 13.5],
        ['code' => '45', 'name' => 'Manisa',         'slug' => 'manisa',         'region' => 'Ege',                'lat' => 38.6191, 'lon' => 27.4289, 'ghi' => 4.9, 'wind' => 18.6],
        ['code' => '46', 'name' => 'Kahramanmaraş',  'slug' => 'kahramanmaras',  'region' => 'Akdeniz',            'lat' => 37.5858, 'lon' => 36.9371, 'ghi' => 5.0, 'wind' => 14.4],
        ['code' => '47', 'name' => 'Mardin',         'slug' => 'mardin',         'region' => 'Güneydoğu Anadolu',  'lat' => 37.3212, 'lon' => 40.7245, 'ghi' => 5.4, 'wind' => 15.2],
        ['code' => '48', 'name' => 'Muğla',          'slug' => 'mugla',          'region' => 'Ege',                'lat' => 37.2153, 'lon' => 28.3636, 'ghi' => 5.2, 'wind' => 18.2],
        ['code' => '49', 'name' => 'Muş',            'slug' => 'mus',            'region' => 'Doğu Anadolu',       'lat' => 38.9462, 'lon' => 41.7539, 'ghi' => 4.7, 'wind' => 13.0],
        ['code' => '50', 'name' => 'Nevşehir',       'slug' => 'nevsehir',       'region' => 'İç Anadolu',         'lat' => 38.6939, 'lon' => 34.6857, 'ghi' => 4.8, 'wind' => 13.8],
        ['code' => '51', 'name' => 'Niğde',          'slug' => 'nigde',          'region' => 'İç Anadolu',         'lat' => 37.9667, 'lon' => 34.6833, 'ghi' => 5.0, 'wind' => 14.2],
        ['code' => '52', 'name' => 'Ordu',           'slug' => 'ordu',           'region' => 'Karadeniz',          'lat' => 40.9839, 'lon' => 37.8764, 'ghi' => 3.8, 'wind' => 13.6],
        ['code' => '53', 'name' => 'Rize',           'slug' => 'rize',           'region' => 'Karadeniz',          'lat' => 41.0201, 'lon' => 40.5234, 'ghi' => 3.5, 'wind' => 12.8],
        ['code' => '54', 'name' => 'Sakarya',        'slug' => 'sakarya',        'region' => 'Marmara',            'lat' => 40.7569, 'lon' => 30.3783, 'ghi' => 4.1, 'wind' => 14.0],
        ['code' => '55', 'name' => 'Samsun',         'slug' => 'samsun',         'region' => 'Karadeniz',          'lat' => 41.2867, 'lon' => 36.3300, 'ghi' => 4.0, 'wind' => 15.0],
        ['code' => '56', 'name' => 'Siirt',          'slug' => 'siirt',          'region' => 'Güneydoğu Anadolu',  'lat' => 37.9333, 'lon' => 41.9500, 'ghi' => 5.1, 'wind' => 12.8],
        ['code' => '57', 'name' => 'Sinop',          'slug' => 'sinop',          'region' => 'Karadeniz',          'lat' => 42.0231, 'lon' => 35.1531, 'ghi' => 4.0, 'wind' => 17.8],
        ['code' => '58', 'name' => 'Sivas',          'slug' => 'sivas',          'region' => 'İç Anadolu',         'lat' => 39.7477, 'lon' => 37.0179, 'ghi' => 4.6, 'wind' => 15.0],
        ['code' => '59', 'name' => 'Tekirdağ',       'slug' => 'tekirdag',       'region' => 'Marmara',            'lat' => 40.9833, 'lon' => 27.5167, 'ghi' => 4.3, 'wind' => 18.8],
        ['code' => '60', 'name' => 'Tokat',          'slug' => 'tokat',          'region' => 'Karadeniz',          'lat' => 40.3167, 'lon' => 36.5500, 'ghi' => 4.3, 'wind' => 13.0],
        ['code' => '61', 'name' => 'Trabzon',        'slug' => 'trabzon',        'region' => 'Karadeniz',          'lat' => 41.0027, 'lon' => 39.7168, 'ghi' => 3.7, 'wind' => 13.8],
        ['code' => '62', 'name' => 'Tunceli',        'slug' => 'tunceli',        'region' => 'Doğu Anadolu',       'lat' => 39.1079, 'lon' => 39.5401, 'ghi' => 4.8, 'wind' => 13.2],
        ['code' => '63', 'name' => 'Şanlıurfa',      'slug' => 'sanliurfa',      'region' => 'Güneydoğu Anadolu',  'lat' => 37.1591, 'lon' => 38.7969, 'ghi' => 5.5, 'wind' => 13.6],
        ['code' => '64', 'name' => 'Uşak',           'slug' => 'usak',           'region' => 'Ege',                'lat' => 38.6823, 'lon' => 29.4082, 'ghi' => 4.8, 'wind' => 14.4],
        ['code' => '65', 'name' => 'Van',            'slug' => 'van',            'region' => 'Doğu Anadolu',       'lat' => 38.4891, 'lon' => 43.4089, 'ghi' => 5.1, 'wind' => 14.6],
        ['code' => '66', 'name' => 'Yozgat',         'slug' => 'yozgat',         'region' => 'İç Anadolu',         'lat' => 39.8181, 'lon' => 34.8147, 'ghi' => 4.5, 'wind' => 14.5],
        ['code' => '67', 'name' => 'Zonguldak',      'slug' => 'zonguldak',      'region' => 'Karadeniz',          'lat' => 41.4564, 'lon' => 31.7987, 'ghi' => 3.9, 'wind' => 15.2],
        ['code' => '68', 'name' => 'Aksaray',        'slug' => 'aksaray',        'region' => 'İç Anadolu',         'lat' => 38.3687, 'lon' => 34.0370, 'ghi' => 4.9, 'wind' => 14.2],
        ['code' => '69', 'name' => 'Bayburt',        'slug' => 'bayburt',        'region' => 'Karadeniz',          'lat' => 40.2552, 'lon' => 40.2249, 'ghi' => 4.4, 'wind' => 13.8],
        ['code' => '70', 'name' => 'Karaman',        'slug' => 'karaman',        'region' => 'İç Anadolu',         'lat' => 37.1759, 'lon' => 33.2287, 'ghi' => 5.3, 'wind' => 15.0],
        ['code' => '71', 'name' => 'Kırıkkale',      'slug' => 'kirikkale',      'region' => 'İç Anadolu',         'lat' => 39.8468, 'lon' => 33.5153, 'ghi' => 4.6, 'wind' => 13.5],
        ['code' => '72', 'name' => 'Batman',         'slug' => 'batman',         'region' => 'Güneydoğu Anadolu',  'lat' => 37.8812, 'lon' => 41.1351, 'ghi' => 5.2, 'wind' => 12.6],
        ['code' => '73', 'name' => 'Şırnak',         'slug' => 'sirnak',         'region' => 'Güneydoğu Anadolu',  'lat' => 37.5164, 'lon' => 42.4611, 'ghi' => 5.2, 'wind' => 13.8],
        ['code' => '74', 'name' => 'Bartın',         'slug' => 'bartin',         'region' => 'Karadeniz',          'lat' => 41.6344, 'lon' => 32.3375, 'ghi' => 3.9, 'wind' => 14.2],
        ['code' => '75', 'name' => 'Ardahan',        'slug' => 'ardahan',        'region' => 'Doğu Anadolu',       'lat' => 41.1105, 'lon' => 42.7022, 'ghi' => 4.3, 'wind' => 14.5],
        ['code' => '76', 'name' => 'Iğdır',          'slug' => 'igdir',          'region' => 'Doğu Anadolu',       'lat' => 39.9167, 'lon' => 44.0333, 'ghi' => 4.7, 'wind' => 12.8],
        ['code' => '77', 'name' => 'Yalova',         'slug' => 'yalova',         'region' => 'Marmara',            'lat' => 40.6500, 'lon' => 29.2667, 'ghi' => 4.2, 'wind' => 15.6],
        ['code' => '78', 'name' => 'Karabük',        'slug' => 'karabuk',        'region' => 'Karadeniz',          'lat' => 41.2061, 'lon' => 32.6204, 'ghi' => 4.0, 'wind' => 12.8],
        ['code' => '79', 'name' => 'Kilis',          'slug' => 'kilis',          'region' => 'Güneydoğu Anadolu',  'lat' => 36.7184, 'lon' => 37.1212, 'ghi' => 5.3, 'wind' => 14.5],
        ['code' => '80', 'name' => 'Osmaniye',       'slug' => 'osmaniye',       'region' => 'Akdeniz',            'lat' => 37.0742, 'lon' => 36.2478, 'ghi' => 5.1, 'wind' => 14.8],
        ['code' => '81', 'name' => 'Düzce',          'slug' => 'duzce',          'region' => 'Karadeniz',          'lat' => 40.8438, 'lon' => 31.1565, 'ghi' => 4.0, 'wind' => 12.2],
    ];
}

function ye_norm_tr(string $s): string
{
    $map = [
        'ç' => 'c', 'Ç' => 'c', 'ğ' => 'g', 'Ğ' => 'g',
        'ı' => 'i', 'I' => 'i', 'İ' => 'i', 'i' => 'i',
        'ö' => 'o', 'Ö' => 'o', 'ş' => 's', 'Ş' => 's', 'ü' => 'u', 'Ü' => 'u',
    ];
    return preg_replace('/[^a-z0-9]/', '', strtolower(strtr(trim($s), $map))) ?? '';
}

function ye_find_prov(?string $q): array
{
    $list = ye_provinces();
    $norm = ye_norm_tr((string)$q);
    if ($norm === '') {
        return $list[5];
    }
    foreach ($list as $p) {
        if ($p['slug'] === $norm || $p['code'] === $norm) {
            return $p;
        }
    }
    foreach ($list as $p) {
        if (str_starts_with($p['slug'], $norm) || str_contains($p['slug'], $norm)) {
            return $p;
        }
    }
    return $list[5];
}

function ye_cache_get(string $slug): array
{
    $safe = preg_replace('/[^a-z0-9]/', '', $slug) ?: 'ankara';
    $file = YE_CACHE_DIR . '/w_' . $safe . '.dat';
    if (!is_file($file)) {
        return ['status' => 'MISS', 'data' => null];
    }
    $fp = @fopen($file, 'rb');
    if ($fp === false) {
        return ['status' => 'MISS', 'data' => null];
    }
    $raw = '';
    if (@flock($fp, LOCK_SH)) {
        $raw = stream_get_contents($fp);
        @flock($fp, LOCK_UN);
    }
    fclose($fp);

    $dec = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
    if (!is_array($dec) || !isset($dec['ts'], $dec['data'])) {
        return ['status' => 'MISS', 'data' => null];
    }
    $age = max(0, time() - (int)$dec['ts']);
    if ($age <= YE_CACHE_TTL) {
        return ['status' => 'HIT', 'data' => $dec['data']];
    }
    if ($age <= YE_CACHE_STALE_TTL) {
        return ['status' => 'STALE', 'data' => $dec['data']];
    }
    return ['status' => 'EXPIRED', 'data' => $dec['data']];
}

function ye_cache_set(string $slug, array $data): void
{
    if (!is_dir(YE_CACHE_DIR)) {
        @mkdir(YE_CACHE_DIR, 0750, true);
    }
    $safe = preg_replace('/[^a-z0-9]/', '', $slug) ?: 'ankara';
    $file = YE_CACHE_DIR . '/w_' . $safe . '.dat';
    $tmp  = $file . '.tmp.' . getmypid() . '.' . bin2hex(random_bytes(3));
    $json = json_encode(['ts' => time(), 'data' => $data], JSON_UNESCAPED_UNICODE);
    if ($json !== false && @file_put_contents($tmp, $json, LOCK_EX) !== false) {
        @rename($tmp, $file);
    } else {
        @unlink($tmp);
    }
}

function ye_estimated_weather(array $prov): array
{
    date_default_timezone_set('Europe/Istanbul');
    $month = (int)date('n');
    $seasonal = [
        1 => 0.48, 2 => 0.62, 3 => 0.84, 4 => 1.08, 5 => 1.28, 6 => 1.45,
        7 => 1.56, 8 => 1.48, 9 => 1.22, 10 => 0.92, 11 => 0.64, 12 => 0.45,
    ][$month] ?? 1.0;

    $ghi = round($prov['ghi'] * $seasonal, 2);
    $baseTemp = [
        1 => 5.5, 2 => 7.0, 3 => 11.2, 4 => 16.0, 5 => 21.0, 6 => 25.5,
        7 => 28.8, 8 => 28.5, 9 => 24.0, 10 => 18.2, 11 => 12.0, 12 => 7.2,
    ][$month] ?? 18.0;

    $latDiff = 39.0 - (float)$prov['lat'];
    $tempC   = round($baseTemp + ($latDiff * 1.4), 1);
    $windKph = round((float)$prov['wind'], 1);
    $cloud   = max(10, min(85, (int)round(55 - ($seasonal - 1.0) * 45)));
    $hum     = max(30, min(88, (int)round(60 - ($latDiff * 2.5))));

    $hourlySolar = [];
    $hourlyWind  = [];
    $peakWm2     = ($ghi * 1000.0) / 5.2;
    for ($h = 0; $h < 24; $h++) {
        if ($h >= 6 && $h <= 19) {
            $hourlySolar[] = (int)round(max(0.0, sin((($h - 6) / 13.0) * M_PI) * $peakWm2));
        } else {
            $hourlySolar[] = 0;
        }
        $hourlyWind[] = round($windKph * (1.0 + 0.18 * sin((($h - 9) / 24.0) * 2.0 * M_PI)), 1);
    }

    return [
        'temp_c'        => $tempC,
        'humidity'      => $hum,
        'wind_kph'      => $windKph,
        'wind_80m_kph'  => round($windKph * 1.34, 1),
        'cloud'         => $cloud,
        'ghi_kwh_m2'    => $ghi,
        'hourly_solar'  => $hourlySolar,
        'hourly_wind'   => $hourlyWind,
        'is_estimation' => true,
        'updated_at'    => date('Y-m-d H:i'),
    ];
}

function ye_fetch_weather(array $prov): array
{
    $slug   = $prov['slug'];
    $cached = ye_cache_get($slug);
    if ($cached['status'] === 'HIT' && is_array($cached['data'])) {
        $d = $cached['data'];
        $d['cache'] = 'HIT';
        return $d;
    }

    $apiKey = ye_cfg('WEATHER_API_KEY', '');
    if (function_exists('curl_init')) {
        $omUrl = sprintf(
            'https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,wind_speed_80m&hourly=shortwave_radiation,wind_speed_10m&daily=shortwave_radiation_sum&timezone=Europe%%2FIstanbul&forecast_days=1',
            rawurlencode((string)$prov['lat']),
            rawurlencode((string)$prov['lon'])
        );

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL            => $omUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 2,
            CURLOPT_TIMEOUT        => 3,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_USERAGENT      => 'YesilEnerjinSimulator/4.0',
        ]);
        $resp = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if (is_string($resp) && $resp !== '' && $code === 200) {
            $om = json_decode($resp, true);
            if (is_array($om) && isset($om['current'])) {
                $c     = $om['current'];
                $radMj = (float)($om['daily']['shortwave_radiation_sum'][0] ?? 0.0);
                $ghi   = $radMj > 0.2 ? round($radMj * 0.27778, 2) : (float)$prov['ghi'];

                $hSolar = array_slice(array_map('intval', $om['hourly']['shortwave_radiation'] ?? []), 0, 24);
                $hWind  = array_slice(array_map(fn($v) => round((float)$v, 1), $om['hourly']['wind_speed_10m'] ?? []), 0, 24);
                if (count($hSolar) < 24) {
                    $est    = ye_estimated_weather($prov);
                    $hSolar = $est['hourly_solar'];
                    $hWind  = $est['hourly_wind'];
                }

                $w10 = max(0.5, round((float)($c['wind_speed_10m'] ?? $prov['wind']), 1));
                $w80 = max($w10, round((float)($c['wind_speed_80m'] ?? ($w10 * 1.34)), 1));

                $payload = [
                    'temp_c'        => round((float)($c['temperature_2m'] ?? 18.0), 1),
                    'humidity'      => min(100, max(0, (int)($c['relative_humidity_2m'] ?? 55))),
                    'wind_kph'      => $w10,
                    'wind_80m_kph'  => $w80,
                    'cloud'         => min(100, max(0, (int)($c['cloud_cover'] ?? 25))),
                    'ghi_kwh_m2'    => $ghi,
                    'hourly_solar'  => $hSolar,
                    'hourly_wind'   => $hWind,
                    'is_estimation' => true,
                    'updated_at'    => date('Y-m-d H:i'),
                ];
                ye_cache_set($slug, $payload);
                $payload['cache'] = 'MISS';
                return $payload;
            }
        }

        if ($apiKey !== '') {
            $waUrl = 'https://api.weatherapi.com/v1/current.json?key='
                . rawurlencode($apiKey)
                . '&q=' . rawurlencode($prov['lat'] . ',' . $prov['lon'])
                . '&aqi=no';
            $ch = curl_init();
            curl_setopt_array($ch, [
                CURLOPT_URL            => $waUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_CONNECTTIMEOUT => 2,
                CURLOPT_TIMEOUT        => 3,
                CURLOPT_SSL_VERIFYPEER => true,
                CURLOPT_SSL_VERIFYHOST => 2,
            ]);
            $waResp = curl_exec($ch);
            $waCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if (is_string($waResp) && $waResp !== '' && $waCode === 200) {
                $wa = json_decode($waResp, true);
                if (is_array($wa) && isset($wa['current'])) {
                    $c   = $wa['current'];
                    $est = ye_estimated_weather($prov);
                    $w10 = max(0.5, round((float)($c['wind_kph'] ?? $prov['wind']), 1));
                    $payload = [
                        'temp_c'        => round((float)($c['temp_c'] ?? $est['temp_c']), 1),
                        'humidity'      => min(100, max(0, (int)($c['humidity'] ?? $est['humidity']))),
                        'wind_kph'      => $w10,
                        'wind_80m_kph'  => round($w10 * 1.34, 1),
                        'cloud'         => min(100, max(0, (int)($c['cloud'] ?? $est['cloud']))),
                        'ghi_kwh_m2'    => $est['ghi_kwh_m2'],
                        'hourly_solar'  => $est['hourly_solar'],
                        'hourly_wind'   => $est['hourly_wind'],
                        'is_estimation' => true,
                        'updated_at'    => date('Y-m-d H:i'),
                    ];
                    ye_cache_set($slug, $payload);
                    $payload['cache'] = 'MISS';
                    return $payload;
                }
            }
        }
    }

    if (is_array($cached['data'])) {
        $d = $cached['data'];
        $d['cache'] = 'STALE';
        return $d;
    }

    $est = ye_estimated_weather($prov);
    $est['cache'] = 'ESTIMATED';
    return $est;
}

$route = strtolower(trim((string)($_GET['r'] ?? 'boot')));

// Sitemap arama motorlarına açıktır
if ($route === 'sitemap') {
    header('Content-Type: application/xml; charset=UTF-8');
    header('Cache-Control: public, max-age=3600');
    $defaultHost = ye_cfg('SITE_DOMAIN', 'example.com');
    $https = (!empty($_SERVER['HTTPS']) && strtolower((string)$_SERVER['HTTPS']) !== 'off');
    $host  = preg_replace('/[^a-zA-Z0-9.\-:]/', '', (string)($_SERVER['HTTP_HOST'] ?? $defaultHost)) ?: $defaultHost;
    $base  = ($https ? 'https://' : 'http://') . $host . rtrim(ye_cfg('SITE_BASE', '/'), '/') . '/';

    $pages = ['', 'tools/calc', 'page/about', 'page/faq', 'page/contact', 'page/privacy', 'page/terms'];
    $langs = ['tr', 'en', 'de', 'es', 'ru', 'ja'];
    echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' . PHP_EOL;
    foreach ($pages as $p) {
        $loc = htmlspecialchars($base . $p, ENT_QUOTES, 'UTF-8');
        echo "  <url>" . PHP_EOL;
        echo "    <loc>{$loc}</loc>" . PHP_EOL;
        foreach ($langs as $lg) {
            $alt = htmlspecialchars($base . $p . '?lang=' . $lg, ENT_QUOTES, 'UTF-8');
            echo "    <xhtml:link rel=\"alternate\" hreflang=\"{$lg}\" href=\"{$alt}\" />" . PHP_EOL;
        }
        echo "    <changefreq>" . ($p === 'tools/calc' ? 'daily' : 'weekly') . "</changefreq>" . PHP_EOL;
        echo "    <priority>" . ($p === '' ? '1.0' : ($p === 'tools/calc' ? '0.9' : '0.7')) . "</priority>" . PHP_EOL;
        echo "  </url>" . PHP_EOL;
    }
    echo "</urlset>" . PHP_EOL;
    exit;
}

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

// Anti-bot ve doğrudan tarayıcı/scraper erişim engeli
if (ye_is_bot_request()) {
    http_response_code(403);
    echo json_encode([
        'ok'    => false,
        'error' => 'Yetkisiz API erişimi engellendi (Bot ve doğrudan erişim koruması aktif).',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$rl = ye_rate_limit();
header('X-RateLimit-Remaining: ' . $rl['rem']);
if (!$rl['ok']) {
    http_response_code(429);
    echo json_encode([
        'ok'    => false,
        'error' => 'Çok fazla istek gönderildi. Lütfen kısa bir süre bekleyin.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($route === 'boot') {
    $prov   = ye_find_prov((string)($_GET['city'] ?? 'ankara'));
    $cached = ye_cache_get($prov['slug']);
    $w      = is_array($cached['data']) ? $cached['data'] : ye_estimated_weather($prov);
    $w['cache'] = $cached['status'];

    echo json_encode([
        'ok'     => true,
        'config' => [
            'profile' => [
                'name'  => ye_cfg('SITE_NAME', 'YeşilEnerjin'),
                'email' => ye_cfg('CONTACT_EMAIL', 'info@example.com'),
            ],
            'provinces' => ye_provinces(),
        ],
        'initial' => [
            'province' => $prov,
            'weather'  => $w,
        ],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($route === 'cities') {
    $q   = ye_norm_tr((string)($_GET['q'] ?? ''));
    $all = ye_provinces();
    if ($q === '') {
        echo json_encode(['ok' => true, 'cities' => array_slice($all, 0, 12)], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $starts = [];
    $contains = [];
    foreach ($all as $p) {
        if ($p['code'] === $q || str_starts_with($p['slug'], $q)) {
            $starts[] = $p;
        } elseif (str_contains($p['slug'], $q) || str_contains(ye_norm_tr($p['region']), $q)) {
            $contains[] = $p;
        }
    }
    echo json_encode([
        'ok'     => true,
        'cities' => array_slice(array_merge($starts, $contains), 0, 12),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($route === 'weather') {
    $prov = ye_find_prov((string)($_GET['city'] ?? 'ankara'));
    $w    = ye_fetch_weather($prov);
    echo json_encode([
        'ok'       => true,
        'province' => $prov,
        'weather'  => $w,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Geçersiz uç nokta.'], JSON_UNESCAPED_UNICODE);
