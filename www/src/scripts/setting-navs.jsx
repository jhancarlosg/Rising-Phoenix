function SettNavs(props) {
    const {correo, asesores} = props;
    return (
        <GenNavs {...props} key={Object.keys(props).join("")} />
    );
}

var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <SettNavs  {...r_ele.state.navbar_props} key={Object.keys(r_ele.state.navbar_props).join("")} />});
}