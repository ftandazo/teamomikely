const fs = require("fs");

async function generarPoema() {

try {

const response = await fetch(
"https://router.huggingface.co/hf-inference/models/gpt2",
{
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.HF_TOKEN}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: "Escribe un poema romántico corto en español, bonito, íntimo y profundo para una novia especial:",
parameters: {
max_new_tokens: 100,
temperature: 0.9
}
})
}
);

const data = await response.json();

let poema = "Hoy no pude escribirte algo perfecto, pero igual pensé en ti.";

if (Array.isArray(data) && data[0]?.generated_text) {
poema = data[0].generated_text;
}

fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

console.log("Poema generado correctamente");

} catch (error) {

console.error("ERROR:", error);

fs.writeFileSync(
"poema.json",
JSON.stringify({
poema: "Hoy la IA falló, pero yo no dejo de pensar en ti."
}, null, 2)
);

}

}

generarPoema();
