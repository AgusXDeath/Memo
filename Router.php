<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/core/RouterUsuariosGrupos.php

include_once '../controllers/UsuariosGruposController.php';
include_once '../views/View.php';

$controller = new UsuariosGruposController();
$method = $_SERVER['REQUEST_METHOD'];

// Verificar si 'resource' está definido en la URL
if (isset($_GET['resource'])) {
    $resource = $_GET['resource'];  // Puede ser 'usuarios', 'grupos', 'funciones', 'grupofunciones'

    switch ($method) {
        case 'GET':
            if ($resource === 'usuarios') {
                if (isset($_GET['id'])) {
                    $result = $controller->getUsuarioById($_GET['id']);
                } else {
                    $result = $controller->getAllUsuarios();
                }
            } elseif ($resource === 'grupos') {
                if (isset($_GET['id'])) {
                    $result = $controller->getGrupoById($_GET['id']);
                } else {
                    $result = $controller->getAllGrupos();
                }
            } elseif ($resource === 'funciones') {
                if (isset($_GET['id'])) {
                    $result = $controller->getFuncionById($_GET['id']);
                } else {
                    $result = $controller->getAllFunciones();
                } 
            } elseif ($resource === 'grupofunciones') {
                if (isset($_GET['id'])) {
                    $result = $controller->getgrupoFuncionesById($_GET['id']);
                } else {
                    $result = $controller->getAllgrupoFunciones();
                } 
            }
            View::render($result);
            break;

        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            if ($resource === 'usuarios') {
                $result = $controller->createUsuario($data);
            } elseif ($resource === 'grupos') {
                $result = $controller->createGrupo($data);
            } elseif ($resource === 'funciones') {
                $result = $controller->createFuncion($data);
            } elseif ($resource === 'gruposFunciones') {
                $result = $controller->creategrupoFunciones($data);
            } elseif ($resource === 'login') {
                //obtener los parametros de la solicitud
                $mail = $data->mail;
                $clave = $data->clave;

                //llamar al metodo login del controlador
                $result = $controller->login($mail, $clave);
            }
            View::render($result);
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
                } elseif ($resource === 'gruposFunciones') {
                    $result = $controller->updategrupoFunciones($_GET['id'],$data);
                }
                View::render($result);
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
                } elseif ($resource === 'gruposFunciones') {
                    $result = $controller->deletegrupoFunciones($_GET['id']);
                }
                View::render($result);
            }
            break;

        default:
            View::render(json_encode(["message" => "Método no permitido"]));
            break;
    }
} else {
    // Manejo del caso en que 'resource' no está presente en la URL
    View::render(json_encode(["message" => "Recurso no especificado en la URL"]));
}
?>