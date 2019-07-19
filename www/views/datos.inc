<?php 

require_once(MODEL_PATH . 'DefaultConfig.inc');

include_once(VIEW_PATH . "head.inc");
require_once(MODEL_PATH . 'Data.inc');

require_once(CONTROLLER_PATH . 'login.php');

?>
    <title><?php echo DefaultConfing::includeTitle('Datos') ?></title>
</head>
<body>
<?php
	include_once(VIEW_PATH . 'header.inc');
?>
	<section>
        <div id="datos-cnt" class="col-sm-10 col-xs-12"></div>
    </section>
	<?php 
	# <script src="/src/scripts/datos.jsx" type="text/babel"></script>
	insertScript('datos');
	?>
</body>
</html>
