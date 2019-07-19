
var ASESOR_REF = React.createRef();

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {correo: '', navs: null, def_nav: null};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText).navbar_props;
				tmp_this.setState({ navs: data.navs, def_nav: data.def_nav, correo: data.correo});
			}
		};
		xmlhttp.open("GET", "/user?navbar_props=get&json=true", true);
		xmlhttp.send();
	}

	handleClick(e) {
		
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
					<div className="collapse navbar-collapse" id="nav-collapse" >
						<p className="navbar-text">{this.state.correo}</p>
                		<a href="/logout" className="btn btn-default navbar-btn navbar-right">Cerrar sesión</a>
					{ this.state.navs &&
						<Navs {...this.state.navs} asesor_ref={ASESOR_REF} />
					}
					{ this.state.def_nav &&
						<DefNav {...this.state.def_nav} />
					}
					</div>
				</div>
			</nav>
		);
	}
}

function DefNav(props) {
    const nav = props.items.map((itm) => <li key={itm.link}><a href={itm.link}>{itm.txt}</a></li>);
	return (
		<ul className="nav navbar-nav navbar-right">
            {nav}
        </ul>
	);
}

$(
	ReactDOM.render(<Navbar />, document.querySelector("header"))
);
