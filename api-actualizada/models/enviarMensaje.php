<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para enviar mensajes
class EnviarMensaje {
    private $conn; // Conexión a la base de datos
    private $table = "mensajes"; // Nombre de la tabla

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }

    // Método para crear un nuevo mensaje
    public function createMensaje($emisor, $receptor, $mensaje) {
        // Validar si el receptor existe en la base de datos
        $queryUsuario = "SELECT idUsuarios FROM usuarios WHERE idUsuarios = :receptor";
        $stmtUsuario = $this->conn->prepare($queryUsuario); // Preparar consulta
        $stmtUsuario->bindParam(':receptor', $receptor); // Asignar valor al parámetro
        $stmtUsuario->execute(); // Ejecutar consulta

        // Comprobar si el receptor fue encontrado
        if ($stmtUsuario->rowCount() === 0) {
            return json_encode(["message" => "Receptor no encontrado"]); // Retornar mensaje de error
        }
 // Crear el mensaje si el receptor es válido
 $query = "INSERT INTO " . $this->table . " (emisor, receptor, mensaje, estadoLeido, estadoEnviado, estadoFavorito, estadoPapelera, estadoRecibido)
 VALUES (:emisor, :receptor, :mensaje, 0, 1, 0, 0, 0)";
$stmt = $this->conn->prepare($query); // Preparar consulta
// Asignar valores a los parámetros
$stmt->bindParam(':emisor', $emisor);
$stmt->bindParam(':receptor', $receptor);
$stmt->bindParam(':mensaje', $mensaje);

// Intentar ejecutar la consulta
try {
if ($stmt->execute()) {
return json_encode(["message" => "Mensaje enviado con éxito"]); // Mensaje de éxito
} else {
return json_encode(["message" => "Error al enviar el mensaje"]); // Mensaje de error
}
} catch (PDOException $e) {
return json_encode(["message" => "Error: " . $e->getMessage()]); // Retornar el mensaje de error detallado
}
}
}
?>
