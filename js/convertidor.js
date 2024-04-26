const getSimbolo = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols';
const getCambio = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP';

const monedaA = document.querySelector('#monedaA');
const monedaB = document.querySelector('#monedaB');
const entradaMoneda = document.querySelector('#entradaMoneda');
const salidaMoneda = document.querySelector('#salidaMoneda');

let divisaA;
let divisaB;
let codDivasaA;
let codDivisaB;
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
			}, 8000);
			
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
	}