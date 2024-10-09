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
    $resource = $_GET['resource'];  // Puede ser 'usuarios', 'grupos', 'funciones', 'grupofunciones', 'mensajes'

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
            } elseif ($resource === 'gruposfunciones') {
                if (isset($_GET['id'])) {
                    $result = $controller->getgrupoFuncionesById($_GET['id']);
                } else {
                    $result = $controller->getAllgrupoFunciones();
                } 
            } elseif ($resource === 'mensajes') { // Añadir soporte para Mensajes
                if (isset($_GET['id'])) {
                    $result = $controller->getMensajeById($_GET['id']);
                } else {
                    $result = $controller->getAllMensajes();
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
            } elseif ($resource === 'gruposfunciones') {
                $result = $controller->creategrupoFunciones($data);
            } elseif ($resource === 'mensajes') { // Añadir creación de Mensajes
                $result = $controller->createMensaje($data);
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
                } elseif ($resource === 'gruposfunciones') {
                    $result = $controller->updategrupoFunciones($_GET['id'], $data);
                } elseif ($resource === 'mensajes') { // Añadir actualización de Mensajes
                    $result = $controller->updateMensaje($_GET['id'], $data);
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
                } elseif ($resource === 'gruposfunciones') {
                    $result = $controller->deletegrupoFunciones($_GET['id']);
                } elseif ($resource === 'mensajes') { // Añadir eliminación de Mensajes
                    $result = $controller->deleteMensaje($_GET['id']);
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