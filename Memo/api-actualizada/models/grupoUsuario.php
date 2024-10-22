<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/models/grupoUsuarios.php

class GrupoUsuario {
    private $conn;
    private $table = "gruposusuarios";

    public $idGrupo;
    public $descripcion;
 

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los usuarios
    public function getAll() {
        $query = "SELECT g.*, COUNT(u.idUsuarios) as totalUsuarios 
                  FROM " . $this->table . " g 
                  LEFT JOIN usuarios u ON g.idGrupo = u.idgrupo 
                  GROUP BY g.idGrupo";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener un solo usuario por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE idGrupo = :idGrupo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idGrupo", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un usuario nuevo
    public function create() {
        $query = "INSERT INTO " . $this->table . " (descripcion) VALUES (:descripcion)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':descripcion', $this->descripcion);
        return $stmt->execute();
    }


// Actualizar un usuario
public function update($id) {
    $query = "UPDATE " . $this->table . " SET descripcion = :descripcion WHERE idGrupo = :idGrupo";       
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':idGrupo', $id);
    $stmt->bindParam(':descripcion', $this->descripcion);
    return $stmt->execute();
}


    // Eliminar un usuario
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE idGrupo = :idGrupo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idGrupo', $id);
        return $stmt->execute();
    }
}
?>