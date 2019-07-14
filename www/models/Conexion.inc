<?php

class Conexion extends mysqli
{
	//TODO: cambiar la dirección del servidor
	const SERVER_DIR = "localhost";
	const DATABASE = "RegistroDB";
	const USERNAME = "root";
	const PASSWORD = "";
	public function __construct() {
		parent::__construct(Conexion::SERVER_DIR, Conexion::USERNAME, Conexion::PASSWORD, Conexion::DATABASE);
		if ($this->connect_error) {
			error_log("Connection failed: " . mysqli_connect_error());
			die("No se puedo conectar con la base de datos:\n" . mysqli_connect_error());
		}
	}
}


?>