const inicio = new Date("2026-03-01T00:00:00");

/* CONTADOR */
function actualizarContador() {
  const ahora = new Date();
  const diff = ahora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent =
      dias + " días " +
      horas + "h " +
      minutos + "m " +
      segundos + "s";
  }
}

setInterval(actualizarContador, 1000);
actualizarContador();

/* TEXTO QUE SE ESCRIBE SOLO */
const texto = "Te amo Kely :3";
let i = 0;

function escribir() {
  const typing = document.getElementById("typing");
  if (!typing) return;

  if (i < texto.length) {
    typing.textContent += texto.charAt(i);
    i++;
    setTimeout(escribir, 80);
  }
}

escribir();

/* CARGAR POEMA */
fetch("poema.json?nocache=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {
    const poema = document.getElementById("poema");
    if (!poema || !data.poema) return;

    poema.innerHTML = "";

    const lineas = data.poema.split("\n").filter(linea => linea.trim() !== "");

    if (lineas.length === 0) {
      poema.textContent = data.poema;
      return;
    }

    lineas.forEach((linea, index) => {
      const div = document.createElement("div");
      div.className = "linea-poema";
      div.textContent = linea;
      div.style.animationDelay = `${index * 0.4}s`;
      poema.appendChild(div);
    });
  })
  .catch(() => {
    const poema = document.getElementById("poema");
    if (poema) {
      poema.textContent = "No se pudo cargar el poema 💔";
    }
  });
