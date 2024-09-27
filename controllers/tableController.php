<?php
// app/controllers/UsuariosController.php

include_once '../models/usuario.php';
include_once '../core/Database.php';

class tableController {
    private $db;
    private $usuarios;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->usuarios = new Usuario($this->db);
    }

    // Obtener todos los usuarios
    public function getAll() {
        $stmt = $this->usuarios->getAll();
        $usuario = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($usuario);
    }

    // Obtener un usuario por ID
    public function getById($id) {
        $usuario = $this->usuarios->getById($id);
        return json_encode($usuario);
    }

    // Crear un nuevo usuario
    public function create($data) {
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;
        if ($this->usuarios->create()) {
            return json_encode(["message" => "Usuario creado con éxito"]);
        }
        return json_encode(["message" => "Error al crear el Usuario"]);
    }

    // Actualizar un usuario
    public function update($id, $data) {
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;
        if ($this->usuarios->update($id)) {
            return json_encode(["message" => "Usuario actualizado con éxito"]);
        }
        return json_encode(["message" => "Error al actualizar el Usuario"]);
    }

    // Eliminar un producto
    public function delete($id) {
        if ($this->usuarios->delete($id)) {
            return json_encode(["message" => "Usuario eliminado con éxito"]);
        }
        return json_encode(["message" => "Error al eliminar el usuario"]);
    }
}
?>