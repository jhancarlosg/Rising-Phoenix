function SettNavs(props) {
    const {correo, asesores, asesor_ref} = props;
    return (
        <GenNavs correo={correo} asesores={asesores} asesores={asesor_ref} />
    );
}

/* var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <SettNavs  {...r_ele.state.navbar_props} key={Object.keys(r_ele.state.navbar_props).join("")} />});
} */

var Navs = SettNavs;