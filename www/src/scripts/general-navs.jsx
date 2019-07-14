function Navs(props) {
    return (
        <React.Fragment>
            <p class="navbar-text">{props.correo}</p>
			<button href="/logout" type="button" class="btn btn-default navbar-btn navbar-right">Cerrar sesión</button>
        </React.Fragment>
    );
}

var getDataNavs = function(r_ele) {
    console.log(r_ele.state.navs);
}