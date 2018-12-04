var tiempo = 6000;


$(document).ready(function () {
    $(".close").click(function () {
        $("#myAlert").alert();
    });
});
bootstrap_alert = function () {
}

bootstrap_alert.info = function (message) {
    $('#alert_placeholder').append('<div class="alert alert-block alert-info fade in"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Información!: </strong> ' + message + '</div>');
    alertTimeout(tiempo); //and here
}

bootstrap_alert.warning = function (message) {
    $('#alert_placeholder').append('<div class="alert alert-warning fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Advertencia: </strong> ' + message + '</div>');
    alertTimeout(tiempo); //Called here
}

bootstrap_alert.danger = function (message) {
    $('#alert_placeholder').append('<div class="alert alert-danger fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error: </strong>' + message + '</div>');
    alertTimeout(tiempo); //Called here
}

bootstrap_alert.sucess = function (message) {
    $('#alert_placeholder').append('<div class="alert alert-success fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Éxito:</strong> ' + message + '</div>');
    alertTimeout(tiempo); //Called here
}

bootstrap_alert.confirm = function (message) {
    $('#alert_placeholder').append('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><h4>Advertencia:</h4><p>' + message + '</p><p><button type="button" class="btn btn-danger">Aceptar</button><button type="button" class="btn btn-default">Cancelar</button></p></div>');
}

bootstrap_alert.confirmHSM = function (message, funcion) {
    $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="background:#FFCF00">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="myModalLabel" style="color: #fff">Eliminar</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            message +
            '</div>' +
            '<div class="modal-footer">' + '<button type="button" class="btn btn-danger" data-dismiss="modal" onclick=' + funcion + '><span class="glyphiconBoton glyphicon-remove"></span> Eliminar</button>' + '<button type="button" class="btn btn-default" data-dismiss="modal" > <span class="glyphiconBotonCancel glyphicon-ban-circle"></span> Cancelar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>').modal();
}

bootstrap_alert.confirmYair = function (message, funcion) {
    $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="background:#FFCF00">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="myModalLabel" style="color: #fff">Asignar preguntas</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            message +
            '</div>' +
            '<div class="modal-footer">' + '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick=' + funcion + '><span class="glyphiconBoton glyphicon-ok"></span>Aceptar</button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal" ><span class="glyphiconBotonCancel glyphicon-ban-circle"></span>Cancelar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>').modal();
}

bootstrap_alert.confirmAbi = function (message, funcion) {
    $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="background:#FFCF00">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '</div>' +
            '<div class="modal-body">' +
            /*'<div style="width: 60%; margin-left: 20%; text-align: center; margin-top: 40;" class="alert alert-danger fade in" role="alert">'+*/
            ' <div style="width: 60%; margin-left: 20%; text-align: center; margin-top: 40;">' +
            ' <h3>¡Advertencia!</h3>' +
            /*'<br>'+*/
            message +
            '<br>' +
            '<br>' +
            '</div>' +
            /*'</div>'+*/

            '</div>' +
            '<div class="modal-footer">' + '<button type="button" class="btn btn-danger" data-dismiss="modal" > <span class="glyphiconBoton glyphicon-ban-circle"></span> Cancelar</button>' +
            '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick=' + funcion + ' ><span class="glyphiconBoton glyphicon-ok"></span> Aceptar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>').modal();
}

bootstrap_alert.accept = function (titulo, message, funcion) {
    $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="background:#FFCF00">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="myModalLabel" style="color: #fff">' + titulo + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            message +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick=' + funcion + '><span class="glyphiconBoton glyphicon-ok"></span> Aceptar</button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal" ><span class="glyphiconBotonCancel glyphicon-ban-circle"></span> Cancelar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>').modal();
}

bootstrap_alert.Respaldos = function (tittle, message, funcion) {
    $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="background-color:#FFCF00">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="myModalLabel" style="color:#fff">' + tittle + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            message +
            '</div>' +
            '<div class="modal-footer">' + '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick=' + funcion + '><span class="glyphiconBoton glyphicon-ok"></span>  Aceptar</button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal" > <span class="glyphiconBotonCancel glyphicon-ban-circle"></span>  Cancelar</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>').modal();
}



function alertTimeout(wait) {
    setTimeout(function () {
        $('#alert_placeholder').children('.alert:first-child').remove()
    }, wait);
}

bootstrap_alert.confirmGenerico = function (message, funcion, title, btnOk, btnCancel) {
    $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="background:#FFCF00">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="myModalLabel" style="color: #fff">' + title + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            message +
            '</div>' +
            '<div class="modal-footer">' + '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick=' + funcion + '><span class="glyphiconBoton glyphicon-ok"></span>' + btnOk + '</button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal" ><span class="glyphiconBotonCancel glyphicon-ban-circle"></span>' + btnCancel + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>').modal();
}
