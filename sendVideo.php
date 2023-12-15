<?php
    $webhookURL = 'https://discord.com/api/webhooks/1185341369003294791/v9FFc4vC0djnH88Hqfjeyuu1zSRaG767rcerNR8V66eTOXDTA8RJ_ncl98JN9oY9gcnM';
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
