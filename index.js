"use strict";
let voz; // Variable global para almacenar la instancia de SpeechSynthesisUtterance

//RECIBE EVENTO DE BTON Y DESPLIAGA TEXTO CONTENIDO
const contenido = document.querySelector('.contenido')
const btnGrabarTexto = document.querySelector('.btn-grabar')

//SET CAPTURA MICROFONO
/* Primero creamos los objetos para poder grabar nuestra voz con el microfono */
const reconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition
const reconocimiento = new reconocimientoVoz()

/* metodo que se ejecuta al empezar a grabar */
reconocimiento.onstart = ()=>{
    contenido.innerHTML = 'Escuchando...'
}

// DESDE LA VOZ EJECUTA
/* Metodo que se ejecuta al terminar la grabación */
reconocimiento.onresult = event =>{
    let mensaje = event.results[0][0].transcript
    contenido.innerHTML = mensaje
    leerTextoCondicionado(mensaje) // desde aqui redirecciona
}

// para indicar estado conexion inet
function updateIndicator() {
  console.log(window.navigator.onLine);
}
window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);

function habla(mensaje){
  const voz = new SpeechSynthesisUtterance()
  voz.text = mensaje
  window.speechSynthesis.speak(voz)
}

const grabaVoz= (mensaje)=>{
  // CAE ESTA FUNCION
  const voz = new SpeechSynthesisUtterance()
  //GRABA ITEM al no estar en palabras clave
  console.log(mensaje);
  let textoActual = document.getElementById("textoDes").value;
  document.getElementById("textoDes").value = textoActual + mensaje;
}

function habla(mensaje){
  const voz = new SpeechSynthesisUtterance()
  voz.text = mensaje
  window.speechSynthesis.speak(voz)
}

function hablaDesarrollo() {
  // funciona
  const textoActual = document.getElementById("textoDes").value;

  if (voz && window.speechSynthesis.speaking) {
    // Si ya hay una instancia en curso y está hablando, se cancela y se crea una nueva
    window.speechSynthesis.cancel();
    voz = null; // Reinicializamos la variable voz para asegurarnos de que se cree una nueva instancia
  }

  voz = new SpeechSynthesisUtterance(textoActual);
  window.speechSynthesis.speak(voz);
}

function pausarHabla() {
  if (voz && window.speechSynthesis.speaking) {
    // Si hay una instancia en curso y está hablando, se pausa
    window.speechSynthesis.pause();
    pausado = true; // Establecemos el estado de pausa
  }
}

function detenerHabla() {
  // funciona
  if (voz && (window.speechSynthesis.speaking || window.speechSynthesis.paused)) {
    // Si hay una instancia en curso y está hablando o pausada, se cancela y se resetea
    window.speechSynthesis.cancel();
    voz = null;
  }
}

function grabarAudio() {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';

  recognition.onresult = function(event) {
    var resultado = event.results[0][0].transcript;
    var textoActual = document.getElementById("textoDes").value;
    document.getElementById("textoDes").value = textoActual + resultado + ' ';
  };

  recognition.start();
}

function reproducirAudio() {
  var texto = document.getElementById('textoDes').value;
  var mensaje = new SpeechSynthesisUtterance(texto);
  window.speechSynthesis.speak(mensaje);
}

function pausarAudio() {
  window.speechSynthesis.pause();
}
//---------------------------------------
function validaLogeado(opcion){
  // FALTA VALIDAR QUE SEA USARIO ADMIN
  let log=sessionStorage.getItem('idBit')
  if(log){
    if(opcion==='usuarios'){
      cargarPagina('./usuarios/index.html')
    }
    if(opcion==='bckp'){
      presentaBckp()
    }
  } else{
    despliegaMensaje('debe ser un usuario del sistema')
  }
}

document.addEventListener("DOMContentLoaded", function() {
    // showImage()
   //  SET NO EDICION TITULO INICIAL
  //  EDITA TITULO
   activaSeccionTitulo(false) 
   //NO EDITA TITULO
   setEditaTitulo(false);
    // SET NO NUEVO INICIAL
    habilitaGrabaTit(false);
    // SET NO GRABA DESARROLLO
    habilitaGrabaDes(false)
    // SET NO GRAA EDITA TITULO
    habilitaGrabaEditaTit(false)
    //SET NO ELIMINA
    habilitaEliminaTit(false)
});
 function toggleSubmenu() {
    let submenu = document.getElementById("submenu");
    if (submenu.style.display === "block") {
      submenu.style.display = "none";
    } else {
      submenu.style.display = "block";
    }
}
function hideSubmenu() {
    let submenu = document.getElementById("submenu");
    submenu.style.display = "none";
}
function despliegaLogin() {
    // Mostrar la ventana modal
    let modal = document.getElementById("modalLogin");
    modal.style.display = "block";
    // Establecer el foco en el campo de correo
    document.getElementById("correo").focus();
}
function validarFormularioLogin() {
      let correo = document.getElementById("correo").value;
      let contrasena = document.getElementById("contrasena").value;
      let validado=false
      // Validar correo y contraseña
      let correoValido = validarCorreo(correo);
      let contrasenaValida = validarContrasena(contrasena);
      if (correoValido && contrasenaValida) {
        return fetch("./valida_login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "correo=" + correo + "&contrasena=" + contrasena
        })
          .then(function(response) {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Error en la solicitud");
            }
          })
          .then(function(data) {
            console.log(data);
            // Aquí puedes realizar acciones adicionales en función de la respuesta recibida
            if (data === "valido") {
              //  INICIA SESSION STORAGE
              // grabaSesionUsuario(correo)
              mostrarUsuario(correo);
              despliegaMensaje('Inicio de sesión exitoso ' + nombreCorreo(correo));
              cerrarModalLogin();
              presentaFormularioDesarrollo()
              activaListaTitulos(true)
              activaSeccionTitulo(false)
              activacionSeccionBotones(true)
              activaSeccionBackp(false)
              activaTextoDesarrollo(true)
              // PRESNTA LA LISTA DE TITULOS DEL USUARIO
              obtenerIdUsuario(correo)
              return true;
            } else {
              mostrarUsuario('');
              despliegaMensaje("Correo o contraseña inválidos");
              ocultaFormularioDesarrollo();
              return false;
            }
          })
          .catch(function(error) {
            ocultaFormularioDesarrollo()
            console.log(error);
            return false;
          });

      } else {
          mostrarUsuario('');
          alert('usuario o psw incorrectos')
          borraSesionUsuario()
          // alert("Correo o contraseña inválidos");
          ocultaFormularioDesarrollo()
          despliegaMensaje("Correo o contraseña inválidos")
          document.getElementById('contrasena').select()
          document.getElementById('contrasena').focus()
      }
}
function borraSesionUsuario(){
    sessionStorage.removeItem('usuarioBit');
    sessionStorage.removeItem('idBit');
}
function usuarioBitActivo(){
    let usuarioActivo=sessionStorage.getItem('usuarioBit')
    return usuarioActivo
}
function idActivoLocal(){
    // debugger
    let idActivo=sessionStorage.getItem('idBit');
    if(idActivo){
        return idActivo.toString();
    }else {
        // NO ESTA EN SESSION STORAGE
        return ''
    }
}
function presentaUsuarioActivo(){
    let usuarioActivo=usuarioBitActivo()
    let idUsu=''
    obtenerIdUsuario(correo, function(idUsu) {
      console.log('El idUsuario obtenido es: ' + idUsu);
      // presenta el id usuario en el input para el submit
      presentaIdInput(idUsu)
      // Aquí puedes realizar las operaciones adicionales con el idUsuario obtenido
    });
    alert(usuarioActivo)
}
function mostrarUsuario(correo) {
    // NO DESPLIEGA EL CORREO ARRIBA AHORA
    let userEmail = document.getElementById("userEmail");
    // userEmail.innerHTML= correo;
    userEmail.textContent= correo;
    userEmail.value= correo;
}
function cerrarModalLogin() {
    limpiaLogin()
    // Cerrar la ventana modal
    let modal = document.getElementById("modalLogin");
    modal.style.display = "none";
}
function validarCorreo(correo) {
    // Utilizamos una expresión regular para validar el correo electrónico
    let correoRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return correoRegex.test(correo);
}
function validarContrasena(contrasena) {
    // Verificar que la contraseña tenga al menos 8 caracteres
    return contrasena.length >= 8;
}
function logout() {
    let userEmail = document.getElementById("correo");
    userEmail.textContent = "";
    let psw=document.getElementById('contrasena');
    psw.textContent="";
    despliegaMensaje('No hay inicio de sesion');
    mostrarUsuario('');
    borraSesionUsuario()
    ocultaFormularioDesarrollo();
}
function despliegaMensaje(mensaje, tipo) {
    let seccionMensajes = document.getElementById("seccionMensajes");
    if (tipo === 'alerta') {
      seccionMensajes.style.color = 'red'; // Cambia el color del texto a rojo
      seccionMensajes.style.textShadow = '0px 0px 5px white'; // Agrega una sombra blanca al texto
    } else {
      seccionMensajes.style.color = 'white'; // Restaura el color del texto a negro
      seccionMensajes.style.textShadow = '0px 0px 5px black'; // Agrega una sombra blanca al texto
      
    }
  
    seccionMensajes.textContent = mensaje;
}
function limpiaLogin(){
    document.getElementById('correo').value=''
    document.getElementById('contrasena').value=''
}
function limpiaRegistro(){
    document.getElementById('correoReg').value=''
    document.getElementById('contrasenaReg').value=''
    document.getElementById('confirmarContrasenaReg').value=''
}
function nombreCorreo(correo) {
    let partes = correo.split("@");
    let nombre = partes[0];
    return nombre;
}
function cargaModalRegistro() {
    let modal = document.getElementById("modalRegistro");
    modal.style.display = "block";
}
function registroUsuario() {
    let modal = document.getElementById("modalRegistro");
    modal.style.display = "block";
}
function validarFormularioReg() {
    let correoInput = document.getElementById("correoReg");
    let contrasenaInput = document.getElementById("contrasenaReg");
    let confirmarContrasenaInput = document.getElementById("confirmarContrasenaReg");

    let correo = correoInput.value;
    let contrasena = contrasenaInput.value;
    let confirmarContrasena = confirmarContrasenaInput.value;

    let correoValido = correo.includes("@");
    let contrasenasValidas = contrasena === confirmarContrasena && contrasena.length >= 8;

    if (!correoValido) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return false;
    }

    if (!contrasenasValidas) {
      alert("Las contraseñas deben coincidir y tener al menos 8 caracteres.");
      return false;
    }
    // Aquí puedes agregar el código para enviar el formulario
    return true;
}
function registrarUsuario() {
    if (validarFormularioReg()) {
      let idUsu = indiceAhora();
      let obs = 'registro en la pagina';
      let accesos = ['usuario'];
      let gps = 'concepcion';
      let correo = document.getElementById("correoReg").value;
      let contrasena = document.getElementById("contrasenaReg").value;

      // Crear una instancia de XMLHttpRequest para enviar los datos al archivo PHP
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          // Respuesta del servidor
          console.log(this.responseText);
          despliegaMensaje(this.responseText);

          // Aquí puedes agregar el código para realizar acciones adicionales después de la inserción en la base de datos
          limpiaRegistro()
          cerrarModalReg();
        }
      };
      xhttp.open("POST", "./valida_registro_usuario.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("correo=" + correo + "&contrasena=" + contrasena + "&idUsu=" + idUsu + "&gps=" + gps + "&accesos=" + JSON.stringify(accesos) + "&obs=" + obs);
    }
}
function cerrarModalReg() {
    let modal = document.getElementById("modalRegistro");
    modal.style.display = "none";
}
function presentaFormularioDesarrollo() {
    let formulario = document.getElementById('seccionFormulario')
    formulario.style.display = 'block';
    let inputDesarrollo=document.getElementById('textoDes')
    inputDesarrollo.select()
    inputDesarrollo.focus()
}
function ocultaFormularioDesarrollo() {
    //VACIA TEXTO DESARROLLO
    document.getElementById('textoDes').value=''
    //OCULTA FORMULARIO
    let formulario = document.getElementById('seccionFormulario');
    formulario.style.display = 'none';
}
function activaSeccionTitulo(activa) {
    let seccionTitulo = document.getElementById("seccionTitulo");
    let inputTitulo=document.getElementById('inputTitulo')
    if(activa){
      seccionTitulo.style.display='block'
      inputTitulo.value=''
      //vacia desarrollo para ingresar nuevos datos de titulo
      vaciaDesarrollo()
      inputTitulo.focus();
    } else {
      seccionTitulo.style.display='none'
    }
}
function ocultaSeccionTitulo() {
    let seccionTitulo = document.getElementById("seccionTitulo");
    seccionTitulo.style.display= 'none';
}
function evitarEnvioFormulario(event) {
    event.preventDefault();
}
function enviarFormulario() {
    document.getElementById("formDesarrollo").submit(); // Realiza el envío del formulario manualmente
}
function grabaTitulo(event) {
    let titulo = document.getElementById("inputTitulo").value;
    let correo = usuarioBitActivo();
    let idUsu = idActivoLocal().toString();
    let idTitulo = indiceAhora();
    let fecha = fechaAhoraOk();
    let hora = horaAhora();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./guardar_titulo.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = xhr.responseText;
        // alert(response); // Muestra la respuesta del servidor en una alerta
        despliegaMensaje(response)
        agregarTituloCombo(titulo)
        ordenaTitulos()
        // ugger
        seleccionTituloActual(titulo)
        ocultaSeccionTitulo()
        document.getElementById('textoDes').value=''
        document.getElementById('textoDes').focus()
      }
    };
  
    // Construye la cadena de datos a enviar
    let data = "titulo=" + encodeURIComponent(titulo);
    data += "&correo=" + encodeURIComponent(correo);
    data += "&idUsu=" + encodeURIComponent(idUsu);
    data += "&idTitulo=" + encodeURIComponent(idTitulo);
    data += "&fecha=" + encodeURIComponent(fecha);
    data += "&hora=" + encodeURIComponent(hora);
  
    xhr.send(data);
    event.preventDefault();
}
function obtenerIdUsuario(usuario) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'obtener_id_con_mail.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const idUsu = xhr.responseText;
          // Agregar código adicional aquí
          console.log('El ID de usuario es:', idUsu);
          sesionSetIdUsuario(idUsu)
          presentaIdInput(idUsu)
          listaTitulosUsuario(idUsu);
          resolve(idUsu);
        } else if (xhr.readyState === 4) {
          reject(xhr.statusText);
        }
      };
      xhr.send('usuario=' + encodeURIComponent(usuario));
    });
}
function sesionSetIdUsuario(idUsu){
    // debugger
    JSON.stringify(sessionStorage.setItem('idBit', idUsu))
}
function listaTitulosUsuario(idUsu) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "lista_titulos_usuario.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        let select = document.getElementById("listaTitulos");
        select.innerHTML = "";
        for (let i = 0; i < response.length; i++) {
          let option = document.createElement("option");
          option.value = response[i].titulo;
          option.text = response[i].titulo;
          select.appendChild(option);
        }
        ordenaTitulos() 
        presentaInstruccionTitulos()
      }
    };
    xhr.send("idUsu=" + idUsu);
}
function agregarTituloCombo(titulo) {
    let select = document.getElementById("listaTitulos");
    let option = document.createElement("option");
    option.value = titulo;
    option.text = titulo;
  
    // Agregar la nueva opción al combobox
    select.appendChild(option);
    select.selectedIndex = titulo
}
function ordenaTitulos() {
    let select = document.getElementById("listaTitulos");
    let options = Array.from(select.options);
    options.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
    options.forEach(function(option) {
      select.appendChild(option);
    });
    
    // Seleccionar el primer elemento después de reordenar los títulos
    select.selectedIndex = 0;
}
function seleccionarPrimerElemento() {
    let select = document.getElementById("listaTitulos");
    if (select.options.length > 0) {
      select.selectedIndex = 0;
      select.focus();
    }
}
function seleccionTituloActual(titulo) {
    let select = document.getElementById("listaTitulos");
  
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === titulo) {
        select.selectedIndex = i;
        break;
      }
    }
}
function obtenerIdTitulo() {
    let idUsu = idActivoLocal();
    let tituloSeleccionado = document.getElementById("listaTitulos").value;
    // Crear una instancia de XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status === 200) {
        // La solicitud fue exitosa
        let idTitulo = xhr.responseText;
        // alert("El idTitulo encontrado es: " + idTitulo);
        console.log("El idTitulo encontrado es: " + idTitulo);
        despliegaMensaje("El idTitulo encontrado es: " + idTitulo)
        grabaTituloLocal(idTitulo)
        presentaIdTitulo(idTitulo)
        cargaDesarrollo(idUsu,idTitulo)
        //ACTIVA BOTONES EDICION
        habilitaGrabaDes(true)
        habilitaGrabaEditaTit(true)
        habilitaEliminaTit(true)

      } else {
        // La solicitud falló
        console.log("Error al obtener el idTitulo. Estado de la solicitud: " + xhr.status);
      }
    };
    // Definir la URL y los parámetros de la solicitud
    let url = "./encuentra_id_titulo.php";
    let parametros = "idUsu=" + encodeURIComponent(idUsu) + "&titulo=" + encodeURIComponent(tituloSeleccionado);
    
    // Abrir y enviar la solicitud
    xhr.open("GET", url + "?" + parametros, true);
    xhr.send();
}
function desplegarTituloEdicion(){
    document.getElementById('inputTitulo').value=document.getElementById('listaTitulos').value
}
function grabaTituloLocal(idTitulo){
    JSON.stringify(localStorage.setItem('idTituloActivo',idTitulo))
}
function obtieneTituloActivoLocal(){
    let tituloActivo=localStorage.getItem('idTituloActivo')
    if(tituloActivo){
       return tituloActivo
    } else {
      return ''
    }
}
function activaNuevoEditaTitulo(){
    //valida que hay usuario activo
    let usuarioActivo=idActivoLocal()
    let idUsu= document.getElementById('idUsu').value
    let idTit= document.getElementById('idTit').value
    if(!usuarioActivo || !idUsu ){
        despliegaMensaje('Debe haber un usuario Activo logeado','alerta')
        return
    }
    setEditaTitulo(false);
    activaSeccionTitulo(true);
}
function grabaDesarrolloUsuario(event) {
    event.preventDefault();
    let textoDes=document.getElementById('textoDes').value;
    if(!textoDes){
      textoDes='En desarrollo'
      // alert('ingrese un desarrollo del titulo')
      // document.getElementById('textoDes').focus()
    }
    const id = indiceAhora(); //id del desarrollo
    const idUsu = idActivoLocal();
    // debugger
    let idTit = obtieneTituloActivoLocal();
    if (!idTit) {
      idTit = obtenerIdTitulo();
    }
    const envio = {
      id: id,
      idUsu: idUsu,
      idTit: idTit,
      textoDes: textoDes
    };
    const jsonData = JSON.stringify(envio);
  
    fetch("./graba_desarrollo_usuario.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Cambiado el tipo de contenido a 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(envio) // Enviar los datos como URLSearchParams
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error en la solicitud: " + response.status);
        }
      })
      .then(data => {
        console.log(data);
        despliegaMensaje('Se grabo el desarrollo correctamente')
        // Realizar acciones adicionales si es necesario
      })
      .catch(error => {
        console.error(error);
        // Mostrar mensajes de error al usuario o realizar acciones adicionales si es necesario
      });
}
function presentaInstruccionTitulos() {
    let select = document.getElementById("listaTitulos");
    let option = document.createElement("option");
    option.disabled = true;
    option.selected = true;
    option.text = "Seleccione el título a editar";
    select.insertBefore(option, select.firstChild);
}
function cargaDesarrolloUsuario() {
    let idUsu = idActivoLocal();
    let idTit = obtenerIdTitulo();
    // Construir la URL con los parámetros
    let url = `./carga_desarrollo_usuario.php?idUsu=${encodeURIComponent(idUsu)}&idTit=${encodeURIComponent(idTit)}`;
    // Realizar la solicitud al archivo PHP utilizando fetch
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Aquí puedes manejar el texto recibido
        console.log(data);
        document.getElementById('textoDes').value=data
      })
      .catch(error => {
        // Manejar cualquier error en la solicitud
        document.getElementById('textoDes').value= ''
        console.error('Error:', error);
      });
}
function cargaDesarrollo(idUsu,idTit ) {
    // let idTit = obtenerIdTitulo();
    // Construir la URL con los parámetros
    let url = `./carga_desarrollo_usuario.php?idUsu=${encodeURIComponent(idUsu)}&idTit=${encodeURIComponent(idTit)}`;
    // Realizar la solicitud al archivo PHP utilizando fetch
    fetch(url)
      .then(response => response.text())
      .then(data => {
        // Aquí puedes manejar el texto recibido
        // console.log(data);
        document.getElementById('textoDes').value=data
      })
      .catch(error => {
        // Manejar cualquier error en la solicitud
        document.getElementById('textoDes').value= ''
        console.error('Error:', error);
      });
}
function presentaIdInput(idUsu){
    // Obtener el elemento de entrada por su ID
    let inputIdUsu = document.getElementById('idUsu');

    // Verificar si el elemento existe
    if (idUsu) {
        // Verificar si la letiable "idUsuario" está definida y tiene un valor
        if (typeof idUsu !== 'undefined' && idUsu !== null) {
            // Asignar el valor de la variable al campo de entrada
            inputIdUsu.value = idUsu;
        }
    }
}
function presentaIdTitulo(idTit){
     // Obtener el elemento de entrada por su ID
     let inputIdTit= document.getElementById('idTit');

     // Verificar si el elemento existe
     if (inputIdTit) {
         // Verificar si la variable "idUsuario" está definida y tiene un valor
         if (typeof idTit!== 'undefined' && idTit !== null) {
             // Asignar el valor de la variable al campo de entrada
             inputIdTit.value = idTit;
         }
     }
}
function evitarRecargaPagina() {
    // Resto del código de manejo del formulario
    // Retorna 'false' para evitar la recarga de la página
    return false;
}
function eliminaDesarrolloUsuario(event) {
      event.preventDefault()
      let confirmar=confirm('Seguro de eliminar este titulo con su desarrollo ?')
      if(!confirmar){
        return
      }
      let idUsu=document.getElementById('idUsu').value
      let idTit=document.getElementById('idTit').value
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              eliminaTituloCombo()
              despliegaMensaje('se elimino el titulo')
              // Respuesta del servidor
              console.log(this.responseText);
          }
      };
      xhttp.open("POST", "./elimina_desarrolloUsuario.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("idUsu=" + encodeURIComponent(idUsu) + "&idTit=" + encodeURIComponent(idTit));
}
function eliminaTituloCombo(){
  let select = document.getElementById("listaTitulos");
  let selectedOption = select.options[select.selectedIndex];
  let idUsu = selectedOption.getAttribute("data-idUsu");
  let idTit = selectedOption.getAttribute("data-idTit");
  // Eliminar el elemento seleccionado del combo box
  select.remove(select.selectedIndex);

  // SIMULA SELECCION Y CLIC EN EL COMBO
  // Selecciona el elemento deseado por su índice
  let indiceSeleccionado = 1; // índice del elemento que deseas seleccionar
  // let comboBox = document.getElementById('listaTitulos');
  select.selectedIndex = indiceSeleccionado;
  // Simula el evento onchange
  if ('createEvent' in document) {
    let evento = document.createEvent('HTMLEvents');
    evento.initEvent('change', false, true);
    select.dispatchEvent(evento);
  } else {
    select.fireEvent('onchange');
  }
}
function grabaNuevoTitulo(event){
  event.preventDefault()
  let inputTitulo=document.getElementById('inputTitulo').value;
  let textoDes=document.getElementById('textoDes').value;
  if(!textoDes || !inputTitulo ){
    alert('debe ingresar un contenido para grabar el titulo')
    despliegaMensaje('debe ingresar un contenido para grabar el titulo')
    document.getElementById('textoDes').focus()
    return
  }
  let idUsu = idActivoLocal()
  let idTit= indiceAhora()
  let id=indiceAhora()
  grabaDesarrollo(id, idUsu, idTit, titulo, desarrollo)
  // grabaTitulo(event)
  // grabaDesarrolloUsuario(event)
}
function grabaNuevoTituloDesarrollo(event) {
  event.preventDefault();
  let id = indiceAhora();
  let idUsu = idActivoLocal();
  let idTit = indiceAhora();
  let titulo = document.getElementById('inputTitulo').value;
  if (!titulo) {
      document.getElementById('inputTitulo').focus()
      despliegaMensaje('Ingrese el nombre del titulo a grabar','alerta')
      return
  }
  // Verificar si el título ya existe
  let combo = document.getElementById('listaTitulos');
  let options = combo.options;
  let tituloExistente = false;
  for (let i = 0; i < options.length; i++) {
    if (options[i].text === titulo) {
      tituloExistente = true;
      break;
    }
  }
  if (tituloExistente) {
    console.log('El título ya existe. No se puede repetir.');
    despliegaMensaje('El título ya existe. No se puede repetir.','alerta')
    document.getElementById('inputTitulo').select()
    document.getElementById('inputTitulo').focus()
    return;
  }
  // debugger
  // deja texto en desarrollo si no lo escribe
  let desarrollo = document.getElementById('textoDes').value;
  if (!desarrollo) {
    desarrollo = 'En desarrollo';
    document.getElementById('textoDes').value='En desarrollo'
    document.getElementById('textoDes').select()
    document.getElementById('textoDes').focus()
  }
  // GRABA EN LA TABLA `tabla_titulo_desarrollo`
  let xhr = new XMLHttpRequest();
  let url = "./graba_nuevo_titulo.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let params = "id=" + id + "&idUsu=" + idUsu + "&idTit=" + idTit + "&titulo=" + encodeURIComponent(titulo) + "&desarrollo=" + encodeURIComponent(desarrollo);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      agregarTituloCombo(titulo);
      despliegaMensaje('El título '+titulo + ' ha sido ingresado correctamente.')
      document.getElementById('listaTitulos').value = titulo;
      ocultaSeccionTitulo();
      habilitaGrabaTit(false)
      // Aquí puedes realizar cualquier acción adicional después de grabar los datos
    }
  };
  
  xhr.send(params);
}
function grabaDesarrollo(event) {
  event.preventDefault()
  // VALIDA USUARIO ACTIVO
  let idUsu=idActivoLocal()
  //SIN LOGIN NO HAY REC
  if(!idUsu){
    despliegaMensaje('Debe haber un usuario Activo logeado','alerta')
    return
  }
  let idTit=obtieneTituloActivoLocal();
  // VALIDA QUE SE HAYA SELECCIONADO EL TITULO
  let titulo=document.getElementById('listaTitulos').value
  if(titulo==='' || titulo==='Seleccione el título a editar' || titulo==='Seleccione el título del contenido' ) {
    despliegaMensaje('debe seleccionar el titulo a grabar','alerta')
    return
  }
  // OBTIENE DESARROLLO
  let desarrollo=document.getElementById('textoDes').value
  if(!desarrollo){
    desarrollo='En desarrollo'
  }
  // Crear un objeto FormData y agregar los parámetros de entrada
  let formData = new FormData();
  formData.append("idUsu", idUsu);
  formData.append("idTit", idTit);
  formData.append("desarrollo", desarrollo);
  // Realizar una solicitud POST utilizando fetch()
  fetch("./graba_desarrollo.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      despliegaMensaje(data)
      console.log(data); // Mostrar la respuesta del servidor en la consola
  })
  .catch(error => {
      console.log(error); // Mostrar cualquier error en la consola
      despliegaMensaje(error)
    });
}
function presentaEditaTitulo(activo){
   // NO edita SIN LOGIN
   let idUsu = idActivoLocal();
   if(!idUsu ){
     despliegaMensaje('Debe haber un usuario Activo logeado','alerta')
     return
   }
  // VALIDAR QUE EXISTA ELEMENTO SELECCIONADO PARA EDITAR
    let seleccionado=document.getElementById('listaTitulos').value
    if(!seleccionado || seleccionado==='Seleccione el título a editar' || seleccionado==='Selecciona título del contenido'){
      setEditaTitulo(false)
      despliegaMensaje('debe seleccionar el titulo a Editar','alerta')
      return
    } else {
      setEditaTitulo(true)
      despliegaMensaje('Editando el nombre del titulo','')

    }
   // DESPLIEGA PARA EDITAR
   let seccionTitulo = document.getElementById("seccionTitulo");
   seccionTitulo.style.display='block'
    if(activo){
      habilitaGrabaDes(false);
      // seccionTitulo.hidden = false;
      // seccionTitulo.removeAttribute("hidden");

      let inputTitulo=document.getElementById('inputTitulo')
      document.getElementById('inputTitulo').value=document.getElementById('listaTitulos').value
    } else {
      // seccionTitulo.hidden = false;
      // seccionTitulo.hidden = false;

      habilitaGrabaDes(true);
    }
    inputTitulo.select()
    inputTitulo.focus();
}
function validaEditaNuevo(event){
  event.preventDefault()
   // NO EDITA  SIN LOGIN
   let idUsu = idActivoLocal();
   if(!idUsu ){
     despliegaMensaje('Debe haber un usuario Activo logeado','alerta')
     return
   }
  //RECUPERA SET DE EDICION SESSION
  let edita=JSON.parse(sessionStorage.getItem('ediTit'))
  if(!edita){
    grabaNuevoTituloDesarrollo(event)
  } else {
    // alert('edicion en desarrollo')
    actualizaTitulo()
  }
}
function vaciaDesarrollo(){
  document.getElementById('textoDes').value=''
}
function setEditaTitulo(edita){
   sessionStorage.setItem('ediTit',edita)
  // setEditaTitulo(true) indica edicion
  // setEditaTitulo(false) indica nuevo
}
function actualizaTitulo() {
  let idUsu= document.getElementById('idUsu').value
  let idTit= document.getElementById('idTit').value
  let titulo=document.getElementById('inputTitulo').value
  let tituloAnterior=document.getElementById('listaTitulos').value
  //SI NO HAY SELECCION
  // debugger
  if(!idTit || !idUsu){
    return
  }
  // CONFIRMAR SI ACTUALIZA EL TITULO
  let confirma=confirm('Desea cambiar el nombre del titulo')
  if (!confirma){
    // habilitaGrabaDes(true)
    activaSeccionTitulo(false)
    return
  } else {
    habilitaGrabaDes(true)
    habilitaGrabaTit(false)
  }
  // VALIDA PRIMERO QUE NO SE REPITA EN EL COMBO
  let repetido =TituloRepetidoCombo(titulo)
  if(repetido){
    despliegaMensaje('!ya existe este nombre de titulo!','alerta')
    document.getElementById('inputTitulo').select()
    document.getElementById('inputTitulo').focus()
    return
  }
  // debugger
  // Crear objeto FormData y agregar los datos
  let formData = new FormData();
  formData.append('idUsu', idUsu);
  formData.append('idTit', idTit);
  formData.append('titulo', titulo);
  // Enviar la petición AJAX
  let xhr = new XMLHttpRequest();
  xhr.open('POST', './actualiza_titulo.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        let response = JSON.parse(xhr.responseText);
        console.log(response.message);
        actualizaComboTitulo(tituloAnterior, titulo)
        activaSeccionTitulo(false)
      } catch (error) {
        console.error('Error al analizar la respuesta JSON:', error);
      }
    } else {
      console.error('Error en la solicitud: ' + xhr.status);
    }
  };
  xhr.send(formData);
}
function actualizaComboTitulo(tituloAnterior, tituloActual) {
  // Obtener el elemento select
  let selectTitulos = document.getElementById('listaTitulos');
  // Recorrer todas las opciones y buscar el título anterior
  for (let i = 0; i < selectTitulos.options.length; i++) {
    if (selectTitulos.options[i].text === tituloAnterior) {
      // Reemplazar el título anterior con el título actual
      selectTitulos.options[i].text = tituloActual;
      selectTitulos.options[i].value = tituloActual;
      // Establecer el título actual como seleccionado
      selectTitulos.options[i].selected = true;
      break;
    }
  }
}
function TituloRepetidoCombo(titulo) {
  // Obtener el elemento select
  let selectTitulos = document.getElementById('listaTitulos');

  // Recorrer todas las opciones y verificar si el título se repite
  for (let i = 0; i < selectTitulos.options.length; i++) {
    if (selectTitulos.options[i].text === titulo) {
      return true; // El título se repite
    }
  }

  return false; // El título no se repite
}
function habilitaGrabaDes(habilita){
  let boton = document.getElementById("btnGragaDesarrollo");
  if(habilita){
    boton.disabled = false; //habilita
    boton.style.cursor = "pointer";
  } else {
    boton.disabled = true; //deshabilita
    boton.style.cursor = "not-allowed";
  }
}
function habilitaGrabaTit(habilita){
  // debugger
  let boton = document.getElementById("btnGrabaTit");
  if(habilita){
    boton.disabled = false; //habilita
    boton.style.cursor = "pointer";
  } else {
    boton.disabled = true; //deshabilita
    boton.style.cursor = "not-allowed";
  }
}
function habilitaGrabaEditaTit(habilita){
  let boton = document.getElementById("btnEditaTit");
  if(habilita){
    boton.disabled = false; //habilita
    boton.style.cursor = "pointer";
    habilitaGrabaTit(true)
  } else {
    boton.disabled = true; //deshabilita
    boton.style.cursor = "not-allowed";
    habilitaGrabaTit(false)
  }
}
function habilitaEliminaTit(habilita){
  let boton = document.getElementById("btnEliminaTit");
  if(habilita){
    boton.disabled = false; //habilita
    boton.style.cursor = "pointer";
  } else {
    boton.disabled = true; //deshabilita
    boton.style.cursor = "not-allowed";
  }
}
function obtieneDesarrolloJson() {
  // Crear una solicitud AJAX
  let xhr = new XMLHttpRequest();
  // Definir la función de devolución de llamada cuando se complete la solicitud
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // La solicitud se completó correctamente
      // Obtener la respuesta como texto
      let responseText = xhr.responseText;
      // Convertir la respuesta de texto a un objeto JSON
      let jsonData = JSON.parse(responseText);
      // Guardar los datos en el localStorage
      localStorage.setItem('tablaDesarrolloUsuarios', JSON.stringify(jsonData));
      console.log('Datos cargados en localStorage:', jsonData);
      //filtrar por cada usuario graba en locals su desarrollo
      // filtroUsuariosDesarrollo(event)
      //obtiene los usuarios
      // obtieneUsuariosJson(event)
    }
  };
  // Hacer la solicitud al archivo PHP
  xhr.open('GET', 'envia_tabla_Json.php', true);
  xhr.send();
}
function obtieneUsuariosJson() {
  // Crear una solicitud AJAX
  let xhr = new XMLHttpRequest();
  // Definir la función de devolución de llamada cuando se complete la solicitud
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // La solicitud se completó correctamente
      // Obtener la respuesta como texto
      let responseText = xhr.responseText;
      // Convertir la respuesta de texto a un objeto JSON
      let jsonData = JSON.parse(responseText);
      // Guardar los datos en el localStorage
      localStorage.setItem('tablaUsuarios', JSON.stringify(jsonData));
      console.log('Datos cargados en localStorage:', jsonData);
    }
  };

  // Hacer la solicitud al archivo PHP
  xhr.open('GET', 'envia_usuarios_Json.php', true);
  xhr.send();
}
function filtroUsuariosDesarrollo() {
  // Obtener los datos almacenados en el localStorage
  let tablaDesarrolloUsuarios = localStorage.getItem('tablaDesarrolloUsuarios');
  if (tablaDesarrolloUsuarios) {
    // Parsear los datos almacenados en formato JSON
    tablaDesarrolloUsuarios = JSON.parse(tablaDesarrolloUsuarios);
    // Objeto para almacenar los resultados filtrados por usuario
    let resultadosFiltrados = {};
    // Recorrer los datos y filtrar por cada usuario
    tablaDesarrolloUsuarios.forEach(function(registro) {
      let idUsu = registro.idUsu;
      // Verificar si el usuario ya existe en los resultados filtrados
      if (resultadosFiltrados.hasOwnProperty(idUsu)) {
        // Agregar el registro al usuario existente
        resultadosFiltrados[idUsu].push({
          idTit: registro.idTit,
          titulo: registro.titulo,
          desarrollo: registro.desarrollo
        });
      } else {
        // Crear un nuevo usuario y agregar el primer registro
        resultadosFiltrados[idUsu] = [{
          idTit: registro.idTit,
          titulo: registro.titulo,
          desarrollo: registro.desarrollo
        }];
      }
    });
    // Guardar los resultados filtrados en el localStorage
    for (let idUsu in resultadosFiltrados) {
      localStorage.setItem(idUsu, JSON.stringify(resultadosFiltrados[idUsu]));
    }
    console.log('Datos filtrados por usuario:', resultadosFiltrados);
  }
}
function grabaArchivoBaseSql() {
  // Obtener los datos desde el localStorage
  let tablaUsuarios = localStorage.getItem('tablaUsuarios');
  let tablaDesarrolloUsuarios = localStorage.getItem('tablaDesarrolloUsuarios');
  // Crear el objeto baseSql con las propiedades tablaUsuarios y tablaDesarrolloUsuarios
  let baseSql = {
    tablaUsuarios: JSON.parse(tablaUsuarios),
    tablaDesarrolloUsuarios: JSON.parse(tablaDesarrolloUsuarios)
  };
  // Crear el objeto baseSql en un arreglo
  let baseSqlArr = [baseSql];
  // Convertir el objeto a formato JSON
  let json = JSON.stringify(baseSqlArr);
  // Crear el objeto Blob
  let blob = new Blob([json], { type: 'application/json' });
  // Crear un enlace de descarga
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  let nombreArchivo = nombreArchivoJson('BaseDatosSql')
  link.download = nombreArchivo;
  // Hacer clic en el enlace para descargar el archivo
  link.click();
  despliegaMensaje('se grabo el Archivo Json con la BD')
}
function cargaBaseConJson() {
  // CARGA DESDE ARCHIVO A LOCAL STORAGE
  // Crear un objeto FileReader
  let reader = new FileReader();
  // Definir la función de devolución de llamada cuando se complete la lectura del archivo
  reader.onload = function(event) {
    // Obtener el contenido del archivo leído
    let contenidoArchivo = event.target.result;
    // Parsear el contenido del archivo como un objeto JSON
    let baseSql = JSON.parse(contenidoArchivo);
    // Guardar el objeto en el localStorage
    localStorage.setItem('tablaUsuarios', JSON.stringify(baseSql[0].tablaUsuarios));
    localStorage.setItem('tablaDesarrolloUsuarios', JSON.stringify(baseSql[0].tablaDesarrolloUsuarios));
    console.log('Base cargada desde el archivo JSON:', baseSql);
    // filtroUsuariosDesarrollo(event)
  };
  // Leer el archivo seleccionado por el usuario
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(event) {
    let archivo = event.target.files[0];
    reader.readAsText(archivo);
  };

  // Hacer clic en el input para seleccionar el archivo
  input.click();
}
function grabaJsonBaseDatos() {
  // Obtener los datos desde el localStorage
  let tablaUsuarios = localStorage.getItem('tablaUsuarios');
  let tablaDesarrolloUsuarios = localStorage.getItem('tablaDesarrolloUsuarios');
  // Crear un objeto FormData
  let formData = new FormData();
  formData.append('tablaUsuarios', tablaUsuarios);
  formData.append('tablaDesarrolloUsuarios', tablaDesarrolloUsuarios);
  // Enviar los datos por POST al archivo PHP
  let request = new XMLHttpRequest();
  request.open('POST', './graba_json_base_datos.php');
  request.send(formData);
  // Manejar la respuesta del servidor
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        console.log('Los datos se han guardado en la base de datos correctamente.');
        // despliegaMensaje('desde el archivo JSON se grabo en la BD')
      } else {
        // despliegaMensaje('Error al guardar los datos en la base de datos','alerta')
        console.error('Error al guardar los datos en la base de datos.');
      }
    }
  };
}
function grabaArchivoBaseDatos(){
  let desarrolloLocal=localStorage.getItem('tablaDesarrolloUsuarios')
  let desarrollo=JSON.parse(desarrolloLocal)
  if(!desarrollo){
    obtieneDesarrolloJson() //carga en local desde BD
  }
  let usuariosLocal=localStorage.getItem('tablaUsuarios')
  let usuarios=JSON.parse(usuariosLocal)
  if(!usuarios){
  obtieneUsuariosJson()
  }
  grabaArchivoBaseSql() //las graba en un archivo
}
function cargaArchivoBaseDatos(){
  // cargaBaseConJson() //lee archivo json lo carga en local
    // Crear un objeto FileReader
    let reader = new FileReader();
    // Definir la función de devolución de llamada cuando se complete la lectura del archivo
    reader.onload = function(event) {
      // Obtener el contenido del archivo leído
      let contenidoArchivo = event.target.result;
      // Parsear el contenido del archivo como un objeto JSON
      let baseSql = JSON.parse(contenidoArchivo);
      // Guardar el objeto en el localStorage
      localStorage.setItem('tablaUsuarios', JSON.stringify(baseSql[0].tablaUsuarios));
      localStorage.setItem('tablaDesarrolloUsuarios', JSON.stringify(baseSql[0].tablaDesarrolloUsuarios));
      console.log('Base cargada desde el archivo JSON:', baseSql);
      // filtroUsuariosDesarrollo(event)
    };
    // Leer el archivo seleccionado por el usuario
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
      let archivo = event.target.files[0];
      reader.readAsText(archivo);
    };
    // Hacer clic en el input para seleccionar el archivo
    input.click();
    //  grabaJsonBaseDatos() //desde local lo graba en la base datos
     // Obtener los datos desde el localStorage
    let tablaUsuarios = localStorage.getItem('tablaUsuarios');
    let tablaDesarrolloUsuarios = localStorage.getItem('tablaDesarrolloUsuarios');
    // Crear un objeto FormData
    let formData = new FormData();
    formData.append('tablaUsuarios', tablaUsuarios);
    formData.append('tablaDesarrolloUsuarios', tablaDesarrolloUsuarios);
    // Enviar los datos por POST al archivo PHP
    let request = new XMLHttpRequest();
    request.open('POST', './graba_json_base_datos.php');
    request.send(formData);
    // Manejar la respuesta del servidor
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          console.log('Los datos se han guardado en la base de datos correctamente.');
        } else {
          console.error('Error al guardar los datos en la base de datos.');
        }
      }
    };
}
function analizarArchivo() {
  // VE SI HAY NULL EN EL ARCHIVO
  var archivoInput = document.getElementById('archivoInput');
  var archivo = archivoInput.files[0];
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    var jsonData;
    try {
      jsonData = JSON.parse(contenido);
    } catch (error) {
      alert('El archivo no contiene un JSON válido');
      return;
    }
    if (jsonData && hasNullValues(jsonData)) {
      alert('El archivo contiene datos nulos');
    } else {
      alert('El archivo no contiene datos nulos');
    }
  };
  lector.readAsText(archivo);
}
function hasNullValues(obj) {
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      if (hasNullValues(obj[i])) {
        return true;
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === null) {
        return true;
      }
      if (typeof obj[key] === 'object' && hasNullValues(obj[key])) {
        return true;
      }
    }
  }

  return false;
}
function changeButton(button) {
  // Obtener el ID del botón
  var buttonId = button.id;
  // Obtener el estado actual del botón
  var buttonState = button.getAttribute("data-state");
  // Tomar decisiones basadas en el ID del botón utilizando switch-case
  switch (buttonId) {
    case "btnDespliegaEdicion":
      let seccionDatos=document.querySelector('.seccionBotonesDatos')
      if (buttonState === "0") {
        // alert('estado 0')
        despliegaEdicion(button);
        seccionDatos.style.display='none'
      } else {
        // alert('estado 1')
        despliegaBtnDeshacer(button);
        seccionDatos.style.display='block'
      }
      break;
    case "btnDespliegaAudio":
      let seccionAudio=document.querySelector('.seccionBotonesAudio')
      if (buttonState === "0") {
        despliegaAudio(button)
        seccionAudio.style.display='none'
      } else {
        despliegaBtnDeshacer(button);
        seccionAudio.style.display='block'
      }
      break;
    case "btnDespliegaGraban":
      let seccionGraban=document.querySelector('.seccionBackp')
      if (buttonState === "0") {
        despliegaGraban(button);
        seccionGraban.style.display='none'
      } else {
        despliegaBtnDeshacer(button);
        seccionGraban.style.display='block'
      }
      break;
    default:
      break;
  }
  // Alternar el estado del botón
  button.setAttribute("data-state", buttonState === "0" ? "1" : "0");
}
function despliegaBtnDeshacer(button) {
  button.style.backgroundImage = "url('./img/btn/deshacer.png')";
}
function despliegaEdicion(button) {
  button.style.backgroundImage = "url('./img/btn/editar.png')";
}
function despliegaAudio(button) {
  button.style.backgroundImage = "url('./img/btn/audio.png')";
}
function despliegaGraban(button) {
  button.style.backgroundImage = "url('./img/btn/servidor.png')";
}
//PARA RECUPERAR BASE DATO
function presentaBckp(){
  activaSeccionFormulario(true)
  activaSeccionTitulo(false)
  activaTextoDesarrollo(false)
  activaSeccionBackp(true)
  activacionSeccionBotones(false)
  activaListaTitulos(false)
}
function activaTextoDesarrollo(activa){
  let textoDes=document.getElementById('textoDes')
  if(activa){
    textoDes.style.display= 'block';
  } else {
    textoDes.style.display= 'none';
  }
}
function activaSeccionFormulario(activa){
  let formulario=document.getElementById('seccionFormulario')
  if(activa){
    formulario.style.display='block'
  }else {
    formulario.style.display='none'
  }
}
function activaListaTitulos(activa){
  // desactiva lista titulos
  let listaTitulos = document.getElementById("listaTitulos");
  if(activa){
    listaTitulos.style.display='block'
  }else {
    listaTitulos.style.display='none'
  }
}
function activacionSeccionBotones(activa){
  let seccionActivacionBotones = document.getElementById("seccionActivacionBotones");
  if(activa){
    seccionActivacionBotones.style.display='block'
  } else {
    seccionActivacionBotones.style.display='none'
  }
}
function activaSeccionBackp(activa){
  let seccionGraban=document.querySelector('.seccionBackp')
  if(activa){
    seccionGraban.style.display='block'
  } else {
    seccionGraban.style.display='none'
  }
}

function editaBitacora(){
  // validar us activo en session
  let idUsu=usuarioActivoForm()
  let idActivo=idActivoLocal()
  if(idUsu!==idActivo){
    despliegaMensaje('Debes primero logearte')
    return
  }
  presentaFormularioDesarrollo()
  activaListaTitulos(true)
  activaSeccionTitulo(false)
  activacionSeccionBotones(true)
  activaSeccionBackp(false)
  activaTextoDesarrollo(true)
}

function cierraEdicionBit(){
  ocultaFormularioDesarrollo();
}

function usuarioActivoForm(){
  let idUsu=document.getElementById('idUsu').value
  if(idUsu){
    return idUsu
  } else {
    return false
  }
}


