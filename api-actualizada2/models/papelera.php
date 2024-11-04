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

    public function getPapelera($idUsuario) {
        // Consulta para seleccionar mensajes en la papelera junto con el correo del emisor y receptor
        $query = "SELECT m.*, 
                         ue.mail as emisorMail, 
                         ur.mail as receptorMail 
                  FROM " . $this->table . " m
                  JOIN usuarios ue ON m.emisor = ue.idUsuarios
                  JOIN usuarios ur ON m.receptor = ur.idUsuarios
                  WHERE (m.receptor = :receptor OR m.emisor = :emisor) AND m.estadoPapelera = 1";
                  
        $stmt = $this->conn->prepare($query); // Preparar consulta
        // Asignar valores a los parámetros
        $stmt->bindParam(':receptor', $idUsuario);
        $stmt->bindParam(':emisor', $idUsuario);
        $stmt->execute(); // Ejecutar consulta
        return $stmt; // Retornar el resultado
    }
}
?>
