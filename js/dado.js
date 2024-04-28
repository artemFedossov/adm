const saldo = document.querySelector('#saldo');
const apuesta = document.querySelector('#apuesta');
const jugada = document.querySelector('#jugada');
const numero = document.querySelector('#numero');
const tirar = document.querySelector('#tirar');
const ultimaJugada = document.querySelector('#ultimaJugada');

let ultimasJugadas = [];

tirar.addEventListener('click', ()=>{
    
    let caja = parseInt(saldo.textContent);
    if((apuesta.value === "") || (jugada.value === "jugada"))
    {
        Swal.fire({
            title: "No se pudo apostar",
            text: "Seleccione la jugada",
            icon: "warning"
        });
    }else if(apuesta.value > caja){
        Swal.fire({
            title: "No se pudo apostar",
            text: "Su apuesta es mucho mayor al saldo",
            icon: "warning"
        });
    }else {
        let dado = [{numero: "1", color: "rojo", pareja: "impar", 
                    img: "img/rojo1.png"},
                    {numero: "2", color: "rojo", pareja: "par", img: "img/rojo2.png"},
                    {numero: "3", color: "negro", pareja: "impar", img: "img/negro3.png"},
                    {numero: "4", color: "rojo", pareja: "par", img: "img/rojo4.png"},
                    {numero: "5", color: "negro", pareja: "impar", img: "img/negro5.png"},
                    {numero: "6", color: "negro", pareja: "par", img: "img/negro6.png"}];
        
        let tirada = Math.floor(Math.random()*6)+1;
        let multiplicador = 0;
        let resultado = 0;
        let jugadaGanadora = {};
    
        for (let propiedad in dado){
            if(dado[propiedad] === dado[tirada-1]){
                jugadaGanadora = dado[propiedad];
                numero.src = dado[propiedad].img;
            }
        }
        
        caja = caja - parseInt(apuesta.value);
        saldo.textContent = caja + " Monedas";
    
        if((jugada.value === "rojo") || (jugada.value === "negro") ||
           (jugada.value === "par") || (jugada.value === "impar")){
            multiplicador = 2;
           }else {
            multiplicador = 6;
           }
        
        for (let propiedad in jugadaGanadora){
    
            if(jugadaGanadora[propiedad] === jugada.value){
                resultado = parseInt(apuesta.value) * multiplicador;
                caja = caja + resultado;
                saldo.textContent = caja + " Monedas";
                break;
            }
        }

        
        ultimasJugadas.push(numero.src);
        if(ultimasJugadas.length > 6){
            ultimasJugadas.shift();
        }
    
        actualizarJugadas();

    }

})

function actualizarJugadas() {
    ultimaJugada.innerHTML = "";
    
    for(let i = ultimasJugadas.length -1; i >= 0; i--){
        let jugadaHTML = document.createElement('img');
        jugadaHTML.setAttribute("src", `${ultimasJugadas[i]}`)
        jugadaHTML.setAttribute("id", "numero");
        jugadaHTML.setAttribute("class", "dadoSalido");
        ultimaJugada.appendChild(jugadaHTML);
    }
}