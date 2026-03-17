const fs = require("fs");

async function generarPoema() {

  try {

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: "<|system|>Eres un poeta romántico, profundo, íntimo y único.<|user|>Escribe un poema corto para mi novia Kely, que sea emocional, bonito y original.<|assistant|>",
          parameters: {
            max_new_tokens: 120,
            temperature: 0.9
          }
        })
      }
    );

    const text = await response.text();

    console.log("Respuesta IA:", text); // 👀 DEBUG

    let poema = "Hoy pensé en ti, y aunque el mundo haga ruido, tú siempre eres mi calma.";

    try {
      const data = JSON.parse(text);

      if (Array.isArray(data)) {
        poema = data[0]?.generated_text || poema;
      } else if (data.generated_text) {
        poema = data.generated_text;
      }

    } catch (e) {
      console.log("No vino JSON limpio, usando fallback");
    }

    fs.writeFileSync(
      "poema.json",
      JSON.stringify({ poema }, null, 2)
    );

    console.log("Poema generado correctamente");

  } catch (error) {

    console.error("ERROR:", error);

    fs.writeFileSync(
      "poema.json",
      JSON.stringify({
        poema: "Hoy la IA falló… pero yo no dejo de pensar en ti."
      }, null, 2)
    );

  }

}

generarPoema();
