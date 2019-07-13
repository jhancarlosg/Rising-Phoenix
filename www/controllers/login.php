<?php

# $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}||{$_SERVER['REQUEST_URI']}";


# if (strtolower(strval($_SERVER['REQUEST_URI'])) != '/controllers/login.php') {
if (preg_match("/PRUEBA/i", $_SERVER['REQUEST_URI'])) {
    header('HTTP/1.0 404 Not Found');
    readfile('../404.html');
    exit();
}

session_start();

echo strtolower(strval($_SERVER['REQUEST_URI']));
echo "\n" . '/controllers/login.php';
echo "\n" . __FILE__


if (!isset($_SESSION["session_id_user"])) {
    if (!isset($_COOKIE["RSU"]) && !isset($_COOKIE["RCU"])) {

    } else {
        include('../models/SignIn.php');

    }
}
?>