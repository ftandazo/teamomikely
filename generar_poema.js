import fs from "fs";

async function generarPoema() {

const prompt = `
Escribe un poema corto en español.
Debe ser romántico, delicado y profundo.
Que suene joven y sincero.
Que no sea genérico.
Que tenga entre 5 y 8 líneas.
Que sea único.
`;

const response = await fetch("https://api.openai.com/v1/responses", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4.1-mini",
input: prompt
})
});

const data = await response.json();

const poema = data.output[0].content[0].text;

fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

}

generarPoema();
