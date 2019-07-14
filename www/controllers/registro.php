<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');

notFound('\/controllers\/registro.php');

require_once(CONTROLLER_PATH . 'login.php');

if (isLogged()) {
    if ( preg_match("/^\/registro/", $_SERVER['REQUEST_URI']) ) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'POST':

                break;
            case 'GET':
            default:
                include_once(VIEW_PATH . 'registro.inc');
                break;
        }
    }
}

?>