const url = 'https://api.tutiempo.net/json/?lan=es&apid=4sDa4zq4qqXhMF6&lid=43265';
const clima = document.querySelector('#clima')

const icono = document.createElement('img');
const temMax = document.createElement('div');
const temMin = document.createElement('div');
const viento = document.createElement('div');
const humedad = document.createElement('div');
const descripcion = document.createElement('div');

fetch(url)
    .then(response => response.json())
    .then(data => {
        let iconos = data.day1.icon;
        icono.setAttribute('src', `https://v5i.tutiempo.net/wi/01/50/${iconos}.png`);
        temMax.textContent = data.day1.temperature_max + " °C  Temperatura Maxima";
        temMin.textContent = data.day1.temperature_min + " °C  Temperatura Minima";
        viento.textContent = "Viento " + data.day1.wind + " Km/h";
        humedad.textContent = "Humedad " + data.day1.humidity + " %";
        descripcion.textContent = data.day1.text;
        descripcion.className = "posicionTexto";

        clima.appendChild(icono);
        clima.appendChild(descripcion)
        clima.appendChild(temMax);
        clima.appendChild(humedad);
        clima.appendChild(temMin);
        clima.appendChild(viento);
    })
