<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With");

include '../DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['reservation_id'])) {

  $reservation_id = $_GET['reservation_id'];

  try {
    $sql = "SELECT 
        r.id AS R_ID, 
        r.customer_id, 
        r.banquet_name, 
        r.check_in_date, 
        r.duration, 
        r.number_of_guests, 
        r.total_price, 
        r.status, 
        r.created_at AS reservation_created_at, 
        r.event_details,
        c.first_name, 
        c.last_name, 
        c.email, 
        c.password, 
        c.phone, 
        c.address, 
        c.city, 
        c.country, 
        c.created_at AS customer_created_at
      FROM 
        reservations r 
      JOIN 
        customers c 
      ON 
      r.customer_id = c.id AND r.id = '$reservation_id';";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $reservations = $stmt->fetchAll(PDO::FETCH_OBJ);

    http_response_code(200);
    echo json_encode($reservations);
    exit;
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to retrieve data", "error" => $e->getMessage()]);
    exit;
  }
}


if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['reservation_id'])) {

  $data = json_decode(file_get_contents("php://input"));

  if (
    isset($data->customer_id) &&
    isset($data->banquet_name) &&
    isset($data->check_in_date) &&
    isset($data->duration) &&
    isset($data->number_of_guests) &&
    isset($data->total_price) &&
    isset($data->status) &&
    isset($data->event_details) &&
    isset($data->first_name) &&
    isset($data->last_name) &&
    isset($data->email) &&
    isset($data->password) &&
    isset($data->phone) &&
    isset($data->address) &&
    isset($data->city) &&
    isset($data->country)
  ) {
    $reservation_id = htmlspecialchars(strip_tags($_GET['reservation_id']));
    $customer_id = htmlspecialchars(strip_tags($data->customer_id));
    $banquet_name = htmlspecialchars(strip_tags($data->banquet_name));
    $check_in_date = htmlspecialchars(strip_tags($data->check_in_date));
    $duration = htmlspecialchars(strip_tags($data->duration));
    $number_of_guests = htmlspecialchars(strip_tags($data->number_of_guests));
    $total_price = htmlspecialchars(strip_tags($data->total_price));
    $status = htmlspecialchars(strip_tags($data->status));
    $event_details = htmlspecialchars(strip_tags($data->event_details));
    $first_name = htmlspecialchars(strip_tags($data->first_name));
    $last_name = htmlspecialchars(strip_tags($data->last_name));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = htmlspecialchars(strip_tags($data->password));
    $phone = htmlspecialchars(strip_tags($data->phone));
    $address = htmlspecialchars(strip_tags($data->address));
    $city = htmlspecialchars(strip_tags($data->city));
    $country = htmlspecialchars(strip_tags($data->country));

    $conn->beginTransaction();

    try {
      $update_reservation_query = "UPDATE reservations 
                                       SET banquet_name = ?, check_in_date = ?, duration = ?, number_of_guests = ?, total_price = ?, status = ?, event_details = ?
                                       WHERE id = ?";
      $update_customer_query = "UPDATE customers 
                                    SET first_name = ?, last_name = ?, email = ?, password = ?, phone = ?, address = ?, city = ?, country = ?
                                    WHERE id = ?";

      $stmt1 = $conn->prepare($update_reservation_query);
      $stmt2 = $conn->prepare($update_customer_query);

      $stmt1->execute([$banquet_name, $check_in_date, $duration, $number_of_guests, $total_price, $status, $event_details, $reservation_id]);
      $stmt2->execute([$first_name, $last_name, $email, $password, $phone, $address, $city, $country, $customer_id]);

      $conn->commit();
      http_response_code(200);
      echo json_encode(array("message" => "Reservation and customer details updated."));
    } catch (Exception $e) {
      $conn->rollBack();
      http_response_code(503);
      echo json_encode(array("message" => "Unable to update reservation and customer details.", "error" => $e->getMessage()));
    }

    $conn = null;
  } else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
  }
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['reservation_id'])) {
  $reservation_id = htmlspecialchars(strip_tags($_GET['reservation_id']));

  $conn->beginTransaction();

  try {
      $delete_reservation_query = "DELETE FROM reservations WHERE id = ?";

      $stmt = $conn->prepare($delete_reservation_query);
      $stmt->execute([$reservation_id]);

      if ($stmt->rowCount() > 0) {
          $conn->commit();
          http_response_code(200);
          echo json_encode(array("message" => "Reservation deleted successfully."));
      } else {
          $conn->rollBack();
          http_response_code(404);
          echo json_encode(array("message" => "Reservation not found."));
      }
  } catch (Exception $e) {
      $conn->rollBack();
      http_response_code(503);
      echo json_encode(array("message" => "Unable to delete reservation.", "error" => $e->getMessage()));
  }

  $conn = null;
  exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['all_data'])) {
  try {
    $sql = "SELECT 
        r.id AS R_ID, 
        r.customer_id, 
        r.banquet_name, 
        r.check_in_date, 
        r.duration, 
        r.number_of_guests, 
        r.total_price, 
        r.status, 
        r.created_at AS reservation_created_at, 
        r.event_details,
        r.event_type,
        c.first_name, 
        c.last_name, 
        c.email, 
        c.password, 
        c.phone, 
        c.address, 
        c.city, 
        c.country, 
        c.created_at AS customer_created_at
      FROM 
        reservations r 
      JOIN 
        customers c 
      ON 
      r.customer_id = c.id;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode($reservations);
    exit;
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to retrieve data", "error" => $e->getMessage()]);
    exit;
  }
}

http_response_code(405);
echo json_encode(["message" => "Method not allowed"]);
