
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");


// public/index.php

include_once '../core/Router.php';

/*Parámetro resource:  el enrutador distinguirá entre usuarios, grupos y funciones mediante el parámetro resource en la URL. Por ejemplo:
/api.php?resource=funciones para gestionar funciones.
/api.php?resource=usuarios o /api.php?resource=grupos para gestionar los otros dos recursos.*/
?>

