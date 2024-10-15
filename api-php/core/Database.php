<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// app/core/Database.php

class Database {
    private $host = "172.16.20.30"; // IP del servidor remoto
    private $db_name = "GestionMemo"; // Cambia si el nombre de la base de datos es diferente
    private $username = "desarrollo"; // Usuario del servidor remoto
    private $password = "fisca1234"; // Contraseña del servidor remoto
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>