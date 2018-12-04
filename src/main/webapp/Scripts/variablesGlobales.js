/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var idEquipoGlobal = 0;
var idGrupoGlobal = 0;
var idGradoGlobal = 0;
var idOrganizadorInvestigacion = 0;

var xPreguntaGlobal;
var xRespuestaGlobal;
//var xTipoInvGlobal;



var equipo = {
  idEquipo: "",
  nombre: "",
  idEstatus: 1,
  tablet: "",
  IdGrupo: ""
};

var grados = {
    idGrupo: "",
    grupo: "",
    grado: "",
    idStatus: ""
};

var organizadorInvestigacion = {
    idOrganizadorInvestigacion:"",
    idProfesor:"",
    idEquipo:"",
    tema:"",
    hipotesis:"",
    fechaInicial:"",
    fechaUltimaModificacion:"",
    idStatus:"",
    observaciones:"",
    editable:false
};

