class AdminRows extends React.Component {
	constructor(props) {
		super(props);
		this.state = {tipo: "info", accion: "Aceptar", msg: "..."};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
	handleDelete(e) {
		this.setState({tipo: "danger", accion: "Borrar", msg: "¿Está seguro que desea eliminar esta fila?"});
		DATOS_REF.current.setRowTipo("danger");
		$("#modalConfirm").modal("show");
	}
	addDeleteWaitingResponse() {
		const newDeleteWaitingResponse = [{pos: DATOS_REF.current.state.selectedRow, data: DATOS_REF.current.getRows()[DATOS_REF.current.state.selectedRow]}];
		const deleteWaitingResponse = DATOS_REF.current.state.deleteWaitingResponse ? newDeleteWaitingResponse.concat(DATOS_REF.current.state.deleteWaitingResponse) : newDeleteWaitingResponse;
		DATOS_REF.current.setState({deleteWaitingResponse: deleteWaitingResponse});
	}
	handleEdit(e) {
		this.setState({tipo: "warning", accion: "Editar", msg: "¿Está seguro que desea editar esta fila?"});
		DATOS_REF.current.setRowTipo("warning");
		$("#modalConfirm").modal("show");
	}
	handleConfirm(e) {
		switch(this.state.accion) {
			case "Borrar":
				let rows = DATOS_REF.current.getCurrRowsSource();
				delete rows[rows[DATOS_REF.current.state.selectedRow][0]];
				DATOS_REF.current.setCurrRowsSource(rows);

				const newDeleteWaitingResponse = [{pos: DATOS_REF.current.state.selectedRow, data: DATOS_REF.current.getRows()[DATOS_REF.current.state.selectedRow]}];
				const deleteWaitingResponse = DATOS_REF.current.state.deleteWaitingResponse ? newDeleteWaitingResponse.concat(DATOS_REF.current.state.deleteWaitingResponse) : newDeleteWaitingResponse;
				DATOS_REF.current.setState({deleteWaitingResponse: deleteWaitingResponse});

				let newState = {};
				if (DATOS_REF.current.state.selectedRow == DATOS_REF.current.getRows().length-1 && DATOS_REF.current.state.selectedRow>0) newState.selectedRow = DATOS_REF.current.state.selectedRow-1;
				DATOS_REF.current.setState(newState);

				let xmlhttp = new XMLHttpRequest();
				let params = `remove=true&idRow=${newDeleteWaitingResponse[0].data[0]}`;
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if (this.status == 200) {
							let data = JSON.parse(this.responseText);
							if (data.idRemove) {
								//let deleteResponse = DATOS_REF.current.state.deleteWaitingResponse.filter((val)=>data.idRemove!=val.data[0]);
								//DATOS_REF.current.setState({deleteWaitingResponse: deleteResponse});
								$("#datos-cnt").prepend(Alerta({tipo: "success", msg: "Borrado exitosamente"}));
								let tmp_deleteWaitingResponse = DATOS_REF.current.state.deleteWaitingResponse;
								let tmp_idx = tmp_deleteWaitingResponse.findIndex(function(val, idx) {
									return data.idRemove==val.data[0];
								});
								delete tmp_deleteWaitingResponse[tmp_idx].data;
								DATOS_REF.current.setState({deleteWaitingResponse: tmp_deleteWaitingResponse});
							} else {
								$("#datos-cnt").prepend(Alerta({tipo: "danger", msg: "No se pudo elimanar el registro, recargue e inténtelo nuevamente"}));
							}
						}
						DATOS_REF.current.setState({deleteResponse: (DATOS_REF.current.state.deleteResponse ? DATOS_REF.current.state.deleteResponse+1 : 1)});
						if (DATOS_REF.current.state.deleteResponse==DATOS_REF.current.state.deleteWaitingResponse.length) {
							let posiciones=DATOS_REF.current.state.deleteWaitingResponse.map((val)=>val.pos),
								tmp_rows = DATOS_REF.current.getRows();
							DATOS_REF.current.state.deleteWaitingResponse.forEach(function(val, idx) {
								posiciones.slice(idx+1, posiciones.length).forEach(function(val2, idx2) {
									if (posiciones[idx]<posiciones[idx+1+idx2]) posiciones[idx+1+idx2] += 1;
								});
								if(val.data) tmp_rows.splice(posiciones[idx], 0, val.data);
							});
							DATOS_REF.current.setState({deleteWaitingResponse: [], deleteResponse: 0});
							DATOS_REF.current.setCurrRowsSource(tmp_rows);
						}
					}
				}
				xmlhttp.open("POST", "/datos?json=true", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(params);
				break;
			case "Editar":
				break;
		}
		$("#modalConfirm").modal("hide");
	}
	handleCancel(e) {
		
	}
	componentDidMount() {
		$('#modalConfirm').on('hidden.bs.modal', function (e) {
			DATOS_REF.current.setRowTipo("active");
		});
	}
	render() {
		let posY = this.props.posY;
		return(
			<React.Fragment>
				<div className="edit-tbl-row btn-toolbar" role="toolbar" style={{transform: "translateY("+posY+"px)"}}>
					<div className="btn-group btn-group-sm" role="group" aria-label="Modificar el registro de atención" style={{display: "flex"}}>
						{/*<button type="button" title="Editar atención" onClick={this.handleEdit} className="btn btn-warning">Editar <span className="glyphicon glyphicon-pencil" aria-label="Editar fila"></span></button>*/}
						<button type="button" title="Borrar atención" onClick={this.handleDelete} className="btn btn-danger" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}>Borrar <span className="glyphicon glyphicon-remove" aria-label="Borrar fila"></span></button>
					</div>
				</div>
				<ModalCnt>
					<ModalConfirm handleConfirm={this.handleConfirm} handleCancel={this.handleCancel} {...this.state} />
				</ModalCnt>
			</React.Fragment>
		);
	}
}

const modalRoot = document.getElementById('modal-root');

class ModalCnt extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

/*
class ModalConfirm extends React.Component {
	render() {
		
	}
}
*/
	//DATOS_REF.current.setState({rowTipo: props.tipo});

function ModalConfirm(props) {
	return (
		<div className="modal fade" id="modalConfirm" tabIndex="-1" role="dialog" aria-labelledby="modalConfirmLabel">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 className="modal-title" id="modalConfirmLabel">Alerta de confirmación</h4>
					</div>
					<div className="modal-body">
						<strong>{props.msg}</strong>
					</div>
					<div className="modal-footer">
						<button type="button" onClick={props.handleCancel} className="btn btn-default" data-dismiss="modal">Cancelar</button>
						<button type="button" onClick={props.handleConfirm} className={"btn btn-"+props.tipo}>{props.accion}</button>
					</div>
				</div>
			</div>
		</div>
	);
}

$(window).resize(function(){
	if(DATOS_REF.current) {
		DATOS_REF.current.setTableHeight();
	}
});
