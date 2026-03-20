import fs from "fs";

async function generarPoema() {
  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Escribe un poema romántico en español, de 6 a 10 líneas, bonito, profundo y dedicado a una novia especial."
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("RESPUESTA GEMINI:", JSON.stringify(data, null, 2));

    let poema = "No se pudo generar el poema 💔";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      poema = data.candidates[0].content.parts[0].text;
    }

    fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

  } catch (error) {

    fs.writeFileSync("poema.json", JSON.stringify({
      poema: "estas hermosa y si no te e visto hoy, igual se que estas hermosa :3"
    }, null, 2));
  }
}

generarPoema();
