<?php 

require_once(MODEL_PATH . 'DefaultConfig.inc');

include_once(VIEW_PATH . "head.inc");

?>
	<title><?php echo DefaultConfing::includeTitle('Iniciar sesión') ?></title>
</head>
<body>
<?php
	include_once(VIEW_PATH . 'header.inc');
?>
	<section id="login-cnt"></section>
<?php 
# <script src="/src/scripts/login.jsx" type="text/babel"></script>
insertScript('login');
?>
</body>
</html>
