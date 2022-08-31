/* Se implementan las librerias SweerAlert2 y Luxon */

class Turno {
    constructor(nombre, apellido, dni, telefono, hora, fecha) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.hora = hora;
        this.fecha = fecha;
    }

    datosUsuario() {
        return `Nombre: ${this.nombre}\nApellido: ${this.apellido}\nDNI: ${this.dni}\nTelefono: ${this.telefono}\nHora: ${this.hora} hs\nFecha: ${this.fecha}`;
    }

}

//Se declara la libreria de luxon para manejar fechas
const DateTime = luxon.DateTime;
//se crea un turno vacio en el cual se van a ingresar los turnos
const turnos = [];
verificarStorage();


//interactuar con html


//esconder boton de sacar turno
let esconderBoton = document.getElementById("botonTurno");
esconderBoton.onclick = () => {
    esconderBoton.style.display = "none";
};

//al hacer click en sacar turno, aparece el formulario
let botonReservar = document.getElementById("botonTurno");
botonReservar.addEventListener("click", formularioAparece);

function formularioAparece() {
    let formularioDespliega = document.getElementById("formularioAparece");
    formularioDespliega.style.display = "flex";
}

//creo variable para despues desplegar el formulario
let formularioDespliega = document.getElementById("formularioAparece");

//funcionalidad para el boton cerrar del formulario
let botonCerrar = document.getElementById("cerrarFormulario");
botonCerrar.onclick = () => {
    formularioDespliega.style.display = "none";
    esconderBoton.style.display = "block";
};

//funcionalidad mostrar turnos
//Si no hay turnos registrados, se muestra un mensaje
let botonMostrarTurnos = document.getElementById("misTurnos");
botonMostrarTurnos.onclick = () => {
    let auxiliar = JSON.parse(localStorage.getItem("turnos"));
    if(turnos.length === 0 || auxiliar === null){
        let sinTurnos = document.getElementById("infoModal");
        sinTurnos.innerHTML = "NO HAY TURNOS REGISTRADOS";
        
    }
    //si hay turnos registrados, se muestran los turnos de forma dinamica y se pueden eliminar
    else{
        let tabla = document.getElementById("infoModal");
        tabla.innerHTML = "";
        for(let i = 0; i < auxiliar.length; i++){
            tabla.innerHTML += `<div class="registrosTabla">
            <h5 class="titulosTurnos">Nombre</h5>
            <p class="datosTurnos">${auxiliar[i].nombre}</p>
            <h5 class="titulosTurnos">Apellido</h5>
            <p class="datosTurnos">${auxiliar[i].apellido}</p>
            <h5 class="titulosTurnos">DNI</h5>
            <p class="datosTurnos">${auxiliar[i].dni}</p>
            <h5 class="titulosTurnos">Telefono</h5>
            <p class="datosTurnos">${auxiliar[i].telefono}</p>
            <h5 class="titulosTurnos">Horario</h5>
            <p class="datosTurnos">${auxiliar[i].hora}</p>
            <h5 class="titulosTurnos">Fecha</h5>
            <p class="datosTurnos">${auxiliar[i].fecha}</p>
            </div>`;    
        }
        
            
            
            
        }

    } 
    
//funcionalidad eliminar turnos
let eliminar = document.getElementById("eliminarTurnos");
eliminar.onclick = () => {
guardarStorage();    
localStorage.clear();
turnos.splice(0, turnos.length);
}


//interaccion con furmulario
window.addEventListener('load', () => {
    const form = document.getElementById('formulario')
    const nombre = document.getElementById("inputNombre")
    const apellido = document.getElementById("inputApellido")
    const dni = document.getElementById("inputDNI")
    const fecha = document.getElementById("inputFecha")
    const hora = document.getElementById("inputHorario")
    const telefono = document.getElementById("inputTelefono");
    
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if(validaCampos() === true){
            
            let turno = new Turno(nombre.value, apellido.value, dni.value, telefono.value, hora.value, fecha.value);
            turno.datosUsuario();
            console.log(`Los datos del turno son:\n${turno.datosUsuario()}`);
            
            Swal.fire({
                title: 'DETALLE DE SU TURNO',
                html: `<p>Nombre: ${turno.nombre}</p><p>Apellido: ${turno.apellido}</p><p>DNI: ${turno.dni}</p><p>Telefono: ${turno.telefono}</p><p>Hora: ${turno.hora}</p><p>Fecha: ${turno.fecha}</p>`,
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
            
            turnos.push(turno);
            guardarStorage();
            console.log(`El usuario saco ${turnos.length} turnos`);
            formulario.reset();
            formularioDespliega.style.display = "none";
            esconderBoton.style.display = "block";

            
        } 
    })
    
    
    const validaCampos = () => {
        //capturar los valores ingresados por el usuario
        const nombreValor = nombre.value.trim()
        const apellidoValor = apellido.value.trim()
        const dniValor = dni.value.trim()
        const horaValor = hora.value;
        const telefonoValor = telefono.value.trim();
        //se crea variable con el valor sin tratar para poder validar que no se saquen turnos en fechas simultaneas
        const ValidarTurnosSimultaneos = fecha.value;
        //se cre variable con la fecha ingresada y se la transforma a un formato de fecha para luego tratarla en la validacion de fecha
        let fechaValor = fecha.value;
        fechaValor = DateTime.fromISO(fechaValor); 


        //validando campo nombre
        if (!nombreValor) {
            validaFalla(nombre, 'Campo vacío')
            return false
        } else {
            validaOk(nombre)
        }
        
        //validando campo apellido
        if (!apellidoValor) {
            validaFalla(apellido, 'Campo vacío')
            return false
        } else {
            validaOk(apellido)
        }
        
        //validando campo DNI
        if (!dniValor) {
            validaFalla(dni, 'Campo vacío')
            return false
        } else {
            validaOk(dni)
        }
        
        //validando campo telefono
        if (!telefonoValor) {
            validaFalla(telefono, 'Campo vacío')
            return false
        } else {
            validaOk(telefono)
        }
        
        //validando campo fecha
        if (!fechaValor) {
            validaFalla(fecha, 'Campo vacío')
            return false
        } else if (fechaValor < DateTime.now()) {
            validaFalla(fecha, 'Ingrese una fecha mayor a la actual')
            return false
        } else if(fechaValor.weekday === 7 || fechaValor.weekday === 6){
            console.log(fechaValor.weekday);
            validaFalla(fecha, 'No atendemos los fines de semana')
            return false
        } else {
            validaOk(fecha)
        }
        
        //validando campo hora
        if (!horaValor) {
            validaFalla(hora, 'Campo vacío')
            return false
        }
        else if(horaValor){
            for(let i = 0; i < turnos.length; i++){
                if(turnos[i].hora === horaValor && turnos[i].fecha === ValidarTurnosSimultaneos){
                    console.log(turnos[i].fecha);
                    validaFalla(hora, 'Turno ocupado, seleccione otro horario')
                    return false
                }
    
            }
        } else {
            validaOk(hora)
        }
        
        
        return true;
        
    }
})

const validaFalla = (input, msje) => {
    const formControl = input.parentElement
    const aviso = formControl.querySelector('p')
    aviso.innerText = msje
    
    formControl.className = 'form-control falla'
}
const validaOk = (input, msje) => {
    const formControl = input.parentElement
    formControl.className = 'form-control ok'
}

//Storage
function guardarStorage(){
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

function verificarStorage(){
    let auxiliar = JSON.parse(localStorage.getItem("turnos"));

    if(auxiliar){
        for(let i = 0; i < auxiliar.length; i++){
            turnos.push(auxiliar[i]);
        }
    }
    
}
