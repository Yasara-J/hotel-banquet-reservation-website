<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'DbConnect.php';
$db = new DbConnect();
$conn = $db->connect();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['reservation_id'])) {

        $reservationId = $_GET['reservation_id'];

        $reservationErrr = [
            "id" => "Not Found",
            "customer_id" => "Not Found",
            "banquet_name" => "Not Found",
            "check_in_date" => "Not Found",
            "duration" => "Not Found",
            "number_of_guests" => "0",
            "total_price" => "Not Found",
            "status" => "Not Found",
            "created_at" => "Not Found",
            "event_details" => "Not Found",
        ];

        try {
            $stmt = $conn->prepare("SELECT * FROM reservations WHERE id = :id");
            $stmt->bindParam(':id', $reservationId, PDO::PARAM_INT);
            $stmt->execute();

            $reservation = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($reservation) {
                echo json_encode($reservation);
            } else {
                echo json_encode($reservationErrr);
            }
            exit();
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Database query error: ' . $e->getMessage()]);
            exit();
        }
    }

    if (isset($_GET['customer_id'])) {
        try {
            $objDb = new DbConnect;
            $conn = $objDb->connect();

            $customerId = $_GET['customer_id'];

            $customerSql = "SELECT * FROM customers WHERE id = :customer_id";
            $customerStmt = $conn->prepare($customerSql);
            $customerStmt->bindParam(':customer_id', $customerId, PDO::PARAM_INT);
            $customerStmt->execute();
            $customer = $customerStmt->fetch(PDO::FETCH_ASSOC);

            if (!$customer) {
                throw new Exception('Customer not found.');
            }

            $reservationSql = "SELECT reservations.*, banquets.name AS banquet_name
                               FROM reservations
                               JOIN banquets ON reservations.banquet_name = banquets.name
                               WHERE reservations.customer_id = :customer_id";
            $reservationStmt = $conn->prepare($reservationSql);
            $reservationStmt->bindParam(':customer_id', $customerId, PDO::PARAM_INT);
            $reservationStmt->execute();
            $reservations = $reservationStmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                'customer' => $customer,
                'reservations' => $reservations
            ]);
            exit();
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            exit();
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method. Only GET is allowed.']);
}
