<?php
$currentPath = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

function navActive($path, $currentPath) {
    return ($path === $currentPath) ? 'active' : '';
}
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-success shadow-sm py-3">
    <div class="container-fluid">

        <!-- Logo -->
        <a class="navbar-brand fw-bold text-uppercase d-flex align-items-center" href=".">
            <img src="assets/img/logo.png" alt="Logo" width="170" class="me-2">
        </a>

        <!-- Menü -->
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <a class="nav-link <?= navActive('', $currentPath) ?>" href=".">
                        Ana Sayfa
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link <?= navActive('page/about', $currentPath) ?>" href="page/about">
                        Hakkında
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link <?= navActive('page/contact', $currentPath) ?>" href="page/contact">
                        İletişim
                    </a>
                </li>

            </ul>
        </div>

        <!-- Arama -->
        <form id="searchFormNav" class="d-flex ms-auto position-relative" role="search">
            <input id="citySearchNav" class="form-control me-2" type="search" placeholder="İl ara..." aria-label="Search">
            <div id="cityListNav" class="list-group position-absolute"></div>
            <button id="searchBtnNav" class="btn btn-outline-light" type="button">Ara</button>
        </form>

        <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>

    </div>
</nav>

