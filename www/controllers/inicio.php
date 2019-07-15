<?php


require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
# require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/inicio.php');

require_once(CONTROLLER_PATH . 'login.php');

if (isLogged() && getIdUser() == 1) {
    header('Location: /settings');
} elseif (isLogged()) {
    header('Location: /registro');
} else {
    header('Location: /login');
}

?>