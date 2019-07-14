function setValidator(e, newTipo) {
	let grupo = e.target.closest(".group-form");
	const tipos = ['success', "warming", "error"];
	tipos.forEach(tipo => {
		if (tipo != newTipo) {
			grupo.classList.remove("has-"+tipo);
		} else {
			grupo.classList.add("has-"+newTipo);
		}
	});
}

function setWarming(e) {
	setValidator(e, "warming");
}

function setError(e) {
	setValidator(e, "error");
}

function setSuccess(e) {
	setValidator(e, "success");
}

// AFTER IMPORT

function Distrito(props) {
	return (
		<option value={props.val}>props.nombre</option>
	);
}

class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dni: '', fullname: '', telefono: '', distrito: '', token_registros: props.token};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSuccess = this.handleSuccess.bind(this);
	}

	handleInput(event) {
		let len = event.target.value.length;
		switch (event.target.id) {
			case "dni":
				if (len) {
					if (len==8) {
						setSuccess(event);
						this.setState({dni: event.target.value});
					} else {
						setError(event);
					}
				} else {
					setWarming(event);
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
					setWarming(event);
				}
				break;
			case "telefono":
				if (len) {
					if (len==7 || len==9 || len==12) {
						setSuccess(event);
						this.setState({telefono: event.target.value});
					} else {
						setError(event);
					}
				} else {
					setWarming(event);
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
		console.log(this.state.dni);
		console.log(this.state.fullname);
		console.log(this.state.telefono);
		console.log(this.state.distrito);
		console.log("---");
		if (this.state.dni.length && this.state.fullname.length && this.state.telefono.length && this.state.distrito.length) {
			let xmlhttp = new XMLHttpRequest();
			let params = `dni=${this.state.dni}&fullname=${this.state.fullname}&telefono=${this.state.telefono}&distrito=${this.state.distrito}&token_registros=${this.state.token_registros}`;
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					event.target.reset();
					handleSuccess(this.responseText);
				}
			};
			xmlhttp.open("POST", "/registro/", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);
		}
		event.preventDefault();
	}

	render() {
		let distritos = this.props.distritos.map(distrito => <Distrito val={distrito.pos} nombre={distrito.nombre} />);
		// distritos.unshift(<Distrito val={0} nombre="Seleccione un distrito" />)
		return (
			<form className="form-horizontal">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">BIENVENIDO</h3>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<label htmlFor="dni" className="col-sm-2 control-label">DNI</label>
							<div className="col-sm-10">
								<input type="text" pattern="([0-9]{8}" className="form-control" id="dni" placeholder="Ingresa el DNI" minLength={8} maxLength={8} required={true} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="fullname" className="col-sm-2 control-label">NOMBRE Y APELLIDO</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="fullname" placeholder="Escribe un nombre" required={true} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="telefono" className="col-sm-2 control-label">TELÉFONO</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="telefono" placeholder="Digita el número (opcional)" pattern="(|[0-9]{2}|[0-9]{5})[0-9]{7}" minLength={7} maxLength={12} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="distrito" className="col-sm-2 control-label">DISTRITO</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" list="distritos" id="distrito" placeholder="Distrito" required={true} />
								<datalist name="distritos" id="distritos">
									{distritos}
								</datalist>
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<button type="reset" id="reset-form">LIMPIAR</button>
						<button type="submit" className="btn btn-default">GRABAR</button>
					</div>
				</div>
			</form>
		);
	}
}