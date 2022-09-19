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
            cambiarClases();
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