<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/logout.php');

require_once(CONTROLLER_PATH . 'login.php');

if (isLogged()) {
    Data::logout();
    setcookie("RCU", '', time()-100);
    setcookie("RSU", '', time()-100);
    $_SESSION['idUser'] = 0;
    session_destroy();
}

header('Location: /login');

?>