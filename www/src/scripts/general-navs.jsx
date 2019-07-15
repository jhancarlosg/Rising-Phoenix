/* function GenNavs(props) {
    const asesores = typeof props.asesores == 'object' ? props.asesores.map((asesor) => <AsesorOption asesor={asesor} key={asesor} />) : null;
    return (
        <React.Fragment>
            <p className="navbar-text">{props.correo}</p>
			<button href="/logout" type="button" className="btn btn-default navbar-btn navbar-right">Cerrar sesión</button>
            <div className="navbar-form navbar-right" role="search">
                <div className="form-group">
                <select className="form-control">{asesores}</select>
                </div>
            </div>
        </React.Fragment>
    );
} */

class GenNavs extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const asesores = typeof this.props.asesores == 'object' ? this.props.asesores.map((asesor) => <AsesorOption asesor={asesor} key={asesor} />) : null;
        return (
            <React.Fragment>
                <p className="navbar-text">{this.props.correo}</p>
                <button href="/logout" type="button" className="btn btn-default navbar-btn navbar-right">Cerrar sesión</button>
                <div className="navbar-form navbar-right" role="search">
                    <div className="form-group">
                    <select className="form-control" ref={this.props.asesor_ref}>{asesores}</select>
                    </div>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li className=""><a href="/registro">Registro<span className="sr-only">(current)</span></a></li>
                    <li className=""><a href="/datos">Datos<span className="sr-only">(current)</span></a></li>
                </ul>
            </React.Fragment>
        );
    }
}

function AsesorOption(props) {
    return <option value={props.asesor}>{props.asesor}</option>
}

/* var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <GenNavs {...r_ele.state.navbar_props} />});
} */

var Navs = GenNavs;