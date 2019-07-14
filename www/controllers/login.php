<?php

# $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}||{$_SERVER['REQUEST_URI']}";


# if (strtolower(strval($_SERVER['REQUEST_URI'])) != '/controllers/login.php') {
require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once('./Funciones.inc');

notFound('\/controllers\/login.php');

session_start();

/**
 * @return bool TRUE si el usuario está logueado
 */
function isLogged()
{
	return isset($_SESSION["session_id_user"]);
}

/**
 * @return string El ID del usuario logueado
 * @return null Si no hay un usuario logueado
 */
function getIdUser()
{
	$id_user = null;
	if (isLogged()) @ $id_user = $_SESSION["session_id_user"];
	return $id_user;
}


if ( !isLogged() && isset($_COOKIE['RSU']) && isset($_COOKIE['RCU']) && !empty($_COOKIE['RSU']) && !empty($_COOKIE['RCU']) ) {
	include_once(MODEL_PATH . 'SignIn.inc');
	$correo = $_COOKIE["RCU"];
	$pass = "";
	$sesion = $_COOKIE["RSU"];
	$ip = getUserIP();
	$login = new SignIn($correo, $pass, $sesion, $ip);
	$login->userLogged();
	if ($login->isLogged()) {
		$_SESSION["session_id_user"] = $login->getIdUser();
	} else {
		setcookie('RSU', '', time()-100);
		setcookie('RCU', '', time()-100);
		unset($_COOKIE['RSU'], $_COOKIE['RCU']);
	}
	unset($correo, $pass, $sesion, $ip, $login);
}

function setDataJSONMsg(string $tipo, string $msg) {
	return ['tipo' => $tipo, 'msg' => $msg];
}

if ( preg_match("/^\/login/", $_SERVER['REQUEST_URI']) ) { # cuando están o utilizan directamente /login
	switch ($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			if ( isset($_POST["email"]) && isset($_POST["pass"]) ) {
				header('Content-type:application/json;charset=utf-8');
				if (!empty($_POST["email"]) && !empty($_POST["pass"])) {
					include_once(MODEL_PATH . 'SignIn.inc');
					$correo = $_POST["email"];
					$pass = $_POST["pass"];
					$ip = getUserIP();
					$sesion = $correo . $pass . $ip . strval(time());
					$login = new SignIn($correo, $pass, $sesion, $ip);
					$login->login();
					if ($login->isLogged()) {
						$_SESSION["session_id_user"] = $login->getIdUser();

						$save = isset($_POST['save']) ? (is_bool($_POST['save']) ? $_POST['save'] : $_POST['save'] == 'true') : false;
						$time = $save ? time() + (60*60*24*183) : 0;

						setcookie('RSU', $login->getSession(), $time);
						setcookie('RCU', $login->getCorreoHashed(), $time);

						unset($save, $time);

						$data = setDataJSONMsg('success','Ingreso exitoso');
					} else {
						$data = setDataJSONMsg('warning','Credenciales incorrectas');
					}
					unset($correo, $pass, $sesion, $ip, $login);
				} else {
					$data = setDataJSONMsg('warning','Campos vacíos');
				}
			} else {
				# $data = '{"data": {"tipo": "error", "mensaje": "Datos "}}';
				$data = setDataJSONMsg('danger','Envía de datos incorrectos');
			}
			echo json_encode($data);
			exit();
			break;
		case 'GET':
		default:
			if (isLogged()) {
				header('Location: /');
			} else {
				include_once(VIEW_PATH . 'login.inc');
			}
			break;
	}
}




/*
if (preg_match("/^\/inicio/", $_SERVER['REQUEST_URI']) && isLogged()):

?>

<script src="/src/scripts/navbar.jsx"></script>

<?php

endif;

*/


?>