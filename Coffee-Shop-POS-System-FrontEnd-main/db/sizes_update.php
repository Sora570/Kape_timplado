<?php
require_once __DIR__ . '/db_connect.php';

$sizeID = intval($_POST['sizeID'] ?? 0);
$sizeName = $_POST['sizeName'] ?? '';
$defaultPrice = floatval($_POST['defaultPrice'] ?? 0);

$stmt = $conn->prepare("UPDATE sizes SET sizeName=?, defaultPrice=? WHERE sizeID=?");
$stmt->bind_param("sdi", $sizeName, $defaultPrice, $sizeID);
$ok = $stmt->execute();
echo $ok ? "success" : ("error: " . $stmt->error);

if ($ok) {
  $_POST['userEmail'] = $_POST['userEmail'] ?? 'Guest';
  $_POST['actionType'] = 'EDIT_SIZE';
  $_POST['details'] = "Edited size ID={$sizeID} -> {$sizeName} ({$defaultPrice})";
  include __DIR__ . '/logAction.php';
}