<?php
require_once __DIR__ . '/db_connect.php';
session_start();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit;
}

$stmt = $conn->prepare("SELECT userID, username, passwordHash, role FROM users WHERE username=? LIMIT 1");
$stmt->bind_param("s", $username);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();

if ($user && password_verify($password, $user['passwordHash'])) {
    // ✅ set session for index.php to detect
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];

    echo json_encode([
        "status" => "success",
        "user"   => $user['username'],
        "role"   => $user['role']
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}