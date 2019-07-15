<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/registro.php');

require_once(CONTROLLER_PATH . 'login.php');

function newToken() {
	return hash('adler32', strval(getIdUser()) . time() . date('Y-m-h-i-s') );
}

function setDataJSONMsgRegistro($tipo, $msg)
{
	$data = setDataJSONMsg($tipo, $msg);
	$data['token'] = newToken();
	return $data;
}

if (isLogged() && Data::isRegister()) {
	if ( preg_match("/^\/registro/", $_SERVER['REQUEST_URI']) ) {
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'POST':

			function testData($tmpDni, $tmpToken, $tmpNam, $tmpTel, $tmpDist, $tmpMod, $tmpAse) {
				return ($tmpDni && strlen($tmpDni) == 8 && $tmpToken && $tmpAse) && ( ( !is_null($tmpMod) && !$tmpMod) || ($tmpNam && $tmpDist && strlen($tmpTel)) <= 12);
			}
				header('Content-type:application/json;charset=utf-8');
				$data = [];
				if(isset($_POST['dni'], $_POST['token_registros'], $_POST['asesor'])) {
					$dni = trim($_POST['dni']);
					$token_registros = trim($_POST['token_registros']);
					$asesor = trim($_POST['asesor']);
					$fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
					$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
					$distrito = isset($_POST['distrito']) ? trim($_POST['distrito']) : '';
					$mod_cliente = isset($_POST['mod_cliente']) ? (is_bool($_POST['mod_cliente']) ? $_POST['mod_cliente'] : (trim($_POST['mod_cliente']) == 'true')) : null;
					if (testData($dni, $token_registros, $fullname, $telefono, $distrito, $mod_cliente, $asesor)) {
						include_once(MODEL_PATH . 'Registro.inc');
						$registro = new Registro(getIdUser(), $dni, $fullname, $telefono, $distrito, $token_registros, $asesor, $mod_cliente);
						if ($registro->registrar()) {
							$data = setDataJSONMsgRegistro("success", "REGISTRO EXITOSO");
						} else {
							$data = setDataJSONMsgRegistro("danger", "NO SE PUEDO GUARDAR EL REGISTRO");
						}
					} else {
						$data = setDataJSONMsgRegistro("danger", "Envíe los datos necesarios o complete los espacios correctamente");
					}
				} else {
					$data = setDataJSONMsgRegistro("danger", "Envíe los datos necesarios");
				}
				echo json_encode($data);
				exit();
				break;
			case 'GET':
			default:
				if ($_SERVER['QUERY_STRING']) {
					$json = false;
					$data = [];
					if (isset($_GET['token']) && $_GET['token'] == 'get') {
						$json = true;
						$data['token'] = newToken();
					}
					if (isset($_GET['distritos']) && $_GET['distritos'] == 'get') {
						$json = true;
						$data['distritos'] = newToken();
					}
					if ($json) {
						header('Content-type:application/json;charset=utf-8');
						echo json_encode($data);
						exit();
					} else {
						include_once(VIEW_PATH . 'registro.inc');
					}
					
				} else {
					include_once(VIEW_PATH . 'registro.inc');
				}
				break;
		}
	}
} else {
	header('Location: /login');
}

?>