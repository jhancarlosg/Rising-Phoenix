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
					$filename = "Datos registro - ".date('Y-m-d h:i:s') . ".xls";
					header("Content-type: application/vnd.ms-excel; name='excel'");
					header("Content-Disposition: attachment; filename=\"$filename\"");
					header("Pragma: no-cache");
					header("Expires: 0");
					$show_coloumn = false;
					//$rows = isset($_POST['rows']) ? intval($_POST['rows']) : 20;
					//$top = isset($_POST['top']) ? intval($_POST['top']) : 0;
					$data = Data::getDataRowsExcel();
					$idx = 0;
					if(!empty($data)) {
						foreach ($data as &$row) {
							if (! $show_coloumn) {
								echo implode("\t", ['#', 'FECHA - HORA', 'DNI', 'NOMBRE Y APELLIDO', 'TELEFONO', 'DIRECCION', 'ATENDIDO POR']) . "\n";
								$show_coloumn = true;
							}
							$row[0] = (++$idx);
							echo implode("\t", array_values($row)) . "\n";
						}
					}
					exit();
				} elseif (isset($_GET['json']) && $_GET['json']=='true') {
					//sleep(5);
					$data = [];
					if (isset($_POST['remove'], $_POST['idRow']) && $_POST['remove']=='true') {
						$response = Data::deleteRow(intval($_POST['idRow']));
						if ($response) {
							$data['idRemove'] = intval($_POST['idRow']);
						}
						#$data['msg'] = $response[1];
					}
					header('Content-type:application/json;charset=utf-8');
					echo json_encode($data, JSON_UNESCAPED_UNICODE);
					exit();
				} else {
					include_once(VIEW_PATH . 'datos.inc');
				}
			case 'GET':
			default:
				$tmp_dta = null;
				if ($_SERVER['QUERY_STRING']) {
					if (!isset($_GET['view']) || $_GET['view']!='false') {
						$rows = isset($_GET['rows']) ? intval($_GET['rows']) : 20;
					    $page = isset($_GET['page']) ? intval($_GET['page']) : 0;
						$view = isset($_GET['view']) ? $_GET['view'] : '';
						$tmp_dta = Data::getDataDatos($rows, $page, $view);
						$DATA->tmp_page_rows=[$page, $page==false, $page|20, $rows, 10 | 20];
					}
					if (isset($_GET['canEdit']) && $_GET['canEdit'] == 'get') {
						$DATA->defineData(__FILE__, ['canEdit'=>Data::isSupervisor()]);
					}
				} else {
					$tmp_dta = $DATA::getDataDatos();
				}
				if ($tmp_dta) {
					$data = [];
					$data[$tmp_dta['view']] = $tmp_dta['rows'];
					$data['limits'] = [$tmp_dta['view']=>$tmp_dta['limits']];
					#$DATA->defineData(__FILE__, $data);
					$DATA->defineData('datos-'.$tmp_dta['view'], $tmp_dta['rows'], ['remove_all'=>true]);
					$DATA->defineData('datos-limits', $data['limits']);
				}
				if ($_SERVER['QUERY_STRING'] && isset($_GET['json']) && $_GET['json']=='true') {
					header('Content-type:application/json;charset=utf-8');
					echo $DATA->toJson();
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
