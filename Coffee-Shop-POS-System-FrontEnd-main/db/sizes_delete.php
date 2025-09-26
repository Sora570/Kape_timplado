<?php
require_once __DIR__ . '/db_connect.php';
$id = intval($_POST['sizeID'] ?? 0);
if (!$id) { echo "error: Missing sizeID"; exit; }
$stmt = $conn->prepare("DELETE FROM sizes WHERE sizeID=?");
$stmt->bind_param("i", $id);
echo $stmt->execute() ? "success" : "error: ".$stmt->error;