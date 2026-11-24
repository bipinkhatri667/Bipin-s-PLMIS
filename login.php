<?php
require_once __DIR__ . '/includes/functions.php';
if (is_logged_in()) redirect('index.php');
$error='';
if ($_SERVER['REQUEST_METHOD']==='POST') {
    verify_csrf();
    $stmt=db()->prepare('SELECT id,name,password_hash FROM users WHERE email=? LIMIT 1');
    $stmt->execute([trim($_POST['email']??'')]); $u=$stmt->fetch();
    if ($u && password_verify($_POST['password']??'', $u['password_hash'])) {
        session_regenerate_id(true); $_SESSION['owner_id']=(int)$u['id']; $_SESSION['owner_name']=$u['name'];
        redirect('index.php');
    }
    $error='Invalid email or password.';
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Login · SLMS</title><link rel="stylesheet" href="assets/css/app.css"></head>
<body class="auth-page"><form class="auth-card" method="post"><div class="brand-mark">SL</div><h1>Welcome back</h1><p>Continue your personal learning journey.</p><?php if($error):?><div class="alert error"><?=e($error)?></div><?php endif;?>
<input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><label>Email</label><input type="email" name="email" required autofocus><label>Password</label><input type="password" name="password" required><button class="btn primary full">Sign in</button></form></body></html>
