<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/controllers/UsuariosGruposController.php

include_once '../models/usuario.php';
include_once '../models/grupoUsuario.php';
include_once '../models/funcion.php'; // Añadir modelo de Funciones
include_once '../models/GrupoFunciones.php';
include_once '../core/Database.php';

class UsuariosGruposController {
    private $db;
    private $usuario;
    private $grupoUsuario;
    private $funcion; // Añadir objeto para manejar Funciones
    private $grupoFunciones;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->usuario = new Usuario($this->db);
        $this->grupoUsuario = new GrupoUsuario($this->db);
        $this->funcion = new Funcion($this->db); // Instanciar el modelo de Funciones
        $this->grupoFunciones = new GrupoFunciones($this->db);
    }

    // Métodos para Usuarios

    // Obtener todos los usuarios
    public function getAllUsuarios() {
        $stmt = $this->usuario->getAll();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($usuarios);
    }

    // Obtener un usuario por ID
    public function getUsuarioById($id) {
        $usuario = $this->usuario->getById($id);
        return json_encode($usuario);
    }

    // Crear un nuevo usuario
    public function createUsuario($data) {
        $this->usuario->nombreUsuario = $data->nombreUsuario;
        $this->usuario->mail = $data->mail;
        $this->usuario->clave = $data->clave;
        $this->usuario->idgrupo = $data->idgrupo;
        if ($this->usuario->create()) {
            return json_encode(["message" => "Usuario creado con éxito"]);
        }
        return json_encode(["message" => "Error al crear el usuario"]);
    }

    // Actualizar un usuario
    public function updateUsuario($id, $data) {
        $this->usuario->nombreUsuario = $data->nombreUsuario;
        $this->usuario->mail = $data->mail;
        $this->usuario->clave = $data->clave;
        $this->usuario->idgrupo = $data->idgrupo;
        if ($this->usuario->update($id)) {
            return json_encode(["message" => "Usuario actualizado con éxito"]);
        }
        return json_encode(["message" => "Error al actualizar el usuario"]);
    }

    // Eliminar un usuario
    public function deleteUsuario($id) {
        if ($this->usuario->delete($id)) {
            return json_encode(["message" => "Usuario eliminado con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar el usuario"]);
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
            return json_encode(["message" => "Grupo de usuario creado con éxito"]);
        }
        return json_encode(["message" => "Error al crear el grupo de usuario"]);
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
            return json_encode(["message" => "Grupo de usuario actualizado con éxito"]);
        }
        return json_encode(["message" => "Error al actualizar el grupo de usuario"]);
    }
    

    // Eliminar un grupo de usuarios
    public function deleteGrupo($id) {
        if ($this->grupoUsuario->delete($id)) {
            return json_encode(["message" => "Grupo de usuario eliminado con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar el grupo de usuario"]);
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
        $stmt = $this->grupoFunciones->getAll();
        $grupoFunciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($grupoFunciones);
    }

    // Obtener una relación grupo-funciones por ID
    public function getgrupoFuncionesById($id) {
        $grupoFunciones = $this->grupoFunciones->getById($id);
        return json_encode($grupoFunciones);
    }

    // Crear una nueva relación grupo-funciones
    public function creategrupoFunciones($data) {
        $this->grupoFunciones->IdGrupo = $data->IdGrupo;
        $this->grupoFunciones->IdFunciones = $data->IdFunciones;
        $this->grupoFunciones->ver = $data->ver;
        $this->grupoFunciones->insertar = $data->insertar;
        $this->grupoFunciones->modificar = $data->modificar;
        $this->grupoFunciones->borrar = $data->borrar;
        if ($this->grupoFunciones->create()) {
            return json_encode(["message" => "Relación grupo-funciones creada con éxito"]);
        }
        return json_encode(["message" => "Error al crear la relación grupo-funciones"]);
    }

    // Actualizar una relación grupo-funciones
    public function updategrupoFunciones($id, $data) {

        $this->grupoFunciones->IdGrupo = $data->IdGrupo;
        $this->grupoFunciones->IdFunciones = $data->IdFunciones;
        $this->grupoFunciones->ver = $data->ver;
        $this->grupoFunciones->insertar = $data->insertar;
        $this->grupoFunciones->modificar = $data->modificar;
        $this->grupoFunciones->borrar = $data->borrar;
        if ($this->grupoFunciones->update($id)) {
            return json_encode(["message" => "Relación grupo-funciones actualizada con éxito"]);
        }
        return json_encode(["message" => "Error al actualizar la relación grupo-funciones"]);
    }

    // Eliminar una relación grupo-funciones
    public function deletegrupoFunciones($id) {
        if ($this->grupoFunciones->delete($id)) {
            return json_encode(["message" => "Relación grupo-funciones eliminada con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar la relación grupo-funciones"]);
    }
}
?>
