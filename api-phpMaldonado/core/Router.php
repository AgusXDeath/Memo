<?php
// Configuración de cabeceras CORS para permitir el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *"); // Permite que cualquier origen acceda a la API
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Especifica los métodos HTTP permitidos
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization"); // Especifica los encabezados permitidos

// Incluye el controlador de usuarios y grupos
include_once '../controllers/UsuariosGruposController.php';
include_once '../views/View.php';

// Crea una instancia del controlador
$controller = new UsuariosGruposController();
$method = $_SERVER['REQUEST_METHOD']; // Obtiene el método HTTP de la solicitud actual

// Verificar si 'resource' está definido en la URL
if (isset($_GET['resource'])) {
    $resource = $_GET['resource'];  // Obtiene el recurso solicitado (puede ser 'usuarios', 'grupos', 'funciones', 'gruposfunciones')

    // Manejo de las solicitudes según el método HTTP
    switch ($method) {
        case 'GET':
            // Manejo de la solicitud GET
            if ($resource === 'usuarios') {
                if (isset($_GET['id'])) {
                    // Si se proporciona un ID, obtiene un usuario específico
                    $result = $controller->getUsuarioById($_GET['id']);
                } else {
                    // Si no se proporciona un ID, obtiene todos los usuarios
                    $result = $controller->getAllUsuarios();
                }
            } elseif ($resource === 'grupos') {
                if (isset($_GET['id'])) {
                    // Si se proporciona un ID, obtiene un grupo específico
                    $result = $controller->getGrupoById($_GET['id']);
                } else {
                    // Si no se proporciona un ID, obtiene todos los grupos
                    $result = $controller->getAllGrupos();
                }
            } elseif ($resource === 'funciones') {
                if (isset($_GET['id'])) {
                    // Si se proporciona un ID, obtiene una función específica
                    $result = $controller->getFuncionById($_GET['id']);
                } else {
                    // Si no se proporciona un ID, obtiene todas las funciones
                    $result = $controller->getAllFunciones();
                } 
            } elseif ($resource === 'gruposfunciones') {
                if (isset($_GET['id'])) {
                    // Si se proporciona un ID, obtiene un grupo de funciones específico
                    $result = $controller->getgrupoFuncionesById($_GET['id']);
                } else {
                    // Si no se proporciona un ID, obtiene todos los grupos de funciones
                    $result = $controller->getAllgrupoFunciones();
                } 
            }
            // Renderiza la respuesta utilizando la vista
            View::render($result);
            break;

        case 'POST':
            // Manejo de la solicitud POST
            $data = json_decode(file_get_contents("php://input")); // Obtiene y decodifica el cuerpo de la solicitud
            if ($resource === 'usuarios') {
                $result = $controller->createUsuario($data); // Crea un nuevo usuario
            } elseif ($resource === 'grupos') {
                $result = $controller->createGrupo($data); // Crea un nuevo grupo
            } elseif ($resource === 'funciones') {
                $result = $controller->createFuncion($data); // Crea una nueva función
            } elseif ($resource === 'gruposFunciones') {
                $result = $controller->creategrupoFunciones($data); // Crea un nuevo grupo de funciones
            }
            // Renderiza la respuesta utilizando la vista
            View::render($result);
            break;

        case 'PUT':
            // Manejo de la solicitud PUT
            $data = json_decode(file_get_contents("php://input")); // Obtiene y decodifica el cuerpo de la solicitud
            if (isset($_GET['id'])) {
                // Si se proporciona un ID, actualiza el recurso correspondiente
                if ($resource === 'usuarios') {
                    $result = $controller->updateUsuario($_GET['id'], $data); // Actualiza un usuario específico
                } elseif ($resource === 'grupos') {
                    $result = $controller->updateGrupo($_GET['id'], $data); // Actualiza un grupo específico
                } elseif ($resource === 'funciones') {
                    $result = $controller->updateFuncion($_GET['id'], $data); // Actualiza una función específica
                } elseif ($resource === 'gruposFunciones') {
                    $result = $controller->updategrupoFunciones($_GET['id'], $data); // Actualiza un grupo de funciones específico
                }
                // Renderiza la respuesta utilizando la vista
                View::render($result);
            }
            break;

        case 'DELETE':
            // Manejo de la solicitud DELETE
            if (isset($_GET['id'])) {
                // Si se proporciona un ID, elimina el recurso correspondiente
                if ($resource === 'usuarios') {
                    $result = $controller->deleteUsuario($_GET['id']); // Elimina un usuario específico
                } elseif ($resource === 'grupos') {
                    $result = $controller->deleteGrupo($_GET['id']); // Elimina un grupo específico
                } elseif ($resource === 'funciones') {
                    $result = $controller->deleteFuncion($_GET['id']); // Elimina una función específica
                } elseif ($resource === 'gruposFunciones') {
                    $result = $controller->deletegrupoFunciones($_GET['id']); // Elimina un grupo de funciones específico
                }
                // Renderiza la respuesta utilizando la vista
                View::render($result);
            }
            break;

        default:
            // Manejo del caso en que se utiliza un método no permitido
            View::render(json_encode(["message" => "Método no permitido"]));
            break;
    }
} else {
    // Manejo del caso en que 'resource' no está presente en la URL
    View::render(json_encode(["message" => "Recurso no especificado en la URL"]));
}
?>
