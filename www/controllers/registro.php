<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');

notFound('\/controllers\/registro.php');

include_once(CONTROLLER_PATH . 'login.php');

if (isLogged()) {
    if ( preg_match("/^\/login/", $_SERVER['REQUEST_URI']) ) {
        switch ($_SERVER['REQUEST_METHOD']) {
            
        }
    }
}

?>