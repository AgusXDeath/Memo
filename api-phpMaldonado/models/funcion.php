<?php
// Permitir el acceso a la API desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos HTTP especificados
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir los encabezados específicos en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Definición de la clase Funcion
class Funcion {
    private $conn; // Conexión a la base de datos
    private $table = "funciones"; // Nombre de la tabla en la base de datos
    public $idFuncion; // ID de la función
    public $descripcion; // Descripción de la función

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Inicializa la conexión
    }

    // Obtener todas las funciones
    public function getAll() {
        // Consulta SQL para seleccionar todas las funciones
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->execute(); // Ejecuta la consulta
        return $stmt; // Devuelve el objeto de declaración
    }

    // Obtener una función por ID
    public function getById($id) {
        // Consulta SQL para seleccionar una función específica por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idFuncion = :idFuncion";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(":idFuncion", $id); // Asocia el parámetro :idFuncion
        $stmt->execute(); // Ejecuta la consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Devuelve la función como un array asociativo
    }

    // Crear una nueva función
    public function create() {
        // Consulta SQL para insertar una nueva función
        $query = "INSERT INTO " . $this->table . " (descripcion) VALUES (:descripcion)";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':descripcion', $this->descripcion); // Asocia el parámetro :descripcion
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Actualizar una función
    public function update($id) {
        // Consulta SQL para actualizar la descripción de una función
        $query = "UPDATE " . $this->table . " SET descripcion = :descripcion WHERE idFuncion = :idFuncion";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':idFuncion', $id); // Asocia el parámetro :idFuncion
        $stmt->bindParam(':descripcion', $this->descripcion); // Asocia el parámetro :descripcion
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Eliminar una función
    public function delete($id) {
        // Consulta SQL para eliminar una función por ID
        $query = "DELETE FROM " . $this->table . " WHERE idFuncion = :idFuncion";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':idFuncion', $id); // Asocia el parámetro :idFuncion
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }
}
?>
