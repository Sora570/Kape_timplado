<?php
header('Content-Type: application/json');
require_once __DIR__ . '/db_connect.php';

$cat = trim($_POST['categoryName'] ?? '');
if (!$cat) {
    echo json_encode(['status'=>'error','message'=>'Category name required']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO categories (categoryName, isActive) VALUES (?, 1)");
$stmt->bind_param("s", $cat);

if ($stmt->execute()) {
    echo json_encode(['status'=>'success','categoryID'=>$conn->insert_id]);
} else {
    echo json_encode(['status'=>'error','message'=>$stmt->error]);
}
