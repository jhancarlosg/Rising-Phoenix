var REGISTRO_REF = React.createRef();

class RegNavs extends React.Component {
    constructor(props) {
        super(props);
		this.handleAsesor = this.handleAsesor.bind(this);
		this.registro_form = REGISTRO_REF;
    }
	handleAsesor(e) {
		if (this.registro_form.current) this.registro_form.current.handleAsesorChange();
	}
    render () {
        return (
            <React.Fragment>
                <div className="navbar-form navbar-right" role="search">
                    <div className="form-group">
                    	{ this.props.asesores.length>1 ? (
							<select className="form-control" onChange={this.handleAsesor} ref={this.props.asesor_ref}>{[""].concat(this.props.asesores).map((asesor) => <AsesorOption asesor={asesor} key={asesor} />)}</select>
						) : (
							<input type="hidden" ref={this.props.asesor_ref} onChange={this.handleAsesor} value={this.props.asesores[0]} />
						)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function AsesorOption(props) {
    return <option value={props.asesor}>{props.asesor ? props.asesor : "selecione un asesor"}</option>
}

/* var getDataNavs = function(r_ele) {
    r_ele.setState({navs: <RegNavs {...r_ele.state.navbar_props} />});
} */

var Navs = RegNavs;
