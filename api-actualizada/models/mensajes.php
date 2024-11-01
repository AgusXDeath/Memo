<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/models/Mensaje.php

class Mensajes {
    private $conn;
    private $table = "mensajes";

    public $idMensajes;
    public $emisor;
    public $receptor;
    public $mensaje;
    public $estadoLeido;
    public $estadoEnviado;
    public $estadoFavorito;
    public $estadoPapelera;
    public $estadoRecibido;

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
        $query = "SELECT * FROM " . $this->table . " WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idMensajes", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear una nueva relación grupo-funciones
    public function create($data) {
        // Validar que los datos no estén vacíos
        $estadoLeido = !empty($data->estadoLeido) ? intval($data->estadoLeido) : 0;
        $estadoRecibido = !empty($data->estadoRecibido) ? intval($data->estadoRecibido) : 0;
        $estadoFavorito = !empty($data->estadoFavorito) ? intval($data->estadoFavorito) : 0;
        $estadoPapelera = !empty($data->estadoPapelera) ? intval($data->estadoPapelera) : 0;
    
        // Preparar la consulta SQL
        $query = "INSERT INTO mensajes (emisor, receptor, mensaje, estadoLeido, estadoRecibido, estadoFavorito, estadoPapelera)
                  VALUES (:emisor, :receptor, :mensaje, :estadoLeido, :estadoRecibido, :estadoFavorito, :estadoPapelera)";
        $stmt = $this->conn->prepare($query);
    
        // Bind de parámetros
        $stmt->bindParam(':emisor', $data->emisor);
        $stmt->bindParam(':receptor', $data->receptor);
        $stmt->bindParam(':mensaje', $data->mensaje);
        $stmt->bindParam(':estadoLeido', $estadoLeido);
        $stmt->bindParam(':estadoRecibido', $estadoRecibido);
        $stmt->bindParam(':estadoFavorito', $estadoFavorito);
        $stmt->bindParam(':estadoPapelera', $estadoPapelera);
    
        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Actualizar una relación grupo-funciones
    public function update($id) {
        $query = "UPDATE " . $this->table . " 
                  SET emisor = :emisor, receptor = :receptor, mensaje = :mensaje, estadoLeido = :estadoLeido, estadoEnviado = :estadoEnviado, estadoFavorito = :estadoFavorito, estadoPapelera = :estadoPapelera, estadoRecibido = :estadoRecibido
                  WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idMensajes', $id);
        $stmt->bindParam(':emisor', $this->emisor);
        $stmt->bindParam(':receptor', $this->receptor);
        $stmt->bindParam(':mensaje', $this->mensaje);
        $stmt->bindParam(':estadoLeido', $this->estadoLeido);
        $stmt->bindParam(':estadoEnviado', $this->estadoEnviado);
        $stmt->bindParam(':estadoFavorito', $this->estadoFavorito);
        $stmt->bindParam(':estadoPapelera', $this->estadoPapelera);
        $stmt->bindParam(':estadoRecibido', $this->estadoRecibido);
        return $stmt->execute();
    }

    // Eliminar una relación grupo-funciones
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idMensajes', $id);
        return $stmt->execute();
    }
    // Obtener mensajes no leídos
public function getUnreadMessages() {
    $query = "SELECT * FROM " . $this->table . " WHERE estadoLeido = 0";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

// Mover un mensaje a la papelera
public function moveToTrash($id) {
    $query = "UPDATE " . $this->table . " SET estadoPapelera = 1 WHERE idMensajes = :idMensajes";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':idMensajes', $id);
    return $stmt->execute();
}
}


?>