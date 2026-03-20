const inicio = new Date("2026-03-01T00:00:00");

function actualizarContador(){

const ahora = new Date();
const diff = ahora - inicio;

const dias = Math.floor(diff/(1000*60*60*24));
const horas = Math.floor((diff/(1000*60*60))%24);
const minutos = Math.floor((diff/(1000*60))%60);
const segundos = Math.floor((diff/1000)%60);

document.getElementById("contador").innerHTML =
dias + " días " +
horas + "h " +
minutos + "m " +
segundos + "s";

}

setInterval(actualizarContador,1000);
actualizarContador();

/* TEXTO QUE SE ESCRIBE SOLO */

const texto = "Te amo Kely :3";
let i = 0;

function escribir(){

if(i < texto.length){
document.getElementById("typing").innerHTML += texto.charAt(i);
i++;
setTimeout(escribir, 80); // velocidad (más bajo = más rápido)
}

}

escribir();

fetch("poema.json?nocache=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {
    document.getElementById("poema").textContent = data.poema;
  });
