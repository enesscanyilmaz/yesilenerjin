<?php
$currentPath = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

function isFooterActive($path, $currentPath){
    return $path === $currentPath ? 'fw-bold text-success' : '';
}
?>


<footer class="bg-dark text-light mt-5 p-4">
    <div class="container">
        <div class="row text-center text-md-start">

            <div class="col-md-4 mb-3">
                <h5>Hakkında</h5>
                <p><?= htmlspecialchars($footer_description) ?></p>
            </div>

            <div class="col-md-4 mb-3">
                <h5>Bağlantılar</h5>
                <ul class="list-unstyled">
                    <li>
                        <a href="page/terms"
                           class="text-decoration-none text-light <?= isFooterActive('page/terms', $currentPath) ?>">
                            Kullanım Şartları
                        </a>
                    </li>
                    <li>
                        <a href="page/privacy"
                           class="text-decoration-none text-light <?= isFooterActive('page/privacy', $currentPath) ?>">
                            Gizlilik Politikası
                        </a>
                    </li>
                    <li>
                        <a href="page/faq"
                           class="text-decoration-none text-light <?= isFooterActive('page/faq', $currentPath) ?>">
                            Sık Sorulan Sorular
                        </a>
                    </li>
                </ul>
            </div>

            <div class="col-md-4 mb-3">
                <h5>İletişim</h5>
                <p>
                    E-posta:
                    <a href="mailto:<?= $contact_email ?>" class="text-light">
                        <?= $contact_email ?>
                    </a>
                </p>
                <div>
                    <a href="." class="text-light me-2"><i class="bi bi-facebook"></i></a>
                    <a href="." class="text-light me-2"><i class="bi bi-twitter-x"></i></a>
                    <a href="." class="text-light me-2"><i class="bi bi-instagram"></i></a>
                </div>
            </div>

        </div>

        <hr>
        <p class="text-center mb-0">
            &copy; 2025 <?= htmlspecialchars($site_name) ?> - Tüm hakları saklıdır.
        </p>
    </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>