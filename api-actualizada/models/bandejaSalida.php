<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

class BandejaSalida {
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

    // Obtener mensajes de la bandeja de salida para un usuario específico
    public function getMensajesByEmisor($idUsuario) {
        $query = "SELECT m.*, 
                         ue.mail as emisorMail, 
                         ur.mail as receptorMail 
                  FROM " . $this->table . " m
                  JOIN usuarios ue ON m.emisor = ue.idUsuarios
                  JOIN usuarios ur ON m.receptor = ur.idUsuarios
                  WHERE m.emisor = :emisor";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":emisor", $idUsuario);
        $stmt->execute();
        return $stmt;
    }   


}