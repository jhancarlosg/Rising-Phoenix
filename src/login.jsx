class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user: '', pass: ''};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(event) {
		let grupo = event.target.cloests(".form-group");
		let len = event.target.value.length;
		if (len) {
			let id = event.target.id;
			grupo.classList.remove("has-success", "has-success", "has-error");
			if ((id=="usuario" && len>5) || (id="password" && len>7)) {
				// if (!grupo.classList.contains("has-success")) {
				// 	grupo.classList.remove("has-success", "has-error");
					grupo.classList.add("has-success");
					switch (id) {
						case "usuario":
							this.setState({user: event.target.value});
							break;
						case "password":
							this.setState({pass: event.target.value});
							break;
					}
				// }
			} else {
				// if (!grupo.classList.contains("has-error")) {
				// 	grupo.classList.remove("has-success", "has-warming");
					grupo.classList.add("has-error");
				// }
			}
		} else {
			grupo.classList.remove("has-success", "has-error");
			grupo.classList.add("has-warming");
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.user.length && this.state.pass.length) {
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// document.getElementById("txtHint").innerHTML = this.responseText;
				}
			};
			xmlhttp.open("POST", `/login/?user=${this.state.user}&pass=${this.state.pass}`);
			xmlhttp.send();
		}
	}
	
	render() {
		return (
			<form className="form-horizontal">
				<div className="form-group">
					<label htmlFor="usuario" className="col-sm-2 control-label">Usuario</label>
					<div className="col-sm-10">
						<input type="text" className="form-control" id="usuario" placeholder="Usuario" required={true} minLength={6} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="col-sm-2 control-label">Contraseña</label>
					<div className="col-sm-10">
					<input type="password" className="form-control" id="password" placeholder="Contraseña" required={true} minLength={8} />
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-10">
					<div className="checkbox">
						<label>
						<input type="checkbox" /> Recordarme
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
		);
	}
}