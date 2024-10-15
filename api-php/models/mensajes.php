<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

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

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los mensajes
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener un mensaje por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idMensajes", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un nuevo mensaje
    public function create() {
        $query = "INSERT INTO " . $this->table . " (emisor, receptor, mensaje, estadoLeido, estadoEnviado, estadoFavorito, estadoPapelera)
                  VALUES (:emisor, :receptor, :mensaje, :estadoLeido, :estadoEnviado, :estadoFavorito, :estadoPapelera)";
        $stmt = $this->conn->prepare($query);

        // Convertir los valores booleanos a enteros
        $this->estadoLeido = $this->estadoLeido ? 1 : 0;
        $this->estadoEnviado = $this->estadoEnviado ? 1 : 0;
        $this->estadoFavorito = $this->estadoFavorito ? 1 : 0;
        $this->estadoPapelera = $this->estadoPapelera ? 1 : 0;

        $stmt->bindParam(':emisor', $this->emisor);
        $stmt->bindParam(':receptor', $this->receptor);
        $stmt->bindParam(':mensaje', $this->mensaje);
        $stmt->bindParam(':estadoLeido', $this->estadoLeido);
        $stmt->bindParam(':estadoEnviado', $this->estadoEnviado);
        $stmt->bindParam(':estadoFavorito', $this->estadoFavorito);
        $stmt->bindParam(':estadoPapelera', $this->estadoPapelera);

        return $stmt->execute();
    }

    // Actualizar un mensaje
    public function update($id) {
        $query = "UPDATE " . $this->table . " 
                  SET emisor = :emisor, receptor = :receptor, mensaje = :mensaje, estadoLeido = :estadoLeido, estadoEnviado = :estadoEnviado, estadoFavorito = :estadoFavorito, estadoPapelera = :estadoPapelera
                  WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);

        // Convertir los valores booleanos a enteros
        $this->estadoLeido = $this->estadoLeido ? 1 : 0;
        $this->estadoEnviado = $this->estadoEnviado ? 1 : 0;
        $this->estadoFavorito = $this->estadoFavorito ? 1 : 0;
        $this->estadoPapelera = $this->estadoPapelera ? 1 : 0;

        $stmt->bindParam(':idMensajes', $id);
        $stmt->bindParam(':emisor', $this->emisor);
        $stmt->bindParam(':receptor', $this->receptor);
        $stmt->bindParam(':mensaje', $this->mensaje);
        $stmt->bindParam(':estadoLeido', $this->estadoLeido);
        $stmt->bindParam(':estadoEnviado', $this->estadoEnviado);
        $stmt->bindParam(':estadoFavorito', $this->estadoFavorito);
        $stmt->bindParam(':estadoPapelera', $this->estadoPapelera);

        return $stmt->execute();
    }

    // Eliminar un mensaje
    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idMensajes', $id);
        return $stmt->execute();
    }
}
?>