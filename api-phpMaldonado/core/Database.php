<?php
// Configuración de cabeceras CORS para permitir el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *"); // Permite que cualquier origen acceda a la API
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Especifica los métodos HTTP permitidos
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization"); // Especifica los encabezados permitidos

// Definición de la clase Database para manejar la conexión a la base de datos
class Database {
 
    // Variables privadas para almacenar información de conexión
    private $host = "10.10.0.62"; // Dirección IP del servidor de base de datos
    private $db_name = "GestionMemo"; // Nombre de la base de datos
    private $username = "desarrollo"; // Nombre de usuario para acceder a la base de datos
    private $password = "fisca1234"; // Contraseña para el usuario de la base de datos
    private $conn; // Variable para almacenar la conexión

    // Método para obtener la conexión a la base de datos
    public function getConnection() {
        $this->conn = null; // Inicializa la conexión como nula

        try {
            // Intenta crear una nueva conexión PDO a la base de datos
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            // Establece el modo de error de PDO a excepción
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // Si hay un error en la conexión, lo muestra
            echo "Error de conexión: " . $exception->getMessage();
        }

        // Retorna la conexión a la base de datos (o nula si hubo un error)
        return $this->conn;
    }
}
?>
