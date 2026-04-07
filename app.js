const btn = document.getElementById("btn");
const textoBtn = document.getElementById("textoBtn");
const loader = document.getElementById("loader");
const resultado = document.getElementById("resultado");
const recomendacion = document.getElementById("recomendacion");
const textoFinal = document.getElementById("textoFinal");
const copiar = document.getElementById("copiar");
const reset = document.getElementById("reset");
const riesgo = document.getElementById("riesgo");
const consejo = document.getElementById("consejo");
const otro = document.getElementById("otro");

let ultimoMensaje = "";
let ultimoNombre = "";

btn.addEventListener("click", decidir);
reset.addEventListener("click", () => location.reload());

otro.addEventListener("click", () => {
  textoFinal.innerText = analizarMensaje(ultimoNombre, ultimoMensaje);
});

copiar.addEventListener("click", () => {
  navigator.clipboard.writeText(textoFinal.innerText);
  copiar.innerText = "✅ Copiado!";
});

function decidir() {
  const nombre = document.getElementById("nombre").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim().toLowerCase();

  if (!mensaje) {
    resultado.innerText = "⚠️ Escribe algo primero 😅";
    return;
  }

  ultimoMensaje = mensaje;
  ultimoNombre = nombre;

  textoBtn.innerText = "Analizando...";
  loader.classList.remove("oculto");

  setTimeout(() => {

    loader.classList.add("oculto");
    textoBtn.innerText = "Analizar 🔥";

    const decision = generarDecision(mensaje);
    const sugerencia = analizarMensaje(nombre, mensaje);
    const nivel = calcularRiesgo(mensaje);
    const tip = darConsejo(nivel);

    resultado.innerText = decision;
    textoFinal.innerText = sugerencia;
    riesgo.innerText = "⚠️ Nivel de riesgo: " + nivel;
    consejo.innerText = tip;

    recomendacion.classList.remove("oculto");
    riesgo.classList.remove("oculto");
    consejo.classList.remove("oculto");
    reset.classList.remove("oculto");

  }, 1500);
}

function generarDecision(mensaje) {
  if (mensaje.includes("ex")) return "💀 No le escribas";
  if (mensaje.includes("me ignora") && mensaje.includes("me gusta")) return "😬 Cuidado, vas a sufrir";
  if (mensaje.includes("me gusta")) return "🔥 Escríbele";
  if (mensaje.includes("foto") || mensaje.includes("historia")) return "😏 Tienes excusa, hazlo";

  const opciones = ["🔥 Escríbele", "😬 Espera", "💀 No", "😏 Hazlo con estilo"];
  return opciones[Math.floor(Math.random() * opciones.length)];
}

function calcularRiesgo(mensaje) {
  if (mensaje.includes("ex") || mensaje.includes("toxica")) return "ALTO";
  if (mensaje.includes("ignora")) return "MEDIO";
  return "BAJO";
}

function darConsejo(nivel) {
  if (nivel === "ALTO") return "Mejor protege tu paz 😶";
  if (nivel === "MEDIO") return "No te ilusiones demasiado";
  return "Relájate y sé tú 😎";
}

function analizarMensaje(nombre, mensaje) {

  const n = nombre ? nombre : "";

  const inicios = ["Hola", "Hey", "Ey", "Oye"];
  const medios = [
    "pensé en escribirte",
    "me acordé de ti",
    "no pude evitar hablarte"
  ];
  const finales = [
    "¿cómo estás?",
    "solo quería saludarte 😌",
    "porque sí 😅"
  ];

  const inicio = inicios[Math.floor(Math.random() * inicios.length)];
  const medio = medios[Math.floor(Math.random() * medios.length)];
  const final = finales[Math.floor(Math.random() * finales.length)];

  if (n) {
    return `${inicio} ${n}, ${medio}… ${final}`;
  } else {
    return `${inicio}, ${medio}… ${final}`;
  }
}