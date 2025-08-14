<?php
header('Access-Control-Allow-Origin: *');
$url = 'https://app.frontpad.ru/api/index.php?new_order';
$data = file_get_contents('php://input');
$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => $data
    ]
];
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo $result;
?>