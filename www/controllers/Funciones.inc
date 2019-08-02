<?php

date_default_timezone_set('America/Lima');

function console_log() {
	if (isEntornoDev()) {
		$args = func_get_args();
		#$js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
		$js_code = '<script>console.log("PHP_LOG:"';
		foreach ($args as &$arg) {
			$js_code .= ', ' . json_encode($arg);
		}
		$js_code .= ');</script>';
		echo $js_code;
	}
}

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

function toJson(&$val) {
	return json_encode($val, JSON_UNESCAPED_UNICODE);
}

function returnJson(&$data, $headers) {
	if (!isset($headers['canNotModified'])) @ $headers['canNotModified'] = true;
	if (!isset($headers['withNotModified'])) @ $headers['withNotModified'] = false;
	if (!isset($headers['public'])) @ $headers['public'] = false;
	header('Content-type:application/json;charset=utf-8');
	$return = toJson($data);
	if ($headers['withNotModified'] && $headers['canNotModified']) {
		$etag = md5($return);
		header("Etag: $etag");
		header('Cache-Control: ' . ($headers['public'] ? 'public' : 'private'));
		if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) == $etag) {
			header("HTTP/1.1 304 Not Modified");
            exit();
		}
	}
	echo $return;
	exit();
}

?>
