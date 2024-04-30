// Selecciona elementos de HTML
const usuario = document.querySelector('#nombre');
const fecha = document.querySelector('#fecha');
const btnColor = document.querySelector('#btnColor');
const contenedorColor = document.querySelector('.contenedorColor');
const svg = document.querySelector('.bi');
const body = document.body;

// Verifica si en el local Storage esta almacenado el usuario
usuario.value = JSON.parse(localStorage.getItem('nombre'))

// Diálogo modal para ingresar el nombre del usuario
Swal.fire({
  title: 'Ingrese su nombre:',
  input: 'text',
  inputPlaceholder: 'Escribe tu nombre aquí',
  showCancelButton: true,
  confirmButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  showLoaderOnConfirm: true,
  preConfirm: (nombre) => {
    return nombre;
  }
}).then((result) => {
  // Actualiza el nombre del usuario se se guardo
  if (result.isConfirmed) {
    const nombre = result.value;
    if (nombre) {
      usuario.value = nombre;
      localStorage.setItem('nombre',JSON.stringify(usuario.value))
    }
  }
});

// Obtiene la fecha actual 
const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth()+1;
const anio = fechaActual.getFullYear();
const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
// Muestra la fecha actual en la pagina
fecha.innerHTML = `${fechaFormateada}`;

// Cambia entre los modos claro y oscuro al hacer clic en el icono sol/luna
btnColor.addEventListener('click', ()=>{
  // Cambia el icono de sol a luna y viceversa
  svg.classList.toggle('bi-sun');
  if(svg.classList.contains('bi-sun')){
    // Cambia a modo claro
    contenedorColor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="aca bi bi-sun" viewBox="0 0 16 16">
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
    </svg>`
    body.classList.toggle('modo-oscuro')
  }else{
    // Cambia a modo oscuro
    contenedorColor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
    </svg>`
    body.classList.toggle('modo-oscuro')
  }
})
