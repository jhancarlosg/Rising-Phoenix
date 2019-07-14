class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {navs: null};
	}

	componentDidMount() {
		getDataNavs(this);
	}

	render() {
		return (
			<nav class="navbar navbar-default navbar-fixed-top">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>
					<div class="collapse navbar-collapse" id="nav-collapse">
						{this.state.navs}
					</div>
				</div>
			</nav>
		);
	}
}

ReactDOM.render(<Navbar />, document.querySelector("header"));