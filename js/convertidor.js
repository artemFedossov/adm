// URL de la API para obtener las tasas de cambio
const getMoneda = 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD';

// Opciones para la solicitud fetch, incluyendo la clave de la API y el host
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b89834ec54msha6f0c7991a850a4p151779jsn28cc85822419',
		'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com'
	}
};

// Selección de elementos HTML
const monedaA = document.querySelector('#monedaA');
const monedaB = document.querySelector('#monedaB');
const entradaMoneda = document.querySelector('#entradaMoneda');
const salidaMoneda = document.querySelector('#salidaMoneda');

// Declaración de variables para almacenar datos
let divisaA;
let divisaB;
let cantidad;
let operadorA;
let operadorB;
let resultado;
let divisas = {};


// Realizá la solicitud a la API para obtener las tasas de cambio
fetch(getMoneda, options)
	.then(response => response.json())
	.then(data => {
		// Almacena las tasas de cambio en un objeto vacío
		divisas = data.rates;
		// Itera sobre las tasas de cambio y agrega las opciones de moneda al selector HTML
		for (let propiedad in divisas) {
			if ((propiedad === "CNY") || (propiedad === "USD") ||
				(propiedad === "EUR") || (propiedad === "ARS")) {
				// Crea elementos para mostrar los coidgos de las divisas
				divisaA = document.createElement('option');
				divisaB = document.createElement('option');
				divisaA.textContent = propiedad;
				divisaB.textContent = propiedad;
				divisaA.value = propiedad;
				divisaB.value = propiedad;
				monedaA.appendChild(divisaA);
				monedaB.appendChild(divisaB);
			}
		};

		// Evento para calcular la conversión cuando se hace clic en el campo de entrada de moneda
		entradaMoneda.addEventListener('click', () => {
			// Verifica si se han seleccionado ambas monedas
			if((monedaA.value === "Selecciones Moneda") || (monedaB.value === "Selecciones Moneda")){
				// Muestra un mensaje de error si no se han seleccionado ambas monedas
				entradaMoneda.blur();
				Swal.fire({
					title: "No se pudo convertir",
					text: "Seleccione una moneda",
					icon: "error"
				});
			}else{
				// Calcula la conversión después de un retraso de 5 segundos
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					calcularConversion(divisas);
					entradaMoneda.blur();
				}, 5000);
			}
			
		})
	})

	// Función para calcular la conversión de la moneda
	function calcularConversion(objeto) {
		// Obtiene la cantidad ingresada por el usuario
		cantidad = entradaMoneda.value;
		//	Obtiene el valor de la tasa de cambio para la moneda de origen
		for (let propiedad in objeto) {
			if (propiedad === monedaA.value) {
				operadorA = objeto[propiedad];
				// Obtiene el valor de la tasa de cambio para la moneda de destino
				for (let propiedad in objeto) {
					if (propiedad === monedaB.value){
						operadorB = objeto[propiedad];
						// Calcula la cantidad convertida y la muestra en el campo de salida
						resultado = (operadorB / operadorA) * cantidad;
						salidaMoneda.value = resultado;
					}
				}
			}
		}
	}


// Es un segundo codigo para obtener un cambio de divisas (por si me quedo sin latidos)

/* const getSimbolo = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols';
const getCambio = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP';

const monedaA = document.querySelector('#monedaA');
const monedaB = document.querySelector('#monedaB');
const entradaMoneda = document.querySelector('#entradaMoneda');
const salidaMoneda = document.querySelector('#salidaMoneda');

let divisaA;
let divisaB;
let cantidad;
let operadorA;
let operadorB;
let resultado;
let divisas = {};
let aux = {};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b89834ec54msha6f0c7991a850a4p151779jsn28cc85822419',
		'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
};

fetch(getSimbolo, options)
	.then(response => response.json())
	.then(data => {

		divisas = data.symbols;

		for (let propiedad in divisas) {
			if ((propiedad === "BTC") || (propiedad === "USD") ||
				(propiedad === "EUR") || (propiedad === "ARS")) {
				divisaA = document.createElement('option');
				divisaB = document.createElement('option');
				divisaA.textContent = propiedad;
				divisaB.textContent = propiedad;
				divisaA.value = propiedad;
				divisaB.value = propiedad;
				monedaA.appendChild(divisaA);
				monedaB.appendChild(divisaB);
			}
		};
	})

fetch(getCambio, options)
	.then(response => response.json())
	.then(data => {
		aux = data.rates

		entradaMoneda.addEventListener('click', () => {

			clearTimeout(this.timer);

			this.timer = setTimeout(() => {
				calcularConversion(aux);
				entradaMoneda.blur();
			}, 5000);
			
		})
		
	})

	function calcularConversion(objeto) {
		cantidad = entradaMoneda.value;
	
		for (let propiedad in objeto) {
	
			if (propiedad === monedaA.value) {
				operadorA = objeto[propiedad];
				for (let propiedad in objeto) {
					if (propiedad === monedaB.value){
						operadorB = objeto[propiedad];
						resultado = (operadorB / operadorA) * cantidad;
						salidaMoneda.value = resultado;
					}
				}
			}
		}
	} */