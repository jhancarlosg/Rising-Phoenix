<?php

require_once(CONTROLLER_PATH . 'login.php');
require_once(MODEL_PATH . 'Conexion.inc');

class Data
{
	public static function getDistritos() {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT nombre FROM Distrito WHERE porDefecto=true;";
			$result = $db->query( $sql );
			if ($result && $result->num_rows>0) {
				while ($row = $result->fetch_row()) {
					$return[] = $row[0];
				}
				$result->free();
			}
		}
		return $return;
	}

	public static function isRegister() {
		$return = false;
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT COUNT(*) FROM UsuarioAsesores U, AsesorVentas V WHERE U.idUsuario=%s AND U.idAsesorVentas = V.idAsesorVentas AND V.nombreCompleto != '';";
			$result = $db->query( sprintf($sql, getIdUser()) );
			if ($result && $result->fetch_row()[0] > 0) {
				$return = true;
				$result->free();
			}
		}
		return $return;
	}

	public static function getNavbarProps() {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT correo FROM Usuario WHERE idUsuario=%d;";
			$result = $db->query( sprintf($sql, getIdUser()) );
			if ($result && $result->num_rows>0) {
				$row = $result->fetch_row();
				$return['correo'] = $row[0];
				$result->free();
			}
			$sql = "SELECT A.nombreCompleto FROM UsuarioAsesores U, AsesorVentas A WHERE A.idAsesorVentas=U.idAsesorVentas AND A.nombreCompleto!='' AND U.idUsuario=%s;";
			$result = $db->query( sprintf($sql, getIdUser()) );
			if ($result && $result->num_rows>0) {
				$return['asesores'] = [];
				while ($row = $result->fetch_row()) {
					$return['asesores'][] = $row[0];
				}
				$result->free();
			}
		}
		return $return;
	}
}


?>