<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200); // Preflight request successful
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $AuthToken = 'Login1234@Admin';
  // Read the input JSON data
  $inputData = json_decode(file_get_contents('php://input'), true);
  $email = $inputData['email'] ?: null;
  $password = $inputData['password'] ?: null;

  if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Email and password are required"]);
    exit();
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid email format"]);
    exit();
  }

  $sql = "SELECT * FROM admin_users WHERE email = :email";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':email', $email);
  $stmt->execute();

  $admin = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($admin && password_verify($password, $admin['password'])) {
    http_response_code(200);
    echo json_encode(["message" => "success", "token" => $AuthToken, "admin_id" => $admin['id']]);
  } else {
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "Invalid email or password"]);
  }
  exit();
}

http_response_code(405);
echo json_encode(["message" => "Method not allowed"]);
