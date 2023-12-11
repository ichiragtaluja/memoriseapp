<?php


include("partials/dbconnect.php");

$level = $_GET["level"];

$stmt = $pdo->prepare("SELECT * FROM `levels` WHERE `level_name`='$level'");

$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo (json_encode($results));
