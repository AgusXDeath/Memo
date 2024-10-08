<?php
// Permitir el acceso a la API desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos HTTP especificados
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir los encabezados específicos en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Definición de la clase GrupoUsuario
class GrupoUsuario {
    private $conn; // Conexión a la base de datos
    private $table = "gruposusuarios"; // Nombre de la tabla en la base de datos
    public $idGrupo; // ID del grupo
    public $descripcion; // Descripción del grupo

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Inicializa la conexión
    }

    // Obtener todos los grupos de usuarios y el total de usuarios en cada grupo
    public function getAll() {
        // Consulta SQL para seleccionar todos los grupos y contar el número de usuarios en cada grupo
        $query = "SELECT g.*, COUNT(u.idUsuarios) as totalUsuarios 
                  FROM " . $this->table . " g 
                  LEFT JOIN usuarios u ON g.idGrupo = u.idGrupo 
                  GROUP BY g.idGrupo";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->execute(); // Ejecuta la consulta
        return $stmt; // Devuelve el objeto de declaración
    }

    // Obtener un solo grupo por ID
    public function getById($id) {
        // Consulta SQL para seleccionar un grupo específico por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idGrupo = :idGrupo";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(":idGrupo", $id); // Asocia el parámetro :idGrupo
        $stmt->execute(); // Ejecuta la consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Devuelve el grupo como un array asociativo
    }

    // Crear un nuevo grupo
    public function create() {
        // Consulta SQL para insertar un nuevo grupo
        $query = "INSERT INTO " . $this->table . " (descripcion) VALUES (:descripcion)";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':descripcion', $this->descripcion); // Asocia el parámetro :descripcion
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Actualizar un grupo existente
    public function update($id) {
        // Consulta SQL para actualizar un grupo existente
        $query = "UPDATE " . $this->table . " SET descripcion = :descripcion WHERE idGrupo = :idGrupo";       
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':idGrupo', $id); // Asocia el parámetro :idGrupo
        $stmt->bindParam(':descripcion', $this->descripcion); // Asocia el parámetro :descripcion
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Eliminar un grupo
    public function delete($id) {
        // Consulta SQL para eliminar un grupo por ID
        $query = "DELETE FROM " . $this->table . " WHERE idGrupo = :idGrupo";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':idGrupo', $id); // Asocia el parámetro :idGrupo
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }
}
?>
