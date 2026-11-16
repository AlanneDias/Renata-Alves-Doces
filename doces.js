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
    <article class="item${cart.doceQty(p.name) ? " in-cart" : ""}">
      <div class="product-img${p.cut ? " is-cut" : ""}">${p.cut || p.img ? `<img loading="lazy" src="${p.cut || p.img}" alt="${p.name}" onerror="this.remove()">` : ""}</div>
      <div class="product-line"><h3>${p.name}</h3><span>${money(p.price)}</span></div>
      <p>${p.desc}</p>
      <div class="item-action">${qtyControl(p.name)}</div>
    </article>`).join("");
}
$("#products").addEventListener("click", e => {
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
