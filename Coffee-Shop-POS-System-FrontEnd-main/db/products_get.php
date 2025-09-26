<?php
// db/products_get.php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db_connect.php';

$sql = "SELECT p.productID, p.productName, c.categoryName AS category, p.isActive, p.categoryID
        FROM products p
        JOIN categories c ON p.categoryID = c.categoryID
        JOIN (
            SELECT categoryID, MIN(productID) AS firstProductID
            FROM products
            GROUP BY categoryID
        ) mc ON mc.categoryID = p.categoryID
        ORDER BY mc.firstProductID, p.productID";

$res = $conn->query($sql);
$list = [];

if ($res) {
    while ($p = $res->fetch_assoc()) {
        $pid = intval($p['productID']);

        $ps = $conn->prepare("
            SELECT s.sizeID, s.sizeName, COALESCE(pp.price, s.defaultPrice) AS price
            FROM sizes s
            LEFT JOIN product_prices pp ON s.sizeID = pp.sizeID AND pp.productID = ?
            ORDER BY s.sizeID
        ");
        $ps->bind_param('i', $pid);
        $ps->execute();
        $prs = $ps->get_result();

        $sizes = [];
        while ($s = $prs->fetch_assoc()) {
            $sizes[] = $s;
        }
        $p['sizes'] = $sizes;
        $p['addons'] = []; // placeholder if you add addons later

        $list[] = $p;
    }
}

echo json_encode($list, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
