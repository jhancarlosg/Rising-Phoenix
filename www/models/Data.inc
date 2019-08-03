<?php

require_once(CONTROLLER_PATH . 'login.php');
require_once(MODEL_PATH . 'Conexion.inc');

class Data
{
	# parte privada
	private $init;
	private $id;
	
	function __construct() {
		$this->id = hash('adler32', time());
	}
	public function __set($name, $value) {
		$this->init[$name] = $value;
	}
	public function __get($name)
    {
		if (array_key_exists($name, $this->init)) {
            return $this->init[$name];
        }

        $trace = debug_backtrace();
        trigger_error(
            'Propiedad indefinida mediante __get(): ' . $name .
            ' en ' . $trace[0]['file'] .
            ' en la línea ' . $trace[0]['line'],
            E_USER_NOTICE);
        return null;
	}

	public function __isset($name)
    {
        return isset($this->init[$name]);
    }
	public function __unset($name)
    {
        unset($this->init[$name]);
    }

	public function setView($name, $value, $inner = '') {
		if(!isset($this->views)) @ $this->views = [];
		if ($inner && isset($this->init['views'][$name])) {
			$this->init['views'][$name][$inner] = $value;
		} else {
			$this->init['views'][$name] = $value;
		}
	}

	public function downloadFullView($name, $value) {
		return !isset($_SESSION["view-$name"]) || $_SESSION["view-$name"] != md5(toJson($value)) || isEntornoDev();
	}

	public function defineDataView($filepath, $value) {
		$name = basename($filepath, '.inc');
		#console_log($name, $value, $_SESSION["view-$name"]);
		if ($this->downloadFullView($name, $value) || true) {
			$_SESSION["view-$name"] = md5(toJson($value));
			$this->setView($name, $value);
			$this->setView($name, $_SESSION["view-$name"], 'last');
		} else {
			$this->setView($name, ['last'=>$_SESSION["view-$name"]]);
		}
	}

	public function setData($name, $value, $config=[]) {
		if(!isset($this->data)) @ $this->data = [];
		if(!isset($this->init['data'][$name])) @ $this->init['data'][$name] = [];
		if ( (is_bool($config) && $config) || (isset($config['update']) && $config['update'])) {
			if(!isset($this->init['data'][$name]['update'])) @ $this->init['data'][$name]['update'] = [];
			$this->init['data'][$name]['update'] = array_merge($this->init['data'][$name]['update'], $value);
			#console_log($this->init);
		} else {
			$this->init['data'][$name]['nuevo'] = $value;
			if (isset($config['remove_all']) && $config['remove_all']) $this->init['data'][$name]['remove_all'] =true;
		}
	}

	public function defineData($filepath, $value, $config=[]) {
		$name = basename($filepath, '.php');
		#console_log($name, $value, $_SESSION["view-$name"]);
		$this->setData($name,$value, $config);
	}

	public function toJson() {
		return toJson($this->init);
	}

	public function getInitialDataScript() {
		echo "<script id=\"{$this->id}\">".
			"(function(context) {const __DATA_INIT_PAGE = {$this->toJson()};if(context.dataManager) context.dataManager(__DATA_INIT_PAGE);".
			(isEntornoDev() ? 'console.log(__DATA_INIT_PAGE);' : '') .
			"})(this);</script>";
	}

	# parte pública
	const ENTRADA = "INGRESO";
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

	public static function isSupervisor() {
		$return = false;
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT U.idUsuario FROM AsesorVentas AV, UsuarioAsesores U WHERE AV.nombreCompleto='SUPERVISOR' AND AV.idAsesorVentas=U.idAsesorVentas AND U.idUsuario=%d;";
			$result = $db->query( sprintf($sql, getIdUser()) );
			if ($result && $result->num_rows>0) {
				$return = true;
				$result->free();
			}
		}
		return $return;
	}

	public static function deleteRow($id) {
		$return = false;
		$response = [$return, 'init'];
		if (isLogged() && Data::isSupervisor()) {
			$db = new Conexion();
			$sql = "DELETE FROM Atencion WHERE idAtencion=%d;";
			
			$response = [$return, 'is login and supervisor' . sprintf($sql, $id)];
			if ($db->query( sprintf($sql, $id) )) {
				$return = true;
				$response = [$return, 'deleted!'];
			}
		}
		return $return;
	}

	public static function getDataRowsExcel() {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT A.idAtencion, A.fechaHora, C.DNI, C.nombreCompleto, C.telefono, D.nombre, AV.nombreCompleto FROM Atencion A, Cliente C, Distrito D, AsesorVentas AV, Usuario U WHERE A.DNI=C.DNI AND C.idDistrito=D.idDistrito AND A.idAsesorVentas=AV.idAsesorVentas AND A.idUsuario=U.idUsuario ORDER BY A.fechaHora DESC;";
			$result = $db->query( $sql );
			if ($result && $result->num_rows>0) {
				while ($row = $result->fetch_row()) {
					$row[1] = date('d/m/Y H:i:s', strtotime($row[1])-60*60*5);
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

	public static function getDataRows($rows, $page=0) {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT A.idAtencion, A.fechaHora, C.DNI, C.nombreCompleto, C.telefono, D.nombre, AV.nombreCompleto FROM Atencion A, Cliente C, Distrito D, AsesorVentas AV, Usuario U WHERE A.DNI=C.DNI AND C.idDistrito=D.idDistrito AND A.idAsesorVentas=AV.idAsesorVentas AND AV.nombreCompleto!='%s' AND A.idUsuario=U.idUsuario ORDER BY A.fechaHora DESC LIMIT %d, %d;";
			$result = $db->query( sprintf($sql, Data::ENTRADA, $page*$rows, $rows) );
			if ($result && $result->num_rows>0) {
				while ($row = $result->fetch_row()) {
					$row[1] = date('d/m/Y H:i:s', strtotime($row[1])-60*60*5);
					$return[] = $row;
				}
				$result->free();
			}
		}
		return $return;
	}

	public static function getPagesData($rows) {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT COUNT(*) FROM Atencion A, Cliente C, Distrito D, AsesorVentas AV, Usuario U WHERE A.DNI=C.DNI AND C.idDistrito=D.idDistrito AND A.idAsesorVentas=AV.idAsesorVentas AND AV.nombreCompleto!='%s' AND A.idUsuario=U.idUsuario ORDER BY A.fechaHora DESC;";
			$result = $db->query( sprintf($sql, Data::ENTRADA) );
			if ($result) {
				$num_rows = $result->fetch_row()[0];
				$return = ceil($num_rows/$rows);
				$result->free();
			}
		}
		return $return;
	}

	public static function getDataIngreso($rows, $page=0) {
		$return = [];
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT A.idAtencion, C.DNI, C.nombreCompleto, C.telefono, D.nombre, A.fechaHora FROM Atencion A, Cliente C, Distrito D, AsesorVentas AV, Usuario U WHERE A.DNI=C.DNI AND C.idDistrito=D.idDistrito AND A.idAsesorVentas=AV.idAsesorVentas AND AV.nombreCompleto='%s' AND A.idUsuario=U.idUsuario ORDER BY A.fechaHora DESC LIMIT %d, %d;";
			$result = $db->query( sprintf($sql, Data::ENTRADA, $page*$rows, $rows) );
			if ($result && $result->num_rows>0) {
				while ($row = $result->fetch_row()) {
					$row[5] = date('d/m/Y H:i:s', strtotime($row[5])-60*60*5);
					$return[] = $row;
				}
				$result->free();
			}
		}
		return $return;
	}

	public static function getPagesIngreso($rows) {
		$return = 0;
		if (isLogged()) {
			$db = new Conexion();
			$sql = "SELECT COUNT(*) FROM Atencion A, Cliente C, Distrito D, AsesorVentas AV, Usuario U WHERE A.DNI=C.DNI AND C.idDistrito=D.idDistrito AND A.idAsesorVentas=AV.idAsesorVentas AND AV.nombreCompleto='%s' AND A.idUsuario=U.idUsuario ORDER BY A.fechaHora DESC;";
			$result = $db->query( sprintf($sql, Data::ENTRADA ));
			if ($result) {
				$num_rows = $result->fetch_row()[0];
				$return = ceil($num_rows/$rows);
				$result->free();
			}
		}
		return $return;
	}

	public static function getDataDatos($rows=20, $page=0, $view='', $full=false) {
		switch($view) {
			case 'ingreso':
				$tmp_dta = Data::getDataIngreso($rows, $page);
				$pages = Data::getPagesIngreso($rows);
				break;
			default:
				$view = 'atencion';
				$tmp_dta = Data::getDataRows($rows, $page);
				$pages = Data::getPagesData($rows);
				break;
		}
		$new_dta = [];
		if (!isset($_SESSION['datos'])) @ $_SESSION['datos'] = [];
		$limits = [
			'start'=>$tmp_dta[0][0],
			'end'=>end($tmp_dta)[0],
			'pages'=>$pages
		];
		foreach ($tmp_dta as &$fila) {
			$new_dta[$fila[0]] = $fila;
		}
		return ['rows'=>$new_dta, 'view'=> $view, 'limits'=>$limits];
	}
}


$DATA = new Data();

?>
