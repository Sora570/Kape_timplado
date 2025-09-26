<?php
// db/product_prices_get.php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db_connect.php';

$pid = intval($_GET['productID'] ?? 0);
if (!$pid) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("
    SELECT s.sizeID, s.sizeName, COALESCE(pp.price, s.defaultPrice) AS price
    FROM sizes s
    LEFT JOIN product_prices pp ON s.sizeID = pp.sizeID AND pp.productID = ?
    ORDER BY s.sizeID
");
$stmt->bind_param('i', $pid);
$stmt->execute();
$res = $stmt->get_result();

$out = [];
while ($r = $res->fetch_assoc()) {
    $out[] = $r;
}

echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
