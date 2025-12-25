<?php
include __DIR__ . '/../config.php';

$title       = $page_title ?? $site_name;
$description = $page_description ?? $site_description;
$image       = $page_image ?? $default_image;
$robots      = $page_robots ?? "index,follow";

$currentUrl = $base . ltrim($_SERVER['REQUEST_URI'], '/');
?>
<!DOCTYPE html>
<html lang="tr">
<head>

    <base href="<?= htmlspecialchars($base) ?>">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- BASIC SEO -->
    <title><?= htmlspecialchars($title) ?></title>
    <meta name="description" content="<?= htmlspecialchars($description) ?>">
    <meta name="robots" content="<?= htmlspecialchars($robots) ?>">
    <link rel="canonical" href="<?= htmlspecialchars($currentUrl) ?>">

    <!-- OPEN GRAPH -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="<?= htmlspecialchars($site_name) ?>">
    <meta property="og:title" content="<?= htmlspecialchars($title) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($description) ?>">
    <meta property="og:url" content="<?= htmlspecialchars($currentUrl) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($base . $image) ?>">
    <meta property="og:locale" content="tr_TR">

    <!-- TWITTER -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($title) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($description) ?>">
    <meta name="twitter:image" content="<?= htmlspecialchars($base . $image) ?>">

    <!-- FAVICON -->
    <link rel="shortcut icon" href="<?= $base ?>assets/img/favicon.ico">

    <!-- PERFORMANCE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">

    <!-- CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- JS -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>
<body class="bg-light">
