<?php 

require_once(MODEL_PATH . 'DefaultConfig.inc');

include_once(VIEW_PATH . "head.inc");

?>
	<title><?php echo DefaultConfing::includeTitle('Iniciar sesión') ?></title>
	<script src="/src/scripts/login.jsx" type="text/babel"></script>
</head>
<body>
	<section id="login-cnt" class="col-xs-10 col-sm-8"></section>
</body>
</html>