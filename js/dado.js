// Selecciona elementos HTML
const saldo = document.querySelector('#saldo');
const apuesta = document.querySelector('#apuesta');
const jugada = document.querySelector('#jugada');
const numero = document.querySelector('#numero');
const tirar = document.querySelector('#tirar');
const ultimaJugada = document.querySelector('#ultimaJugada');
// Array para almacenar las ultimas jugadas
let ultimasJugadas = [];

// Evento click para el boton tirar
tirar.addEventListener('click', ()=>{
    
    // Obtiene el saldo actual del jugador
    let caja = parseInt(saldo.textContent);
    // Verifica si se ha ingresado una apuesta y una jugada
    if((apuesta.value === "") || (jugada.value === "jugada")){   
        // Muestra un mensaje de advertencia si falta algun dato
        Swal.fire({
            title: "No se pudo apostar",
            text: "Seleccione la jugada",
            icon: "warning"
        });
    }else if(apuesta.value > caja){
        // Muestra una mensaje de advertencia si la apuesta es mayor que el saldo
        Swal.fire({
            title: "No se pudo apostar",
            text: "Su apuesta es mucho mayor al saldo",
            icon: "warning"
        });
    }else {
        // Define lo posibles resultados del dado
        let dado = [{numero: "1", color: "rojo", pareja: "impar", 
                    img: "img/rojo1.png"},
                    {numero: "2", color: "rojo", pareja: "par", img: "img/rojo2.png"},
                    {numero: "3", color: "negro", pareja: "impar", img: "img/negro3.png"},
                    {numero: "4", color: "rojo", pareja: "par", img: "img/rojo4.png"},
                    {numero: "5", color: "negro", pareja: "impar", img: "img/negro5.png"},
                    {numero: "6", color: "negro", pareja: "par", img: "img/negro6.png"}];
        
        // Genera un número aleatorio para la tirada del dado
        let tirada = Math.floor(Math.random()*6)+1;
        let multiplicador = 0;
        let resultado = 0;
        let jugadaGanadora = {};
    
        // Busca la jugada apostada en el array del dado
        for (let propiedad in dado){
            if(dado[propiedad] === dado[tirada-1]){
                jugadaGanadora = dado[propiedad];
                numero.src = dado[propiedad].img;
            }
        }
        
        // Resta la apuesta al saldo actual
        caja = caja - parseInt(apuesta.value);
        saldo.textContent = caja + " Monedas";
    
        // Determina el multiplicador de acuerdo a la jugada realizada
        if((jugada.value === "rojo") || (jugada.value === "negro") ||
           (jugada.value === "par") || (jugada.value === "impar")){
            multiplicador = 2;
           }else {
            multiplicador = 6;
           }
        
        // Calcula el resultado de la apuesta
        for (let propiedad in jugadaGanadora){
            if(jugadaGanadora[propiedad] === jugada.value){
                resultado = parseInt(apuesta.value) * multiplicador;
                caja = caja + resultado;
                saldo.textContent = caja + " Monedas";
                break;
            }
        }

        // Agrega la tirada actual al historial de jugadas (maximo 6 jugadas)
        ultimasJugadas.push(numero.src);
        if(ultimasJugadas.length > 6){
            ultimasJugadas.shift();
        }
        // Actualiza la visualización del historial de jugadas
        actualizarJugadas();
    }
})

// Función para actualizar la visualización del historial de jugadas
function actualizarJugadas() {
    ultimaJugada.innerHTML = "";
    // Itera sobre las últimas jugadas y crea elementos de imagen para mostrarlas
    for(let i = ultimasJugadas.length -1; i >= 0; i--){
        let jugadaHTML = document.createElement('img');
        jugadaHTML.setAttribute("src", `${ultimasJugadas[i]}`)
        jugadaHTML.setAttribute("id", "numero");
        jugadaHTML.setAttribute("class", "dadoSalido");
        ultimaJugada.appendChild(jugadaHTML);
    }
}