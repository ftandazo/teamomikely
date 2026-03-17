const fs = require("fs");

async function generarPoema() {
  const prompt = `
Escribe un poema corto en español.
Debe ser romántico, íntimo, delicado y único.
Debe sonar humano, joven y sincero.
No uses frases demasiado genéricas.
Que tenga entre 5 y 8 versos.
`;

  const response = await fetch("https://router.huggingface.co/hf-inference/models/google/flan-t5-large, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 180,
        temperature: 0.9,
        return_full_text: false
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error de Hugging Face: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  let poema = "Hoy quise escribirte algo bonito, pero la IA se puso tímida.";

  if (Array.isArray(data) && data[0]?.generated_text) {
    poema = data[0].generated_text.trim();
  }

  fs.writeFileSync(
    "poema.json",
    JSON.stringify({ poema }, null, 2),
    "utf8"
  );

  console.log("Poema guardado en poema.json");
}

generarPoema().catch(err => {
  console.error(err);
  process.exit(1);
});
