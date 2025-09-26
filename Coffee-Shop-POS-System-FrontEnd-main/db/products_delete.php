<?php
require_once __DIR__ . '/db_connect.php';

$productID = intval($_POST['productID'] ?? 0);
$stmt = $conn->prepare("DELETE FROM products WHERE productID=?");
$stmt->bind_param("i", $productID);
$ok = $stmt->execute();
echo $ok ? "success" : ("error: " . $stmt->error);

if ($ok) {
  $_POST['userEmail'] = $_POST['userEmail'] ?? 'Guest';
  $_POST['actionType'] = 'DELETE_PRODUCT';
  $_POST['details'] = "Deleted product ID={$productID}";
  include __DIR__ . '/logAction.php';
}