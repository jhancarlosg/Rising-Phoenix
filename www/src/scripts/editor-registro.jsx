var EDITOR_REGISTRO_REF = React.createRef();

class EditorRegistro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {save: {}, edit_mode: props.edit_mode||false, dni_edit: false};
		this.handleDniFound = this.handleDniFound.bind(this);
		this.handleChangeMode = this.handleChangeMode.bind(this);
		this.handleInputsChange = this.handleInputsChange.bind(this);
		this.getPreventDefaultReset = this.getPreventDefaultReset.bind(this);
	}
	componentDidMount() {
		$("#reset-form").attr("data-editing-text", "Cancelar edición");
		$("#send_btn").attr("data-editing-text", "Actualizar información");
		//$("#send_btn, #reset-form").attr("data-editing-text", "Cancelar edición");
	}
	handleDniFound(data) {
		if (!this.state.dni_edit) {
			if (data.dni && data.fullname && data.distrito) {
				data.telefono= data.telefono ? data.telefono : '';
				this.setState({
					save: {...data}
				});
				REGISTRO_REF.current.setState({...data, dni_found: true});
			} else {
				if (REGISTRO_REF.current.state.dni_found) REGISTRO_REF.current.setState({
					dni_found: false, fullname: '', distrito: '', telefono: ''
				});
				this.setState({save: {}});
			}
		} else {
			
		}
	}

	handleInputsChange(e) {
		switch(e.target.id) {
			case 'fullname':
			case 'distrito':
			case 'telefono':
				if (this.state.edit_mode && REGISTRO_REF.current.state.dni_found) {
					let cambios = Object.keys(this.state.save).filter(val=>val!=e.target.id).some((key)=>this.state.save[key]!=REGISTRO_REF.current.state[key].trim());
					cambios = cambios ? cambios : e.target.value.trim()!=this.state.save[e.target.id];					
					//console.log(cambios, e.target.value, e.target.id, e.target.value!=this.state.save[e.target.id], Object.keys(this.state.save).filter(val=>val==e.target.id));
					if (cambios) {
						this.setState({editing: true});
						REGISTRO_REF.current.setState({dni_readonly: true, mod_cliente: true});
						$("#send_btn, #reset-form").button('editing');
					} else {
						if (this.state.editing) {
							this.setState({editing: false});
							REGISTRO_REF.current.setState({dni_readonly: false, mod_cliente: false});
							$("#send_btn, #reset-form").button('reset');
						}
					}
				}
				break;
		}
	}
	handleChangeMode(e) {
		let edit_mode = !this.state.edit_mode;
		this.setState({edit_mode: edit_mode});
		REGISTRO_REF.current.setState({others_not_readonly: edit_mode});
	}

	getPreventDefaultReset() {		
		if (this.state.editing) {
			this.setState({editing: false});
			REGISTRO_REF.current.setState({...this.state.save, dni_readonly: false, mod_cliente: false});
			$("#send_btn, #reset-form").button('reset');
			return true;
		} else {
			this.setState({save: {}});
		}
		return false;
	}

	render() {
		return (
			<div className="form-inline" style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
				<button type="button" onClick={this.handleChangeMode} className={"btn btn-"+(this.state.edit_mode ? 'success' : 'default')} data-toggle="button" aria-pressed="false">
					Modo edición: <strong>{this.state.edit_mode ? "Activado" : "Desactivado"}</strong>
				</button>
			</div>
		);
	}
}
