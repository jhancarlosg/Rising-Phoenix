<?php 

require_once('../models/DefaultConfig.inc');

include_once(VIEW_PATH . "head.inc");

?>
	<title><?php echo DefaultConfing::includeTitle('Login') ?></title>
	<script src="/src/scripts/login.jsx" type="text/babel"></script>
</head>
<body>
	<section id="login-cnt"></section>
</body>
</html>