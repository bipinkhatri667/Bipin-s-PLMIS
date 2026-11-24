<?php $flash=get_flash(); $nav=[
['Overview',[['dashboard','Dashboard','layout-dashboard']]],
['LEARNING',[['courses','My Courses','book-open'],['resources','Resource Library','library']]],
['ASSESSMENT',[['mcq','MCQ Practice','clipboard-check'],['revision','Revision Centre','brain']]],
['INSIGHTS',[['analytics','Learning Analytics','chart-no-axes-combined'],['goals','Learning Goals','target'],['planner','Study Planner','calendar-days'],['journal','Learning Journal','notebook-pen']]],
['PERSONAL',[['ai','Learning Assistant','sparkles'],['settings','Settings & Backup','settings']]]]; ?>
<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#17365d"><meta name="description" content="Personal self-directed learning workspace">
<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="assets/icons/icon-192.png"><link rel="stylesheet" href="assets/css/app.css"><title><?=e($pageTitle)?> · SLMS</title></head><body>
<div class="app-shell"><aside class="sidebar" id="sidebar"><a class="brand" href="index.php"><span class="brand-mark">SL</span><span><b>SLMS</b><small>Self Learning</small></span></a>
<nav><?php foreach($nav as $group=>$items):?><div class="nav-group"><div class="nav-label"><?=$group?></div><?php foreach($items as [$slug,$label,$icon]):?><a class="nav-link <?=$page===$slug?'active':''?>" href="index.php?page=<?=$slug?>"><span class="nav-icon"><?=icon_svg($icon)?></span><span class="nav-text"><?=e($label)?></span></a><?php endforeach;?></div><?php endforeach;?></nav>
<div class="sidebar-bottom"><div class="owner-mini"><span class="avatar"><?=e(strtoupper(substr($_SESSION['owner_name']??'U',0,1)))?></span><span class="nav-text"><b><?=e($_SESSION['owner_name']??'Learner')?></b><small>Personal workspace</small></span></div><a class="nav-link" href="logout.php"><span class="nav-icon"><?=icon_svg('log-out')?></span><span class="nav-text">Sign out</span></a></div></aside>
<main class="main-area"><header class="topbar"><button class="icon-btn" id="sidebarToggle" aria-label="Toggle navigation">☰</button><div class="breadcrumb">SLMS <span>/</span> <?=e($pageTitle)?></div><div class="top-actions"><button class="icon-btn" id="themeToggle" title="Switch theme">◐</button><span class="date-label"><?=date('D, d M Y')?></span></div></header>
<div class="content-wrap"><?php if($flash):?><div class="alert <?=e($flash['type'])?>"><?=e($flash['message'])?></div><?php endif;?>
