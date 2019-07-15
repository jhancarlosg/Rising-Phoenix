<?php

require_once(MODEL_PATH . 'Conexion.inc');

class Registro
{
    private $idUser;
    private $dni;
    private $fullname;
    private $telefono;
    private $distrito;
    private $token;
    private $asesor;
    private $mod_cliente;
    private $idDistrito;
    private $idAsesor;
    private $db;

    public function __construct(int $idUser, string $dni, string $fullname, string $telefono, string $distrito, string $token, string $asesor, $mod_cliente) {
        $this->idUser = $idUser;
        $this->dni = $dni;
        $this->fullname = $fullname;
        $this->telefono = $telefono;
        $this->distrito = $distrito;
        $this->token = $token;
        $this->asesor = $asesor;
        $this->mod_cliente = $mod_cliente;
        $this->db = new Conexion();
        $this->idDistrito = null;
        $this->idAsesor = null;
    }

    public function registrar() {
        $result = false;

        if ($this->hasPrivilegios() && $this->checkToken() && $this->manageCliente()) {
            $sql = "INSERT INTO Atencion (DNI, idAsesorVentas, idUsuario, token) VALUES ('%s', %d, %d, '%s');";
            $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->dni), $this->idAsesor, $this->idUser, $this->db->escape_string($this->token) ) );
        }
        $this->db->close();
        return $result;
    }

    # PRIVATE FUNCTIONS

    private function hasPrivilegios() {
        $return = false;
        if ($this->getIdAsesor()) {
            $sql = "SELECT * FROM UsuarioAsesores WHERE idAsesorVentas=%d AND idUsuario=%d;";
            $result = $this->db->query( sprintf( $sql, $this->idAsesor, $this->idUser ) );
            if ($result && $result->num_rows > 0) {
                $return = true;
                $result->free();
            }
        }
        return $return;
    }

    private function getIdAsesor() {
        $sql = "SELECT idAsesorVentas FROM AsersorVentas WHERE nombreCompleto = '%s';";
        $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->asesor)) );
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_row();
            $this->idAsesor = $row[0];
            $result->free();
        }
        return !is_null($this->idAsesor);
    }

    private function checkToken() {
        $return = false;
        $sql = "SELECT idUsario, idAsesorVentas FROM Atencion WHERE token='%s';";
        $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->token)) );
        if ($result) {
            $row = $result->fetch_row();
            if ($row && ($row[0]!=$this->idUser || $row[1]!=$this->idAsesor)) {
                $return = true;
            } else {
                $return = true;
            }
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
        if ($this->searchIdDistrito()) {
            $sql = "INSERT INTO Distrito (nombre) VALUES ('%s');";
            $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->distrito)) );
        }
        return $result;
 
    }

    private function manageCliente()
    {
        $result = false;
        if ($this->getIdDistrito()) {
            $sql = "SELECT DNI FROM Cliente WHERE DNI='%s';";
            $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->dni)) );
            if ($result && $result->num_rows == 0 && is_null($this->mod_cliente)) {
                $result = $this->insertCliente();
            } elseif ($this->mod_cliente) {
                $result = $this->updateCliente();
            }
        }
        return $result;
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

    private function updateCliente() {
        $sql = "UPDATE Cliente SET nombreCompleto='%s', telefono=%s, idDistrito=%d WHERE DNI='%s';";
        $sql = sprintf(
            $sql,
            $this->db->escape_string($this->fullname),
            ($this->telefono ? "'" . $this->db->escape_string($this->telefono) . "'" : 'NULL'),
            $this->idDistrito,
            $this->db->escape_string($this->dni)
        );
        return $this->db->query($sql);
    }
}


?>