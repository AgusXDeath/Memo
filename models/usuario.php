<?php
// app/models/usuarios.php

class Usuario {
    private $conn;
    private $table = "usuarios";

    public $idUsuarios;
    public $nombreUsuario;
    public $mail;
    public $clave;
    public $idgrupo;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los usuarios
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;

        
    }

    // Obtener un solo usuario por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE idUsuarios = :idUsuarios";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idUsuarios", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un usuario nuevo
    public function create() {
        $query = "INSERT INTO " . $this->table . " (nombreUsuario, mail, clave, idgrupo) VALUES (:nombreUsuario, :mail, :clave, :idgrupo)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
        $stmt->bindParam(':mail', $this->mail);
        $stmt->bindParam(':clave', $this->clave);
        $stmt->bindParam(':idgrupo', $this->idgrupo);
        return $stmt->execute();
    }


// Actualizar un usuario
public function update($id) {
    $query = "UPDATE " . $this->table . " SET nombreUsuario = :nombreUsuario, mail = :mail, clave = :clave, idgrupo = :idgrupo WHERE idUsuarios = :idUsuarios";       
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':idUsuarios', $id);
    $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
    $stmt->bindParam(':mail', $this->mail);
    $stmt->bindParam(':clave', $this->clave);
    $stmt->bindParam(':idgrupo', $this->idgrupo);
    return $stmt->execute();
}


    // Eliminar un usuario
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE idUsuarios = :idUsuarios";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idUsuarios', $id);
        return $stmt->execute();
    }
}
?>