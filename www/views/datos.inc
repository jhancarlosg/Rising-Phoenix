<?php 

require_once(MODEL_PATH . 'DefaultConfig.inc');
include_once(VIEW_PATH . "head.inc");
require_once(MODEL_PATH . 'Data.inc');

require_once(CONTROLLER_PATH . 'login.php');

?>
    <title><?php echo DefaultConfing::includeTitle('Datos') ?></title>
	<script src="https://unpkg.com/xlsx/dist/xlsx.full.min.js" async></script>
</head>
<body>
<?php
	include_once(VIEW_PATH . 'header.inc');
?>
	<section style="align-items: flex-start;">
        <div id="datos-cnt" class="col-sm-10 col-xs-12"></div>
    </section>
	<?php 
	# <script src="/src/scripts/datos.jsx" type="text/babel"></script>
	
	$tmp_view_data = [
		'opciones' => [
			'atencion'=>[
				'thead'=>["#", "FECHA y HORA", "DNI", "NOMBRE Y APELLIDO", "TELÉFONO", "DISTRITO", "ATENDIDO POR"],
				'txt'=>'Atención'
			],
			'ingreso'=>[
				'thead'=>["#", "DNI", "NOMBRE Y APELLIDO", "TELÉFONO", "DISTRITO", "INGRESO"],
				'txt'=>'Ingreso'
			]
		]
	];
	if (Data::isSupervisor()) $tmp_view_data['canEdit'] = true;
	$DATA->defineDataView(__FILE__, $tmp_view_data);
	unset($tmp_view_data);

	$DATA->getInitialDataScript();
	if (Data::isSupervisor()) {
		echo '<div id="modal-root"></div>';
		insertScript('editor-datos');
	}
	insertScript('datos');
	?>
</body>
</html>
