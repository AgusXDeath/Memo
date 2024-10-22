<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/controllers/UsuariosGruposController.php

include_once '../models/usuarios.php';
include_once '../models/grupoUsuario.php';
include_once '../models/funcion.php'; // Añadir modelo de Funciones
include_once '../models/gruposFunciones.php';
include_once '../models/mensajes.php'; // Añadir modelo de Mensajes
include_once '../core/Database.php';

class UsuariosGruposController {

    private $secret_key = "clave_secreta";
    private $db;
    private $usuarios;
    private $grupoUsuario;
    private $funcion; // Añadir objeto para manejar Funciones
    private $gruposFunciones;
    private $mensajes; // Añadir objeto para manejar Mensajes

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->usuarios = new Usuario($this->db);
        $this->grupoUsuario = new GrupoUsuario($this->db);
        $this->funcion = new Funcion($this->db); // Instanciar el modelo de Funciones
        $this->gruposFunciones = new GruposFunciones($this->db);
        $this->mensajes = new Mensajes($this->db); // Instanciar el modelo de Mensajes
    }

    // Métodos para Usuarios

    // Obtener todos los usuarios
    public function getAllUsuarios() {
        $stmt = $this->usuarios->getAll();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($usuarios);
    }

    // Obtener un usuarios por ID
    public function getUsuarioById($id) {
        $usuarios = $this->usuarios->getById($id);
        return json_encode($usuarios);
    }

    // Crear un nuevo usuarios
    public function createUsuario($data) {
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;
        if ($this->usuarios->create()) {
            return json_encode(["message" => "Usuario creado con éxito"]);
        }
        return json_encode(["message" => "Error al crear el usuarios"]);
    }

    // Actualizar un usuarios
    public function updateUsuario($id, $data) {
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;
        if ($this->usuarios->update($id)) {
            return json_encode(["message" => "Usuario actualizado con éxito"]);
        }
        return json_encode(["message" => "Error al actualizar el usuarios"]);
    }

    // Eliminar un usuarios
    public function deleteUsuario($id) {
        if ($this->usuarios->delete($id)) {
            return json_encode(["message" => "Usuario eliminado con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar el usuarios"]);
    }

    // Métodos para Grupos de Usuarios

    // Obtener todos los grupos de usuarios
    public function getAllGrupos() {
        $stmt = $this->grupoUsuario->getAll();
        $gruposUsuario = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($gruposUsuario);
    }

    // Obtener un grupo por ID
    public function getGrupoById($id) {
        $grupoUsuario = $this->grupoUsuario->getById($id);
        return json_encode($grupoUsuario);
    }

    // Crear un nuevo grupo de usuarios
    public function createGrupo($data) {
        $this->grupoUsuario->descripcion = $data->descripcion;
        if ($this->grupoUsuario->create()) {
            return json_encode(["message" => "Grupo de usuarios creado con éxito"]);
        }
        return json_encode(["message" => "Error al crear el grupo de usuarios"]);
    }

    // Actualizar un grupo de usuarios
    public function updateGrupo($id, $data) {
        error_log(print_r($data, true)); // Esto escribirá en el archivo de registro de errores
        
        if (isset($data->descripcion)) {
            $this->grupoUsuario->descripcion = $data->descripcion;
        } else {
            return json_encode(["error" => "La propiedad 'descripcion' es requerida"]);
        }
    
        if ($this->grupoUsuario->update($id)) {
            return json_encode(["message" => "Grupo de usuarios actualizado con éxito"]);
        }
        return json_encode(["message" => "Error al actualizar el grupo de usuarios"]);
    }
    

    // Eliminar un grupo de usuarios
    public function deleteGrupo($id) {
        if ($this->grupoUsuario->delete($id)) {
            return json_encode(["message" => "Grupo de usuarios eliminado con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar el grupo de usuarios"]);
    }

    // Métodos para Funciones

    // Obtener todas las funciones
    public function getAllFunciones() {
        $stmt = $this->funcion->getAll();
        $funciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($funciones);
    }

    // Obtener una función por ID
    public function getFuncionById($id) {
        $funcion = $this->funcion->getById($id);
        return json_encode($funcion);
    }

    // Crear una nueva función
    public function createFuncion($data) {
        $this->funcion->descripcion = $data->descripcion;
        if ($this->funcion->create()) {
            return json_encode(["message" => "Función creada con éxito"]);
        }
        return json_encode(["message" => "Error al crear la función"]);
    }

    // Actualizar una función
    public function updateFuncion($id, $data) {
        $this->funcion->descripcion = $data->descripcion;
        if ($this->funcion->update($id)) {
            return json_encode(["message" => "Función actualizada con éxito"]);
        }
        return json_encode(["message" => "Error al actualizar la función"]);
    }

    // Eliminar una función
    public function deleteFuncion($id) {
        if ($this->funcion->delete($id)) {
            return json_encode(["message" => "Función eliminada con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar la función"]);
    }

    // Métodos para Grupos de Funciones

    // Obtener todas las relaciones grupo-funciones
    public function getAllgrupoFunciones() {
        $stmt = $this->gruposFunciones->getAll();
        $gruposFunciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($gruposFunciones);
    }

    // Obtener una relación grupo-funciones por ID
    public function getgrupoFuncionesById($id) {
        $gruposFunciones = $this->gruposFunciones->getById($id);
        return json_encode($gruposFunciones);
    }

    // Crear una nueva relación grupo-funciones
    public function creategrupoFunciones($data) {
        $this->gruposFunciones->idGrupo = $data->idGrupo;
        $this->gruposFunciones->idFunciones = $data->idFunciones;
        $this->gruposFunciones->ver = $data->ver;
        $this->gruposFunciones->insertar = $data->insertar;
        $this->gruposFunciones->modificar = $data->modificar;
        $this->gruposFunciones->borrar = $data->borrar;
        if ($this->gruposFunciones->create()) {
            return json_encode(["message" => "Relación grupo-funciones creada con éxito"]);
        }
        return json_encode(["message" => "Error al crear la relación grupo-funciones"]);
    }

    // Actualizar una relación grupo-funciones
public function updategrupoFunciones($id, $data) {
    if (isset($data->idGrupo)) {
        $this->gruposFunciones->idGrupo = $data->idGrupo;
    } else {
        return json_encode(["error" => "El campo idGrupo es requerido"]);
    }

    if (isset($data->idFunciones)) {
        $this->gruposFunciones->idFunciones = $data->idFunciones;
    } else {
        return json_encode(["error" => "El campo idFunciones es requerido"]);
    }

    // Continua con las otras propiedades...
    $this->gruposFunciones->ver = isset($data->ver) ? $data->ver : 0;
    $this->gruposFunciones->insertar = isset($data->insertar) ? $data->insertar : 0;
    $this->gruposFunciones->modificar = isset($data->modificar) ? $data->modificar : 0;
    $this->gruposFunciones->borrar = isset($data->borrar) ? $data->borrar : 0;

    if ($this->gruposFunciones->update($id)) {
        return json_encode(["message" => "Relación grupo-funciones actualizada con éxito"]);
    }
    return json_encode(["message" => "Error al actualizar la relación grupo-funciones"]);
}

    // Eliminar una relación grupo-funciones
    public function deletegrupoFunciones($id) {
        if ($this->gruposFunciones->delete($id)) {
            return json_encode(["message" => "Relación grupo-funciones eliminada con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar la relación grupo-funciones"]);

    }
     // Métodos para Mensajes


    // Obtener todos los mensajes
    public function getAllMensajes() {
        $stmt = $this->mensajes->getAll();
        $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($mensajes);
    }

    // Obtener un mensaje por ID
    public function getMensajeById($id) {
        $mensaje = $this->mensajes->getById($id);
        return json_encode($mensaje);
    }

    
    // Crear un nuevo mensaje
   // Crear un nuevo mensaje
public function createMensaje($data) {
    // Validación básica
    if (empty($data->emisor) || empty($data->receptor) || empty($data->mensaje)) {
        return json_encode(["error" => "Los campos emisor, receptor y mensaje son requeridos."]);
    }
    if (!isset($data->estadoLeido) || $data->estadoLeido === '') {
        $data->estadoLeido = false; // O un valor predeterminado apropiado
    }

    $this->mensajes->emisor = $data->emisor;
    $this->mensajes->receptor = $data->receptor;
    $this->mensajes->mensaje = $data->mensaje;
    $this->mensajes->estadoLeido = $data->estadoLeido ?? 0; // Por defecto, se considera no leído
    $this->mensajes->estadoEnviado = 1; // Se asume que el mensaje fue enviado
    $this->mensajes->estadoFavorito = $data->estadoFavorito ?? 0; // Por defecto no es favorito
    $this->mensajes->estadoPapelera = $data->estadoPapelera ?? 0; // Por defecto no está en papelera

    if ($this->mensajes->create($data)) {
        return json_encode(["message" => "Mensaje creado con éxito"]);
    }
    return json_encode(["error" => "Error al crear el mensaje"]);
}

    
// Actualizar un mensaje
public function updateMensaje($id, $data) {
    $this->mensajes->emisor = $data->emisor;
    $this->mensajes->receptor = $data->receptor;
    $this->mensajes->mensaje = $data->mensaje;
    $this->mensajes->estadoLeido = $data->estadoLeido;
    $this->mensajes->estadoEnviado = $data->estadoEnviado;
    $this->mensajes->estadoFavorito = $data->estadoFavorito;
    $this->mensajes->estadoPapelera = $data->estadoPapelera;
    $this->mensajes->estadoRecibido = $data->estadoRecibido;  // Agregar esta línea
    
    if ($this->mensajes->update($id)) {
        return json_encode(["message" => "Mensaje actualizado con éxito"]);
    }
    return json_encode(["message" => "Error al actualizar el mensaje"]);
}


    
   // Eliminar un mensaje
public function deleteMensaje($id) {
    if ($this->mensajes->delete($id)) {
        return json_encode(["message" => "Mensaje eliminado con éxito"]);
    }
    return json_encode(["message" => "Error al eliminar el mensaje"]);
}

    // Obtener todos los mensajes no leídos

// Obtener mensajes no leídos
public function getUnreadMessages() {
    $stmt = $this->mensajes->getUnreadMessages();
    $mensajesNoLeidos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return json_encode($mensajesNoLeidos);
}

// Mover un mensaje a la papelera
public function moveMessageToTrash($id) {
    if ($this->mensajes->moveToTrash($id)) {
        return json_encode(["message" => "Mensaje movido a la papelera con éxito"]);
    }
    return json_encode(["error" => "Error al mover el mensaje a la papelera"]);
}

    // Método para inicio de sesión 
    public function login($mail, $clave)
    {
        // Obtener el usuario por mail
        $usuario = $this->usuarios->getByMail($mail);

        // Verificar si el usuario existe y la contraseña es correcta
        if ($usuario && $usuario['clave'] === $clave) {
            $token = $this->generateJWT($usuario['idUsuarios'], $usuario['idGrupo']);
            return json_encode([
                'status' => 'success',
                'message' => 'Inicio de sesión exitoso',
                "token" => $token
            ]);
        } else {
            return json_encode([
                'status' => 'error',
                "message" => "Credenciales inválidas"
            ]);
        }
    }

    private function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function generateJWT($user_id, $rol) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'iss' => 'localhost',
            'iat' => time(),
            'exp' => time() + ( 60 * 60),  // Expira en 1 hora
            'sub' => $user_id,
            'rol' => $rol
        ]);

        $base64UrlHeader = $this->base64UrlEncode($header);
        $base64UrlPayload = $this->base64UrlEncode($payload);
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secret_key, true);
        $base64UrlSignature = $this->base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public function verifyJWT($jwt) {
        $parts = explode('.', $jwt);
        if (count($parts) === 3) {
            $header = base64_decode($parts[0]);
            $payload = base64_decode($parts[1]);
            $signature_provided = $parts[2];

            $signature_valid = $this->base64UrlEncode(hash_hmac('sha256', "$parts[0].$parts[1]", $this->secret_key, true));

            if ($signature_valid === $signature_provided) {
                $payload_data = json_decode($payload, true);
                if ($payload_data['exp'] > time()) {
                    return $payload_data;
                }
            }
        }
        return false;
    }

}



?>
