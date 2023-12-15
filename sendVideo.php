<?php
    $webhookURL = 'YOUR_WEBHOOK_URL';
    $videoPath = $_FILES['video']['tmp_name'];
    $videoName = $_FILES['video']['name'];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $webhookURL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $attachment = curl_file_create($videoPath, 'video/mp4', $videoName);
    $payload = array(
        'content' => 'Sending video:',
        'file' => $attachment,
    );
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

    $result = curl_exec($ch);
    curl_close($ch);
?>
