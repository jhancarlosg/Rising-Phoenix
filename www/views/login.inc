<?php 

require_once(MODEL_PATH . 'DefaultConfig.inc');

include_once(VIEW_PATH . "head.inc");

?>
	<title><?php echo DefaultConfing::includeTitle('Iniciar sesión') ?></title>
	<script src="/src/scripts/login.jsx" type="text/babel"></script>
</head>
<body>
	<header></header>
	<section id="login-cnt"></section>
</body>
</html>