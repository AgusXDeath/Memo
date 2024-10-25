<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

class BandejaEntrada {
    private $conn;
    private $table = "mensajes";

    public $idMensajes;
    public $emisor;
    public $receptor;
    public $mensaje;
    public $estadoLeido;
    public $estadoEnviado;
    public $estadoFavorito;
    public $estadoRecibido;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener mensajes de la bandeja de entrada para un usuario específico
    public function getMensajesByReceptor($idUsuario) {
        $query = "SELECT * FROM " . $this->table . " WHERE receptor = :receptor";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":receptor", $idUsuario);
        $stmt->execute();
        return $stmt;
    }    


}
