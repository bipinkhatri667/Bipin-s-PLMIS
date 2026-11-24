<?php
require_once __DIR__.'/../includes/functions.php';require_login();
if($_SERVER['REQUEST_METHOD']!=='POST')json_response(['error'=>'POST required'],405);
verify_csrf();
if(!AI_ENABLED||!AI_API_URL||!AI_API_KEY)json_response(['error'=>'AI is not configured. Set AI_ENABLED, AI_API_URL, AI_API_KEY and AI_MODEL in config/config.php.'],503);
$input=json_decode(file_get_contents('php://input'),true);$prompt=trim($input['prompt']??'');
if($prompt==='')json_response(['error'=>'Enter a question.'],422);
$payload=['model'=>AI_MODEL,'messages'=>[['role'=>'system','content'=>'You are a careful self-learning assistant. Explain concepts clearly, encourage independent verification, and do not claim certainty when unsure.'],['role'=>'user','content'=>$prompt]]];
$ch=curl_init(AI_API_URL);curl_setopt_array($ch,[CURLOPT_POST=>true,CURLOPT_RETURNTRANSFER=>true,CURLOPT_HTTPHEADER=>['Content-Type: application/json','Authorization: Bearer '.AI_API_KEY],CURLOPT_POSTFIELDS=>json_encode($payload),CURLOPT_TIMEOUT=>45]);
$result=curl_exec($ch);$status=(int)curl_getinfo($ch,CURLINFO_HTTP_CODE);$err=curl_error($ch);curl_close($ch);
if($result===false)json_response(['error'=>'AI request failed: '.$err],502);
$data=json_decode($result,true);$answer=$data['choices'][0]['message']['content']??null;
if(!$answer)json_response(['error'=>'The configured AI provider returned an unsupported response format.','status'=>$status],502);
json_response(['answer'=>$answer]);
