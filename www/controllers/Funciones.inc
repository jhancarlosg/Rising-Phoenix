<?php

date_default_timezone_set('America/Lima');

function notFound(string $path_file = null)
{
    if ($path_file == null) @ $path_file =  "";
    if (preg_match("/^{$path_file}/i", $_SERVER['REQUEST_URI'])) {
        header('HTTP/1.0 404 Not Found');
        readfile('../404.html');
        exit();
    }
}

function isIn($name) {
	return preg_match("/^\/{$name}/", $_SERVER['REQUEST_URI']);
}

function getUserIP()
{
    // Get real visitor IP behind CloudFlare network
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
              $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
              $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}

function setDataJSONMsg(string $tipo, string $msg) {
	return ['tipo' => $tipo, 'msg' => $msg];
}

function isEntornoDev() {
	$return = $_SERVER['SERVER_ADDR'] == '127.0.0.1' || $_SERVER['SERVER_ADDR'] == '192.168.0.6' || $_SERVER['SERVER_NAME'] == 'localhost';
	if($return && isset($_GET, $_GET['dev']) && $_GET['dev'] == 'false') {
		$return = false;
	}
	return $return;
}

?>
