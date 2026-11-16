import { PRODUCTS } from "./data.js";
import "./common.js";
import { cart } from "./cart.js";

const $ = s => document.querySelector(s);
const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const { DOCE_MIN: MIN, STEP } = cart;

function qtyControl(name) {
  const q = cart.doceQty(name);
  if (!q) return `<button type="button" class="add" data-add="${name}">Adicionar <span>+ ${MIN} un.</span></button>`;
  return `<div class="qty" role="group" aria-label="Quantidade de ${name}">
    <button type="button" data-dec="${name}" aria-label="Menos ${STEP}">−</button>
    <span><b>${q}</b> un.</span>
    <button type="button" data-inc="${name}" aria-label="Mais ${STEP}">+</button></div>`;
}

let filter = "Todos";
function render() {
  $("#products").innerHTML = PRODUCTS.filter(p => filter === "Todos" || p.cat === filter).map(p => `
    <article class="item${cart.doceQty(p.name) ? " in-cart" : ""}" data-name="${p.name}">
      <div class="product-img${p.cut ? " is-cut" : ""}">${p.cut || p.img ? `<img loading="lazy" src="${p.cut || p.img}" alt="${p.name}" onerror="this.remove()">` : ""}</div>
      <div class="product-line"><h3>${p.name}</h3><span>${money(p.price)}</span></div>
      <p>${p.desc}</p>
      <div class="item-action">${qtyControl(p.name)}</div>
    </article>`).join("");
}
$("#products").addEventListener("click", e => {
  const img = e.target.closest(".product-img");
  if (img) { openZoom(img.closest(".item").dataset.name); return; }
  const t = e.target.closest("[data-add],[data-inc],[data-dec]"); if (!t) return;
  if (t.dataset.add) cart.setDoce(t.dataset.add, MIN);
  else if (t.dataset.inc) cart.setDoce(t.dataset.inc, cart.doceQty(t.dataset.inc) + STEP);
  else if (t.dataset.dec) cart.setDoce(t.dataset.dec, cart.doceQty(t.dataset.dec) - STEP);
});
cart.onChange(render);

document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("[data-filter]").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
  filter = b.dataset.filter; render();
}));

render();

/* ---------- zoom: o doce gira ampliado ---------- */
document.body.insertAdjacentHTML("beforeend", `
<div class="zoom" id="zoom" hidden role="dialog" aria-modal="true" aria-labelledby="zoom-name">
  <button type="button" class="zoom-close" id="zoom-close" aria-label="Fechar"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
  <div class="zoom-stage"><span class="zoom-shadow"></span><img id="zoom-img" alt=""></div>
  <div class="zoom-info">
    <h2 id="zoom-name"></h2><p id="zoom-desc"></p>
    <div class="zoom-line"><strong id="zoom-price"></strong><div id="zoom-action"></div></div>
  </div>
</div>`);
let zoomName = null;
function zoomAction() { $("#zoom-action").innerHTML = qtyControl(zoomName); }
function openZoom(name) {
  const p = PRODUCTS.find(x => x.name === name); if (!p) return;
  zoomName = name;
  $("#zoom-img").src = p.cut || p.img; $("#zoom-img").classList.toggle("is-photo", !p.cut);
  $("#zoom-name").textContent = p.name; $("#zoom-desc").textContent = p.desc; $("#zoom-price").textContent = money(p.price) + " / un.";
  zoomAction(); $("#zoom").hidden = false; document.body.classList.add("zoom-on");
  requestAnimationFrame(() => $("#zoom").classList.add("open"));
}
function closeZoom() { $("#zoom").classList.remove("open"); document.body.classList.remove("zoom-on"); setTimeout(() => { $("#zoom").hidden = true; }, 250); zoomName = null; }
$("#zoom-close").addEventListener("click", closeZoom);
$("#zoom").addEventListener("click", e => {
  if (e.target.id === "zoom") return closeZoom();
  const t = e.target.closest("[data-add],[data-inc],[data-dec]"); if (!t) return;
  if (t.dataset.add) cart.setDoce(t.dataset.add, MIN);
  else if (t.dataset.inc) cart.setDoce(t.dataset.inc, cart.doceQty(t.dataset.inc) + STEP);
  else if (t.dataset.dec) cart.setDoce(t.dataset.dec, cart.doceQty(t.dataset.dec) - STEP);
});
cart.onChange(() => { if (zoomName) zoomAction(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && zoomName) closeZoom(); });
