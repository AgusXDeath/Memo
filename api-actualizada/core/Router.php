<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Incluir archivos de conexión y controladores
include_once '../core/Database.php'; 
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
    echo json_encode(["message" => "Error al conectar a la base de datos."]); 
    exit();
}

// Crear instancias de controladores
$usuariosGruposController = new UsuariosGruposController($db);
$authController = new AuthController($db);  
$mensajesController = new MensajesController($db);

$method = $_SERVER['REQUEST_METHOD']; // Obtener el método de la solicitud
$resource = $_GET['resource'] ?? null; // Obtener el recurso de la URL

// Método para verificar el token JWT
function verifyToken($authController) {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        $token = str_replace('Bearer ', '', $authHeader);
        $verified = $authController->verifyJWT($token);
        
        if (!$verified) {
            echo json_encode(["message" => "Token no válido o expirado"]); 
            exit();
        }
        return $verified;
    } else {
        echo json_encode(["message" => "Token no proporcionado"]); 
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
            $controller = $usuariosGruposController;

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
                    $data = json_decode(file_get_contents("php://input"));
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
                    $data = json_decode(file_get_contents("php://input"));
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
            $controller = $mensajesController;

            if (in_array($method, ['POST', 'PUT', 'DELETE'])) {
                verifyToken($authController);
            }

            switch ($method) {
                case 'GET':
                    $result = isset($_GET['id']) ? $controller->getMensajeById($_GET['id']) : $controller->getAllMensajes();
                    break;

                case 'POST':
                    $result = $controller->enviarMensaje(); 
                    break;

                case 'PUT':
                    $result = isset($_GET['id']) ? $controller->updateMensaje() : null;
                    break;

                case 'DELETE':
                    $result = isset($_GET['id']) ? $controller->deleteMensaje() : null;
                    break;

                default:
                    $result = json_encode(["message" => "Método no permitido"]);
            }
            break;

        case 'favoritos':
            verifyToken($authController);
            $result = $mensajesController->getFavoritos(); 
            break;

        case 'papelera':
            verifyToken($authController);
            $result = $mensajesController->getPapelera(); 
            break;

        case 'bandejaEntrada':
            verifyToken($authController);
            $result = $mensajesController->getBandejaEntrada();
            break;

        case 'bandejaSalida':
            verifyToken($authController);
            $result = $mensajesController->getBandejaSalida(); 
            break;

        case 'login':
            // Verificar si el método es POST para iniciar sesión
            if ($method === 'POST') {
                $data = json_decode(file_get_contents("php://input"));
                // Verificar si las credenciales están proporcionadas
                if (isset($data->mail) && isset($data->clave)) {
                    $result = $authController->login($data->mail, $data->clave); 
                } else {
                    $result = json_encode(["message" => "Credenciales no proporcionadas"]); // Mensaje de error si faltan credenciales
                }
            } else {
                $result = json_encode(["message" => "Método no permitido, use POST para login"]); // Mensaje si el método no es permitido
            }
            break;

        default:
            $result = json_encode(["message" => "Recurso no especificado o no encontrado"]); // Mensaje si el recurso no está definido
    }
} else {
    $result = json_encode(["message" => "Recurso no especificado en la URL"]); // Mensaje si no se especifica el recurso
}

http_response_code(200); 
header('Content-Type: application/json'); 
echo json_encode($result); 
?>
