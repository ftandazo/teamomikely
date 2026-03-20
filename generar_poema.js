import fs from "fs";

async function generarPoema(){

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [{
parts: [{
text: "Escribe un poema romántico corto en español, muy bonito, íntimo, profundo, como si fuera para una novia especial. Que sea único."
}]
}]
})
}
);

const data = await response.json();

const poema = data.candidates[0].content.parts[0].text;

fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

}

generarPoema();
