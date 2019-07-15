function GenNavs(props) {
    //const asesores = typeof props.asesores != 'undefined' && props.asesores ? props.asesores.map((val) => <AsesorOption val={val} key={val} />) : null;
    console.log(props, props.asesores);
    return (
        <React.Fragment>
            <p className="navbar-text">{props.correo}</p>
			<button href="/logout" type="button" className="btn btn-default navbar-btn navbar-right">Cerrar sesión</button>
            <div className="navbar-form navbar-right" role="search">
                <div className="form-group">
                <select className="form-control">{props.asesores}</select>
                </div>
            </div>
        </React.Fragment>
    );
}

function AsesorOption(props) {
    return <option id={props.asesor}>{props.asesor}</option>
}

var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <GenNavs {...r_ele.state.navbar_props} />});
}