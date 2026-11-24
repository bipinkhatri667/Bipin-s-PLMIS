<?php
require_once __DIR__.'/../includes/functions.php';require_login();
$tables=['users','courses','subjects','chapters','lessons','resources','goals','tasks','attempts','responses','questions','options','study_logs','journal','revision_items','settings'];
$out=['application'=>'SLMS','exported_at'=>date(DATE_ATOM),'data'=>[]];
foreach($tables as $t){try{$out['data'][$t]=db()->query("SELECT * FROM `$t`")->fetchAll();}catch(Throwable $e){$out['data'][$t]=[];}}
header('Content-Type: application/json');header('Content-Disposition: attachment; filename="slms-backup-'.date('Ymd-His').'.json"');
echo json_encode($out,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
