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
				if(isset($_POST["export_data"]) && $_POST["export_data"] == 'true') {
					$filename = "Datos registro - ".date('Y-m-d H:i') . ".xls";
					header("Content-Type: application/vnd.ms-excel");
					header("Content-Disposition: attachment; filename=" . $filename . "");
					$show_coloumn = false;
					$rows = isset($_POST['rows']) ? $_POST['rows'] : 50;
					$data = Data::getDataRows($rows);
					if(!empty($developer_records)) {
						foreach($data as $row) {
							if(!$show_coloumn) {
							// display field/column names in first row
								#echo implode("t", ['FECHA - HORA', 'DNI', 'NOMBRE Y APELLIDO', 'TELEFONO', 'DIRECCION', 'ATENDIDO POR', 'USUARIO']) . "n";
								echo implode("t", array_keys($data)) . "n";
								$show_coloumn = true;
							}
							echo implode("t", array_values($row)) . "n";
						}
					}
					exit;
				} else {
					include_once(VIEW_PATH . 'datos.inc');
				}
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