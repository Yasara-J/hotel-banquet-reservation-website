<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require 'DbConnect.php';

$db = new DbConnect();
$conn = $db->connect();

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Handle PUT requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id && !empty($input)) {
        $banquet_name = $input['banquet_name'] ?: '';
        $check_in_date = $input['check_in_date'] ?: '';
        $duration = $input['duration'] ?: '';
        $number_of_guests = $input['number_of_guests'] ?: '';
        $event_details = $input['event_details'] ?: '';

        try {
            $stmt = $conn->prepare(
                "UPDATE reservations SET 
                banquet_name = :banquet_name, 
                check_in_date = :check_in_date, 
                duration = :duration, 
                number_of_guests = :number_of_guests, 
                event_details = :event_details 
                WHERE id = :id"
            );

            $stmt->bindParam(':banquet_name', $banquet_name);
            $stmt->bindParam(':check_in_date', $check_in_date);
            $stmt->bindParam(':duration', $duration);
            $stmt->bindParam(':number_of_guests', $number_of_guests, PDO::PARAM_INT);
            $stmt->bindParam(':event_details', $event_details);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Update failed']);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database query error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input or ID']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
