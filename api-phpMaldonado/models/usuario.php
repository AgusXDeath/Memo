<?php
// Permitir el acceso a la API desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos HTTP especificados
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir los encabezados específicos en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Definición de la clase Usuario
class Usuario {
    private $conn; // Conexión a la base de datos
    private $table = "usuario"; // Nombre de la tabla en la base de datos

    // Propiedades del usuario
    public $idUsuario; // ID del usuario
    public $nombreUsuario; // Nombre del usuario
    public $mail; // Correo electrónico del usuario
    public $clave; // Contraseña del usuario
    public $idgrupo; // ID del grupo al que pertenece el usuario

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Inicializa la conexión
    }

    // Obtener todos los usuarios
    public function getAll() {
        // Consulta SQL para seleccionar todos los usuarios
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->execute(); // Ejecuta la consulta
        return $stmt; // Devuelve el objeto de declaración
    }

    // Obtener un solo usuario por ID
    public function getById($id) {
        // Consulta SQL para seleccionar un usuario específico por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idUsuario = :idUsuario";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(":idUsuario", $id); // Asocia el parámetro :idUsuario
        $stmt->execute(); // Ejecuta la consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Devuelve el usuario como un array asociativo
    }

    // Crear un nuevo usuario
    public function create() {
        // Consulta SQL para insertar un nuevo usuario
        $query = "INSERT INTO " . $this->table . " (nombreUsuario, mail, clave, idgrupo) VALUES (:nombreUsuario, :mail, :clave, :idgrupo)";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        // Asocia los parámetros
        $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
        $stmt->bindParam(':mail', $this->mail);
        $stmt->bindParam(':clave', $this->clave);
        $stmt->bindParam(':idgrupo', $this->idgrupo);
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Actualizar un usuario existente
    public function update($id) {
        // Consulta SQL para actualizar un usuario existente
        $query = "UPDATE " . $this->table . " SET nombreUsuario = :nombreUsuario, mail = :mail, clave = :clave, idgrupo = :idgrupo WHERE idUsuario = :idUsuario";       
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        // Asocia los parámetros
        $stmt->bindParam(':idUsuario', $id); // ID del usuario a actualizar
        $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
        $stmt->bindParam(':mail', $this->mail);
        $stmt->bindParam(':clave', $this->clave);
        $stmt->bindParam(':idgrupo', $this->idgrupo);
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Eliminar un usuario
    public function delete($id) {
        // Consulta SQL para eliminar un usuario por ID
        $query = "DELETE FROM " . $this->table . " WHERE idUsuario = :idUsuario";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':idUsuario', $id); // Asocia el parámetro :idUsuario
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }
}
?>
