<?php

# $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}||{$_SERVER['REQUEST_URI']}";


# if (strtolower(strval($_SERVER['REQUEST_URI'])) != '/controllers/login.php') {
require_once('./Funciones.inc');

notFound('/controllers/login.php');

session_start();

if (!isset($_SESSION["session_id_user"])) {
    if (!isset($_COOKIE["RSU"]) && !isset($_COOKIE["RCU"])) {

    } else {
        include('../models/SignIn.php');

    }
}
?>