<?php
require_once __DIR__.'/../includes/functions.php'; require_login();
if($_SERVER['REQUEST_METHOD']!=='POST') json_response(['error'=>'Method not allowed'],405);
verify_csrf();$answers=$_POST['answers']??[];$title=trim($_POST['title']??'MCQ Practice');
if(!$answers) {flash('No answers submitted.','error');redirect('../index.php?page=mcq');}
$pdo=db();$ids=array_map('intval',array_keys($answers));$in=implode(',',array_fill(0,count($ids),'?'));
$st=$pdo->prepare("SELECT q.id,q.correct_option,q.explanation FROM questions q WHERE q.id IN ($in)");$st->execute($ids);$questions=$st->fetchAll();$correct=0;
foreach($questions as $q){if(($answers[$q['id']]??'')===$q['correct_option'])$correct++;}
$total=count($questions);$pct=$total?($correct/$total*100):0;
$pdo->beginTransaction();
try{$pdo->prepare('INSERT INTO attempts(title,total_questions,correct_answers,score_percent) VALUES(?,?,?,?)')->execute([$title,$total,$correct,$pct]);$attempt=(int)$pdo->lastInsertId();
$ins=$pdo->prepare('INSERT INTO responses(attempt_id,question_id,selected_option,is_correct) VALUES(?,?,?,?)');
foreach($questions as $q){$selected=$answers[$q['id']]??null;$ok=$selected===$q['correct_option'];$ins->execute([$attempt,$q['id'],$selected,$ok?1:0]);if(!$ok)$pdo->prepare('INSERT INTO revision_items(question_id,source_attempt_id,next_review_at) VALUES(?,?,DATE_ADD(NOW(),INTERVAL 1 DAY)) ON DUPLICATE KEY UPDATE source_attempt_id=VALUES(source_attempt_id),next_review_at=VALUES(next_review_at),review_count=review_count')->execute([$q['id'],$attempt]);}
$pdo->commit();
}catch(Throwable $e){$pdo->rollBack();throw $e;}
unset($_SESSION['mcq_session']);flash("Assessment completed: $correct/$total correct (".number_format($pct,1)."%).");redirect('../index.php?page=analytics');
