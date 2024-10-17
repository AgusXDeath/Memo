<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/models/Funcion.php

class Funcion {
    private $conn;
    private $table = "funciones";

    public $idFuncion;
    public $descripcion;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todas las funciones
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener una función por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE idFuncion = :idFuncion";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idFuncion", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear una nueva función
    public function create() {
        $query = "INSERT INTO " . $this->table . " (descripcion) VALUES (:descripcion)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':descripcion', $this->descripcion);
        return $stmt->execute();
    }

    // Actualizar una función
    public function update($id) {
        $query = "UPDATE " . $this->table . " SET descripcion = :descripcion WHERE idFuncion = :idFuncion";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idFuncion', $id);
        $stmt->bindParam(':descripcion', $this->descripcion);
        return $stmt->execute();
    }

    // Eliminar una función
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE idFuncion = :idFuncion";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idFuncion', $id);
        return $stmt->execute();
    }
}
?>