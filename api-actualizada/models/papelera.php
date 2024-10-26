<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para manejar la papelera
class Papelera {
    private $conn; // Conexión a la base de datos
    private $table = "mensajes"; // Nombre de la tabla

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }

    // Método para obtener mensajes en la papelera
    public function getPapelera($idUsuario) {
        // Consulta para seleccionar mensajes donde el receptor o emisor sea el ID de usuario y esté en la papelera
        $query = "SELECT * FROM " . $this->table . " WHERE (receptor = :receptor OR emisor = :emisor) AND estadoPapelera = 1";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        // Asignar valores a los parámetros
        $stmt->bindParam(':receptor', $idUsuario);
        $stmt->bindParam(':emisor', $idUsuario);
        $stmt->execute(); // Ejecutar consulta
        return $stmt; // Retornar el resultado
    }
}
?>
