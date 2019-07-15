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
		this.state = {dni: '', fullname: '', telefono: '', distrito: '', token_registros: '', mod_cliente: null, asesor: null};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSuccess = this.handleSuccess.bind(this);
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
				}
				break;
			case "distrito":
				if (len) {
					this.setState({distrito: event.target.value});
				} else {
					setError(event);
				}
				break;
		}
	}

	handleSuccess(token) {
		this.setState({dni: '', fullname: '', telefono: '', distrito: '', token_registros: token});
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
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("form-registro").reset();
					handleSuccess(this.responseText);
				}
			};
			xmlhttp.open("POST", "/registro", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);
		}
		event.preventDefault();
	}

	componentDidMount() {
		this.setState((state, props) => ({token_registros: props.token_inicial}));
	}

	render() {
		console.log(this.state.token_registros);
		let distritos = this.props.distritos.map(distrito => <Distrito val={distrito.pos} nombre={distrito.nombre} />);
		// distritos.unshift(<Distrito val={0} nombre="Seleccione un distrito" />)
		return (
			<form id="form-registro" className="form-horizontal" onSubmit={this.handleSubmit}>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title text-center text-uppercase">BIENVENIDO</h3>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<label htmlFor="dni" className="col-sm-2 control-label">DNI</label>
							<div className="col-sm-10">
								<input type="text" pattern={patterns.dni} onChange={this.handleInput} className="form-control" id="dni" placeholder="Ingresa el DNI" minLength={8} maxLength={8} required={true} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="fullname" className="col-sm-2 control-label">NOMBRE Y APELLIDO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" id="fullname" placeholder="Escribe un nombre" required={true} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="telefono" className="col-sm-2 control-label">TELÉFONO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" id="telefono" placeholder="Digita el número (opcional)" pattern={patterns.telefono} minLength={7} maxLength={12} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="distrito" className="col-sm-2 control-label">DISTRITO</label>
							<div className="col-sm-10">
								<input type="text" onChange={this.handleInput} className="form-control" list="distritos" id="distrito" placeholder="Distrito" required={true} />
								<datalist name="distritos" id="distritos">
									{distritos}
								</datalist>
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<div className="btn-group btn-group-justified" role="group" aria-label="...">
							<div className="btn-group" role="group">
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
				tmp_this.setState({token_inicial: data.token});
			}
		};
		xmlhttp.open("GET", "/registro?token=true", true);
		xmlhttp.send();
	}

	render() {
		return (
			<Registro {...this.state} />
		);
	}
}

ReactDOM.render(<RegistroManager />, document.querySelector("#registro-cnt"));