function SettNavs(props) {
	const reg_nav = props.reg_props ? <RegNavs {...props.reg_props} asesor_ref={props.asesor_ref} /> : null;
    return (
        reg_nav
    );
}

/* var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <SettNavs  {...r_ele.state.navbar_props} key={Object.keys(r_ele.state.navbar_props).join("")} />});
} */

var Navs = SettNavs;
