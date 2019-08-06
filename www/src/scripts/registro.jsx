function Distrito(props) {
	return (
		<option value={props.nombre} />
	);
}

let patterns = {
	dni: "[0-9]{8}",
	telefono: "^(?:\\d{9}|[0-8]{7})$",
	distrito: function (val) {
		/* let result = false;
		let datalist = document.getElementById("distritos");
		for (let i = 0; i < datalist.options.length; i++) {
			result =  val == datalist.options[i].value;
			if(result) break;
		}
		return result; */
		//return this.props.distritos.some((dist) => val == dist);
	}
}

class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dni: '', fullname: '', telefono: '', distrito: '', token_registros: props.token_inicial, mod_cliente: null, asesor: null, dni_found: false, dni_success: false, dni_readonly: false};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.handleAsesorChange = this.handleAsesorChange.bind(this);
		this.iniciar = this.iniciar.bind(this);
		this.asesor_ref = ASESOR_REF;
		this.dni = React.createRef();
		this.fullname = React.createRef();
		this.telefono = React.createRef();
		this.distrito = React.createRef();
	}

	handleAsesorChange() {
		if (this.asesor_ref.current && this.asesor_ref.current.value.trim()) {
			this.setState({ asesor: this.asesor_ref.current.value.trim() });
		} else {
			this.setState({ asesor: null });
		}
	}

	searchDNI(val) {
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				if(tmp_this.props.editor) {
					tmp_this.props.editor.ref.current.handleDniFound(data);
				} else {
					if (typeof data.dni != 'undefined') {
						data.fullname = data.fullname.split(' ').map((name) => (
							name && name.charAt(0).toUpperCase() + name.substring(1, name.length).toLowerCase()
						)).join(' ');
						tmp_this.setState({
							fullname: data.fullname, distrito: data.distrito, telefono: data.telefono ? data.telefono : '',
							dni_found: true
						});
					} else {
						if (tmp_this.state.dni_found) tmp_this.setState({dni_found: false, fullname: '', distrito: '', telefono: ''});
					}
				}
			}
		};
		xmlhttp.open("GET", "/registro?client=get&json=true&dni=" + val, true);
		xmlhttp.send();
	}

	handleInput(event) {
		let val = event.target.value;
		switch (event.target.id) {
			case "dni":
				if (/^\d{0,8}$/.test(val) && !this.state.dni_readonly) {
					if(this.props.editor) this.props.editor.ref.current.handleInputsChange(event);
					this.setState({dni: val});
					this.setState({dni_success: false});
					if (val) {
						if (new RegExp(patterns.dni).test(val)) {
							setSuccess(event);
							this.setState({dni_success: true});
							this.searchDNI(val);
						} else {
							setError(event);
						}
					} else {
						setWarning(event);
					}
				}
				break;
			case "fullname":
				// https://regex101.com/r/mFnoYm/1
				if (/^[a-zA-Z]+(?:[ ][a-zA-Z]+)*[ ]?$|^$/.test(val)) {
					if(this.props.editor) this.props.editor.ref.current.handleInputsChange(event);
					if (val) {
						val = val.split(' ').map((name) => (
							name && name.charAt(0).toUpperCase() + name.substring(1, name.length).toLowerCase()
						)).join(' ');
						if (val.length>=3) {
							setSuccess(event);
						} else {
							setError(event);
						}
					} else {
						setWarning(event);
					}
					this.setState({fullname: val});
				}
				break;
			case "telefono":
				if (/^?:\d{0,9}$/.test(val)) {
					if(this.props.editor) this.props.editor.ref.current.handleInputsChange(event);
					this.setState({telefono: val});
					if (val) {
						if (new RegExp(patterns.telefono).test(val)) {
							setSuccess(event);
						} else {
							setError(event);
						}
					} else {
						setValidator(event, "");
					}
				}
				break;
			case "distrito":
				//if (this.props.distritos.some((dist) => new RegExp(`^.*${val}.*$`, 'i').test(dist))) {
					if(this.props.editor) this.props.editor.ref.current.handleInputsChange(event);
					this.setState({distrito: val.toUpperCase()});
					if (val) {
						if (this.props.distritos.some((dist) => new RegExp(`^${val}$`, 'i').test(dist))) {
							setSuccess(event);
						} else {
							setWarning(event);
						}
					} else {
						setError(event);
					}
				//}
				break;
		}
	}

	iniciar(option) {
		let isBoolean = typeof option == "boolean";
		if (!this.props.editor || !this.props.editor.ref.current || !this.props.editor.ref.current.getPreventDefaultReset() || (isBoolean && option) ) {
			document.getElementById("form-registro").reset();
			this.setState({dni: '', fullname: '', distrito: '', telefono: '', dni_success: false, dni_found: false});
			$(".form-group").removeClass('has-warning has-success has-error');
			$("#dni").focus();
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.dni && this.state.fullname && this.state.distrito && this.state.asesor) {
			let xmlhttp = new XMLHttpRequest();
			let params = `dni=${this.state.dni}&token_registros=${this.state.token_registros}&asesor=${this.state.asesor}`;
			if (this.state.fullname) params += `&fullname=${this.state.fullname.trim()}`;
			if (this.state.telefono) params += `&telefono=${this.state.telefono}`;
			if (this.state.distrito) params += `&distrito=${this.state.distrito}`;
			if (this.state.mod_cliente) params += `&mod_cliente=${this.state.mod_cliente}`;
			$("#send_btn").button('loading');
			let tmp_this = this;
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let data = JSON.parse(this.responseText);
					$('.alert').alert('close');
					$("#registro-cnt").prepend(Alerta(data));
					tmp_this.setState({token_registros: data.token});
					if (data.tipo == 'success') {
						tmp_this.iniciar(true);
					}
				}
				if (this.readyState == 4) {
					$("#send_btn").button('reset');
				}
			};
			xmlhttp.open("POST", "/registro", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);
		}
	}

	componentDidMount () {
		this.handleAsesorChange();
		this.iniciar();
	}
	
	getReadOnly() {
		return !this.state.others_not_readonly && this.state.dni_found;
	}

	inputManageAttributes() {
		let can_show = this.state.dni_success || this.state.mod_cliente && !this.state.dni_readonly;
		if (this.dni.current) {
			//this.dni.current.style.visibility = can_show ? 'visible' : 'hidden';
			this.dni.current.disabled = !this.state.asesor;
			this.dni.current.readOnly = this.state.dni_readonly;
		}
		if (this.fullname.current) {
			this.fullname.current.style.visibility = can_show ? 'visible' : 'hidden';
			this.fullname.current.disabled = !this.state.asesor;
			this.fullname.current.readOnly = this.getReadOnly();
		}
		if (this.distrito.current) {
			this.distrito.current.style.visibility = can_show ? 'visible' : 'hidden';
			this.distrito.current.disabled = !this.state.asesor;
			this.distrito.current.readOnly = this.getReadOnly();
		}
		if (this.telefono.current) {
			this.telefono.current.style.visibility = can_show ? 'visible' : 'hidden';
			this.telefono.current.disabled = !this.state.asesor;
			this.telefono.current.readOnly = this.getReadOnly();
		}
	}

	render() {
		let distritos = this.props.distritos.map(distrito => <Distrito nombre={distrito} key={distrito} />);
		this.inputManageAttributes();
		return (
			<form id="form-registro" className="form-horizontal" onSubmit={this.handleSubmit} onReset={this.iniciar} autoComplete="off">
				{this.props.editor}
				<div className={"panel panel-"+this.state.panel}>
					<div className="panel-heading">
						<h3 className="panel-title text-center text-uppercase">BIENVENIDO: <strong>{this.state.asesor}</strong></h3>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<label htmlFor="dni" className="col-sm-2 control-label">DNI</label>
							<div className="col-sm-10">
								<input type="text" pattern={patterns.dni} onChange={this.handleInput} className="form-control" ref={this.dni} id="dni" name="dni" placeholder="Ingresa el DNI (i.e. 87654321)" minLength={8} maxLength={8} required={true} value={this.state.dni} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="fullname" className="col-sm-2 control-label">NOMBRE Y APELLIDO</label>

							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" ref={this.fullname} id="fullname" name="fullname" placeholder="Escribe un nombre" required={true} value={this.state.fullname} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="distrito" className="col-sm-2 control-label">DISTRITO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" list="distritos" ref={this.telefono} id="distrito" name="distrito"  placeholder="¿Dónde vives?" required={true} value={this.state.distrito} style={{textTransform: "uppercase"}} />
								<datalist name="distritos" id="distritos">
									{distritos}
								</datalist>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="telefono" className="col-sm-2 control-label">TELÉFONO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" ref={this.distrito} id="telefono" name="telefono" placeholder="Digita el número (opcional)" pattern={patterns.telefono} minLength={7} maxLength={12} value={this.state.telefono==null ? '' : this.state.telefono} />
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<div className="btn-group btn-group-justified" role="group" aria-label="...">
							<div className="btn-group" role="group">
								<input type="hidden" name="toke_inicial" name="token" value={this.state.token_registros} />
								<button type="reset" id="reset-form" className="btn btn-danger">LIMPIAR</button>
							</div>
							<div className="btn-group" role="group">
								<button type="submit" id="send_btn" className="btn btn-primary" data-loading-text="Enviando...">GRABAR</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

var REGISTRO_MANAGER_REF = React.createRef();

class RegistroManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {distritos: [], token_inicial: ''};
	}

	componentDidMount() {
		let tmp_this = this;
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				tmp_this.setState({distritos: data.distritos});
			}
		};
		xmlhttp.open("GET", "/registro?distritos=get&json=true", true);
		xmlhttp.send();
		let xmlhttp2 = new XMLHttpRequest();
		xmlhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				tmp_this.setState({token_inicial: data.token});
			}
		};
		xmlhttp2.open("GET", "/registro?token=get&json=true", true);
		xmlhttp2.send();
		if (typeof EditorRegistro != 'undefined' && typeof EDITOR_REGISTRO_REF != 'undefined' && !EDITOR_REGISTRO_REF.current) {
			this.setState({editor: <EditorRegistro ref={EDITOR_REGISTRO_REF} />});
		}
	}

	render() {
		return (
			<Registro {...this.state} key={this.state.token_inicial} ref={REGISTRO_REF} />
		);
	}
}

$(
	ReactDOM.render(<RegistroManager ref={REGISTRO_MANAGER_REF} />, document.querySelector("#registro-cnt"))
);
