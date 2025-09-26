<?php
require_once __DIR__ . '/db_connect.php';

// Basic product info
$productName = $_POST['productName'] ?? '';
$categoryID  = intval($_POST['categoryID'] ?? 0);
$isActive    = isset($_POST['isActive']) ? 1 : 0;

// Validate
if (!$productName || !$categoryID) {
    echo "error: Missing product name or category";
    exit;
}

// Insert product
$stmt = $conn->prepare("INSERT INTO products (productName, categoryID, isActive) VALUES (?,?,?)");
$stmt->bind_param("sii", $productName, $categoryID, $isActive);
if (!$stmt->execute()) {
    echo "error: " . $stmt->error;
    exit;
}
$productID = $stmt->insert_id;

// Insert sizes and prices
foreach ($_POST as $key => $value) {
    if (strpos($key, 'size_') === 0 && is_numeric($value)) {
        $sizeID = intval(str_replace('size_', '', $key));
        $price  = floatval($value);
        if ($price > 0) {
            $ps = $conn->prepare("INSERT INTO product_prices (productID, sizeID, price) VALUES (?,?,?)");
            $ps->bind_param("iid", $productID, $sizeID, $price);
            $ps->execute();
        }
    }
}

echo "success";
