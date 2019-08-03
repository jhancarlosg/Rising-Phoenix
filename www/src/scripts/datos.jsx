class Datos extends React.Component {
	constructor(props) {
		super(props);

		this.opciones = Object.keys(props.opciones);
		this.state = {selectedRow: 0, tblHei: 0, rowTipo: null, option: this.opciones[0], cargando: false, page: 0};
		//console.log(this.state);
		this.row_opcion = React.createRef();
		this.getRows = this.getRows.bind(this);
		this.getCurrRowsSource = this.getCurrRowsSource.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setTableHeight = this.setTableHeight.bind(this);
		this.getEditorPosY = this.getEditorPosY.bind(this);
		this.handleMouseover = this.handleMouseover.bind(this);
		this.exportarExcel = this.exportarExcel.bind(this);
		this.handleOptionDataChange = this.handleOptionDataChange.bind(this);
		this.dataLocalManager = this.dataLocalManager.bind(this);
		this.handlerPages = this.handlerPages.bind(this);

		//this.ATENCION_NAME = "lista-atencion-data";
		//this.INGRESO_ATENCION = "lista-ingreso-data";
	}

	componentDidMount() {
		this.setTableHeight();
	}

	componentDidUpdate(prevProps, prevState) {
		this.setTableHeight();
	}

	getEditorPosY() {
		if (this.state.selectedRow && this.state.selectedRow<this.getRows().length && !this.state.cargando) {
			return $(`tbody tr:nth-child(${this.state.selectedRow+1})`).offset().top - $(".tbl-data").offset().top;
		}
		return $(".tbl-data thead").height();
	}

	parseDate(date) {
		//console.log(date);
		date = date.split(" ");
		let fecha = date[0].split("/");
		return new Date(fecha[1]+"/"+fecha[0]+"/"+fecha[2]+" "+date[1]);
	}

	getRowsSesKey(option) {
		if (!option) option = this.state.option;
		return "data-datos-"+option;
	}
	
	getRows() {
		let ses_data = sessionStorage.getItem(this.getRowsSesKey());
		let parseDate = this.parseDate;
		if (ses_data) {
			ses_data = JSON.parse(ses_data);
			//if (ses_data[this.state.option]) {
				let num_rows = this.row_opcion.current ? this.row_opcion.current.value : 20;
				let keys_data = [];
				//console.log(ses_data, Object.values(ses_data));
				switch (this.state.option) {
					case 'ingreso':
						keys_data =  Object.values(ses_data).sort(function(a, b){return parseDate(a[5]) - parseDate(b[5])}).reverse().splice(0, num_rows);
						break;
					default:
						keys_data =  Object.values(ses_data).sort(function(a, b){return parseDate(a[1]) - parseDate(b[1])}).reverse().splice(0, num_rows);
						break;
				}
			//console.log("keys", keys_data);
				return keys_data;
			//}
		}
		return [];
	}

	getCurrRowsSource() {
		return this.getRowsSource(this.state.option);
	}

	getRowsSource(option) {
		if (this.opciones.includes(option)) {
			let ses_data = sessionStorage.getItem(this.getRowsSesKey(option));
			if (ses_data) {
				ses_data = JSON.parse(ses_data);
				//if (ses_data[option]) return ses_data[option];
				return ses_data;
			}
		}
		return null;
	}

	setCurrRowsSource(rows) {
		this.setRowsSource(this.state.option, rows);
	}

	setRowsSource(option, rows) {
		if (this.opciones.includes(option) && typeof rows == 'object') {
			let ses_data = sessionStorage.getItem(this.getRowsSesKey(option));
			if (ses_data) {
				ses_data = JSON.parse(ses_data);
				//if (ses_data[option]) {
					 if (!Array.isArray(rows)) {
						 ses_data = rows;
					} else {
						ses_data = {}
						rows.forEach(function (val) {
							Object.assign(ses_data, {[val[0]]: val});
						});
					}
				//}
			}
			sessionStorage.setItem(this.getRowsSesKey(option), JSON.stringify(ses_data));
		}
	}

	setTableHeight() {
		let hei = $(".tbl-data").height()+17+20;
		if (hei != this.state.tblHei) this.setState({tblHei: hei});
	}

	dataLocalManager(data) {
		dataManager(data);
		/*let rows = this.getCurrRowsSource();
		if (Object.keys(rows).length>100) {
			Object.keys(rows).slice()
		}*/
	}

	exportarExcel(e) {
		let xmlhttp = new XMLHttpRequest();
		let params = `export_data=true&rows=${this.row_opcion.current.value}`;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#datos-cnt").prepend(Alerta({tipo: "success", msg: "Exportado exitosamente"}));
			}
		}
		xmlhttp.open("POST", "/datos", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(params);
		//e.preventDefault();
	}

	getDownloadDataParams(config) {
		config = this.getDefaultConfig(config);
		let params = new URLSearchParams();
		params.append("json", true);
		if (this.row_opcion.current.value!=20) params.append("rows", this.row_opcion.current.value);
		if (config.option!=this.opciones[0]) params.append("view", config.option);
		if (config.page>0) params.append("page", config.page);
		console.log(config, params.toString());
		return params.toString();
		//return `json=true&rows=${this.row_opcion.current.value}&json=true${view}`;
		
	}

	getDefaultConfig(config) {
		if (!config) config = {};
		if (!config.option) config.option=this.state.option;
		if (!Number.isInteger(config.page)) config.page=this.state.page;
		return config;
	}

	handleChange() {
		this.setState({cargando: true, selectedRow:0});
		let xmlhttp = new XMLHttpRequest();
		let this_tmp = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				this_tmp.dataLocalManager(JSON.parse(this.responseText));
				this_tmp.setState({cargando: false});
			}
		}
		let view = this.state.option!=this.opciones[0] ? "&view="+this.state.option : "";
		xmlhttp.open("GET", "/datos?"+this.getDownloadDataParams(), true);
		xmlhttp.send();
	}
	
	manageChange(config) {
		config = this.getDefaultConfig(config);
		this.setState({cargando: true, selectedRow:0});
		let xmlhttp = new XMLHttpRequest();
		let this_tmp = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				this_tmp.dataLocalManager(JSON.parse(this.responseText));
				this_tmp.setState({cargando: false});
			}
		}
		let view = this.state.option!=this.opciones[0] ? "&view="+this.state.option : "";
		xmlhttp.open("GET", "/datos?"+this.getDownloadDataParams(config), true);
		xmlhttp.send();
	}

	handleMouseover(e) {
		//console.log(e.currentTarget.sectionRowIndex);
		this.setState({selectedRow: e.currentTarget.sectionRowIndex, rowTipo: "active"});
	}

	setRowTipo(tipo) {
		this.setState({rowTipo: tipo});
		return null;
	}

	handleOptionDataChange(e) {
		let option = e.target.querySelector("input").id;
		this.setState({option: option, cargando: true, selectedRow:0});
		let xmlhttp = new XMLHttpRequest();
		//let view = option!=this.opciones[0] ? "&view="+option : "";
		//let params = `rows=${this.row_opcion.current.value}&json=true${view}`;
		let this_tmp = this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//dataManager(JSON.parse(this.responseText));
				this_tmp.dataLocalManager(JSON.parse(this.responseText));
				this_tmp.setState({cargando: false});
			}
		}
		xmlhttp.open("GET", "/datos?"+this.getDownloadDataParams({option: option}), true);
		xmlhttp.send();
	}

	getDataSelectedRow() {
		return this.getRows()[this.state.selectedRow];
	}

	getPages() {
		let limits = sessionStorage.getItem("data-datos-limits");
		if (limits) {
			limits = JSON.parse(limits);
			if (limits[this.state.option]) {
				return limits[this.state.option].pages;
			}
		}
		return 1;
	}

	handlerPages(e, dir) {
		e.preventDefault();
		let new_page = this.state.page;
		switch(dir) {
			case 'next':
				new_page += 1;
				break;
			case 'prev':
				new_page -= 1;
				break;
			default:
				if (!isNaN(parseInt(dir))) new_page = parseInt(dir);
				break;
		}
		//console.log(dir, new_page, this.state.page);
		if (new_page!=this.state.page) {
			this.manageChange({page: new_page});
			this.setState({page: new_page});
		}
	}

	render () {
		let thead = this.props.opciones[this.state.option].thead.map((val)=>(<th key={val}>{val}</th>));
		const rows = !this.state.cargando ?
				(this.getRows().map((row, id) => (
					<Row key={"row"+id} tipo={id==this.state.selectedRow ? this.state.rowTipo : null} onMouseOver={this.handleMouseover} cols={row} pos={id} idAtencion={row[0]} page={this.state.page} num_rows={this.row_opcion.current ? this.row_opcion.current.value : 20} />
				))) :
				(<tr><td className="text-center" colSpan={thead.length}>Cargando ...</td></tr>);
					
		let tblHei = this.state.tblHei;
		let options = this.opciones.map((opt)=>(
			<OpcionesDatos onHandler={this.handleOptionDataChange} active={opt==this.state.option} id={opt} txt={this.props.opciones[opt].txt} key={opt} />
		));
		let pages = this.getPages()>1 && new Array(this.getPages()).fill(null).map((val, idx)=>(
			<GoToPage handler={this.handlerPages} h_url={idx+1} lbl={"Página "+(idx+1)} txt={idx+1} dir={idx} key={"p-"+idx} />
		));
		return (
			<React.Fragment>
				<form className="form-inline" style={{display:'flex', alignItems: 'center', justifyContent: 'space-between'}} onSubmit={this.exportarExcel} method="POST">
					<input type="hidden" name="export_data" value="true"/>
					<button type="submit" className="btn btn-default btn-lg">EXPORTAR <i className="glyphicon glyphicon-file"></i></button>
					<div className="form-group">
						<div className="btn-group" data-toggle="buttons">
							{options}
						</div>
                    </div>
					<div className="form-group pull-right">
                    	<select className="form-control" ref={this.row_opcion} onChange={this.handleChange} defaultValue="20">
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							{/* <option value="0">hoy</option> */}
						</select>
                    </div>
				</form>
				<div className="tbl-cnt" style={{display: "flex", maxWidth: "100wp", width: "100%"}}>
					{(this.props.canEdit && typeof AdminRows != "undefined" && this.getRows().length>0) && <div className="edit-tbl-row-cnt">
						<AdminRows posY={this.getEditorPosY()} dataRow={rows[this.state.selectedRow]} />
					</div>}
					<div style={{height: tblHei+"px", width: "100%", overflowX: "overlay", overflowY: "hidden", position: "relative"}}>
						<table className="table table-hover tbl-data" style={{position: "absolute"}}>
							<thead>
								<tr>
									{thead}
								</tr>
							</thead>
							<tbody>
								{rows}
							</tbody>
						</table>
					</div>
				</div>
				{this.getPages()>1 && <nav aria-label="Page navigation" style={{display:"flex", justifyContent: "center"}}>
				  <ul className="pagination">
					{this.state.page>0 &&
						<GoToPage handler={this.handlerPages} h_url="anterior" lbl="Página anterior" txt="&laquo;" dir="prev" key="prev" />
					}
					{pages}
					{this.state.page<this.getPages()-1 && 
						<GoToPage handler={this.handlerPages} h_url="siguiente" lbl="Página siguiente" txt="&raquo;" dir="next" key="next" />
					}
					{/*<li>
					  <a href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					  </a>
					</li>*/}
				  </ul>
				</nav>}
			</React.Fragment>
		);
	}
}

function GoToPage(props) {
	return (
		<li>
		  <a href={"#"+(props.h_url?props.h_url:"")} onClick={(e)=>!!props.handler ? props.handler(e, props.dir) : e.preventDefault()} aria-label={props.lbl}>
			<span aria-hidden="true">{props.txt}</span>
			{/*<span aria-hidden="true">{props.dir===-1 ? "&laquo;" : "&raquo;"}</span>*/}
		  </a>
		</li>
	);
}

function Row(props) {
	const columns = props.cols.map((col, id) => (id==0 ? <td key={"col"+id}>{props.pos+1+(props.page*props.num_rows)}</td> : <td key={"col"+id}>{col}</td>));
	const optionalAttrs = props.tipo ? {className: props.tipo} : {};
	return (
		<tr onMouseOver={props.onMouseOver} {...optionalAttrs}>
			{columns}
		</tr>
	);
}

function OpcionesDatos(props) {
	return (
		<label className={"btn btn-" + (props.active ? "warning active" : "default")} onClick={props.onHandler} >
			<input type="radio"name="options" id={props.id} /> {props.txt}
		</label>
	);
}

var DATOS_REF = React.createRef();

function getInitPropsDatos() {
	let result = {rows: []};
	let ses_view = sessionStorage.getItem('view-datos');
	if (ses_view) {
		Object.assign(result, JSON.parse(ses_view));
	}/*
	let ses_data = sessionStorage.getItem('data-datos');
	if (ses_data) {
		ses_data = JSON.parse(ses_data);
		let keys_data = Object.keys(ses_data.main_rows).sort().reverse().splice(0, 20);
		//console.log("keys", keys_data);
		Object.assign(result, {rows: keys_data.map((key)=>ses_data.main_rows[key])});
	}
	console.log("RESULT_PROPS", result);*/
	return result;
}

$(
	ReactDOM.render(<Datos ref={DATOS_REF} {...getInitPropsDatos()} />, document.querySelector("#datos-cnt"))
);
