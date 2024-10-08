<?php
// Permitir el acceso a la API desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos HTTP especificados
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir los encabezados específicos en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Incluir los modelos necesarios para la API
include_once '../models/usuarios.php';
include_once '../models/grupoUsuario.php';
include_once '../models/funcion.php'; // Modelo de Funciones
include_once '../models/gruposFunciones.php';
include_once '../core/Database.php';

class UsuariosGruposController {
    private $db; // Conexión a la base de datos
    private $usuarios; // Objeto para manejar Usuarios
    private $grupoUsuario; // Objeto para manejar Grupos de Usuarios
    private $funcion; // Objeto para manejar Funciones
    private $gruposFunciones; // Objeto para manejar la relación entre Grupos y Funciones

    public function __construct() {
        // Crear una nueva instancia de la base de datos y obtener la conexión
        $database = new Database();
        $this->db = $database->getConnection();
        
        // Instanciar los modelos
        $this->usuarios = new Usuario($this->db);
        $this->grupoUsuario = new GrupoUsuario($this->db);
        $this->funcion = new Funcion($this->db);
        $this->gruposFunciones = new GruposFunciones($this->db);
    }

    // Método genérico para enviar respuestas JSON
    private function jsonResponse($message, $data = null) {
        return json_encode([
            "message" => $message,
            "data" => $data
        ]);
    }

    // Métodos para Usuarios

    // Obtener todos los usuarios
    public function getAllUsuarios() {
        $stmt = $this->usuarios->getAll();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->jsonResponse("Usuarios recuperados con éxito", $usuarios);
    }

    // Obtener un usuario por ID
    public function getUsuarioById($id) {
        $usuarios = $this->usuarios->getById($id);
        return $this->jsonResponse("Usuario recuperado con éxito", $usuarios);
    }

    // Crear un nuevo usuario
    public function createUsuario($data) {
        // Validación de datos
        if (empty($data->nombreUsuario) || empty($data->mail) || empty($data->clave) || empty($data->idgrupo)) {
            return $this->jsonResponse("Todos los campos son requeridos");
        }

        // Asignar datos al modelo de usuario
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;

        // Intentar crear el usuario
        if ($this->usuarios->create()) {
            return $this->jsonResponse("Usuario creado con éxito");
        }
        return $this->jsonResponse("Error al crear el usuario");
    }

    // Actualizar un usuario
    public function updateUsuario($id, $data) {
        // Validación de datos
        if (empty($data->nombreUsuario) || empty($data->mail) || empty($data->clave) || empty($data->idgrupo)) {
            return $this->jsonResponse("Todos los campos son requeridos");
        }

        // Asignar datos al modelo de usuario
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;

        // Intentar actualizar el usuario
        if ($this->usuarios->update($id)) {
            return $this->jsonResponse("Usuario actualizado con éxito");
        }
        return $this->jsonResponse("Error al actualizar el usuario");
    }

    // Eliminar un usuario
    public function deleteUsuario($id) {
        if ($this->usuarios->delete($id)) {
            return $this->jsonResponse("Usuario eliminado con éxito");
        }
        return $this->jsonResponse("Error al eliminar el usuario");
    }

    // Métodos para Grupos de Usuarios

    // Obtener todos los grupos de usuarios
    public function getAllGrupos() {
        $stmt = $this->grupoUsuario->getAll();
        $gruposUsuario = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->jsonResponse("Grupos de usuarios recuperados con éxito", $gruposUsuario);
    }

    // Obtener un grupo por ID
    public function getGrupoById($id) {
        $grupoUsuario = $this->grupoUsuario->getById($id);
        return $this->jsonResponse("Grupo recuperado con éxito", $grupoUsuario);
    }

    // Crear un nuevo grupo de usuarios
    public function createGrupo($data) {
        // Validación de datos
        if (empty($data->descripcion)) {
            return $this->jsonResponse("La propiedad 'descripcion' es requerida");
        }

        // Asignar datos al modelo de grupo
        $this->grupoUsuario->descripcion = $data->descripcion;

        // Intentar crear el grupo
        if ($this->grupoUsuario->create()) {
            return $this->jsonResponse("Grupo de usuarios creado con éxito");
        }
        return $this->jsonResponse("Error al crear el grupo de usuarios");
    }

    // Actualizar un grupo de usuarios
    public function updateGrupo($id, $data) {
        // Validación de datos
        if (empty($data->descripcion)) {
            return $this->jsonResponse("La propiedad 'descripcion' es requerida");
        }

        // Asignar datos al modelo de grupo
        $this->grupoUsuario->descripcion = $data->descripcion;

        // Intentar actualizar el grupo
        if ($this->grupoUsuario->update($id)) {
            return $this->jsonResponse("Grupo de usuarios actualizado con éxito");
        }
        return $this->jsonResponse("Error al actualizar el grupo de usuarios");
    }

    // Eliminar un grupo de usuarios
    public function deleteGrupo($id) {
        if ($this->grupoUsuario->delete($id)) {
            return $this->jsonResponse("Grupo de usuarios eliminado con éxito");
        }
        return $this->jsonResponse("Error al eliminar el grupo de usuarios");
    }

    // Métodos para Funciones

    // Obtener todas las funciones
    public function getAllFunciones() {
        $stmt = $this->funcion->getAll();
        $funciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->jsonResponse("Funciones recuperadas con éxito", $funciones);
    }

    // Obtener una función por ID
    public function getFuncionById($id) {
        $funcion = $this->funcion->getById($id);
        return $this->jsonResponse("Función recuperada con éxito", $funcion);
    }

    // Crear una nueva función
    public function createFuncion($data) {
        // Validación de datos
        if (empty($data->descripcion)) {
            return $this->jsonResponse("La propiedad 'descripcion' es requerida");
        }

        // Asignar datos al modelo de función
        $this->funcion->descripcion = $data->descripcion;

        // Intentar crear la función
        if ($this->funcion->create()) {
            return $this->jsonResponse("Función creada con éxito");
        }
        return $this->jsonResponse("Error al crear la función");
    }

    // Actualizar una función
    public function updateFuncion($id, $data) {
        // Validación de datos
        if (empty($data->descripcion)) {
            return $this->jsonResponse("La propiedad 'descripcion' es requerida");
        }

        // Asignar datos al modelo de función
        $this->funcion->descripcion = $data->descripcion;

        // Intentar actualizar la función
        if ($this->funcion->update($id)) {
            return $this->jsonResponse("Función actualizada con éxito");
        }
        return $this->jsonResponse("Error al actualizar la función");
    }

    // Eliminar una función
    public function deleteFuncion($id) {
        if ($this->funcion->delete($id)) {
            return $this->jsonResponse("Función eliminada con éxito");
        }
        return $this->jsonResponse("Error al eliminar la función");
    }

    // Métodos para Grupos de Funciones

    // Obtener todas las relaciones grupo-funciones
    public function getAllgrupoFunciones() {
        $stmt = $this->gruposFunciones->getAll();
        $gruposFunciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->jsonResponse("Relaciones grupo-funciones recuperadas con éxito", $gruposFunciones);
    }

    // Obtener una relación grupo-funciones por ID
    public function getgrupoFuncionesById($id) {
        $gruposFunciones = $this->gruposFunciones->getById($id);
        return $this->jsonResponse("Relación grupo-funciones recuperada con éxito", $gruposFunciones);
    }

    // Crear una nueva relación grupo-funciones
    public function creategrupoFunciones($data) {
        // Validación de datos
        if (empty($data->idGrupo) || empty($data->idFuncion)) {
            return $this->jsonResponse("Los campos 'idGrupo' y 'idFuncion' son requeridos");
        }

        // Asignar datos al modelo de relación
        $this->gruposFunciones->idGrupo = $data->idGrupo;
        $this->gruposFunciones->idFunciones = $data->idFuncion;

        // Intentar crear la relación
        if ($this->gruposFunciones->create()) {
            return $this->jsonResponse("Relación grupo-funciones creada con éxito");
        }
        return $this->jsonResponse("Error al crear la relación grupo-funciones");
    }

    // Actualizar una relación grupo-funciones
    public function updategrupoFunciones($id, $data) {
        // Validación de datos
        if (empty($data->idGrupo) || empty($data->idFuncion)) {
            return $this->jsonResponse("Los campos 'idGrupo' y 'idFuncion' son requeridos");
        }

        // Asignar datos al modelo de relación
        $this->gruposFunciones->idGrupo = $data->idGrupo;
        $this->gruposFunciones->idFunciones = $data->idFuncion;

        // Intentar actualizar la relación
        if ($this->gruposFunciones->update($id)) {
            return $this->jsonResponse("Relación grupo-funciones actualizada con éxito");
        }
        return $this->jsonResponse("Error al actualizar la relación grupo-funciones");
    }

    // Eliminar una relación grupo-funciones
    public function deletegrupoFunciones($id) {
        if ($this->gruposFunciones->delete($id)) {
            return $this->jsonResponse("Relación grupo-funciones eliminada con éxito");
        }
        return $this->jsonResponse("Error al eliminar la relación grupo-funciones");
    }
}
?>
