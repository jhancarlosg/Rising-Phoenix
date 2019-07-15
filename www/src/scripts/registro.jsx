function Distrito(props) {
	return (
		<option value={props.val}>props.nombre</option>
	);
}

let patterns = {
	dni: "[0-9]{8}",
	telefono: "([0-9]{7}|[0-9]{9}|[0-9]{12})"
}

class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dni: '', fullname: '', telefono: '', distrito: '', token_registros: props.token_inicial, mod_cliente: null, asesor: null};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(event) {
		let len = event.target.value.length;
		switch (event.target.id) {
			case "dni":
				if (len) {
					if (new RegExp(patterns.dni).test(event.target.value)) {
						setSuccess(event);
						this.setState({dni: event.target.value});
					} else {
						setError(event);
					}
				} else {
					setWarning(event);
				}
				break;
			case "fullname":
				if (len) {
					if (len>=3) {
						setSuccess(event);
						this.setState({fullname: event.target.value});
					} else {
						setError(event);
					}
				} else {
					setWarning(event);
				}
				break;
			case "telefono":
				if (len) {
					if (new RegExp(patterns.telefono).test(event.target.value)) {
						setSuccess(event);
						this.setState({telefono: event.target.value});
					} else {
						setError(event);
					}
				} else {
					setValidator(event, "");
				}
				break;
			case "distrito":
				if (len) {
					this.setState({distrito: event.target.value});
					setValidator(event, "");
				} else {
					setError(event);
				}
				break;
		}
		console.log(this.state.token_registros);
	}

	handleSubmit(event) {
		if (this.state.dni.length && this.state.fullname.length && this.state.telefono.length && this.state.distrito.length) {
			let xmlhttp = new XMLHttpRequest();
			let params = `dni=${this.state.dni}&token_registros=${this.state.token_registros}`;
			if (this.state.fullname) params += `&fullname=${this.state.fullname}`;
			if (this.state.telefono) params += `&telefono=${this.state.telefono}`;
			if (this.state.distrito) params += `&distrito=${this.state.distrito}`;
			if (this.state.mod_cliente) params += `&mod_cliente=${this.state.mod_cliente}`;
			if (this.state.asesor) params += `&asesor=${this.state.asesor}`;

			let tmp_this = this;
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let data = JSON.parse(this.responseText);
					$('.alert').alert('close');
					$("#registro-cnt").prepend(Alerta(data));
					tmp_this.setState({token_registros: data.token});
					if (data.tipo == 'success') {
						document.getElementById("form-registro").reset();
					}
				}
			};
			xmlhttp.open("POST", "/registro", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);
		}
		
		event.preventDefault();
	}

	handleReset(e) {
		$(".form-group").removeClass("has-warning has-error has-success");
	}

	render() {
		let distritos = this.props.distritos.map(distrito => <Distrito nombre={distrito} key={distrito} />);
		// distritos.unshift(<Distrito val={0} nombre="Seleccione un distrito" />)
		return (
			<form id="form-registro" className="form-horizontal" onSubmit={this.handleSubmit} onReset={this.handleReset} method="POST" >
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title text-center text-uppercase">BIENVENIDO</h3>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<label htmlFor="dni" className="col-sm-2 control-label">DNI</label>
							<div className="col-sm-10">
								<input type="text" pattern={patterns.dni} onChange={this.handleInput} className="form-control" id="dni" name="dni" placeholder="Ingresa el DNI (i.e. 87654321)" minLength={8} maxLength={8} required={true} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="fullname" className="col-sm-2 control-label">NOMBRE Y APELLIDO</label>

							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" id="fullname" name="fullname" placeholder="Escribe un nombre" required={true} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="telefono" className="col-sm-2 control-label">TELÉFONO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" id="telefono" name="telefono" placeholder="Digita el número (opcional)" pattern={patterns.telefono} minLength={7} maxLength={12} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="distrito" className="col-sm-2 control-label">DISTRITO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" list="distritos" id="distrito" name="distrito"  placeholder="¿Dónde vives?" required={true} />
								<datalist name="distritos" id="distritos">
									{distritos}
								</datalist>
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
								<button type="submit" className="btn btn-default">GRABAR</button>
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
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				tmp_this.setState({token_inicial: data.token, distritos: data.distritos});
			}
		};
		xmlhttp.open("GET", "/registro?token=get&distritos=get&json=true", true);
		xmlhttp.send();
	}

	render() {
		return (
			<Registro {...this.state} key={this.state.token_inicial} />
		);
	}
}

ReactDOM.render(<RegistroManager />, document.querySelector("#registro-cnt"));