<?php

class DefaultConfing
{
	public static final $USER = 'root';
	//TODO: Establecer la contraseña del usuario raíz.
	public static final $PASSWORD = 'LCN6nVd0guw3ani9ZXMIv';
	
	public static final $SHORT_NAME = "Registro Web";

	public static final $NAME = "Registro Web | IDAT";

	public static function includeTitle(string $title) {
		return $title . ' | ' . DefaultConfing::$NAME;
	}
}

?>