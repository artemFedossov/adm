// Selecciona los botones y el contenedor de las notas en el HTML
const btnAgregar = document.querySelector('#agregar');
const btnBorrar = document.querySelector('#borrar');
const contenedor = document.querySelector('#contenedor');
// Un array para almacenar las notas
let bloqueNotas = [];

// Evento click para el boton de agregar notas de forma dinamica
btnAgregar.addEventListener('click', () => {
    // Crea un nuevo elemento input, asignandole propiedades
    // y lo agrega al array y guarda informacion en el local storage
    let nuevaNota = document.createElement('input');
    nuevaNota.type = "text";
    nuevaNota.className = "nota";
    nuevaNota.className = "bordes";
    nuevaNota.textContent
    contenedor.appendChild(nuevaNota);
    bloqueNotas.push(nuevaNota);
    guardarNotasEnLocalStorage()
})

// Evento click para el boton de borrar
btnBorrar.addEventListener('click', () => {
    // Verifica si hay notas en el array y borra la última
    if (bloqueNotas.length > 0) {
        let ultimaNota = bloqueNotas.pop();
        contenedor.removeChild(ultimaNota);
        guardarNotasEnLocalStorage()
    }
})

// Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Verifica si hay datos almacenados en localStorage
    if (localStorage.getItem('notas')) {
        // Si hay datos, cargar las notas
        let notasGuardadas = JSON.parse(localStorage.getItem('notas'));
        // Recorre las notas cargadas y las agregar al contenedor
        notasGuardadas.forEach(nota => {
            let nuevaNota = document.createElement('input');
            nuevaNota.type = "text";
            nuevaNota.className = "nota";
            nuevaNota.className = "bordes";
            nuevaNota.value = nota;
            contenedor.appendChild(nuevaNota);
            bloqueNotas.push(nuevaNota);
        });
    }
});

// Función para guardar las notas en el localStorage
function guardarNotasEnLocalStorage() {
    const notas = bloqueNotas.map(nota => nota.value.trim()); 
    localStorage.setItem('notas', JSON.stringify(notas)); 
}

// Evento input para los inputs de notas
contenedor.addEventListener('input', () => {
    guardarNotasEnLocalStorage(); 
});