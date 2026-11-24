<?php
$pdo=db();
$courses=(int)$pdo->query("SELECT COUNT(*) FROM courses")->fetchColumn();
$resources=(int)$pdo->query("SELECT COUNT(*) FROM resources")->fetchColumn();
$attempts=(int)$pdo->query("SELECT COUNT(*) FROM attempts")->fetchColumn();
$avg=(float)$pdo->query("SELECT COALESCE(AVG(score_percent),0) FROM attempts")->fetchColumn();
$hours=(float)$pdo->query("SELECT COALESCE(SUM(duration_minutes),0)/60 FROM study_logs")->fetchColumn();
$goals=(int)$pdo->query("SELECT COUNT(*) FROM goals WHERE status='completed'")->fetchColumn();
$tasks=$pdo->query("SELECT * FROM tasks WHERE task_date=CURDATE() ORDER BY priority DESC LIMIT 6")->fetchAll();
$recent=$pdo->query("SELECT a.* FROM attempts a ORDER BY a.created_at DESC LIMIT 5")->fetchAll();
?>
<div class="page-heading"><div><p class="eyebrow">YOUR LEARNING SPACE</p><h1>Welcome back, <?=e($_SESSION['owner_name'])?>!</h1><p class="muted">A little progress every day adds up to big results.</p></div><a class="btn primary" href="index.php?page=planner">＋ Plan learning</a></div>
<div class="stat-grid">
<div class="stat-card"><span class="stat-icon blue">▤</span><div><small>My courses</small><strong><?=$courses?></strong><small class="muted">Learning collections</small></div></div>
<div class="stat-card"><span class="stat-icon green">◉</span><div><small>Average MCQ score</small><strong><?=number_format($avg,1)?>%</strong><small class="muted"><?=$attempts?> attempts</small></div></div>
<div class="stat-card"><span class="stat-icon amber">◷</span><div><small>Recorded study time</small><strong><?=number_format($hours,1)?>h</strong><small class="muted">Across all sessions</small></div></div>
<div class="stat-card"><span class="stat-icon violet">▣</span><div><small>Resources saved</small><strong><?=$resources?></strong><small class="muted"><?=$goals?> goals completed</small></div></div>
</div>
<div class="dashboard-grid">
<section class="card span-2"><div class="card-head"><div><h2>Today's learning plan</h2><p class="muted">Your tasks for today</p></div><a href="index.php?page=planner">View planner →</a></div>
<?php if(!$tasks):?><div class="empty-state"><div>☀</div><b>No tasks scheduled for today</b><p>Add a small, achievable learning task to get started.</p><a class="btn secondary" href="index.php?page=planner">Create a task</a></div><?php else: foreach($tasks as $t):?><div class="task-row"><span class="task-dot"></span><div class="grow"><b><?=e($t['title'])?></b><small><?=e($t['description']??'')?></small></div><span class="pill <?=$t['status']==='completed'?'success':'neutral'?>"><?=e($t['status'])?></span></div><?php endforeach; endif;?></section>
<section class="card"><div class="card-head"><div><h2>Quick access</h2><p class="muted">Jump into a module</p></div></div><div class="quick-grid"><a href="index.php?page=mcq"><b>✓</b><span>MCQ practice</span></a><a href="index.php?page=resources"><b>▤</b><span>Library</span></a><a href="index.php?page=goals"><b>◎</b><span>Goals</span></a><a href="index.php?page=journal"><b>✎</b><span>Journal</span></a></div></section>
<section class="card span-2"><div class="card-head"><div><h2>Recent assessment activity</h2><p class="muted">Your latest practice attempts</p></div><a href="index.php?page=analytics">Analytics →</a></div>
<?php if(!$recent):?><div class="empty-state compact">No assessment attempts yet. Start with a short MCQ practice session.</div><?php else:?><div class="table-wrap"><table><thead><tr><th>Date</th><th>Assessment</th><th>Questions</th><th>Score</th></tr></thead><tbody><?php foreach($recent as $r):?><tr><td><?=e(date('d M Y',strtotime($r['created_at'])))?></td><td><?=e($r['title'])?></td><td><?=$r['total_questions']?></td><td><b><?=number_format((float)$r['score_percent'],1)?>%</b></td></tr><?php endforeach;?></tbody></table></div><?php endif;?></section>
<section class="card"><div class="card-head"><div><h2>Learning rhythm</h2><p class="muted">Recorded time by activity</p></div></div><div class="big-number"><?=number_format($hours,1)?> <small>hours</small></div><p class="muted">Total recorded study time. Log study sessions to build your personal trend.</p><a class="btn secondary full" href="index.php?page=analytics">Explore analytics</a></section>
</div>
