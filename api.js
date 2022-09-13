//consumir API del clima. Nos da y muestra ubicacion del usuario, temperatura y fecha actual
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