<?php

# $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}||{$_SERVER['REQUEST_URI']}";


# if (strtolower(strval($_SERVER['REQUEST_URI'])) != '/controllers/login.php') {
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

if (!isLogged()):
	if (isset($_COOKIE["RSU"]) && isset($_COOKIE["RCU"])) {
		include_once('../models/SignIn.php');
		$correo = $_COOKIE["RCU"];
		$pass = "";
		$sesion = $_COOKIE["RSU"];
		$ip = getUserIP();
		$login = new SignIn($correo, $pass, $sesion, $ip);
		if ($login->isLogged()) {
			$_SESSION["session_id_user"] = $login->getIdUser();
		}
	} else {
		
	}
else:

?>

<script src=""></script>

<?php

endif;

?>