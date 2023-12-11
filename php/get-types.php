<?php


include("partials/dbconnect.php");

$stmt = $pdo->prepare("SELECT * FROM `types`");

$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo (json_encode($results));
