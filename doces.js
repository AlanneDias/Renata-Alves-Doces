import { PRODUCTS, WHATSAPP, MIN_DAYS } from "./data.js";
import "./common.js";

const $ = s => document.querySelector(s);
const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const MIN = 40, STEP = 10; // mínimo de 40 unidades por sabor

/* ---------- pedido (fica guardado neste navegador) ---------- */
let cart = {};
try { cart = JSON.parse(localStorage.getItem("ra-doces") || "{}") || {}; } catch (e) { cart = {}; }
const save = () => { try { localStorage.setItem("ra-doces", JSON.stringify(cart)); } catch (e) {} };
const byName = n => PRODUCTS.find(p => p.name === n);

function qtyControl(name) {
  const q = cart[name];
  if (!q) return `<button type="button" class="add" data-add="${name}">Adicionar <span>+ ${MIN} un.</span></button>`;
  return `<div class="qty" role="group" aria-label="Quantidade de ${name}">
    <button type="button" data-dec="${name}" aria-label="Menos ${STEP}">−</button>
    <span><b>${q}</b> un.</span>
    <button type="button" data-inc="${name}" aria-label="Mais ${STEP}">+</button></div>`;
}

let filter = "Todos";
function render() {
  $("#products").innerHTML = PRODUCTS.filter(p => filter === "Todos" || p.cat === filter).map(p => `
    <article class="item${cart[p.name] ? " in-cart" : ""}">
      <div class="product-img${p.cut ? " is-cut" : ""}">${p.cut || p.img ? `<img loading="lazy" src="${p.cut || p.img}" alt="${p.name}" onerror="this.remove()">` : ""}</div>
      <div class="product-line"><h3>${p.name}</h3><span>${money(p.price)}</span></div>
      <p>${p.desc}</p>
      <div class="item-action">${qtyControl(p.name)}</div>
    </article>`).join("");
}

function renderCart() {
  const names = Object.keys(cart);
  const total = names.reduce((s, n) => s + cart[n] * byName(n).price, 0);
  const units = names.reduce((s, n) => s + cart[n], 0);
  $("#cart-bar").hidden = names.length === 0;
  if (!names.length) closeCart();
  $("#cart-count").textContent = `${names.length} ${names.length === 1 ? "sabor" : "sabores"} · ${units} un.`;
  $("#cart-total-bar").textContent = money(total);
  $("#cart-total").textContent = money(total);
  $("#cart-list").innerHTML = names.map(n => `
    <li><div><strong>${n}</strong><small>${money(byName(n).price)} / un.</small></div>
      ${qtyControl(n)}
      <span class="line-total">${money(cart[n] * byName(n).price)}</span>
      <button type="button" class="remove" data-del="${n}" aria-label="Remover ${n}">Remover</button></li>`).join("");
}

function change(name, delta) {
  const q = (cart[name] || 0) + delta;
  if (q < MIN) delete cart[name]; else cart[name] = q;
  save(); render(); renderCart();
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-add],[data-inc],[data-dec],[data-del]"); if (!t) return;
  if (t.dataset.add) change(t.dataset.add, MIN);
  else if (t.dataset.inc) change(t.dataset.inc, STEP);
  else if (t.dataset.dec) change(t.dataset.dec, -STEP);
  else if (t.dataset.del) { delete cart[t.dataset.del]; save(); render(); renderCart(); }
});

document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("[data-filter]").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
  filter = b.dataset.filter; render();
}));

/* ---------- abrir / fechar o pedido ---------- */
function openCart() { $("#cart").hidden = false; document.body.classList.add("cart-on"); $("#cart-open").setAttribute("aria-expanded", "true"); }
function closeCart() { $("#cart").hidden = true; document.body.classList.remove("cart-on"); $("#cart-open").setAttribute("aria-expanded", "false"); }
$("#cart-open").addEventListener("click", openCart);
$("#cart-close").addEventListener("click", closeCart);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });

/* ---------- data e envio ---------- */
const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const minDate = new Date(); minDate.setDate(minDate.getDate() + MIN_DAYS);
$("#cart-date").min = iso(minDate);

$("#cart-form").addEventListener("submit", e => {
  e.preventDefault();
  if (!e.target.reportValidity()) return;
  const names = Object.keys(cart); if (!names.length) return;
  const total = names.reduce((s, n) => s + cart[n] * byName(n).price, 0);
  const lines = [
    "Olá, Renata! Gostaria de consultar disponibilidade para estes doces finos:",
    ...names.map(n => `• ${n}: ${cart[n]} un. × ${money(byName(n).price)} = ${money(cart[n] * byName(n).price)}`),
    "Retirada desejada: " + $("#cart-date").value.split("-").reverse().join("/"),
    "Total estimado: " + money(total),
    "Podemos confirmar valores e disponibilidade?",
  ];
  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
});

render(); renderCart();
