<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(ROOT_PATH . '../self-mysql/DataForConexion.inc');

class Conexion extends mysqli
{
	//TODO: cambiar la dirección del servidor
	const SERVER_DIR = DataForConexion::SERVER_DIR;
	const DATABASE = DataForConexion::DATABASE;
	const USERNAME = DataForConexion::USERNAME;
	const PASSWORD = DataForConexion::PASSWORD;
	public function __construct() {
		parent::__construct(Conexion::SERVER_DIR, Conexion::USERNAME, Conexion::PASSWORD, Conexion::DATABASE);
		if ($this->connect_error) {
			error_log("Connection failed: " . mysqli_connect_error());
			die("No se puedo conectar con la base de datos:\n" . mysqli_connect_error());
		}
		$this->set_charset ( 'utf8' );
	}
}


?>
