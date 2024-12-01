<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method === 'POST') {
    // Start the transaction
    $conn->beginTransaction();
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Hash the password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        
        // Insert into customers table
        $customerSql = "INSERT INTO customers (first_name, last_name, email, password, phone, address, city, country, created_at) 
                        VALUES (:first_name, :last_name, :email, :password, :phone, :address, :city, :country, NOW())";
        $stmt = $conn->prepare($customerSql);
        $stmt->bindParam(':first_name', $data['firstName']);
        $stmt->bindParam(':last_name', $data['lastName']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':password', $hashedPassword); // Use hashed password
        $stmt->bindParam(':phone', $data['phone']);
        $stmt->bindParam(':address', $data['address']);
        $stmt->bindParam(':city', $data['city']);
        $stmt->bindParam(':country', $data['country']);
        $stmt->execute();
        $customerId = $conn->lastInsertId();

        // Get banquet details
        $banquetSql = "SELECT * FROM banquets WHERE name = :banquet_name";
        $stmt = $conn->prepare($banquetSql);
        $stmt->bindParam(':banquet_name', $data['banquetName']);
        $stmt->execute();
        $banquet = $stmt->fetch(PDO::FETCH_ASSOC);

        $total_price = $banquet['price'] + ($banquet['hourlyRate'] * $data['reservationTime']);

        // Insert into reservations table
        $reservationSql = "INSERT INTO reservations (customer_id, banquet_name, check_in_date, duration, number_of_guests, total_price, status, created_at, event_details, event_type) 
                           VALUES (:customer_id, :banquet_name, :check_in_date, :duration, :number_of_guests, :total_price, 'Pending', NOW(), :event_details, :event_type)";
        $stmt = $conn->prepare($reservationSql);
        $stmt->bindParam(':customer_id', $customerId);
        $stmt->bindParam(':banquet_name', $banquet['name']);
        $stmt->bindParam(':check_in_date', $data['reservationDate']);
        $stmt->bindParam(':duration', $data['reservationTime']);
        $stmt->bindParam(':number_of_guests', $data['numberOfGuests']);
        $stmt->bindParam(':total_price', $total_price);
        $stmt->bindParam(':event_details', $data['eventDetails']);
        $stmt->bindParam(':event_type', $data['eventType']);
        $stmt->execute();

        // Commit the transaction
        $conn->commit();

        echo json_encode(['message' => 'Reservation successfully made']);
    } catch (Exception $e) {
        // Rollback the transaction on error
        $conn->rollBack();
        echo json_encode(['message' => 'Reservation failed: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
