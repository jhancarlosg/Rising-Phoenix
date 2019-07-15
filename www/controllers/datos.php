<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/datos.php');

require_once(CONTROLLER_PATH . 'login.php');

if (isLogged()) {
	if ( preg_match("/^\/datos/", $_SERVER['REQUEST_URI']) ) {
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'POST':
				include_once(VIEW_PATH . 'datos.inc');
			case 'GET':
			default:
				if ($_SERVER['QUERY_STRING'] && isset($_GET['json']) && $_GET['json']=='true') {
					$data = [];
					if (isset($_GET['data']) && $_GET['data'] == 'get') {
						$json = true;
						$rows = isset($_GET['rows']) ? $_GET['rows'] : 50;
						$data = Data::getDataRows($rows);
					}
					header('Content-type:application/json;charset=utf-8');
					echo json_encode($data);
					exit();
				} else {
					include_once(VIEW_PATH . 'datos.inc');
				}
				break;
		}
	}	
} else {
	header('Location: /login');
}


?>