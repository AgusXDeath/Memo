<?php
// Permitir el acceso a la API desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos HTTP especificados
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir los encabezados específicos en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Definición de la clase GruposFunciones
class GruposFunciones {
    private $conn; // Conexión a la base de datos
    private $table = "gruposfunciones"; // Nombre de la tabla en la base de datos
    public $idGrupoFunciones; // ID de la relación grupo-funciones
    public $idGrupo; // ID del grupo
    public $idFunciones; // ID de la función
    public $ver; // Permiso para ver
    public $insertar; // Permiso para insertar
    public $modificar; // Permiso para modificar
    public $borrar; // Permiso para borrar

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Inicializa la conexión
    }

    // Obtener todas las relaciones grupo-funciones
    public function getAll() {
        // Consulta SQL para seleccionar todas las relaciones
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->execute(); // Ejecuta la consulta
        return $stmt; // Devuelve el objeto de declaración
    }

    // Obtener una relación por ID
    public function getById($id) {
        // Consulta SQL para seleccionar una relación específica por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idGrupoFunciones = :idGrupoFunciones";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(":idGrupoFunciones", $id); // Asocia el parámetro :idGrupoFunciones
        $stmt->execute(); // Ejecuta la consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Devuelve la relación como un array asociativo
    }

    // Crear una nueva relación grupo-funciones
    public function create() {
        // Consulta SQL para insertar una nueva relación
        $query = "INSERT INTO " . $this->table . " (idGrupo, IdFunciones, ver, insertar, modificar, borrar)
                  VALUES (:idGrupo, :idFunciones, :ver, :insertar, :modificar, :borrar)";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        // Asocia los parámetros
        $stmt->bindParam(':idGrupo', $this->idGrupo);
        $stmt->bindParam(':idFunciones', $this->idFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Actualizar una relación grupo-funciones
    public function update($id) {
        // Consulta SQL para actualizar una relación existente
        $query = "UPDATE " . $this->table . " 
                  SET idGrupo = :idGrupo, idFunciones = :idFunciones, ver = :ver, insertar = :insertar, modificar = :modificar, borrar = :borrar
                  WHERE idGrupoFunciones = :idGrupoFunciones";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        // Asocia los parámetros
        $stmt->bindParam(':idGrupoFunciones', $id);
        $stmt->bindParam(':idGrupo', $this->idGrupo);
        $stmt->bindParam(':idFunciones', $this->idFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }

    // Eliminar una relación grupo-funciones
    public function delete($id) {
        // Consulta SQL para eliminar una relación por ID
        $query = "DELETE FROM " . $this->table . " WHERE idGrupoFunciones = :idGrupoFunciones";
        $stmt = $this->conn->prepare($query); // Prepara la consulta
        $stmt->bindParam(':idGrupoFunciones', $id); // Asocia el parámetro :idGrupoFunciones
        return $stmt->execute(); // Ejecuta la consulta e indica si fue exitosa
    }
}
?>
