// RETORNA DIA 
function diaDeHoy() {
            console.log("diaDeHoy()");
            let fecha =  new Date(); //Thu Jun 30 2022 14:08:47 GMT-0400 (hora estándar de Chile)
            const hoy = fecha.getDate();
            const hoyIso = fecha.toISOString()
            let dias=['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
            let dia=dias[fecha.getDay()];

                console.log(dia);
                console.log(hoy);
                console.log(fecha);
                console.log(hoyIso);
            return dia;
}
function cargarPagina(pagina) {
    let nuevaVentana = window.open(pagina, "_blank"); 
    if (nuevaVentana != null && !nuevaVentana.closed) {
      // mensajeAyuda("Se cargo la pagina " + pagina)
      console.log("Se cargo la pagina " + pagina);
      nuevaVentana.location.reload();
    }
}
// PRESENTA EN PANTALLA FECHA COMPLETA
function tiempoPantalla(){
    console.log("tiempoPantalla()");
    let horNow;
    let fecNow;
    horNow=horaAhora();
    fecNow=fechaAhora()
    let diaH= diaDeHoy();
    console.log(diaH);
    // recupero obj //BJETO DIV es block de notas
    let ele = document.getElementById("fechaHora"); 
    // DESPLIEGUE DATS EN PANTALLA
    ele.style.background = "rgb(253, 253, 5)";
    ele.innerText=diaH+"/"+fecNow+"/"+horNow;
}
// RETORNA INDICE UNICO en base a fecha hora
function indiceAhora(){
        // OBTENIENDO FECHA
        let date = new Date();
        let fecha=date.toLocaleDateString();
        let fechaIso=date.toISOString();
        // console.log("Fecha iso: " + fechaIso);
        let anioHoy=fechaIso.substring(0,4);
        let mesHoy=fechaIso.substring(5,7);
        let diaHoy=fechaIso.substring(8,10);
        let fechaHoy= diaHoy+mesHoy+anioHoy; 
        // OBTENIENDO HORA
        let currentTime = new Date();
        let hora=currentTime.getHours();
        let mini = currentTime.getMinutes().toString().padStart(2, '0');
        let segundos=currentTime.getSeconds();
        let hori= hora.toString();  
        let segi= segundos.toString();  
        let horaTrans=(hori + mini + segi);
        let indiceAho=fechaHoy+horaTrans; // entrega indice global
        return indiceAho
}

function horaAhora() {
  console.log("horaAhora()");
  // OBTENIENDO HORA
  let currentTime = new Date();
  let hora = currentTime.getHours();
  let minutos = currentTime.getMinutes();
  let segundos = currentTime.getSeconds();
  // Convierte a string
  let hor = hora < 10 ? "0" + hora.toString() : hora.toString();
  let min = minutos < 10 ? "0" + minutos.toString() : minutos.toString();
  let seg = segundos < 10 ? "0" + segundos.toString() : segundos.toString();
  // Hora actual
  let horaTrans = hor + min + seg;
  var horaIng = hor + ":" + min + ":" + seg; // Entrega hora global horaIng
  console.log("horaTrans: " + horaTrans);
  console.log("hora Ingreso: " + horaIng); //*
  return horaIng;
}

function fechaAhoraOk() {
    console.log("fx fechaAhora()");
    const date = new Date();
    const anioHoy = date.getFullYear();
    const mesHoy = ("0" + (date.getMonth() + 1)).slice(-2); // Agrega un 0 delante del mes si es menor que 10
    const diaDeHoy = ("0" + date.getDate()).slice(-2); // Agrega un 0 delante del día si es menor que 10
    const fechaHoy = anioHoy + mesHoy + diaDeHoy; // entrega fechaHoy global
    const fechaIng = `${diaDeHoy}/${mesHoy}/${anioHoy}` // en variable global fechaIng
    return fechaIng;
  }
//RESTORNA LA RESOLUCION DE PANTALLA ACTUAL                         //03 libreria.js     
function resolucionPantalla(){
    let datSis=document.getElementById("datSis")
    datSis.innerHTML=("祝福 La resolución de tu pantalla es: " + screen.width +"px" + " x " + screen.height +"px" )        
    
}
//obtiene el primer y ultimo dia del mes actual
function diasMes(){
    let date = new Date();
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log("<br>El primer día es: "+primerDia.getDate());
    console.log("<br>El ultimo día es: "+ultimoDia.getDate());
}
function diasEnUnMes(mes,ano) {
	return new Date(ano, mes, 0).getDate();
}
function fechaCompleta(){
    let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    let diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    let f=new Date();
    let respuesta=diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
}
//da hora en pantalla
function mueveReloj(){
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes()
    segundo = momentoActual.getSeconds()
    str_segundo = new String (segundo)
    if (str_segundo.length == 1)
       segundo = "0" + segundo
    str_minuto = new String (minuto)
    if (str_minuto.length == 1)
       minuto = "0" + minuto
    str_hora = new String (hora)
    if (str_hora.length == 1)
       hora = "0" + hora
    horaImprimible = hora + " : " + minuto + " : " + segundo
    document.form_reloj.reloj.value = horaImprimible;
    setTimeout("mueveReloj()",1000)
}
function jsonAxls(){
    / * Datos JSON para exportar * /
    let data = [
        {"name":"John", "city": "Seattle"},
        {"name":"Mike", "city": "Los Angeles"},
        {"name":"Zach", "city": "New York"}
    ];
    / * Si el componente xlsx no se importa, entonces importe * /
    if(typeof XLSX == 'undefined') XLSX = require('xlsx');
    // / * Crear hoja de trabajo * /
    let ws = XLSX.utils.json_to_sheet(data);
    // / * Cree un libro de trabajo vacío y luego agregue la hoja de trabajo * /
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    // / * Generar archivo xlsx * /
    XLSX.writeFile(wb, "archivo.xlsx");
}
function verificarPestanaAbierta(url) {
    var pestanaAbierta = false;
    // Intentar abrir una nueva pestaña
    var nuevaPestana = window.open(url, '_blank'); 
    // Verificar si la pestaña se abrió correctamente o si ya existe
    if (nuevaPestana === null || typeof nuevaPestana === 'undefined') {
      pestanaAbierta = true; // La pestaña ya está abierta
    } else {
      nuevaPestana.close(); // Cerrar la pestaña recién abierta
    }
    return pestanaAbierta;
}
function retornaDiaMesAno() {
    // RETORNA UNA LISTA ORDENADA
    let today = new Date();
    let day = today.getDate().toString().padStart(2, '0');
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let year = today.getFullYear().toString();
    let listaTemporal=[day,month,year]
    return listaTemporal
}
function retornaHoraMinSeg() {
  let fecha = new Date();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();
  // Asegurarse de que todas las partes tengan dos dígitos
  horas = ('0' + horas).slice(-2);
  minutos = ('0' + minutos).slice(-2);
  segundos = ('0' + segundos).slice(-2);
  // Retornar la hora en el formato deseado
  return horas + minutos +  segundos;
}
function abrirVentana(archivo) {
  let ancho = 500; // Ancho deseado en píxeles
  let altura = window.innerHeight; // Altura igual al tamaño de la ventana actual
  let posicionX = window.innerWidth + window.screenX; // Posición X a la derecha de la pantalla
  let opciones = "width=" + ancho + ",height=" + altura + ",left=" + posicionX;
  window.open(archivo, "_blank", opciones);
}
function generateID() {
    const now = new Date();
    const fecha = getCurrentDate();
    const hora = getCurrentTime();
    // Eliminar los dos puntos (:) y el slash (/) usando el método replace
    const fechaFormateada = fecha.replace(/\//g, "");
    const horaFormateada = hora.replace(/:/g, "");
    return fechaFormateada + horaFormateada;
}
function getCurrentDate() {
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
function getCurrentTime() {
  var date = new Date();
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);
  return hours + ":" + minutes + ":" + seconds;
}
function formatNumber(myInput) {
  let input = document.getElementById(myInput).value;
  let unformattedNumber = input.replace(/\D/g, '');
  let formattedNumber = unformattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  document.getElementById(myInput).value = formattedNumber;
}
function formatoMoneda(myInput) {
   // Obtén el valor del input
   let input = document.getElementById(myInput).value;
  
   // Remueve cualquier caracter que no sea número
   let numericValue = input.replace(/\D/g, '');
   
   // Formatea el número con separadores de miles y símbolo de pesos
   let formattedValue = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(numericValue);
   
   // Actualiza el valor del input con el número formateado
   document.getElementById(myInput).value = formattedValue;
 }
 function getNumericValue(myInput) {
  // Obtén el valor del input
  let input = document.getElementById(myInput).value;
  
  // Remueve cualquier caracter que no sea número
  let numericValue = input.replace(/\D/g, '');
  
  // Devuelve el valor numérico
  return parseFloat(numericValue);
}
function borraTabla(idTabla){
    // Obtén el elemento de la tabla por su id
    var table = document.getElementById(idTabla);
    // Obtén todas las filas de la tabla
    var rows = table.getElementsByTagName("tr");
    // Elimina todas las filas, excepto la primera (encabezado)
    while (rows.length > 1) {
      table.deleteRow(1);
    }
}
function formatoPeso(numero){
  return '$'+ numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

}
function separadorMiles(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function obtenerFechaActual() {
  let fecha = new Date();
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let anio = fecha.getFullYear();
  return dia + "/" + mes + "/" + anio;
}
function obtenerHoraActual() {
  let fecha = new Date();
  let horas = fecha.getHours().toString().padStart(2, "0");
  let minutos = fecha.getMinutes().toString().padStart(2, "0");
  let segundos = fecha.getSeconds().toString().padStart(2, "0");
  return horas + ":" + minutos + ":" + segundos;
}
function borrrarContenido(elemento){
  // let textarea = document.getElementById(elemento); // Reemplaza 'miTextarea' con el ID de tu elemento textarea
  // let contenido = textarea.value;
  // return contenido;
  //OTRA MANERA
  var textarea = document.getElementById(elemento); // Reemplaza 'miTextarea' con el ID de tu elemento textarea
  textarea.value = '';
  // document.getElementById(elemento).value=''
}
function formatoPeso(numero) {
  let numeroStr = String(numero); // Convertir el número a cadena de texto
  let separador = "."; // Separador de miles
  let partes = numeroStr.split(".");
  let parteEntera = partes[0];
  let parteDecimal = partes[1] || "";
  let parteEnteraConSeparador = "";
  for (let i = parteEntera.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      parteEnteraConSeparador = separador + parteEnteraConSeparador;
    }
    parteEnteraConSeparador = parteEntera[i] + parteEnteraConSeparador;
  }
  let resultado = "$" + parteEnteraConSeparador;
  if (parteDecimal.length > 0) {
    resultado += "." + parteDecimal;
  }
  return resultado;
}
function pesoANumero(valorPeso) {
  return Number(valorPeso.replace(/[^0-9.-]+/g, ''));
}
function formatoSeparador(num) {
  let input = document.getElementById(num.id);
  let numero = input.value.replace(/[^\d]/g, "");
  input.value = agregarSeparadorMiles(numero);
}

function nombreArchivoJson(nombre){
  let listaFecha=retornaDiaMesAno()
  let dia=listaFecha[0]
  let mes=listaFecha[1]
  let anio=listaFecha[2]
  let tiempo=retornaHoraMinSeg()
  return nombre+dia+mes+tiempo+'.json'
}

function activaBotones(activa,seccionControl,event) {
  debugger
  event.preventDefault();
  sec='.'+seccionControl
  var seccion = document.querySelector(sec);
  if (activa) {
      seccion.classList.remove('oculto');
  } else {
      seccion.classList.add('oculto');
  }
}
// seccion='seccionBotonesTitulos'
