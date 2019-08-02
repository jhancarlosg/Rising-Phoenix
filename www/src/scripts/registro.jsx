function Distrito(props) {
	return (
		<option value={props.nombre} />
	);
}

let patterns = {
	dni: "[0-9]{8}",
	telefono: "^(?:9\\d{8}|[0-8]\\d{6})$",
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
		this.state = {dni: '', fullname: '', telefono: '', distrito: '', token_registros: props.token_inicial, mod_cliente: null, asesor: null};
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
			$("#dni, #telefono, #fullname, #distrito").removeAttr("disabled");
			this.setState({ asesor: this.asesor_ref.current.value.trim() });
		} else {
			$("#dni, #telefono, #fullname, #distrito").attr("disabled", "true");
			this.setState({ asesor: null });
		}
	}

	searchDNI(val) {
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				if (typeof data.dni != 'undefined') {
					tmp_this.setState({ fullname: data.fullname, distrito: data.distrito, telefono: data.telefono ? data.telefono : '', mod_cliente: false});
					$("#fullname").val(data.fullname);
					$("#distrito").val(data.distrito);
					$("#telefono").val(data.telefono);
					$("#telefono, #fullname, #distrito").show();
					$("#telefono, #fullname, #distrito").attr("readonly", "true");
				} else {
					if (typeof tmp_this.state.mod_cliente == 'boolean') {
						tmp_this.setState({mod_cliente: null});
						$("#telefono, #fullname, #distrito").val("");
						$("#telefono, #fullname, #distrito").removeAttr("readonly");
					}
					$("#fullname").show();
					if ($("#distrito").val()) $("#distrito").show();
					if ($("#telefono").val()) $("#telefono").show();
				}
			}
		};
		xmlhttp.open("GET", "/registro?client=get&json=true&dni=" + val, true);
		xmlhttp.send();
	}

	iniciar() {
		document.getElementById("form-registro").reset();
		$("#telefono, #fullname, #distrito").hide();
		this.handleAsesorChange();
		$(".form-group").removeClass('has-warning has-success has-error');
		$("#dni").focus();
	}

	handleInput(event) {
		let val = event.target.value;
		switch (event.target.id) {
			case "dni":
				if (/^\d{0,8}$/.test(val)) {
					this.setState({dni: val});
					if (val) {
						if (new RegExp(patterns.dni).test(val)) {
							setSuccess(event);
							this.searchDNI(val);
							$("#telefono, #fullname, #distrito").show();
						} else {
							setError(event);
							$("#telefono, #fullname, #distrito").hide();
						}
					} else {
						setWarning(event);
						$("#telefono, #fullname, #distrito").hide();
					}
				}
				break;
			case "fullname":
				// https://regex101.com/r/mFnoYm/1
				if (/^[a-zA-Z]+(?:[ ][a-zA-Z]+)*[ ]?$|^$/.test(val)) {
					if (val) {
						val = val.split(' ').map((name) => (
							name && name.charAt(0).toUpperCase() + name.substring(1, val.length).toLowerCase()
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
				if (/^(?:9\d{0,8}|\d{0,7})$/.test(val)) {
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
				if (this.props.distritos.some((dist) => new RegExp(`^.*${val}.*$`, 'i').test(dist))) {
					this.setState({distrito: val.toUpperCase()});
					if (val) {
						if (this.props.distritos.some((dist) => new RegExp(`^${val}$`, 'i').test(dist))) {
							setSuccess(event);
						} else {
							setError(event);
						}
					} else {
						setWarning(event);
					}
				}
				break;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.dni && this.state.fullname && this.state.distrito) {
			let asesor = this.asesor_ref.current.value;
			if (asesor) {
				let xmlhttp = new XMLHttpRequest();
				let params = `dni=${this.state.dni}&token_registros=${this.state.token_registros}&asesor=${asesor}`;
				if (this.state.fullname) params += `&fullname=${this.state.fullname.trim()}`;
				if (this.state.telefono) params += `&telefono=${this.state.telefono}`;
				if (this.state.distrito) params += `&distrito=${this.state.distrito}`;
				if (this.state.mod_cliente) params += `&mod_cliente=${this.state.mod_cliente}`;
				//if (this.state.asesor) params += `&asesor=${this.state.asesor}`;
				let tmp_this = this;
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						let data = JSON.parse(this.responseText);
						$('.alert').alert('close');
						$("#registro-cnt").prepend(Alerta(data));
						tmp_this.setState({token_registros: data.token});
						if (data.tipo == 'success') {
							tmp_this.iniciar();
						}
					}
				};
				xmlhttp.open("POST", "/registro", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(params);
			}
		}
	}

	componentDidMount () {
		this.iniciar();
	}

	render() {
		let distritos = this.props.distritos.map(distrito => <Distrito nombre={distrito} key={distrito} />);
		return (
			<form id="form-registro" className="form-horizontal" onSubmit={this.handleSubmit} onReset={this.iniciar}>
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
								<input type="text" onChange={this.handleInput} className="form-control" list="distritos" ref={this.telefono} id="distrito" name="distrito"  placeholder="¿Dónde vives?" required={true} value={this.state.distrito} />
								<datalist name="distritos" id="distritos">
									{distritos}
								</datalist>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="telefono" className="col-sm-2 control-label">TELÉFONO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" ref={this.distrito} id="telefono" name="telefono" placeholder="Digita el número (opcional)" pattern={patterns.telefono} minLength={7} maxLength={12} value={this.state.telefono} />
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<div className="btn-group btn-group-justified" role="group" aria-label="...">
							<div className="btn-group" role="group">
								<input type="hidden" name="toke_inicial" name="token" value={this.state.token_registros} />
								<button type="reset" id="reset-form" className="btn btn-default">LIMPIAR</button>
							</div>
							<div className="btn-group" role="group">
								<button type="submit" className="btn btn-primary">GRABAR</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

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
	}

	render() {
		return (
			<Registro {...this.state} key={this.state.token_inicial} ref={REGISTRO_REF} />
		);
	}
}

$(
	ReactDOM.render(<RegistroManager />, document.querySelector("#registro-cnt"))
);
