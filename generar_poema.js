const fs = require("fs");

async function generarPoema() {

try {

const response = await fetch(
"https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta",
{
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.HF_TOKEN}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: "<|system|>Eres un escritor romántico experto.<|user|>Escribe un poema corto en español, íntimo, profundo y bonito para una novia especial.<|assistant|>",
parameters: {
max_new_tokens: 120,
temperature: 0.9
}
})
}
);

let poema = "Hoy pensé en ti, aunque la IA se quedó en silencio.";

const text = await response.text();

try {
  const data = JSON.parse(text);

  if (Array.isArray(data) && data[0]?.generated_text) {
    poema = data[0].generated_text.trim();
  }

} catch (e) {
  console.log("Respuesta no JSON, usando fallback");
}

let poema = "Hoy pensé en ti, aunque la IA se quedó sin palabras.";

if (Array.isArray(data) && data[0]?.generated_text) {
poema = data[0].generated_text.trim();
}

fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

console.log("Poema generado");

} catch (error) {

console.error("ERROR:", error);

fs.writeFileSync("poema.json", JSON.stringify({
poema: "Hoy la IA falló, pero yo no dejo de pensar en ti."
}, null, 2));

}

}

generarPoema();
