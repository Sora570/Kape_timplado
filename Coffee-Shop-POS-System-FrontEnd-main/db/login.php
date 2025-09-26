<?php
// db/login.php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db_connect.php';

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['status'=>'error','message'=>'Missing credentials']);
    exit;
}

// Fetch user
$stmt = $conn->prepare("SELECT userID, username, password, role FROM users WHERE username = ? LIMIT 1");
$stmt->bind_param("s", $username);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    // Current simple check: direct compare (plaintext)
    // NOTE: for production replace with password_verify and store password_hash
    if ($password === $row['password']) {
        // successful login
        $_SESSION['userID'] = $row['userID'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['role'] = $row['role'];
        // also set a userEmail for existing logAction usage if you want:
        $_SESSION['userEmail'] = $row['username'];

        echo json_encode(['status'=>'success']);
        exit;
    } else {
        echo json_encode(['status'=>'error','message'=>'Invalid username or password']);
        exit;
    }
} else {
    echo json_encode(['status'=>'error','message'=>'Invalid username or password']);
    exit;
}