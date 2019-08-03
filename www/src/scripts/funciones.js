var setValidatorEle = function(e, newTipo) {
	const tipos = ['success', "warning", "error"];
	tipos.forEach((tipo) => {
		if (tipo != newTipo) {
			e.classList.remove("has-"+tipo);
		} else {
			e.classList.add("has-"+newTipo);
		}
	});
}

function setValidator(e, newTipo) {
	let grupo = e.target.closest(".form-group");
	setValidatorEle(grupo, newTipo);
}

function setWarning(e) {
	setValidator(e, "warning");
}

function setError(e) {
	setValidator(e, "error");
}

function setSuccess(e) {
	setValidator(e, "success");
}

function Alerta(props) {
	let id = "Alert_T"+(new Date().getTime());
	setTimeout(() => {
		$("#"+id).alert('close');
	}, 4000);
	return (
		`<div class="${'alert alert-'+props.tipo+' alert-dismissible'}" id="${id}" role="alert">`+
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			`<strong>${props.msg}</strong>`+
		'</div>'
	);
}

function normalizar(texto) {
	return texto.normalize('NFD')
		.replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
		.normalize();
}

var XML_ID = function(s) {
	s += new Date();
    for(var i = 0, h = 0xdeab3ef; i < s.length; i++)
        h = Math.imul(h ^ s.charCodeAt(i), 26544357);
    return (h ^ h >>> 16) >>> 0;
};

var dataManager = function (data) {
	if (data) {
		if (data.views) {
			for(view in data.views) {
				const ses_view = sessionStorage.getItem('view-'+view);
				if (!ses_view || JSON.parse(ses_view).last != data.views[view]) {
					sessionStorage.setItem('view-'+view, JSON.stringify(data.views[view]));
				}
			};
		}
		if (data.data) {
			for(tmp_dta in data.data) {
				let ses_data = sessionStorage.getItem('data-'+tmp_dta);
				ses_data = ses_data ? JSON.parse(ses_data) : {};
				if (data.data[tmp_dta].update) {
					for (key_upd in data.data[tmp_dta].update) {
						if (!ses_data[key_upd]) ses_data[key_upd] = {};
						Object.assign(ses_data[key_upd], data.data[tmp_dta].update[key_upd]);
					}
				}
				if (data.data[tmp_dta].nuevo) {
					if (data.data[tmp_dta].remove_all) {
						//delete data.data[tmp_dta].remove_all;
						ses_data = {};
					}
					for (new_key in data.data[tmp_dta].nuevo) {
						Object.assign(ses_data, data.data[tmp_dta].nuevo);
					}
				}
				sessionStorage.setItem('data-'+tmp_dta, JSON.stringify(ses_data));
			}
		}
	}
}
