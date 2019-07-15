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
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="collapse navbar-collapse" id="nav-collapse">
						{this.state.navs}
					</div>
				</div>
			</nav>
		);
	}
}

ReactDOM.render(<Navbar />, document.querySelector("header"));