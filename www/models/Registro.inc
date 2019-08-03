<?php

require_once(MODEL_PATH . 'Conexion.inc');

class Registro
{
    private $idUser;
    private $dni;
    private $fullname;
    private $telefono;
    private $sin_telefono;
    private $distrito;
    private $token;
    private $asesor;
    private $idDistrito;
    private $idAsesor;
    private $db;
    private $respuesta;

    public function __construct(int $idUser, string $dni, string $fullname, string $telefono, string $distrito, string $token, string $asesor, $sin_telefono=false) {
        $this->idUser = $idUser;
        $this->dni = $dni;
        $this->fullname = $fullname;
        $this->telefono = $telefono;
        $this->sin_telefono = $sin_telefono;
        $this->distrito = $distrito;
        $this->token = $token;
        $this->asesor = $asesor;
        $this->db = new Conexion();
        $this->idDistrito = null;
        $this->idAsesor = null;
    }

    public function registrar() {
        $this->db->init();
        $result = false;
         $this->respuesta = [$result, 'NO SE PUDO COMPLETAR EL REGISTRO'];
        if ($this->hasPrivilegios() && $this->checkToken() && $this->manageCliente()) {
            $sql = "INSERT INTO Atencion (DNI, idAsesorVentas, idUsuario, token) VALUES ('%s', %d, %d, '%s');";
            $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->dni), $this->idAsesor, $this->idUser, $this->db->escape_string($this->token) ) );
			if ($result) @ $this->respuesta = [$result, 'REGISTRO EXISTOSO' ];
        }
        return $this->respuesta;
    }

	public function actualizarCliente($new_dni) {
		$this->db->init();
        $return = false;
        $this->respuesta = [$return, 'Actualización fallida'];
        if ($this->hasPrivilegios() && Data::isSupervisor()) {
			$sql = "SELECT DNI FROM Cliente WHERE DNI='%s';";
	        $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->dni)) );
			$con_cambio = false;
			if ($result && $result->num_rows==1 && $this->getIdDistrito()) {
				
		        $sql = "UPDATE Cliente SET "; # nombreCompleto='%s', telefono=%s, idDistrito=%d
				$sql = sprintf(
				    $sql,
				    $this->db->escape_string($this->fullname),
				    ($this->telefono ? "'" . $this->db->escape_string($this->telefono) . "'" : 'NULL'),
				    $this->idDistrito
				);

				if ($this->fullname) {
					if ($con_cambio) @$sql.=', ';
					$sql .= "nombreCompleto='{$this->db->escape_string($this->fullname)}'";
					$con_cambio=true;
				}

				if ($this->idDistrito) {
					if ($con_cambio) @$sql.=', ';
					$sql .= "idDistrito={$this->db->escape_string($this->idDistrito)}";
					$con_cambio=true;
				}

				if ($this->telefono) {
					if ($con_cambio) @$sql.=', ';
					$sql .= "telefono='{$this->db->escape_string($this->telefono)}'";
					$con_cambio=true;
				} elseif ($this->sin_telefono) {
					if ($con_cambio) @$sql.=', ';
					$sql .= "telefono=NULL";
					$con_cambio=true;
				}

				if ($new_dni) { # cambiando el DNI					
					if ($con_cambio) @$sql.=', ';
					$sql .= "DNI='{$this->db->escape_string($new_dni)}'";
				}
				if ($con_cambio) {
				    $sql .= " WHERE DNI='%s';";
					$sql = sprintf(
						$sql,
						$this->db->escape_string($this->dni)
					);
					$return = $this->db->query($sql);
				    if ($return) @ $this->respuesta = [$return, '¡Actualización exitosa!' ];
				}
			}
			$result->free();
        }
        return $this->respuesta;
	}

    # PRIVATE FUNCTIONS

    private function hasPrivilegios() {
        $return = false;
        $this->respuesta = [$return, 'hasPrivilegios init'];
        if ($this->getIdAsesor()) {
            $this->respuesta = [$return, 'hasPrivilegios getIdAsesor init'];
            $sql = "SELECT * FROM UsuarioAsesores WHERE idAsesorVentas=%d AND idUsuario=%d;";
            $result = $this->db->query( sprintf( $sql, $this->idAsesor, $this->idUser ) );
            if ($result && $result->num_rows > 0) {
                $return = true;
                $result->free();
                $this->respuesta = [$return, 'hasPrivilegios true tenemos privilegios'];
            }
        }
        return $return;
    }

    private function getIdAsesor() {
        $this->respuesta = [false, 'getIdAsesor init'];
        $sql = "SELECT idAsesorVentas FROM AsesorVentas WHERE nombreCompleto = '%s';";
        $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->asesor)) );
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_row();
            $this->idAsesor = $row[0];
            $result->free();
            $this->respuesta = [true, 'getIdAsesor true'];
        }
        return !is_null($this->idAsesor);
    }

    private function checkToken() {
        $return = false;
        $this->respuesta = [$return, 'checkToken init'];
        $sql = "SELECT idUsario, idAsesorVentas FROM Atencion WHERE token='%s';";
        $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->token)) );
        if ($result && $result->num_rows>0) {
            $this->respuesta = [$return, 'checkToken result init mismo token'];
            $row = $result->fetch_row();
            if ($row[0]!=$this->idUser || $row[1]!=$this->idAsesor) {
                $return = true;
                $this->respuesta = [$return, 'checkToken result true mismo token diferente usuario asesor'];
            }
        } else {
            $return = true;
            $this->respuesta = [$return, 'checkToken result true diferente token'];
        }
        return $return;
    }

    private function getIdDistrito() {
        if ($this->insertDistrito()) @ $this->searchIdDistrito();
        return !is_null($this->idDistrito);
    }

    private function searchIdDistrito() {
        if (!$this->idDistrito) {
            $sql = "SELECT idDistrito FROM Distrito WHERE nombre like '%s';";
            $result = $this->db->query(sprintf($sql, $this->db->escape_string($this->distrito)));
            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_row();
                $this->idDistrito = $row[0];
                $result->free();
            }
        }
        return !is_null($this->idDistrito);
    }

    private function insertDistrito() {
        $result = false;
        if (!$this->searchIdDistrito()) {
            $sql = "INSERT INTO Distrito (nombre) VALUES ('%s');";
            $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->distrito)) );
        }
        return $result;
 
    }

    private function manageCliente()
    {
        $return = false;
        $sql = "SELECT DNI FROM Cliente WHERE DNI='%s';";
        $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->dni)) );
		if ($result) {
		    if ($result->num_rows == 0) {
			    if ($this->getIdDistrito()) @ $return = $this->insertCliente();
		    } else {
				$return = true;
			}
			$result->free();
		}
        return $return;
    }

    private function insertCliente() {
        $sql = "INSERT INTO Cliente VALUES ('%s', '%s', %s, %d);";
        $sql = sprintf(
            $sql,
            $this->db->escape_string($this->dni),
            $this->db->escape_string($this->fullname),
            ($this->telefono ? "'" . $this->db->escape_string($this->telefono) . "'" : 'NULL'),
            $this->idDistrito
        );
        return $this->db->query($sql);
    }
}


?>
