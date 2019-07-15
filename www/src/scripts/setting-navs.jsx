function SettNavs(props) {
    const {correo, asesores, asesor_ref} = props;
    return (
        <GenNavs ref={GEN_NAVS_REF} {...props} key={Object.keys(props).join("")+"gennav"} />
    );
}

/* var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <SettNavs  {...r_ele.state.navbar_props} key={Object.keys(r_ele.state.navbar_props).join("")} />});
} */

var Navs = SettNavs;