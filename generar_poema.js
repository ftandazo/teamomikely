import fs from "fs";

async function generarPoema(){

try{

const response = await fetch(
""https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [{
parts: [{
text: `
Escribe un poema romántico en español.

Debe cumplir esto:
- Entre 6 y 10 líneas
- Muy bonito y profundo
- Que suene íntimo y real, no genérico
- Como si estuviera dedicado a una novia muy especial
- Usa metáforas suaves
- Que transmita amor sincero

No lo hagas corto.
Hazlo especial.
`

const data = await response.json();

console.log("RESPUESTA:", JSON.stringify(data, null, 2)); // 👈 clave para debug

let poema = "estas hermosa y si no te e visto hoy, igual se que estas hermosa :3";

if (data.candidates && data.candidates.length > 0) {
  const parts = data.candidates[0].content.parts;

  if (parts && parts.length > 0) {
    poema = parts.map(p => p.text).join("\n");
  }
}
fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

}catch(e){

console.log("ERROR:", e);

fs.writeFileSync("poema.json", JSON.stringify({
poema: "xD, hubo un error, pero igual te amo :3 y mucho"
}, null, 2));

}

}

generarPoema();
