<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../DbConnect.php';

$method = $_SERVER['REQUEST_METHOD'];
$database = new DbConnect();
$conn = $database->connect();

if ($method === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'all') {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $conn->prepare("SELECT * FROM banquets WHERE id = ?");
            $stmt->execute([$id]);
            $banquet = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($banquet);
        } else {
            $stmt = $conn->prepare("SELECT * FROM banquets");
            $stmt->execute();
            $banquets = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($banquets);
        }
    } else {
        echo json_encode(["error" => "Invalid action"]);
    }
} elseif ($method === 'POST') {
    if (isset($_GET['action']) && $_GET['action'] === 'add') {
        if (!empty($_FILES['file']['name'])) {
            $fileName = basename($_FILES['file']['name']);
            $targetFilePath = '../../public/images/' . $fileName;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
                $name = $_POST['name'];
                $description = $_POST['description'];
                $price = $_POST['price'];
                $hourlyRate = $_POST['hourlyRate'];
                $image_url = '/images/' . $fileName;
                $capacity = isset($_POST['capacity']) ? $_POST['capacity'] : '';
                $functions = isset($_POST['functions']) ? $_POST['functions'] : '';

                $stmt = $conn->prepare("INSERT INTO banquets (name, description, price, hourlyRate, image_url, capacity, functions) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$name, $description, $price, $hourlyRate, $image_url, $capacity, $functions]);
                echo json_encode(["message" => "Banquet added successfully"]);
            } else {
                echo json_encode(["error" => "Failed to upload image"]);
            }
        } else {
            echo json_encode(["error" => "No file uploaded"]);
        }
    }
    elseif (isset($_GET['action']) && $_GET['action'] === 'update') {

        $id = isset($_GET['id']) ? $_GET['id'] : null;
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $description = isset($_POST['description']) ? $_POST['description'] : '';
        $price = isset($_POST['price']) ? $_POST['price'] : '';
        $hourlyRate = isset($_POST['hourlyRate']) ? $_POST['hourlyRate'] : '';
        $image_url = isset($_POST['image_url']) ? $_POST['image_url'] : '';
        $capacity = isset($_POST['capacity']) ? $_POST['capacity'] : '';
        $functions = isset($_POST['functions']) ? $_POST['functions'] : '';
        
        if ($id === null) {
            echo json_encode(["error" => "ID not provided"]);
            exit;
        }
        
        if (isset($_FILES['file']) && !empty($_FILES['file']['name'])) {
            $fileName = basename($_FILES['file']['name']);
            $targetFilePath = '../../public/images/' . $fileName;
            
            if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
                $image_url = '/images/' . $fileName;
            } else {
                echo json_encode(["error" => "Failed to upload image"]);
                exit;
            }
        }

        $stmt = $conn->prepare("UPDATE banquets SET name = ?, description = ?, price = ?, hourlyRate = ?, image_url = ?, capacity = ?, functions = ? WHERE id = ?");
        $stmt->execute([$name, $description, $price, $hourlyRate, $image_url, $capacity, $functions, $id]);
        echo json_encode(["message" => "Banquet updated successfully"]);
    } else {
        echo json_encode(["error" => "Invalid action"]);
    }
} elseif ($method === 'DELETE') {
    if (isset($_GET['action']) && $_GET['action'] === 'delete') {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $conn->prepare("SELECT image_url FROM banquets WHERE id = ?");
            $stmt->execute([$id]);
            $banquet = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($banquet) {
                $imagePath = '../../public' . $banquet['image_url'];
                // this is not supported
                // if (file_exists($imagePath)) {
                //     unlink($imagePath);
                // }

                $stmt = $conn->prepare("DELETE FROM banquets WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(["message" => "Banquet deleted successfully"]);
            } else {
                echo json_encode(["error" => "Banquet not found"]);
            }
        } else {
            echo json_encode(["error" => "ID not provided"]);
        }
    } else {
        echo json_encode(["error" => "Invalid action"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
