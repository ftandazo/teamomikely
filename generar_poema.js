import fs from "fs";

async function generarPoema() {
  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent + process.env.GEMINI_API_KEY,
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
                  text: `Escribe un poema romántico en español, profundo, creativo y único, como si fuera escrito por un adolescente enamorado. No uses frases genéricas. Hazlo emocional y real.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("RESPUESTA:", JSON.stringify(data, null, 2));

    let poema = "Hoy te amo incluso cuando todo falla 💙";

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

    console.log("ERROR:", error);

    fs.writeFileSync("poema.json", JSON.stringify({
      poema: "Error… pero igual te amo :3 💙"
    }, null, 2));

  }
}

generarPoema();
