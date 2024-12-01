<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../DbConnect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $objDb = new DbConnect();
        $conn = $objDb->connect();

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['adminId']) || !isset($data['newPassword'])) {
            throw new Exception('Admin ID and new password are required.');
        }

        $adminId = $data['adminId'];
        $newPassword = password_hash($data['newPassword'], PASSWORD_DEFAULT);

        $sql = "UPDATE admin_users SET password = :password WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':password', $newPassword);
        $stmt->bindParam(':id', $adminId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
        } else {
            throw new Exception('Failed to update password');
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
