import fs from "fs";

async function generarPoema() {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
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
                  text: `Escribe un poema romántico en español para una novia muy especial.

Reglas:
- Entre 6 y 10 líneas
- Íntimo, bonito y profundo
- Nada genérico
- Con imágenes suaves y emocionales
- Que suene joven y sincero
- No pongas título`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("RESPUESTA:", JSON.stringify(data, null, 2));

    let poema = "No se pudo generar el poema 💔";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      poema = data.candidates[0].content.parts
        .map(part => part.text || "")
        .join("\n")
        .trim();
    }

    fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));
  } catch (error) {
    console.log("ERROR:", error);
    fs.writeFileSync(
      "poema.json",
      JSON.stringify({ poema: "Error… pero igual te amo :3 💙" }, null, 2)
    );
  }
}

generarPoema();
