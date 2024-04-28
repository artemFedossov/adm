const getUrl = 'https://text-translator2.p.rapidapi.com/getLanguages';
const postUrl = 'https://text-translator2.p.rapidapi.com/translate';

const selectA = document.querySelector('#selectA');
const selectB = document.querySelector('#selectB');
const botonTraducir = document.querySelector('#traducir');
const entradaTexto = document.querySelector('#entradaTexto');
const salidaTexto = document.querySelector('#salidaTexto');

let lenguajes = [];
let sourceLenguaje;
let targetLenguaje;
let opcionA;
let opcionB;

const optionsGet = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b89834ec54msha6f0c7991a850a4p151779jsn28cc85822419',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};


fetch(getUrl, optionsGet)
	.then(response => response.json())
	.then(data => {

		lenguajes = data.data.languages;

		lenguajes.forEach(function (lenguaje) {
			if ((lenguaje.code === "en") || (lenguaje.code === "fr") ||
				(lenguaje.code === "it") || (lenguaje.code === "pt") ||
				(lenguaje.code === "ru") || (lenguaje.code === "es")) {
				opcionA = document.createElement('option')
				opcionB = document.createElement('option')
				opcionA.textContent = lenguaje.name;
				opcionA.value = lenguaje.code;
				opcionB.textContent = lenguaje.name;
				opcionB.value = lenguaje.code;
				selectA.appendChild(opcionA);
				selectB.appendChild(opcionB);
			}
		});

		selectA.addEventListener('click', () => {
			sourceLenguaje = selectA.value;
		})

		selectB.addEventListener('click', () => {
			targetLenguaje = selectB.value;
		})
	})

botonTraducir.addEventListener('click', () => {

	const optionsPost = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': 'b89834ec54msha6f0c7991a850a4p151779jsn28cc85822419',
			'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
		},
		body: new URLSearchParams({
			source_language: sourceLenguaje,
			target_language: targetLenguaje,
			text: entradaTexto.value
		})
	};

	fetch(postUrl, optionsPost)
		.then(response => response.json())
		.then(data => {
			salidaTexto.value = data.data.translatedText;
		})
		.catch(err => {

			if ((selectA.value === "Seleccione Idioma") || (selectB.value === "Seleccione Idioma")) {
				Swal.fire({
					title: "No se pudo traducir",
					text: "Seleccione un Idioma",
					icon: "error"
				});

			}
		});
})
