<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/models/GrupoFunciones.php

class GrupoFunciones {
    private $conn;
    private $table = "grupoFunciones";

    public $IdGrupoFunciones;
    public $IdGrupo;
    public $IdFunciones;
    public $ver;
    public $insertar;
    public $modificar;
    public $borrar;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todas las relaciones grupo-funciones
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener una relación por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE IdGrupoFunciones = :IdGrupoFunciones";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":IdGrupoFunciones", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear una nueva relación grupo-funciones
    public function create() {
        $query = "INSERT INTO " . $this->table . " (IdGrupo, IdFunciones, ver, insertar, modificar, borrar)
                  VALUES (:IdGrupo, :IdFunciones, :ver, :insertar, :modificar, :borrar)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':IdGrupo', $this->IdGrupo);
        $stmt->bindParam(':IdFunciones', $this->IdFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        return $stmt->execute();
    }

    // Actualizar una relación grupo-funciones
    public function update($id) {
        $query = "UPDATE " . $this->table . " 
                  SET IdGrupo = :IdGrupo, IdFunciones = :IdFunciones, ver = :ver, insertar = :insertar, modificar = :modificar, borrar = :borrar
                  WHERE IdGrupoFunciones = :IdGrupoFunciones";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':IdGrupoFunciones', $id);
        $stmt->bindParam(':IdGrupo', $this->IdGrupo);
        $stmt->bindParam(':IdFunciones', $this->IdFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        return $stmt->execute();
    }

    // Eliminar una relación grupo-funciones
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE IdGrupoFunciones = :IdGrupoFunciones";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':IdGrupoFunciones', $id);
        return $stmt->execute();
    }
}
?>