class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {navs: null, navbar_props: {}};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				tmp_this.setState({ navbar_props: data.navbar_props});
			}
		};
		xmlhttp.open("GET", "/registro?navbar_props=get&json=true", true);
		xmlhttp.send();
		getDataNavs(this);
	}

	handleClick(e) {

	}

	render() {
		return (
			<nav className="navbar navbar-default" onClick={this.handleClick}>
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="collapse navbar-collapse" id="nav-collapse" >
						{this.state.navs}
					</div>
				</div>
			</nav>
		);
	}
}

ReactDOM.render(<Navbar />, document.querySelector("header"));