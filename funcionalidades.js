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
    cambiarClases();
    formulario.reset();
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