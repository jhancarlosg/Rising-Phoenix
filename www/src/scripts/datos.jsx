class Datos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {rows: []}
		this.row_opcion = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				tmp_this.setState({ rows: data});
			}
		}
		xmlhttp.open("GET", "/datos?data=get&json=true&rows="+this.row_opcion.current.value, true);
		xmlhttp.send();
	}

	exportarExcel(e) {
		let xmlhttp = new XMLHttpRequest();
		let params = `export_data=true&rows=${this.state.rows.length}`;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#datos-cnt").prepend(Alerta({tipo: "success", msg: "Exportado exitosamente"}));
			}
		}
		xmlhttp.open("POST", "/datos", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(params);
	}

	handleChange(e) {
		let xmlhttp = new XMLHttpRequest();
		let tmp_this = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let data = JSON.parse(this.responseText);
				tmp_this.setState({ rows: data});
			}
		}
		xmlhttp.open("GET", "/datos?data=get&json=true&rows="+e.target.value, true);
		xmlhttp.send();
	}

	render () {
		const rows = this.state.rows.map((row, id) => <Row key={"row"+id} cols={row} />);
		return (
			<React.Fragment>
				<form className="form-inline" onSubmit={this.exportarExcel} method="POST">
					<input type="hidden" name="export_data" value="true"/>
					<button type="submit" className="btn btn-default btn-lg">EXPORTAR <i className="glyphicon glyphicon-file"></i></button>
					<div className="form-group pull-right">
                    	<select className="form-control" ref={this.row_opcion} onChange={this.handleChange}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							{/* <option value="0">hoy</option> */}
						</select>
                    </div>
				</form>
				<table className="table table-hover">
					<thead>
						<tr>
							<th>FECHA - HORA</th>
							<th>DNI</th>
							<th>NOMBRE Y APELLIDO</th>
							<th>TELEFONO</th>
							<th>DISTRITO</th>
							<th>ATENDIDO POR</th>
							<th>USUARIO</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

function Row(props) {
	const columns = props.cols.map((col, id) => <td key={"col"+id}>{col}</td>);
	return (
		<tr>
			{columns}
		</tr>
	);
}

ReactDOM.render(<Datos />, document.querySelector("#datos-cnt"));