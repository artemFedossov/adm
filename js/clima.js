// URL de la API del clima
const getUrl = 'https://api.tutiempo.net/json/?lan=es&apid=4sDa4zq4qqXhMF6&lid=43265';

// Selecciona el elemento HTML donde se mostrará el clima
const clima = document.querySelector('#clima')
// Crea elementos HTML para mostrar los datos del clima
const icono = document.createElement('img');
const temMax = document.createElement('div');
const temMin = document.createElement('div');
const viento = document.createElement('div');
const humedad = document.createElement('div');
const descripcion = document.createElement('div');

// Realizá la solicitud a la API de clima
fetch(getUrl)
    .then(response => response.json())
    .then(data => {
        // Extrae los datos del dia actual  
        let iconos = data.day1.icon;
        // Configura el icono del clima
        icono.setAttribute('src', `https://v5i.tutiempo.net/wi/01/50/${iconos}.png`);
        // Muestra la temperatura máxima y mínima
        temMax.textContent = data.day1.temperature_max + " °C  Temperatura Maxima";
        temMin.textContent = data.day1.temperature_min + " °C  Temperatura Minima";
        // Muestra el viento y la humedad
        viento.textContent = "Viento " + data.day1.wind + " Km/h";
        humedad.textContent = "Humedad " + data.day1.humidity + " %";
        // Muestra la descripción del clima
        descripcion.textContent = data.day1.text;
        descripcion.className = "posicionTexto";

        // Agrega elementos al contenedor del clima en la página HTML
        clima.appendChild(icono);
        clima.appendChild(descripcion)
        clima.appendChild(temMax);
        clima.appendChild(humedad);
        clima.appendChild(temMin);
        clima.appendChild(viento);
    })
