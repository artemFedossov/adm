// URL de la API para obtener la lista de lenguajes disponibles y para   
// traducir el texto
const getIdioma = 'https://text-translator2.p.rapidapi.com/getLanguages';
const postUrl = 'https://text-translator2.p.rapidapi.com/translate';
// Elementos del HTML que se utilizan en el codigo
const selectA = document.querySelector('#selectA');
const selectB = document.querySelector('#selectB');
const botonTraducir = document.querySelector('#traducir');
const entradaTexto = document.querySelector('#entradaTexto');
const salidaTexto = document.querySelector('#salidaTexto');
// Variable para almacenar los lenguajes disponibles 
let lenguajes = [];
let sourceLenguaje;
let targetLenguaje;

// Opciones para la solicitud GET a la API
const optionsGet = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b89834ec54msha6f0c7991a850a4p151779jsn28cc85822419',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

// Realiza la solicitud GET para obtener los lenguajes disponibles
fetch(getIdioma, optionsGet)
	.then(response => response.json())
	.then(data => {
		// Almacena los lenguajes disponibles en la variable lenguajes
		lenguajes = data.data.languages;

		// Itera sobre los lenguajes y crea opciones para los select en el HTML
		lenguajes.forEach(function (lenguaje) {
			if ((lenguaje.code === "en") || (lenguaje.code === "fr") ||
				(lenguaje.code === "it") || (lenguaje.code === "pt") ||
				(lenguaje.code === "ru") || (lenguaje.code === "es")) {
				// Crea una opción para el select de origen
				let opcionA = document.createElement('option')
				opcionA.textContent = lenguaje.name;
				opcionA.value = lenguaje.code;
				selectA.appendChild(opcionA);

				// Crea una opción para el select de destino
				let opcionB = document.createElement('option')
				opcionB.textContent = lenguaje.name;
				opcionB.value = lenguaje.code;
				selectB.appendChild(opcionB);
			}
		});

		// Evento para seleccionar el lenguaje de origen
		selectA.addEventListener('click', () => {
			sourceLenguaje = selectA.value;
		})
		// Evento para seleccionar el lenguaje de destino
		selectB.addEventListener('click', () => {
			targetLenguaje = selectB.value;
		})
	})

// Evento click para el botón de traducir
botonTraducir.addEventListener('click', () => {
	// Opciones para la solicitud POST a la API
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
	// Realiza la solicitud POST para traducir el texto
	fetch(postUrl, optionsPost)
		.then(response => response.json())
		.then(data => {
			// Coloca el texto traducido en el área de salida en el HTML
			salidaTexto.value = data.data.translatedText;
		})
		.catch(err => {
			// Si no se puede realizar la traducción, muestra un mensaje de error
			if ((selectA.value === "Seleccione Idioma") || (selectB.value === "Seleccione Idioma")) {
				Swal.fire({
					title: "No se pudo traducir",
					text: "Seleccione un Idioma",
					icon: "error"
				});

			}
		});
})
