<?php

require("config/index.php")

class Conexion
{
	//TODO: cambiar la dirección del servidor
	static const $serverdir = "localhost";
	static const $database = "RegistroDB";
	static const $user = "mysql";
	static const $password = "";
	private $conn;
	public function __construct() {
		$conn = mysqli_connect($serverdir, $username, $password, $database);
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
	}

}


?>