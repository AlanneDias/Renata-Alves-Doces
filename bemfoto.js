// Simulação fotográfica do bem-casado.
// Papel e laço são DUAS imagens separadas (assets/paper-square.png e
// assets/ribbon-detail.png). Cada uma é pintada no seu próprio canvas,
// então a cor do laço nunca encosta no papel e vice-versa.
// A pintura preserva luz, sombra e textura da foto original.

const load = src => new Promise((ok, err) => { const i = new Image(); i.onload = () => ok(i); i.onerror = err; i.src = src; });
const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };

// Acabamento de cada material
const FINISH = {
  crepom:     { gamma: 1.6, gloss: 0.25 },  // fosco, valoriza as ruguinhas
  perolado:   { gamma: 1.2,  gloss: 0.55, pearl: 0.12 },
  metalizado: { gamma: 1.9,  gloss: 0.9 },
  cetim:      { gamma: 1.05, gloss: 0.42 },  // brilho contido, sem "efeito molhado"
};

function prepare(img, size) {
  const c = document.createElement("canvas"); c.width = c.height = size;
  const x = c.getContext("2d", { willReadFrequently: true });
  x.drawImage(img, 0, 0, size, size);
  const data = x.getImageData(0, 0, size, size);
  const d = data.data, n = size * size;
  const lum = new Float32Array(n), alpha = new Uint8ClampedArray(n);
  const hist = new Uint32Array(256);
  for (let i = 0; i < n; i++) {
    const L = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
    lum[i] = L; alpha[i] = d[i * 4 + 3];
    if (alpha[i] > 200) hist[L | 0]++;
  }
  // luminância de referência = mediana do material
  let total = 0; for (const h of hist) total += h;
  let acc = 0, ref = 200; for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc >= total / 2) { ref = v; break; } }
  return { size, lum, alpha, ref, out: x.createImageData(size, size), canvas: c, ctx: x };
}

function paint(layer, hex, kind) {
  const f = FINISH[kind] || FINISH.crepom;
  const [r, g, b] = hex2rgb(hex);
  const { lum, alpha, ref, out, ctx, size } = layer, o = out.data, top = 255 / ref - 1;
  // cores muito escuras precisam de um pouco de "ar" para a textura aparecer
  const dark = 1 - Math.max(r, g, b);
  const lift = 0.10 * dark;
  for (let i = 0, n = size * size; i < n; i++) {
    const s = lum[i] / ref;
    let R, G, B;
    if (s <= 1) {
      const k = Math.pow(s, f.gamma);
      R = r * k; G = g * k; B = b * k;
      const l = lift * k; // levanta o meio-tom das cores escuras, mantém as sombras
      R += l; G += l; B += l;
    } else {
      const h = Math.min(1, (s - 1) / top) * f.gloss;
      R = r + (1 - r) * h; G = g + (1 - g) * h; B = b + (1 - b) * h;
    }
    if (f.pearl) { const p = f.pearl * Math.max(0, s - 0.9); R += p * 0.9; G += p * 0.95; B += p; }
    const j = i * 4;
    o[j] = R * 255; o[j + 1] = G * 255; o[j + 2] = B * 255; o[j + 3] = alpha[i];
  }
  ctx.putImageData(out, 0, 0);
}

export async function createBemFoto(canvas, { size = 1024 } = {}) {
  const [paperImg, ribbonImg] = await Promise.all([load("assets/paper-square.png"), load("assets/ribbon-detail.png")]);
  canvas.width = canvas.height = size;
  const view = canvas.getContext("2d");
  const paper = prepare(paperImg, size), ribbon = prepare(ribbonImg, size);

  // sombra do laço sobre o papel: só escurece (cinza neutro), nunca colore
  const shadow = document.createElement("canvas"); shadow.width = shadow.height = size;
  const sx = shadow.getContext("2d");
  sx.drawImage(ribbonImg, 0, 0, size, size);
  sx.globalCompositeOperation = "source-in"; sx.fillStyle = "#000"; sx.fillRect(0, 0, size, size);

  let cur = { paper: "#ffffff", paperKind: "crepom", ribbon: "#ffffff" };
  function compose() {
    view.clearRect(0, 0, size, size);
    // centraliza o doce: na foto original ele fica um pouco à esquerda e abaixo
    view.save();
    view.translate(size * 0.0187, size * -0.0084);
    view.drawImage(paper.canvas, 0, 0);
    // a sombra fica presa dentro do papel
    view.save();
    view.globalCompositeOperation = "source-atop";
    view.globalAlpha = 0.22;
    if ("filter" in view) view.filter = `blur(${size / 170}px)`;
    view.drawImage(shadow, 0, size / 200);
    view.restore();
    view.drawImage(ribbon.canvas, 0, 0);
    drawFinish();
    view.restore();
  }
  // acabamentos desenhados sobre o nó do laço
  const KX = 0.484 * size, KY = 0.345 * size;
  function stone(x, y, r) {
    const g = view.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
    g.addColorStop(0, "#ffffff"); g.addColorStop(0.45, "#e9eef3"); g.addColorStop(0.8, "#a9b2bc"); g.addColorStop(1, "#6f7780");
    view.beginPath(); view.arc(x, y, r, 0, Math.PI * 2); view.fillStyle = g; view.fill();
    view.strokeStyle = "rgba(255,255,255,.9)"; view.lineWidth = r * 0.18;
    view.beginPath(); view.moveTo(x - r * 0.9, y); view.lineTo(x + r * 0.9, y); view.moveTo(x, y - r * 0.9); view.lineTo(x, y + r * 0.9); view.stroke();
  }
  function flower(x, y, r, rot) {
    view.save(); view.translate(x, y); view.rotate(rot);
    view.shadowColor = "rgba(60,30,20,.25)"; view.shadowBlur = r * 0.6; view.shadowOffsetY = r * 0.2;
    for (let i = 0; i < 8; i++) {
      view.rotate(Math.PI / 4);
      const g = view.createLinearGradient(0, 0, 0, -r);
      g.addColorStop(0, "#e8dcc0"); g.addColorStop(1, "#fbf6ea");
      view.beginPath(); view.ellipse(0, -r * 0.55, r * 0.26, r * 0.55, 0, 0, Math.PI * 2); view.fillStyle = g; view.fill();
    }
    view.shadowColor = "transparent";
    const c = view.createRadialGradient(-r * 0.08, -r * 0.08, 0, 0, 0, r * 0.28);
    c.addColorStop(0, "#f3d36b"); c.addColorStop(1, "#c08f2a");
    view.beginPath(); view.arc(0, 0, r * 0.26, 0, Math.PI * 2); view.fillStyle = c; view.fill();
    view.restore();
  }
  function drawFinish() {
    if (cur.finish === "pedraria") {
      // uma única pedra no centro do nó
      view.save(); view.shadowColor = "rgba(40,20,15,.35)"; view.shadowBlur = size * 0.008; view.shadowOffsetY = size * 0.003;
      stone(KX, KY, size * 0.017);
      view.restore();
    } else if (cur.finish === "sempre-vivas") {
      const r = size * 0.03;
      flower(KX - r * 1.1, KY - r * 0.35, r, 0.2);
      flower(KX + r * 1.05, KY - r * 0.5, r * 0.9, 0.7);
      flower(KX, KY + r * 0.55, r * 1.05, 1.1);
    }
  }
  return {
    setPaper(hex, kind) { cur.paper = hex; cur.paperKind = kind; paint(paper, hex, kind); compose(); },
    setFinish(id) { if (cur.finish !== id) { cur.finish = id; compose(); } },
    setRibbon(hex) { cur.ribbon = hex; paint(ribbon, hex, "cetim"); compose(); },
  };
}
