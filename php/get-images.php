<?php

include("./partials/dbconnect.php");

$type = $_GET["type"];

$stmt = $pdo->prepare("SELECT * FROM `images` INNER JOIN `types` ON `images`.`type` = `types`.`type_id` WHERE `types`.`type`= '$type';");

$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo (json_encode($results));
