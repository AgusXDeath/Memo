<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/models/GrupoFunciones.php

class GruposFunciones {
    private $conn;
    private $table = "gruposfunciones";

    public $idGruposFunciones;
    public $idGrupo;
    public $idFunciones;
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
        $query = "SELECT * FROM " . $this->table . " WHERE idGruposFunciones = :idGruposFunciones";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idGruposFunciones", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear una nueva relación grupo-funciones
    public function create() {
        $query = "INSERT INTO " . $this->table . " (idGrupo, idFunciones, ver, insertar, modificar, borrar)
                  VALUES (:idGrupo, :idFunciones, :ver, :insertar, :modificar, :borrar)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idGrupo', $this->idGrupo);
        $stmt->bindParam(':idFunciones', $this->idFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        return $stmt->execute();
    }

    // Actualizar una relación grupo-funciones
    public function update($id) {
        $query = "UPDATE " . $this->table . " 
                  SET idGrupo = :idGrupo, idFunciones = :idFunciones, ver = :ver, insertar = :insertar, modificar = :modificar, borrar = :borrar
                  WHERE idGruposFunciones = :idGruposFunciones";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idGruposFunciones', $id);
        $stmt->bindParam(':idGrupo', $this->idGrupo);
        $stmt->bindParam(':idFunciones', $this->idFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        return $stmt->execute();
    }

    // Eliminar una relación grupo-funciones
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE idGruposFunciones = :idGruposFunciones";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idGruposFunciones', $id);
        return $stmt->execute();
    }
}
?>