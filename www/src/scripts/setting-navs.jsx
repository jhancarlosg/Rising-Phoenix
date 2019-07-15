function SettNavs(props) {
    return (
        <GenNavs />
    );
}

var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <SettNavs />});
}