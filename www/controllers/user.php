<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/user.php');

require_once(CONTROLLER_PATH . 'login.php');

if ( preg_match("/^\/user/", $_SERVER['REQUEST_URI']) ) {
	switch ($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			#header('Content-type:application/json;charset=utf-8');
			#$data = [];
			if (isLogged()) {
				
			} else {
				header('Location: /login');
			}
			break;
		case 'GET':
		default:
			if ($_SERVER['QUERY_STRING'] && isset($_GET['json']) && $_GET['json']=='true') {
				if (isLogged()) {
					if (isset($_GET['navbar_props']) && $_GET['navbar_props'] == 'get') {
						$json = true;
						$data['navbar_props'] = Data::getNavbarProps();
					}
				} else {
					$data = ['error' => 'Necesitas iniciar sesión'];
				}
				header('Content-type:application/json;charset=utf-8');
				echo json_encode($data, JSON_UNESCAPED_UNICODE);
				exit();
			} else {
				if (isLogged()) {
					
				} else {
					header('Location: /login');
				}
			}
			break;
	}
}

?>
