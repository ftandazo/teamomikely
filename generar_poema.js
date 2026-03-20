import fs from "fs";

async function generarPoema() {
  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Escribe un poema romántico en español, de 6 a 10 líneas, profundo y bonito, dedicado a una novia especial."
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("RESPUESTA:", JSON.stringify(data, null, 2));

    let poema = "Hoy te amo incluso cuando falla la IA 💙";

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      poema = data.candidates[0].content.parts[0].text;
    }

    fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

  } catch (error) {

    fs.writeFileSync("poema.json", JSON.stringify({
      poema: "Error… pero igual te amo :3 💙"
    }, null, 2));

  }
}

generarPoema();
