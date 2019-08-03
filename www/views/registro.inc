<?php 

require_once(MODEL_PATH . 'DefaultConfig.inc');

include_once(VIEW_PATH . "head.inc");

require_once(CONTROLLER_PATH . 'login.php');

?>
    <title><?php echo DefaultConfing::includeTitle('Registro') ?></title>
</head>
<body>
<?php
	include_once(VIEW_PATH . 'header.inc');
?>
	<section>
        <div id="registro-cnt" class="col-sm-9 col-xs-12"></div>
    </section>
	<?php 
	# <script src="/src/scripts/registro.jsx" type="text/babel"></script>
	if (Data::isSupervisor()) @ insertScript('editor-registro');
	insertScript('registro');
	?>
</body>
</html>
