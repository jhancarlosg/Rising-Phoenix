export function setValidator(e, newTipo) {
	let grupo = e.target.closest(".form-group");
	const tipos = ['success', "warning", "error"];
	tipos.forEach(tipo => {
		if (tipo != newTipo) {
			grupo.classList.remove("has-"+tipo);
		} else {
			grupo.classList.add("has-"+newTipo);
		}
	});
}

export function setWarning(e) {
	setValidator(e, "warning");
}

export function setError(e) {
	setValidator(e, "error");
}

export function setSuccess(e) {
	setValidator(e, "success");
}

export function Alerta(props) {
	return (
		`<div class="${'alert alert-'+props.tipo+' alert-dismissible'}" role="alert">`+
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			`<strong>${props.msg}</strong>`+
		'</div>'
	);
}