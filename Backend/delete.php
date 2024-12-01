<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'DbConnect.php';

// Create a new instance of DbConnect and connect to the database
$objDb = new DbConnect();
$conn = $objDb->connect();

if (!$conn) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed"]);
    exit();
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle DELETE requests
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "ID parameter is missing"]);
        exit();
    }

    $id = intval($_GET['id']); // Ensure ID is an integer

    // Prepare the DELETE statement
    $sql = "DELETE FROM reservations WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    // Execute the statement and check if it was successful
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Reservation deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to delete reservation"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
