var setValidatorEle=function setValidatorEle(e,newTipo){var tipos=["success","warning","error"];tipos.forEach(function(tipo){if(tipo!=newTipo){e.classList.remove("has-"+tipo)}else{e.classList.add("has-"+newTipo)}})};function setValidator(e,newTipo){var grupo=e.target.closest(".form-group");setValidatorEle(grupo,newTipo)}function setWarning(e){setValidator(e,"warning")}function setError(e){setValidator(e,"error")}function setSuccess(e){setValidator(e,"success")}function Alerta(props){var id="Alert_T"+new Date().getTime();setTimeout(function(){$("#"+id).alert("close")},4000);return"<div class=\""+("alert alert-"+props.tipo+" alert-dismissible")+"\" id=\""+id+"\" role=\"alert\">"+"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"+("<strong>"+props.msg+"</strong>")+"</div>"}
//# sourceMappingURL=funciones.js.map