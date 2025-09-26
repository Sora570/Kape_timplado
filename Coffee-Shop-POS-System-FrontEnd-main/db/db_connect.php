<?php
$host = "localhost";
$user = "root";
$pass = "";          // set if you have a MySQL password
$dbname = "kape_db";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  http_response_code(500);
  die("DB connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");