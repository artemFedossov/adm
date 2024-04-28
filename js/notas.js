const btnAgregar = document.querySelector('#agregar');
const btnBorrar = document.querySelector('#borrar');
const contenedor = document.querySelector('#contenedor');

let bloqueNotas = [];

btnAgregar.addEventListener('click', ()=>{
    let nuevaNota = document.createElement('input');
    nuevaNota.type = "text";
    nuevaNota.className = "nota";
    nuevaNota.className = "bordes";
    contenedor.appendChild(nuevaNota);
    bloqueNotas.push(nuevaNota);
})

btnBorrar.addEventListener('click', ()=>{
    if(bloqueNotas.length > 0){
        let ultimaNota = bloqueNotas.pop();
        contenedor.removeChild(ultimaNota);
    }
})