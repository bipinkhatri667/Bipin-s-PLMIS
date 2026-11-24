<?php
require_once __DIR__ . '/includes/functions.php';
$count = (int)db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
$error = '';
if ($count > 0) { http_response_code(403); exit('SLMS is already initialized. Delete or restrict setup.php.'); }
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 12) {
        $error = 'Enter your name, a valid email and a password of at least 12 characters.';
    } else {
        $stmt = db()->prepare('INSERT INTO users (name,email,password_hash) VALUES (?,?,?)');
        $stmt->execute([$name,$email,password_hash($password,PASSWORD_DEFAULT)]);
        $_SESSION['owner_id'] = (int)db()->lastInsertId();
        $_SESSION['owner_name'] = $name;
        session_regenerate_id(true);
        redirect('index.php');
    }
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Set up SLMS</title><link rel="stylesheet" href="assets/css/app.css"></head>
<body class="auth-page"><form class="auth-card" method="post"><div class="brand-mark">SL</div><h1>Set up your SLMS</h1><p>Create the single owner account for your private learning workspace.</p>
<?php if($error): ?><div class="alert error"><?=e($error)?></div><?php endif; ?>
<input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><label>Your name</label><input name="name" required>
<label>Email</label><input type="email" name="email" required><label>Password (minimum 12 characters)</label><input type="password" name="password" minlength="12" required>
<button class="btn primary full">Create owner account</button><small>Setup is available only before the first account is created.</small></form></body></html>
