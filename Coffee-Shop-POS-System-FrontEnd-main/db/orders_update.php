<?php
header('Content-Type: application/json');
require_once __DIR__ . '/db_connect.php';

$orderID = intval($_POST['orderID'] ?? 0);
$action  = $_POST['action'] ?? '';

if (!$orderID || !in_array($action, ['complete','cancel'])) {
    echo json_encode(['status'=>'error','message'=>'Invalid request']);
    exit;
}

$newStatus = $action === 'complete' ? 'completed' : 'cancelled';
$stmt = $conn->prepare("UPDATE orders SET status=? WHERE orderID=?");
$stmt->bind_param('si', $newStatus, $orderID);
$stmt->execute();

echo json_encode(['status'=>'success','orderID'=>$orderID,'newStatus'=>$newStatus]);
