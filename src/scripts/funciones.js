export function setValidator(e, newTipo) {
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

export function setWarming(e) {
	setValidator(e, "warming");
}

export function setError(e) {
	setValidator(e, "error");
}

export function setSuccess(e) {
	setValidator(e, "success");
}