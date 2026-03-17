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
          inputs: "<|system|>Eres un poeta romántico, profundo y único.<|user|>Escribe un poema corto, íntimo y bonito para mi novia Kely.<|assistant|>",
          parameters: {
            max_new_tokens: 120,
            temperature: 0.9
          }
        })
      }
    );

    const text = await response.text();

    console.log("Respuesta IA:", text);

    let poema = "Hoy pensé en ti, y aunque el mundo haga ruido, tú siempre eres mi calma.";

    // 🔥 LÓGICA INTELIGENTE (clave)
    if (text.includes("generated_text")) {
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          poema = data[0]?.generated_text || poema;
        }
      } catch (e) {
        console.log("JSON inválido, uso fallback");
      }
    } else {
      // 👇 si no es JSON, usa texto directo si parece poema
      if (text && text.length > 50) {
        poema = text;
      }
    }

    fs.writeFileSync(
      "poema.json",
      JSON.stringify({ poema }, null, 2)
    );

    console.log("Poema guardado");

  } catch (error) {
    console.error("ERROR:", error);

    fs.writeFileSync(
      "poema.json",
      JSON.stringify({
        poema: "Hoy la IA falló… pero yo sigo escribiéndote con el corazón."
      }, null, 2)
    );
  }
}

generarPoema();
