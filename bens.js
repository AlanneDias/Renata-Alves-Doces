import { PAPERS, RIBBONS, FLAVORS, FINISHES, LINHAS, WHATSAPP, MIN_QTY, MIN_DAYS } from "./data.js";
import "./common.js";
import { cart } from "./cart.js";
import { createBemFoto } from "./bemfoto.js";

const $ = s => document.querySelector(s);
const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// estado inicial: papel Rosa (PI) com fita Cabernet (87)
const findPaper = (code, group = "Crepom") => { const g = PAPERS.find(g => g.group === group); const it = g.items.find(i => i[0] === code); return { group: g.group, type: g.type, extra: g.extra, code: it[0], name: it[1], hex: it[2] }; };
const state = {
  paper: findPaper("PI"),
  ribbon: (([code, name, hex]) => ({ code, name, hex }))(RIBBONS.find(r => r[0] === "87")),
  flavor: 0,
  finish: 0,
};

/* ---------- foto ---------- */
let bem = null;
createBemFoto($("#bem-canvas")).then(b => { bem = b; paint(); $("#stage").classList.add("ready"); })
  .catch(() => $("#stage").classList.add("no-photo"));

function paint() {
  if (bem) { bem.setPaper(state.paper.hex, state.paper.type); bem.setRibbon(state.ribbon.hex); bem.setFinish(FINISHES[state.finish].id); }
  $("#code-names").textContent = `Papel ${state.paper.group} ${state.paper.name} · Fita ${state.ribbon.name}`;
  // o que foi escolhido na simulação vai direto para o pedido
  $("#sum-flavor").textContent = FLAVORS[state.flavor].name;
  $("#sum-paper").textContent = `${state.paper.code} · ${state.paper.group} ${state.paper.name}`;
  $("#sum-ribbon").textContent = `${state.ribbon.code} · ${state.ribbon.name}`;
  const f = FINISHES[state.finish];
  $("#sum-finish").textContent = f.name + (f.value ? ` (+ ${money(f.value)}/un.)` : "");
  if (bem) { const m = $("#mini-bem"), x = m.getContext("2d"); x.clearRect(0, 0, m.width, m.height); x.drawImage($("#bem-canvas"), 0, 0, m.width, m.height); }
}

/* ---------- cores ---------- */
const swatch = (hex, label, sel, attrs, cls = "") =>
  `<button type="button" class="sw ${cls}" style="--c:${hex}" aria-label="${label}" title="${label}" aria-pressed="${sel}" ${attrs}></button>`;

$("#papers").innerHTML = PAPERS.map(g => `
  <div class="sw-group">
    <span class="sw-title">${g.group}${g.extra ? ` <em>+ ${money(g.extra)}/un.</em>` : ""}</span>
    <div class="sw-grid">${g.items.map(([code, name, hex]) =>
      swatch(hex, `${g.group} ${code} · ${name}`, g.group === state.paper.group && code === state.paper.code,
        `data-group="${g.group}" data-code="${code}"`, "t-" + g.type)).join("")}</div>
  </div>`).join("");

$("#ribbons").innerHTML = `<div class="sw-group"><span class="sw-title">Cetim</span><div class="sw-grid">${RIBBONS.map(([code, name, hex]) =>
  swatch(hex, `Fita ${code}.${name}`, code === state.ribbon.code, `data-code="${code}"`, "t-cetim")).join("")}</div></div>`;

$("#papers").addEventListener("click", e => {
  const b = e.target.closest(".sw"); if (!b) return;
  state.paper = findPaper(b.dataset.code, b.dataset.group);
  $("#papers").querySelectorAll(".sw").forEach(x => x.setAttribute("aria-pressed", x === b));
  paint(); update();
});
$("#ribbons").addEventListener("click", e => {
  const b = e.target.closest(".sw"); if (!b) return;
  const [code, name, hex] = RIBBONS.find(r => r[0] === b.dataset.code);
  state.ribbon = { code, name, hex };
  $("#ribbons").querySelectorAll(".sw").forEach(x => x.setAttribute("aria-pressed", x === b));
  paint();
});

/* ---------- movimento ---------- */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let moving = !reduce;
const mt = $("#motion-toggle") || document.createElement("button");
function syncMotion() { $("#stage").classList.toggle("paused", !moving); mt.textContent = moving ? "Pausar movimento" : "Movimentar"; mt.setAttribute("aria-pressed", String(!moving)); }
mt.addEventListener("click", () => { moving = !moving; syncMotion(); });
syncMotion();

/* ---------- pedido ---------- */
$("#flavors").innerHTML = FLAVORS.map((f, i) =>
  `<button type="button" class="sabor" data-i="${i}" role="radio" aria-checked="${i === state.flavor}" aria-pressed="${i === state.flavor}">
     <span class="sabor-name">${f.name}</span><span class="sabor-desc">${f.desc}</span><span class="sabor-price">${money(f.price)} <small>/ un.</small></span>
   </button>`).join("");
$("#flavors").addEventListener("click", e => {
  const b = e.target.closest("[data-i]"); if (!b) return;
  state.flavor = +b.dataset.i;
  $("#flavors").querySelectorAll("button").forEach(x => { x.setAttribute("aria-pressed", x === b); x.setAttribute("aria-checked", x === b); });
  paint(); update();
});
// acabamento no mesmo padrão das bolinhas de cor
const FIN_ICON = {
  padrao: `<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M14 14c-3-4-8-5-9-2s4 4 9 2zm0 0c3-4 8-5 9-2s-4 4-9 2zm0 0-4 8m4-8 4 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="14" r="1.8" fill="currentColor"/></svg>`,
  pedraria: `<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M9 11h10l3 3-8 8-8-8z M9 11l5 11 5-11 M6 14h16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  "sempre-vivas": `<svg viewBox="0 0 28 28" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.4">${[0,60,120,180,240,300].map(a => `<ellipse cx="14" cy="8.6" rx="2.6" ry="4.4" transform="rotate(${a} 14 14)"/>`).join("")}</g><circle cx="14" cy="14" r="2" fill="currentColor"/></svg>`,
};
$("#finishes").innerHTML = `<div class="sw-group"><span class="sw-title" id="finish-name"></span><div class="sw-grid">${FINISHES.map((f, i) =>
  `<button type="button" class="sw sw-finish" data-i="${i}" aria-pressed="${i === state.finish}" aria-label="${f.label}" title="${f.label}">${FIN_ICON[f.id]}</button>`).join("")}</div></div>`;
function finishName() { const f = FINISHES[state.finish]; $("#finish-name").textContent = f.name + (f.value ? ` + ${money(f.value)}/un.` : " · incluso"); }
finishName();
$("#finishes").addEventListener("click", e => {
  const b = e.target.closest("[data-i]"); if (!b) return;
  state.finish = +b.dataset.i;
  $("#finishes").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
  finishName(); paint(); update();
});
$("#qty").min = MIN_QTY; $("#qty").value = MIN_QTY;
$("#qty").addEventListener("input", update);


function unit() { return FLAVORS[state.flavor].price + FINISHES[state.finish].value + (state.paper.extra || 0); }
function update() {
  const q = Number($("#qty").value);
  $("#unit").textContent = money(unit()) + " / unidade";
  $("#total").textContent = Number.isInteger(q) && q >= MIN_QTY ? money(unit() * q) : `Mínimo de ${MIN_QTY} unidades`;
}

$("#config").addEventListener("submit", e => {
  e.preventDefault();
  if (!e.target.reportValidity()) return;
  const q = Number($("#qty").value);
  const m = $("#mini-bem"), t = document.createElement("canvas"); t.width = t.height = 120;
  try { t.getContext("2d").drawImage(m, 0, 0, 120, 120); } catch (err) {}
  let thumb = ""; try { thumb = t.toDataURL("image/webp", 0.8); } catch (err) {}
  cart.addBem({
    flavor: FLAVORS[state.flavor].name,
    paper: `${state.paper.group} ${state.paper.name}`, paperCode: state.paper.code,
    ribbon: state.ribbon.name, ribbonCode: state.ribbon.code,
    finish: FINISHES[state.finish].name + (state.paper.extra ? ` + papel ${state.paper.group}` : ""),
    unit: unit(), qty: q, thumb,
  });
  cart.open();
});

/* ---------- bens ---------- */
$("#linhas").innerHTML = LINHAS.map(l => `
  <article class="linha">
    <img loading="lazy" src="${l.img}" alt="" onerror="this.remove()">
    <div class="linha-text"><h3>${l.name}</h3><p>${l.desc}</p></div>
  </article>`).join("");
(() => {
  const t = $("#linhas"), step = () => t.querySelector(".linha").offsetWidth + 16;
  document.querySelector(".slide-btn.prev").addEventListener("click", () => t.scrollBy({ left: -step(), behavior: "smooth" }));
  document.querySelector(".slide-btn.next").addEventListener("click", () => t.scrollBy({ left: step(), behavior: "smooth" }));
  // passa sozinho; pausa enquanto a pessoa toca ou passa o mouse
  let paused = false, timer;
  const next = () => {
    if (paused || document.hidden) return;
    const end = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
    t.scrollTo({ left: end ? 0 : t.scrollLeft + step(), behavior: "smooth" });
  };
  const start = () => { clearInterval(timer); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(next, 3500); };
  ["pointerenter", "touchstart", "focusin"].forEach(ev => t.addEventListener(ev, () => { paused = true; }, { passive: true }));
  ["pointerleave", "touchend", "focusout"].forEach(ev => t.addEventListener(ev, () => { paused = false; start(); }, { passive: true }));
  start();
})();


paint(); update();
