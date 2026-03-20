import fs from "fs";

async function generarPoema() {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
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
                  text: "Escribe un poema romántico en español, bonito y corto."
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    let poema = "Hoy te amo más que ayer 💙";

    if (data.candidates && data.candidates[0]) {
      poema = data.candidates[0].content.parts[0].text;
    }

    fs.writeFileSync("poema.json", JSON.stringify({ poema }, null, 2));

  } catch (error) {
    fs.writeFileSync("poema.json", JSON.stringify({
      poema: "Error pero igual te amo :3"
    }, null, 2));
  }
}

generarPoema();
