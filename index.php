<?php
require_once __DIR__ . '/includes/functions.php';
require_login();
$allowed=['dashboard','courses','resources','mcq','analytics','goals','planner','revision','journal','ai','settings'];
$page=$_GET['page']??'dashboard';
if(!in_array($page,$allowed,true)) $page='dashboard';
$pageTitle=ucwords(str_replace('_',' ',$page));
require __DIR__.'/includes/header.php';
$file=__DIR__.'/pages/'.$page.'.php';
if(is_file($file)) require $file; else echo '<div class="card">Page not found.</div>';
require __DIR__.'/includes/footer.php';
