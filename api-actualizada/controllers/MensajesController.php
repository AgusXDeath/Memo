<?php

// app/controllers/MensajesController.php

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST");
// Permitir cabeceras específicas en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Incluir los modelos necesarios
require_once '../models/BandejaEntrada.php';
require_once '../models/BandejaSalida.php';
require_once '../models/Favoritos.php';
require_once '../models/Papelera.php';
require_once '../models/EnviarMensaje.php';

class MensajesController {
    private $db; // Conexión a la base de datos
    private $secret_key = 'clave_secreta'; // Usar una clave secreta fuerte y segura

    // Constructor de la clase
    public function __construct($db) {
        $this->db = $db; // Asignar la conexión a la propiedad
        // Inicializar los modelos correspondientes
        $this->bandejaEntrada = new BandejaEntrada($db);
        $this->bandejaSalida = new BandejaSalida($db);
        $this->favoritos = new Favoritos($db);
        $this->papelera = new Papelera($db);
        $this->enviarMensaje = new EnviarMensaje($db);
    }

    // Obtener el ID del usuario a partir del token
    private function getUsuarioIdFromToken() {
        $headers = apache_request_headers(); // Obtener las cabeceras de la solicitud
        // Extraer el token de las cabeceras
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null; 
        if ($token) {
            $decodedToken = $this->verifyJWT($token); // Verificar el token
            if ($decodedToken) {
                return $decodedToken['sub']; // Retornar el ID del usuario
            }
        }
        return false; // Retornar falso si el token es inválido
    }

    // Verificar y decodificar el JWT
    private function verifyJWT($jwt) {
        $parts = explode('.', $jwt); // Separar el JWT en sus partes
        if (count($parts) === 3) { // Verificar que el JWT tiene tres partes
            $header = base64_decode($parts[0]); // Decodificar el encabezado
            $payload = base64_decode($parts[1]); // Decodificar el payload
            $signature_provided = $parts[2]; // Obtener la firma proporcionada
            // Validar la firma del JWT
            $signature_valid = $this->base64UrlEncode(hash_hmac('sha256', "$parts[0].$parts[1]", $this->secret_key, true));
            if ($signature_valid === $signature_provided) {
                $payload_data = json_decode($payload, true); // Decodificar el payload como un arreglo asociativo
                if ($payload_data['exp'] > time()) { // Verificar si el token no ha expirado
                    return $payload_data; // Retornar los datos del payload
                }
            }
        }
        return false; // Retornar falso si la verificación falla
    }

    // Método para codificar en base64 URL
    private function base64UrlEncode($data) {
        // Codifica los datos en base64 y reemplaza caracteres según el estándar URL
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    // Método para manejar la bandeja de entrada
    public function getBandejaEntrada() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->bandejaEntrada->getMensajesByReceptor($idUsuario); // Obtener mensajes de la bandeja de entrada
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
        }
    }

    // Método para manejar la bandeja de salida
    public function getBandejaSalida() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->bandejaSalida->getMensajesByEmisor($idUsuario); // Obtener mensajes de la bandeja de salida
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
        }
    }

    // Método para obtener mensajes favoritos
    public function getFavoritos() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->favoritos->getFavoritos($idUsuario); // Obtener mensajes favoritos
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
        }
    }

    // Método para obtener mensajes en la papelera
    public function getPapelera() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->papelera->getPapelera($idUsuario); // Obtener mensajes en la papelera
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
        }
    }

    // Método para enviar un mensaje
    public function enviarMensaje() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            try {
                $data = json_decode(file_get_contents("php://input")); // Obtener los datos de la solicitud
                // Verificar que los datos requeridos no estén vacíos
                if (!empty($data->receptor) && !empty($data->mensaje)) {
                    $response = $this->enviarMensaje->createMensaje($idUsuario, $data->receptor, $data->mensaje); // Enviar el mensaje
                    echo $response; // Retornar la respuesta de la operación
                } else {
                    echo json_encode(["message" => "Datos incompletos"]); // Mensaje de error si los datos son incompletos
                }
            } catch (Exception $e) {
                echo json_encode(["message" => "Error interno del servidor: " . $e->getMessage()]); // Mensaje de error detallado
            }
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
        }
    }
}
