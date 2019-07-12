function Distrito(props) {
	return (
		<option value={props.val}>props.nombre</option>
	);
}

class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dni: '', fullname: '', telefono: '', direccion: ''};
		this.handleInput = this.handleInput.binthis.handleSubmit.bind(this);
	}

	handleSubmit(event) {

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
								<input type="text" className="form-control" id="dni" placeholder="Ingresa el DNI" minLength={8} maxLength={8} required={true} />
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
								<input type="number" className="form-control" id="telefono" placeholder="Digita el número (opcional)" minLength={7} maxLength={12} />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="distrito" className="col-sm-2 control-label">DISTRITO</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" list="distrito" placeholder="Distrito" required={true} />
								<datalist name="distrito" id="distrito">
									{distritos}
								</datalist>
							</div>
						</div>
					</div>
					<div className="panel-footer">
						<button type="reset">LIMPIAR</button>
						<button type="submit" className="btn btn-default">GRABAR</button>
					</div>
				</div>
			</form>
		);
	}
}