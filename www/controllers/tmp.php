<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/tmp.php');

echo $_SERVER['SERVER_ADDR'] . '<br>';
echo $_SERVER['SERVER_NAME'];

?>
