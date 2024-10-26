<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Incluir archivos de conexión y controladores
include_once '../core/Database.php'; // Asegúrate de tener esta clase
include_once '../controllers/UsuariosGruposController.php';
include_once '../controllers/AuthController.php';
include_once '../controllers/MensajesController.php';
include_once '../views/View.php';

// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Crear conexión a la base de datos
$database = new Database();
$db = $database->getConnection();

// Verificar si la conexión fue exitosa
if (!$db) {
    echo json_encode(["message" => "Error al conectar a la base de datos."]); // Mensaje claro si falla la conexión
    exit();
}

// Crear instancias de controladores
$usuariosGruposController = new UsuariosGruposController($db);
$authController = new AuthController($db);  // Aquí pasamos la conexión
$mensajesController = new MensajesController($db);

$method = $_SERVER['REQUEST_METHOD']; // Obtener el método de la solicitud
$resource = $_GET['resource'] ?? null; // Obtener el recurso de la URL

// Método para verificar el token JWT
function verifyToken($authController) {
    $headers = getallheaders(); // Obtener todas las cabeceras
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization']; // Obtener cabecera de autorización
        $token = str_replace('Bearer ', '', $authHeader); // Limpiar el token
        $verified = $authController->verifyJWT($token); // Verificar el token
        
        if (!$verified) {
            echo json_encode(["message" => "Token no válido o expirado"]); // Mensaje de error
            exit();
        }
        return $verified; // Retornar datos decodificados del token
    } else {
        echo json_encode(["message" => "Token no proporcionado"]); // Mensaje de error
        exit();
    }
}

// Rutas de recursos según el controlador
if ($resource) {
    switch ($resource) {
        // Rutas para usuarios, grupos y funciones
        case 'usuarios':
        case 'grupos':
        case 'funciones':
        case 'gruposfunciones':
            // Redirige al controlador de usuarios y grupos
            $controller = $usuariosGruposController;

            // Verificar token en métodos protegidos
            if (in_array($method, ['POST', 'PUT', 'DELETE'])) {
                verifyToken($authController);
            }

            switch ($method) {
                case 'GET':
                    if ($resource === 'usuarios') {
                        $result = isset($_GET['id']) ? $controller->getUsuarioById($_GET['id']) : $controller->getAllUsuarios();
                    } elseif ($resource === 'grupos') {
                        $result = isset($_GET['id']) ? $controller->getGrupoById($_GET['id']) : $controller->getAllGrupos();
                    } elseif ($resource === 'funciones') {
                        $result = isset($_GET['id']) ? $controller->getFuncionById($_GET['id']) : $controller->getAllFunciones();
                    } elseif ($resource === 'gruposfunciones') {
                        $result = isset($_GET['id']) ? $controller->getgrupoFuncionesById($_GET['id']) : $controller->getAllgrupoFunciones();
                    }
                    break;

                case 'POST':
                    $data = json_decode(file_get_contents("php://input")); // Obtener datos de entrada
                    if ($resource === 'usuarios') {
                        $result = $controller->createUsuario($data);
                    } elseif ($resource === 'grupos') {
                        $result = $controller->createGrupo($data);
                    } elseif ($resource === 'funciones') {
                        $result = $controller->createFuncion($data);
                    } elseif ($resource === 'gruposfunciones') {
                        $result = $controller->creategrupoFunciones($data);
                    }
                    break;

                case 'PUT':
                    $data = json_decode(file_get_contents("php://input")); // Obtener datos de entrada
                    if (isset($_GET['id'])) {
                        if ($resource === 'usuarios') {
                            $result = $controller->updateUsuario($_GET['id'], $data);
                        } elseif ($resource === 'grupos') {
                            $result = $controller->updateGrupo($_GET['id'], $data);
                        } elseif ($resource === 'funciones') {
                            $result = $controller->updateFuncion($_GET['id'], $data);
                        } elseif ($resource === 'gruposfunciones') {
                            $result = $controller->updategrupoFunciones($_GET['id'], $data);
                        }
                    }
                    break;

                case 'DELETE':
                    if (isset($_GET['id'])) {
                        if ($resource === 'usuarios') {
                            $result = $controller->deleteUsuario($_GET['id']);
                        } elseif ($resource === 'grupos') {
                            $result = $controller->deleteGrupo($_GET['id']);
                        } elseif ($resource === 'funciones') {
                            $result = $controller->deleteFuncion($_GET['id']);
                        } elseif ($resource === 'gruposfunciones') {
                            $result = $controller->deletegrupoFunciones($_GET['id']);
                        }
                    }
                    break;

                default:
                    $result = json_encode(["message" => "Método no permitido"]);
            }
            break;

        // Ruta para el controlador de mensajes
        case 'mensajes':
            // Redirigir al controlador de mensajes
            $controller = $mensajesController;

            // Verificar token en métodos protegidos
            if (in_array($method, ['POST', 'PUT', 'DELETE'])) {
                verifyToken($authController); // Verificar token para métodos protegidos
            }

            switch ($method) {
                case 'GET':
                    $result = isset($_GET['id']) ? $controller->getMensajeById($_GET['id']) : $controller->getAllMensajes();
                    break;

                // Aquí llamamos directamente al método enviarMensaje
                case 'POST':
                    // Llamar al método enviarMensaje que ahora maneja la creación de mensajes
                    $result = $controller->enviarMensaje(); 
                    break;

                case 'PUT':
                    $data = json_decode(file_get_contents("php://input"));
                    $result = isset($_GET['id']) ? $controller->updateMensaje($_GET['id'], $data) : null;
                    break;

                case 'DELETE':
                    $result = isset($_GET['id']) ? $controller->deleteMensaje($_GET['id']) : null;
                    break;
            }
            break;

        // Ruta para la bandeja de entrada
        case 'bandejaEntrada':
            // Obtener la bandeja de entrada del usuario autenticado
            $tokenData = verifyToken($authController);
            $result = $mensajesController->getBandejaEntrada();
            break;

        // Ruta para el login
        case 'login':
            // La autenticación no requiere token
            if ($method === 'POST') {
                $data = json_decode(file_get_contents("php://input")); // Obtener datos de inicio de sesión
                // Verificación de credenciales antes de iniciar sesión
                if (isset($data->mail) && isset($data->clave)) {
                    $result = $authController->login($data->mail, $data->clave); // Llamar al método de inicio de sesión
                } else {
                    $result = json_encode(["message" => "Credenciales no proporcionadas"]); // Mensaje si faltan credenciales
                }
            } else {
                $result = json_encode(["message" => "Método no permitido, use POST para login"]); // Mensaje si no se usa POST
            }
            break;

        default:
            $result = json_encode(["message" => "Recurso no especificado o no encontrado"]);
    }
} else {
    $result = json_encode(["message" => "Recurso no especificado en la URL"]);
}

// Asegúrate de que $result esté definido antes de enviarlo
if (!isset($result)) {
    $result = json_encode(["message" => "Error interno del servidor"]); // Mensaje en caso de error no manejado
}

// Enviar respuesta
View::render($result); // Enviar el resultado a la vista
?>
