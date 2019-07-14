<?php

class DefaultConfing
{
	const USER = 'root';
	//TODO: Establecer la contraseña del usuario raíz.
	const PASSWORD = 'LCN6nVd0guw3ani9ZXMIv';
	
	const SHORT_NAME = "Registro Web";

	const NAME = "Registro Web | IDAT";

	public static function includeTitle(string $title) {
		return $title . ' | ' . DefaultConfing::NAME;
	}
}

?>