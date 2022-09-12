/* Se implementan funcionalidades en "mis turnos" se pueden eliminar turnos individualmente. Se suman mas interacciones con el usuario*/

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

};

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

//al hacer click en reservar, aparece el formulario
let botonReservar = document.getElementById("botonTurno");
botonReservar.addEventListener("click", formularioAparece);

function formularioAparece() {
    let formularioDespliega = document.getElementById("formularioAparece");
    formularioDespliega.style.display = "flex";

};

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
    if (turnos.length === 0 || auxiliar === null) {
        let sinTurnos = document.getElementById("infoModal");
        sinTurnos.innerHTML = "NO HAY TURNOS REGISTRADOS";

    }
    //si hay turnos registrados, se muestran los turnos de forma dinamica y se pueden eliminar
    else {
        let tabla = document.getElementById("infoModal");
        tabla.innerHTML = "";
        for (let i = 0; i < auxiliar.length; i++) {
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
            <button type="button" id="eliminoIndividual" class="btn btn-outline-danger mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
</svg>
              </button>
            </div>`;
        }
    }

    //funcionalidad eliminar turno individual
    let btnEliminarIndividual = document.getElementsByClassName("btn btn-outline-danger mb-2");

    for (let i = 0; i < btnEliminarIndividual.length; i++) {
        btnEliminarIndividual[i].onclick = () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger mx-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar!',
                cancelButtonText: 'Cancelar!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {

                    let auxiliar = JSON.parse(localStorage.getItem("turnos"));
                    auxiliar.splice(i, 1);
                    localStorage.setItem("turnos", JSON.stringify(auxiliar));

                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'Su turno fue eliminado.',
                        'success'
                    ).then(() => {
                        location.reload();

                    })
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'El turno no se elimino',
                        'error'
                    )
                }
            })

        }
    }
};

//funcionalidad eliminar turnos
let eliminar = document.getElementById("eliminarTurnos");
eliminar.onclick = () => {
    if (turnos.length === 0) {
        Swal.fire(
            'No hay turnos registrados',
            '',
            'info'
        )
    } else {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Se eliminaran todos los turnos!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar todos!'
        }).then((result) => {
            if (result.isConfirmed) {
                guardarStorage();
                localStorage.clear();
                turnos.splice(0, turnos.length);
                Swal.fire(
                    'Eliminados!',
                    'Sus turnos fueron eliminados.',
                    'success'
                )
            }
        })

    }
};


//consumir API del clima
const API_key = 'b8aaf0b6f117dfe2e6584b66b3230c5d';

const spinner = document.getElementById('spinner');

const fetchData = posicion => {
    const {
        latitude,
        longitude
    } = posicion.coords;

    fetch(`http://api.openweathermap.org/data/2.5/weather?&lang=es&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_key}`)
        .then(response => response.json())
        .then(data => enviarData(data))
        .catch(error => console.error('error:', error))
        .finally(() => spinner.style.display = 'none');
}

const enviarData = data => {
    const datosClima = {
        ubicacion: `Ciudad: ${data.name}`,
        temperatura: `Temperatura: ${Math.trunc(data.main.temp)}°C`,
        fechaActual: `Fecha: ${traerFecha()}`
    };

    Object.keys(datosClima).forEach(key => {
        document.getElementById(key).textContent = datosClima[key];
    })
};

const traerFecha = () => {
    let fecha = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
    return fecha;
};

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
};

//interaccion con furmulario
window.addEventListener('load', () => {
    const form = document.getElementById('formulario');
    const nombre = document.getElementById("inputNombre");
    const apellido = document.getElementById("inputApellido");
    const dni = document.getElementById("inputDNI");
    const fecha = document.getElementById("inputFecha");
    const hora = document.getElementById("inputHorario");
    const telefono = document.getElementById("inputTelefono");
    const botonEnviar = document.getElementById("button");



    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (validaCampos() === true) {


            let turno = new Turno(nombre.value, apellido.value, dni.value, telefono.value, hora.value, fecha.value);
            turno.datosUsuario();
            console.log(`Los datos del turno son:\n${turno.datosUsuario()}`);

            //Utilizar EmailJS para enviar un correo con los datos del turno
            botonEnviar.value = "Enviando..."
            const serviceID = 'default_service';
            const templateID = 'template_gmgejk7';

            emailjs.sendForm(serviceID, templateID, '#formulario')
                .then(() => {
                    botonEnviar.value = 'RESERVAR TURNO';
                    Swal.fire({
                        title: 'DETALLE DE SU TURNO',
                        html: `<p>Nombre: ${turno.nombre}</p><p>Apellido: ${turno.apellido}</p><p>DNI: ${turno.dni}</p><p>Telefono: ${turno.telefono}</p><p>Hora: ${turno.hora}</p><p>Fecha: ${turno.fecha}</p>`,
                        icon: 'success',
                        confirmButtonText: 'Cerrar'
                    })
                }, (err) => {
                    botonEnviar.value = 'RESERVAR TURNO';
                    alert(JSON.stringify(err));
                });

            turnos.push(turno);
            guardarStorage();
            console.log(`El usuario saco ${turnos.length} turnos`);
            formulario.reset();
        }
    })

    //validacion de campos
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
        if (fechaValor.length === 0) {
            validaFalla(fecha, 'Campo vacío')
            return false
        } else if (DateTime.fromISO(fechaValor) < DateTime.now()) {
            validaFalla(fecha, 'Ingrese una fecha mayor a la actual')
            return false
        } else if (fechaValor.weekday === 7 || fechaValor.weekday === 6) {
            validaFalla(fecha, 'No atendemos los fines de semana')
            return false
        } else {
            validaOk(fecha)
        }

        //validando campo hora
        if (!horaValor) {
            validaFalla(hora, 'Campo vacío')
            return false
        } else if (horaValor) {
            for (let i = 0; i < turnos.length; i++) {
                if (turnos[i].hora === horaValor && turnos[i].fecha === ValidarTurnosSimultaneos) {
                    validaFalla(hora, 'Turno ocupado, seleccione otro horario')
                    return false
                }
            }
        } else {
            validaOk(hora)
        }


        return true;

    }
});

//funciones para validar campos
const validaFalla = (input, msje) => {

    let formControl = input.parentElement;
    const aviso = formControl.querySelector('p')
    aviso.innerText = msje
    formControl.setAttribute('id', 'prueba')
    formControl.className = 'form-control falla'
};

const validaOk = (input, msje) => {
    let formControl = input.parentElement
    formControl.className = 'form-control ok'
};

//Storage
function guardarStorage() {
    localStorage.setItem("turnos", JSON.stringify(turnos));
};

function verificarStorage() {
    let auxiliar = JSON.parse(localStorage.getItem("turnos"));

    if (auxiliar) {
        for (let i = 0; i < auxiliar.length; i++) {
            turnos.push(auxiliar[i]);
        }
    }

};
