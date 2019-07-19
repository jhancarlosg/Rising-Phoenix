<?php

require_once(MODEL_PATH . 'Data.inc');
require_once(CONTROLLER_PATH . 'Funciones.inc');
require_once(CONTROLLER_PATH . 'login.php');
# insertScript
if (isLogged()) {
	if (Data::isRegister()) {
		insertScript('registro-navs');
	}
	if ( getIdUser() == 1 ) {
		insertScript('setting-navs');
	}
	insertScript('navbar');
}
/*
if (isLogged()):

	if (Data::isRegister()):
	?>
		<script src="/src/scripts/register-navs.jsx" type="text/babel"></script>
	<?php
	endif;
	if ( getIdUser() == 1 ):
	?>
		<script src="/src/scripts/setting-navs.jsx" type="text/babel"></script>
	<?php
	endif;
	?>
		<script src="/src/scripts/navbar.jsx" type="text/babel"></script>
<?php
endif;
*/
?>
