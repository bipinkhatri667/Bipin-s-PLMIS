<?php
declare(strict_types=1);

define('APP_NAME', 'SLMS');
define('APP_FULL_NAME', 'Self Learning Management System');
define('APP_URL', 'http://localhost/SLMS'); // Change for your installation; no trailing slash.
define('APP_KEY', 'CHANGE-THIS-TO-A-LONG-RANDOM-SECRET-BEFORE-DEPLOYMENT');

define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'slms_database');
define('DB_USER', 'root');
define('DB_PASS', '');

define('AI_ENABLED', false);
define('AI_API_URL', '');  // Example: https://provider.example/v1/chat/completions
define('AI_API_KEY', '');
define('AI_MODEL', '');

define('UPLOAD_MAX_BYTES', 15 * 1024 * 1024);
define('TIMEZONE', 'Asia/Kathmandu');

date_default_timezone_set(TIMEZONE);
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'httponly' => true,
        'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'samesite' => 'Lax'
    ]);
    session_start();
}
