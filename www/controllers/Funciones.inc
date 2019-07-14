<?php

function notFound(string $path_file)
{
    if (preg_match("/^{$path_file}/i", $_SERVER['REQUEST_URI'])) {
        header('HTTP/1.0 404 Not Found');
        readfile('../404.html');
        exit();
    }
}

?>