<?php


require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/settings.php');

require_once(CONTROLLER_PATH . 'login.php');

if (isLogged()) {
	if ( preg_match("/^\/settings/", $_SERVER['REQUEST_URI']) ) {
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'POST':
				if(isset($_POST["json"]) && $_POST["json"] == 'true') {
					
				} else {
					include_once(VIEW_PATH . 'settings.inc');
				}
			case 'GET':
			default:
				if ($_SERVER['QUERY_STRING'] && isset($_GET['json']) && $_GET['json']=='true') {
					$data = [];
					header('Content-type:application/json;charset=utf-8');
					echo json_encode($data);
					exit();
				} else {
					include_once(VIEW_PATH . 'settings.inc');
				}
				break;
		}
	}	
} else {
	header('Location: /login');
}

?>