// Selecciona los botones y el contenedor de las notas en el HTML
const btnAgregar = document.querySelector('#agregar');
const btnBorrar = document.querySelector('#borrar');
const contenedor = document.querySelector('#contenedor');
// Un array para almacenar las notas
let bloqueNotas = [];

// Evento click para el boton de agregar notas de forma dinamica
btnAgregar.addEventListener('click', () => {
    // Crea un nuevo elemento input, asignandole propiedades
    // y lo agrega al array
    let nuevaNota = document.createElement('input');
    nuevaNota.type = "text";
    nuevaNota.className = "nota";
    nuevaNota.className = "bordes";
    contenedor.appendChild(nuevaNota);
    bloqueNotas.push(nuevaNota);
})

// Evento click para el boton de borrar
btnBorrar.addEventListener('click', () => {
    // Verifica si hay notas en el array y borra la última
    if (bloqueNotas.length > 0) {
        let ultimaNota = bloqueNotas.pop();
        contenedor.removeChild(ultimaNota);
    }
})