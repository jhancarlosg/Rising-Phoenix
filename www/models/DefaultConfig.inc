<?php

class DefaultConfing
{
	private static $CORREO_ROOT = 'admin@root';
	//TODO: Establecer la contraseña del usuario raíz.
	private static $PASSWORD_ROOT = 'LCN6nVd0guw3ani9ZXMIv';
	
	const SHORT_NAME = "Registro Web";

	const NAME = "Registro Web | IDAT";

	public static function includeTitle(string $title) {
		return $title . ' | ' . DefaultConfing::NAME;
	}

	public static function getCorreoRoot() {
		return DefaultConfing::$CORREO_ROOT;
	}

	public static function getPasswordRoot() {
		return DefaultConfing::$PASSWORD_ROOT;
	}
}

?>