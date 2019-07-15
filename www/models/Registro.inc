<?php

require_once(MODEL_PATH . 'Conexion.inc');

class Registro
{
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

    public function __construct(string $dni, string $fullname, stiring $telefono, string $distrito, string $token, string $asesor, $mod_cliente=null) {
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
        if ($this->getIdDistrito() && $this->manageCliente()) {
            
        }
        return $result;
    }

    # PRIVATE FUNCTIONS

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

    private function manageCliente()
    {
        $result = false;
        if ($this->idDistrito) {
            $sql = "SELECT COUNT(*) FROM Cliente WHERE DNI='%s';";
            $result = $this->db->query( sprintf($sql, $this->db->escape_string($this->dni)) );
            if ($result && $result->fetch_row()[0] == 0 && is_null($this->mod_cliente)) {
                $result = $this->insertCliente();
            } elseif ($this->mod_cliente) {
                $result = $this->updateCliente();
            }
        }
        return $result;
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

    private function getIdDistrito() {
        if ($this->insertDistrito()) @ $this->searchIdDistrito();
        return !is_null($this->idDistrito);
    }
}


?>