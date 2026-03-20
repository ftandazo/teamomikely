import fs from "fs";

async function generarPoema() {
  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
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
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("RESPUESTA:", JSON.stringify(data, null, 2));

    let poema = "Hoy te amo incluso cuando la tecnología se rompe 💙";

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      poema = data.candidates[0].content.parts[0].text;
    }

    fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

  } catch (error) {

    console.log("ERROR:", error);

    fs.writeFileSync("poema.json", JSON.stringify({
      poema: "Hubo un error… pero igual te amo más que ayer 💙"
    }, null, 2));

  }
}

generarPoema();
