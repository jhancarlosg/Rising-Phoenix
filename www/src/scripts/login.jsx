function setValidator(e, newTipo) {
	let grupo = e.target.closest(".form-group");
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
	setValidator(e, "warning");
}

function setError(e) {
	setValidator(e, "error");
}

function setSuccess(e) {
	setValidator(e, "success");
}

function Alerta(props) {
	return (
		`<div class="${'alert alert-'+props.tipo+' alert-dismissible'}" role="alert">`+
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			`<strong>${props.msg}</strong>`+
		'</div>'
	);
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {email: '', pass: '', save: true, alert: null};

		this.handleInput = this.handleInput.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSave(e) {
		this.setState({save: e.target.checked});
	}

	isEmail(val) {
		var reg = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
		return reg.test(val);
	}

	handleInput(event) {
		let len = event.target.value.length;
		if (len) {
			let id = event.target.id;
			if ((id=="email" && this.isEmail(event.target.value)) || (id=="password" && len>7)) {
				// if (!grupo.classList.contains("has-success")) {
				// 	grupo.classList.remove("has-success", "has-error");
				setSuccess(event);
					switch (id) {
						case "password":
							this.setState({pass: event.target.value});
							break;
						case "email":
							this.setState({email: event.target.value});
							break;
					}
				// }
			} else {
				setError(event);
			}
		} else {
			setWarming(event);
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.email.length && this.state.pass.length) {
			let xmlhttp = new XMLHttpRequest();

			let params = `email=${this.state.email}&pass=${this.state.pass}&save=${this.state.save}`;
			var tmp_this = this;
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// document.getElementById("txtHint").innerHTML = this.responseText;
					var data = JSON.parse(xmlhttp.response);
					$('.alert').alert('close');
					$("#login-form").prepend(Alerta(data));
				}
			};
			xmlhttp.open("POST", "/login", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);
		}
	}
	
	render() {
		return (
			<div id="login-form">
				{this.state.alert}
				<div className="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Inicio de sesión</h3>
					</div>
					<div className="panel-body">
						<form className="form-horizontal" onSubmit={this.handleSubmit} action="/login">
							<div className="form-group">
								<label htmlFor="Email" className="col-sm-2 control-label">Email</label>
								<div className="col-sm-10">
									<input type="email" className="form-control" id="email" placeholder="Email" required={true} onChange={this.handleInput} />
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="password" className="col-sm-2 control-label">Contraseña</label>
								<div className="col-sm-10">
								<input type="password" className="form-control" id="password" placeholder="Contraseña" required={true} minLength={8} onChange={this.handleInput} />
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
								<div className="checkbox">
									<label>
										<input type="checkbox" onChange={this.handleSave} /> Recordarme
									</label>
								</div>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
								<button type="submit" className="btn btn-default">Iniciar Sesión</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Login />, document.querySelector('#login-cnt'))