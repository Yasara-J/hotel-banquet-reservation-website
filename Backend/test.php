<?php
include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

if ($conn) {
    echo "Connection successful!";
} else {
    echo "Connection failed!";
}
?>
