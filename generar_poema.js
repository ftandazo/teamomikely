import fs from "fs";

async function generarPoema() {

  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.GEMINI_API_KEY
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
                  text: `Escribe un poema romántico en español.

Debe cumplir:
- Entre 6 y 10 líneas
- Muy bonito y profundo
- Íntimo y sincero
- No genérico
- Como si fuera para una novia muy especial
- Usa metáforas suaves
- Que transmita amor real`
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
      data.candidates[0].content.parts
    ) {
      const parts = data.candidates[0].content.parts;

      if (parts.length > 0) {
        poema = parts.map(p => p.text).join("\n");
      }
    }

    fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

  } catch (e) {

    console.log("ERROR:", e);

    fs.writeFileSync(
      "poema.json",
      JSON.stringify(
        { poema: "Error generando poema 😢 pero igual te amo :3" },
        null,
        2
      )
    );
  }
}

generarPoema();
