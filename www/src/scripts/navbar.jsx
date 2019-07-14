class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#">Brand</a>
					</div>
					<div class="collapse navbar-collapse" id="nav-collapse">
						<p class="navbar-text">{this.props.correo}</p>
						<button href="/logout" type="button" class="btn btn-default navbar-btn navbar-right">Cerrar sesión</button>
					</div>
				</div>
			</nav>
		);
	}
}