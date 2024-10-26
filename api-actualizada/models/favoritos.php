<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para manejar favoritos
class Favoritos {
    private $conn; // Conexión a la base de datos
    private $table = "mensajes"; // Nombre de la tabla

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }

    // Método para obtener los mensajes favoritos de un usuario
    public function getFavoritos($idUsuario) {
        // Consulta para seleccionar mensajes donde el receptor es igual al ID de usuario y sea favorito
        $query = "SELECT * FROM " . $this->table . " WHERE receptor = :receptor AND estadoFavorito = 1";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':receptor', $idUsuario); // Asignar valor al parámetro
        $stmt->execute(); // Ejecutar consulta
        return $stmt; // Retornar el resultado
    }
}
?>
