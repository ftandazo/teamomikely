const fechaInicio = new Date("2026-03-01T00:00:00");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = ahora - fechaInicio;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("contador").textContent =
    `${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
}

actualizarContador();
setInterval(actualizarContador, 1000);

document.getElementById("poema").textContent =
  "Aquí irá el poema del día, escrito por IA, pero primero voy a dejar la página bonita y funcionando.";
