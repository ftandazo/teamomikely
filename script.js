const HUGGINGFACE_API_KEY = "AQUI_VA_TU_TOKEN";

async function generarPoema() {
  const poemaEl = document.getElementById("poema");

  const hoy = new Date().toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const prompt = `
Escribe un poema romántico breve y original en español dedicado a una chica llamada Kely.
Debe sonar delicado, íntimo, poético y moderno.
Evita clichés como "te amo", "cielo", "estrellas", "eres mi todo".
Usa imágenes concretas y sentimientos suaves, no frases genéricas.
Hazlo bonito de verdad.
Fecha de inspiración: ${hoy}
`.trim();

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`
        },
        body: JSON.stringify({
          model: "HuggingFaceH4/zephyr-7b-beta",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 180,
          temperature: 1.1
        })
      }
    );

    const data = await response.json();

    const texto =
      data?.choices?.[0]?.message?.content ||
      "Hoy la IA se puso tímida y no quiso escribir. Intenta otra vez.";

    poemaEl.textContent = texto.trim();
  } catch (error) {
    poemaEl.textContent =
      "No pude generar el poema. Revisa tu token o la conexión.";
    console.error(error);
  }
}

generarPoema();
