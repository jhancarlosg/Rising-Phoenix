<?php

require_once('./Conexion.php');

class SignIn
{
    private $correo;
    private $password;
    private $session;
    private $ip;
    private $id_user;

    /**
     * @param string $correo Correo del usuario
     * @param string $password Contraseña
     * @param string $session Hash generado para la sesión
     * @param string $ip Ip de la del dispositivo de donde se está conectando
     */
    public function __construct(string $correo, string $password, string $session, string $ip) {
        # $this->correo = mysqli::escape_string($correo) ;
        $this->correo = $correo;
        $this->password = $password;
        $this->session = $session;
        $this->ip = $ip;
	$this->userLogged();

        if ($this->isLogged() == null && filter_var($this->correo, FILTER_VALIDATE_EMAIL)) {
            $this->login();
        }
    }

    /**
     * @param string $valor Dato para pasar por el hash
     * @return string Hash de sha256 de $valor
     */
    private function hashVal(string $valor)
    {
        return hash("sha256", $valor);
    }

    private function userLogged()
    {
        $user = null;
        $db = new Conexion();
        $sql = "SELECT S.idUsuario, U.correo FROM Usuario U, Sesion S WHERE S.session='{$this->session}' AND S.ip='{$this->ip}' AND S.idUsuario = U.idUsuario;";
        $result = $db->query($sql);
        if ($result->num_rows > 0) {
            $row=$result->fetch_row();
            if ($this->hashVal($row[0].$row[1])==$this->correo) {
                $user = $row[0];
            }
            $result->free();
        }
        $this->id_user = $user;
        $db->close();
    }

    private function login() {
        $db = new Conexion();
	$sql1 = "SELECT idUsuario FROM Usuario WHERE correo='{$this->correo}' AND password='{$this->hashVal($this->password)}';";
	$result = $db->query($sql1);
	if ($result->num_rows == 1) {
		$row = $result->fetch_row();
		$this->session = $this->hashVal(date('YYYY-MM-DD') . $this->correo);
		$sql2 = "INSERT INTO Sesion (idUsuario, session, ip) VALUES ({$row[0]}, {$this->session}, {$this->ip});";
		if ($db->query($sql2)) {
			$this->id_user = $row[0];
		}
	}

    }

    /**
     * @return bool Determinar si hay un usuario logeado
     */
    public function isLogged() {
        return $this->id_user != null;
    }


    public function getIdUser()
    {
        return $this->id_user;
    }
}


?>
