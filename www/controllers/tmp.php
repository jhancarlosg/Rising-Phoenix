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
$D_I->setView('distritos', $tmp_value = Data::getDistritos());
echo $D_I->toJson() . '<br>';
echo $D_I->getInitialDataScript() . '<br>' . __FILE__ . '<br>' . basename(__FILE__, '.inc');


} else {
	notFound('\/tmp');
}

?>

