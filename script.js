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
