<?php

require_once("config/index.php");

class Conexion extends mysqli
{
	//TODO: cambiar la dirección del servidor
	static final $serverdir = "localhost";
	static final $database = "RegistroDB";
	static final $user = "root";
	static final $password = "";
	public function __construct() {
		parent::__construct(Conexion::$serverdir, Conexion::$username, Conexion::$password, Conexion::$database);
		if ($this->connect_error) {
			error_log("Connection failed: " . mysqli_connect_error());
			die("No se puedo conectar con la base de datos:\n" . mysqli_connect_error());
		}
	}
}


?>