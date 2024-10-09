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

        $this->gruposFunciones->idGrupo = $data->idGrupo;
        $this->gruposFunciones->idFunciones = $data->idFunciones;
        $this->gruposFunciones->ver = $data->ver;
        $this->gruposFunciones->insertar = $data->insertar;
        $this->gruposFunciones->modificar = $data->modificar;
        $this->gruposFunciones->borrar = $data->borrar;
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
    public function createMensaje($data) {
        $this->mensajes->emisor = $data->emisor;
        $this->mensajes->receptor = $data->receptor;
        $this->mensajes->mensaje = $data->mensaje;
        $this->mensajes->estadoLeido = $data->estadoLeido;
        $this->mensajes->estadoEnviado = $data->estadoEnviado;
        $this->mensajes->estadoFavorito = $data->estadoFavorito;
        $this->mensajes->estadoPapelera = $data->estadoPapelera;
        if ($this->mensajes->create()) {
            return json_encode(["message" => "Mensaje creado con éxito"]);
        }
        return json_encode(["message" => "Error al crear el mensaje"]);
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
}



?>
