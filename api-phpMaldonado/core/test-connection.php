<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header("Content-Type: application/json; charset=UTF-8");

require_once 'Database.php';

$database = new Database();
$conn = $database->getConnection();

if($conn) {
    echo json_encode(["message" => "Conexión exitosa a la base de datos."]);
} else {
    echo json_encode(["message" => "Error al conectar a la base de datos."]);
}
?>