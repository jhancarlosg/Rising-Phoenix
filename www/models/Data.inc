<?php

require_once(CONTROLLER_PATH . 'login.php');
require_once(MODEL_PATH . 'Conexion.inc');

class Data
{
	public static function getDistritos() {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT nombre FROM Distrito WHERE porDefecto is not null ORDER BY nombre ASC;";
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
			$def_nav['items'] = [
				['link' => '/datos', 'txt' => 'Ver Datos']
			];

			$db = new Conexion();
			$sql = "SELECT correo FROM Usuario WHERE idUsuario=%d;";
			$result = $db->query( sprintf($sql, getIdUser()) );
			if ($result && $result->num_rows>0) {
				$row = $result->fetch_row();
				$return['correo'] = $row[0];
				$result->free();
			}
			$navs = [];
			if (Data::isRegister()) {
				array_unshift($def_nav['items'], ['link' => '/registro', 'txt' => 'Registrar']);
				$sql = "SELECT A.nombreCompleto FROM UsuarioAsesores U, AsesorVentas A WHERE A.idAsesorVentas=U.idAsesorVentas AND A.nombreCompleto!='' AND U.idUsuario=%s;";
				$result = $db->query( sprintf($sql, getIdUser()) );
				if ($result && $result->num_rows>0) {
					$navs['asesores'] = [];
					while ($row = $result->fetch_row()) {
						$navs['asesores'][] = $row[0];
					}
					$result->free();
				}
			}

			# sett_props
			if (getIdUser() == 1) {
				array_unshift($def_nav['items'], ['link' => '/settings', 'txt' => 'Configuraciones']);
				$navs = ['reg_props' => $navs];
			}
			$return['navs'] = $navs;
			$return['def_nav'] = $def_nav;
		}
		return $return;
	}
	public static function getClientData($dni) {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT C.DNI, C.nombreCompleto, C.telefono, D.nombre FROM Cliente C, Distrito D WHERE C.idDistrito=D.idDistrito AND DNI='%s';";
			$result = $db->query( sprintf($sql, $dni) );
			if ($result && $result->num_rows>0) {
				$return = $result->fetch_row();
				$result->free();
			}
		}
		return $return;
	}

	public static function getDataRows($rows) {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT A.fechaHora, C.DNI, C.nombreCompleto, C.telefono, D.nombre, AV.nombreCompleto FROM Atencion A, Cliente C, Distrito D, AsesorVentas AV, Usuario U WHERE A.DNI=C.DNI AND C.idDistrito=D.idDistrito AND A.idAsesorVentas=AV.idAsesorVentas AND AV.nombreCompleto!='PUERTA' AND A.idUsuario=U.idUsuario ORDER BY A.fechaHora DESC LIMIT %d;";
			$result = $db->query( sprintf($sql, $rows) );
			if ($result && $result->num_rows>0) {
				while ($row = $result->fetch_row()) {
					$row[0] = date('d/m/Y H:i:s', strtotime($row[0])-60*60*5);
					$return[] = $row;
				}
				$result->free();
			}
		}
		return $return;
	}

	public static function logout() {
		if(isLogged() && isset($_COOKIE['RSU'])) {
			$db = new Conexion();
			$sql = "UPDATE Sesion SET session='' WHERE session='%s';";
			$db->query(sprintf($sql, $db->escape_string($_COOKIE['RSU'])));
		}
	}
}


?>
