<?php

require_once(CONTROLLER_PATH . 'login.php');
require_once(MODEL_PATH . 'Conexion.inc');

class Data
{
    public static function getDistritos() {

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
}


?>