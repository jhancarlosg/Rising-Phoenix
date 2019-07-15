<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');

notFound('\/controllers\/registro.php');

require_once(CONTROLLER_PATH . 'login.php');

function newToken() {
	return hash('adler32', strval(getIdUser()) . time() . date('Y-m-h-i-s') );
}

if (isLogged()) {
	if ( preg_match("/^\/registro/", $_SERVER['REQUEST_URI']) ) {
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'POST':

			function testData($tmpDni, $tmpToken, $tmpNam, $tmpTel, $tmpDist, $tmpMod, $tmpAse) {
				return ($tmpDni && strlen($tmpDni) == 8 && $tmpToken) && ( ( !is_null($tmpMod) && !$tmpMod) || ($tmpNam && $tmpDist && strlen($tmpTel)) <= 12);
			}
				header('Content-type:application/json;charset=utf-8');
				$data = [];
				if(isset($_POST['dni'], $_POST['token_registros'])) {
					$dni = trim($_POST['dni']);
					$token_registros = trim($_POST['token_registros']);
					$fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
					$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
					$distrito = isset($_POST['distrito']) ? trim($_POST['distrito']) : '';
					$asesor = isset($_POST['asesor']) ? trim($_POST['asesor']) : '';
					$mod_cliente = isset($_POST['mod_cliente']) ? (is_bool($_POST['mod_cliente']) ? $_POST['mod_cliente'] : (trim($_POST['mod_cliente']) == 'true')) : null;
					if (testData($dni, $token_registros, $fullname, $telefono, $distrito, $mod_cliente, $asesor)) {
						include_once(MODEL_PATH . 'Registro.inc');
						$registro = new Registro(getIdUser(), $dni, $fullname, $telefono, $distrito, $token, $asesor, $mod_cliente);
						if ($registro->registrar()) {
							$data = setDataJSONMsg("success", "REGISTRO EXITOSO");
						} else {
							$data = setDataJSONMsg("danger", "NO SE PUEDO GUARDAR EL REGISTRO");
							$data["token"] = newToken();
						}
					} else {
						$data = setDataJSONMsg("danger", "Envíe los datos necesarios o complete los espacios correctamente");
					}
				} else {
					$data = setDataJSONMsg("danger", "Envíe los datos necesarios");
				}
				echo json_encode($data);
				exit();
				break;
			case 'GET':
			default:
				if (isset($_GET['token']) && $_GET['token'] == 'true') {
					header('Content-type:application/json;charset=utf-8');
					echo json_encode(['token' => newToken()]);
					exit();
				} else {
					include_once(VIEW_PATH . 'registro.inc');
				}
				break;
		}
	}
}

?>