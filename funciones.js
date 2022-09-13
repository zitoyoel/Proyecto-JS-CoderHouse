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

//funcion para limpiar las clases de las validaciones
function cambiarClases() {
    let cambiarclase = document.getElementById('formulario');
    for (let i = 0; i < cambiarclase.length; i++) {
        let auxiliar = cambiarclase.childNodes[i]
        auxiliar.className = 'col-12'
        let auxiliarDos = cambiarclase.childNodes[i].nextSibling;
        auxiliarDos.nextSibling.className = 'col-12'
        let auxiliarTres = cambiarclase.childNodes[i].nextSibling.nextSibling.nextSibling;
        auxiliarTres.nextSibling.className = 'col-12'
    }

}