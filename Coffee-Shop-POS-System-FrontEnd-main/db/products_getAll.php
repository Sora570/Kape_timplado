<?php
// db/products_getAll.php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db_connect.php';

$sql = "SELECT 
            p.productID, 
            p.productName, 
            p.categoryID, 
            p.isActive,
            c.categoryName
        FROM products p
        JOIN categories c ON p.categoryID = c.categoryID
        ORDER BY p.categoryID, p.productID";

$res = $conn->query($sql);
$out = [];

if ($res) {
    while ($row = $res->fetch_assoc()) {
        $pid = (int)$row['productID'];

        // Fetch sizes + price for this product
        $sstmt = $conn->prepare("
            SELECT s.sizeID, s.sizeName, COALESCE(pp.price, s.defaultPrice) AS price
            FROM sizes s
            LEFT JOIN product_prices pp ON s.sizeID = pp.sizeID AND pp.productID = ?
            ORDER BY s.sizeID
        ");
        $sstmt->bind_param('i', $pid);
        $sstmt->execute();
        $sres = $sstmt->get_result();

        $sizes = [];
        while ($s = $sres->fetch_assoc()) {
            $sizes[] = $s;
        }
        $row['sizes'] = $sizes;

        $out[] = $row;
    }
}

echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
