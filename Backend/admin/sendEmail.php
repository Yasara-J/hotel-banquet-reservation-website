<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include '../DbConnect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->date) || !isset($data->message)) {
        echo json_encode(["error" => "Invalid input"]);
        exit();
    }

    $date = $data->date;
    $message = $data->message;

    $database = new DbConnect();
    $conn = $database->connect();

    $reservations = getReservationsByDate($conn, $date);

    if ($reservations) {
        $emails = array_filter(array_map(function ($reservation) {
            return $reservation['email'] ?: null;
        }, $reservations));

        if (empty($emails)) {
            echo json_encode(["error" => "No valid email addresses found"]);
            exit();
        }

        $subject = "Reservation Notification";
        $headers = "From: no-reply@example.com";

        foreach ($emails as $email) {
            mail($email, $subject, $message, $headers);
        }

        $resMessage = "Emails sent to " . count($emails) . " customers. Emails: " . implode(", ", $emails);
        echo json_encode(["success" => $resMessage]);
    } else {
        echo json_encode(["error" => "No reservations found for the selected date"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

function getReservationsByDate($conn, $date)
{
    $query = "SELECT r.*, c.email FROM reservations r JOIN customers c ON r.customer_id = c.id WHERE DATE(r.check_in_date) = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$date]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
