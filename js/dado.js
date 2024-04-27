const saldo = document.querySelector('#saldo');
const apuesta = document.querySelector('#apuesta');
const jugada = document.querySelector('#jugada');
const numero = document.querySelector('#numero');
const tirar = document.querySelector('#tirar');
const ultimaJugada = document.querySelector('#ultimaJugada');

let ultimasJugadas = [];

tirar.addEventListener('click', ()=>{
    let dado = [{numero: 1, color: "rojo", pareja: "impar"},
                {numero: 2, color: "negro", pareja: "par"},
                {numero: 3, color: "negro", pareja: "impar"},
                {numero: 4, color: "rojo", pareja: "par"},
                {numero: 5, color: "rojo", pareja: "impar"},
                {numero: 6, color: "negro", pareja: "par"}];
    
    let tirada = Math.floor(Math.random()*6)+1;
    let multiplicador = 0;
    let resultado = 0;
    let jugadaGanadora = {};
    let caja = parseInt(saldo.textContent);

    for (let propiedad in dado){
        if(dado[propiedad] === dado[tirada-1]){
            jugadaGanadora = dado[propiedad];
        }
    }
    
    caja = caja - parseInt(apuesta.value);
    saldo.textContent = caja;

    if((jugada.value === "rojo") || (jugada.value === "negro") ||
       (jugada.value === "par") || (jugada.value === "impar")){
        multiplicador = 2;
       }else {
        multiplicador = 6;
       }
    
    for (let propiedad in jugadaGanadora){

        if(jugadaGanadora[propiedad] === jugada.value){
            console.log("ganaste")
            resultado = parseInt(apuesta.value) * multiplicador
            caja = caja + resultado
            saldo.textContent = caja;
            break;
        }
    }
    numero.textContent = tirada;
    
    ultimasJugadas.push(tirada);
    if(ultimasJugadas.length > 5){
        ultimasJugadas.shift();
    }

    actualizarJugadas();
})

function actualizarJugadas() {
    ultimaJugada.innerHTML = "";
    
    for(let i = ultimasJugadas.length -1; i >= 0; i--){
        let jugadaHTML = document.createElement('li');
        jugadaHTML.textContent = `Tirada: ${ultimasJugadas[i]}`;
        ultimaJugada.appendChild(jugadaHTML);
    }
}