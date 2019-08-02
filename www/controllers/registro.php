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
	if ( isIn('registro') ) {
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'POST':

			function testData($tmpDni, $tmpToken, $tmpNam, $tmpTel, $tmpDist, $tmpMod, $tmpAse) {
				return ($tmpDni && strlen($tmpDni) == 8 && $tmpToken && $tmpAse) && ( ( !is_null($tmpMod) && !$tmpMod) || ($tmpNam && $tmpDist && (!$tmpTel || strlen($tmpTel) == 9 || strlen($tmpTel) == 7)) );
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
						if (is_null($mod_cliente) || !$mod_cliente) {
							$respuesta = $registro->registrar();
						} else {
							$new_dni = isset($_POST['new_dni']) ? trim($_POST['new_dni']) : '';
							$respuesta = $registro->actualizarCliente($new_dni);
						}
						if ($respuesta[0]) {
							$data = setDataJSONMsgRegistro("success", $respuesta[1]);
						} else {
							$data = setDataJSONMsgRegistro("danger", $respuesta[1]);
						}
					} else {
						$data = setDataJSONMsgRegistro("danger", "Envíe los datos necesarios o complete los espacios correctamente");
					}
				} else {
					$data = setDataJSONMsgRegistro("danger", "Envíe los datos necesarios");
				}
				echo json_encode($data, JSON_UNESCAPED_UNICODE);
				exit();
				break;
			case 'GET':
			default:
				if ($_SERVER['QUERY_STRING'] && isset($_GET['json']) && $_GET['json']=='true') {
					$data = [];
					$headers = ['withNotModified' => false, 'canNotModified'=> true];
					if (isset($_GET['token']) && $_GET['token'] == 'get') {
						$headers['canNotModified'] = false;
						$data['token'] = newToken();
					}
					if (isset($_GET['distritos']) && $_GET['distritos'] == 'get') {
						$headers['withNotModified'] = true;
						$headers['public'] = true;
						$data['distritos'] = Data::getDistritos();
					}
					if (isset($_GET['navbar_props']) && $_GET['navbar_props'] == 'get') {
						$headers['withNotModified'] = true;
						$data['navbar_props'] = Data::getNavbarProps();
					}
					if (isset($_GET['client'], $_GET['dni']) && $_GET['client'] == 'get' && strlen($_GET['dni']) == 8) {
						$headers['withNotModified'] = true;
						$tmp = Data::getClientData($_GET['dni']);
						if (count($tmp)>0) {
							$data['dni'] = $tmp[0];
							$data['fullname'] = $tmp[1];
							$data['telefono'] = $tmp[2];
							$data['distrito'] = $tmp[3];
						}
					}
					returnJson($data, $headers);
				} else {
					include_once(VIEW_PATH . 'registro.inc');
				}
				break;
		}
	}
} elseif (isLogged()) {
	header('Location: /datos');
} else {
	header('Location: /login');
}

?>
