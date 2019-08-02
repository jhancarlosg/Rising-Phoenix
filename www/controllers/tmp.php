<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/dirs.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(MODEL_PATH . 'Data.inc');

notFound('\/controllers\/tmp.php');

if (isEntornoDev()){



echo date_default_timezone_get().'<br>';
echo date('d/m/Y H:i:s').'<br>';
$data = ['distritos'=>Data::getDistritos()];
echo toJson($data) . '<br>';
echo md5(toJson($data)) . '<br>';
$DATA->setView('distritos', $tmp_value = Data::getDistritos());
echo $DATA->toJson() . '<br>';
echo $DATA->getInitialDataScript() . '<br>' . __FILE__ . '<br>' . basename('hola', '.inc');


} else {
	notFound('\/tmp');
}

?>

