// Carrinho compartilhado por todas as páginas (bem-casados + doces finos).
// Fica guardado no navegador da pessoa até ela enviar o pedido.
import { PRODUCTS, WHATSAPP, MIN_DAYS, MIN_QTY } from "./data.js";

const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const DOCE_MIN = 20, STEP = 10;
const KEY = "ra-cart";

const BAG = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 10V7a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const WA = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z"/></svg>';
const X = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

/* ---------- dados ---------- */
let data = { bens: [], doces: {} };
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || "null");
  if (saved) data = { bens: saved.bens || [], doces: saved.doces || {} };
  else { const old = JSON.parse(localStorage.getItem("ra-doces") || "null"); if (old) data.doces = old; }
} catch (e) {}
const listeners = [];
function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} render(); listeners.forEach(f => f()); }
const doce = n => PRODUCTS.find(p => p.name === n);

export const cart = {
  doceQty: name => data.doces[name] || 0,
  setDoce(name, q) { if (q < DOCE_MIN) delete data.doces[name]; else data.doces[name] = q; save(); },
  addBem(item) { data.bens.push({ ...item, id: Date.now() + Math.random().toString(36).slice(2, 6) }); save(); },
  onChange(f) { listeners.push(f); },
  open() { openCart(); },
  DOCE_MIN, STEP,
};

const count = () => data.bens.length + Object.keys(data.doces).length;
const total = () => data.bens.reduce((s, b) => s + b.unit * b.qty, 0) + Object.entries(data.doces).reduce((s, [n, q]) => s + (doce(n)?.price || 0) * q, 0);

/* ---------- interface ---------- */
document.querySelector(".top-actions")?.insertAdjacentHTML("afterbegin",
  `<button type="button" class="cart-btn" id="cart-btn" aria-label="Abrir carrinho" aria-controls="cart">${BAG}<span class="cart-badge" id="cart-badge" hidden>0</span></button>`);
document.body.insertAdjacentHTML("beforeend", `
<div class="cart-shade" id="cart-shade" hidden></div>
<aside class="cart" id="cart" aria-label="Carrinho" hidden>
  <div class="cart-head"><h2>Seu carrinho</h2><button type="button" class="cart-close" id="cart-close" aria-label="Fechar carrinho">${X}</button></div>
  <p class="cart-empty" id="cart-empty">Seu carrinho está vazio. Monte um bem-casado ou escolha doces finos para começar.</p>
  <ul class="cart-list" id="cart-list"></ul>
  <form class="cart-form" id="cart-form" novalidate>
    <label for="cart-date">Data da retirada</label>
    <input id="cart-date" type="date" required>
    <small>Mínimo de 72 h de antecedência · retirada no ateliê</small>
    <div class="cart-sum"><span>Total estimado</span><strong id="cart-total"></strong></div>
    <button class="button" type="submit">${WA} Enviar pedido no WhatsApp</button>
    <p class="cart-note">Confira tudo antes de enviar. O pedido é confirmado mediante sinal de 50%.</p>
  </form>
</aside>`);
const $ = s => document.querySelector(s);

function qtyHTML(kind, key, q, min) {
  return `<div class="qty" role="group" aria-label="Quantidade">
    <button type="button" data-q="${kind}" data-k="${key}" data-d="-${STEP}" aria-label="Menos ${STEP}"${q - STEP < min ? " disabled" : ""}>−</button>
    <span><b>${q}</b> un.</span>
    <button type="button" data-q="${kind}" data-k="${key}" data-d="${STEP}" aria-label="Mais ${STEP}">+</button></div>`;
}

function render() {
  const n = count();
  $("#cart-badge").hidden = !n; $("#cart-badge").textContent = n;
  $("#cart-total").textContent = money(total());
  $("#cart-empty").hidden = !!n; $("#cart-form").hidden = !n;
  const bens = data.bens.map(b => `
    <li class="ci">
      ${b.thumb ? `<img class="ci-img" src="${b.thumb}" alt="">` : `<span class="ci-img"></span>`}
      <div class="ci-info"><strong>Bem-casado · ${b.flavor}</strong>
        <small>Papel ${b.paper} · Fita ${b.ribbon}</small>
        <small>${b.finish} · ${money(b.unit)}/un.</small></div>
      <span class="ci-total">${money(b.unit * b.qty)}</span>
      ${qtyHTML("bem", b.id, b.qty, MIN_QTY)}
      <button type="button" class="remove" data-del="bem" data-k="${b.id}">Remover</button>
    </li>`).join("");
  const doces = Object.entries(data.doces).map(([name, q]) => { const p = doce(name); if (!p) return ""; return `
    <li class="ci">
      ${p.cut || p.img ? `<img class="ci-img is-doce" src="${p.cut || p.img}" alt="">` : `<span class="ci-img"></span>`}
      <div class="ci-info"><strong>${name}</strong><small>Doce fino · ${money(p.price)}/un.</small></div>
      <span class="ci-total">${money(p.price * q)}</span>
      ${qtyHTML("doce", name, q, DOCE_MIN)}
      <button type="button" class="remove" data-del="doce" data-k="${name}">Remover</button>
    </li>`; }).join("");
  $("#cart-list").innerHTML = bens + doces;
}

document.addEventListener("click", e => {
  const q = e.target.closest("[data-q]"), d = e.target.closest("[data-del]");
  if (q) {
    const delta = Number(q.dataset.d);
    if (q.dataset.q === "bem") { const b = data.bens.find(x => x.id === q.dataset.k); if (b) { b.qty = Math.max(MIN_QTY, b.qty + delta); save(); } }
    else cart.setDoce(q.dataset.k, cart.doceQty(q.dataset.k) + delta);
  } else if (d) {
    if (d.dataset.del === "bem") data.bens = data.bens.filter(x => x.id !== d.dataset.k); else delete data.doces[d.dataset.k];
    save();
  }
});

function openCart() { $("#cart").hidden = false; $("#cart-shade").hidden = false; document.body.classList.add("cart-on"); render(); }
function closeCart() { $("#cart").hidden = true; $("#cart-shade").hidden = true; document.body.classList.remove("cart-on"); render(); }
$("#cart-btn")?.addEventListener("click", openCart);
$("#cart-close").addEventListener("click", closeCart);
$("#cart-shade").addEventListener("click", closeCart);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });

const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const minDate = new Date(); minDate.setDate(minDate.getDate() + MIN_DAYS);
$("#cart-date").min = iso(minDate);

$("#cart-form").addEventListener("submit", e => {
  e.preventDefault();
  if (!e.target.reportValidity() || !count()) return;
  const lines = ["Olá, Renata! Gostaria de consultar disponibilidade para este pedido:", ""];
  data.bens.forEach((b, i) => lines.push(
    `*Bem-casado ${data.bens.length > 1 ? i + 1 : ""}*`.replace(" *", "*"),
    `Sabor: ${b.flavor}`, `Papel: ${b.paperCode} (${b.paper})`, `Fita: ${b.ribbonCode}.${b.ribbon}`, `Acabamento: ${b.finish}`,
    `Quantidade: ${b.qty} un. × ${money(b.unit)} = ${money(b.unit * b.qty)}`, ""));
  const ds = Object.entries(data.doces);
  if (ds.length) { lines.push("*Doces finos*"); ds.forEach(([n, q]) => lines.push(`• ${n}: ${q} un. × ${money(doce(n).price)} = ${money(doce(n).price * q)}`)); lines.push(""); }
  lines.push("Retirada desejada: " + $("#cart-date").value.split("-").reverse().join("/"), "Total estimado: " + money(total()), "", "Podemos confirmar valores e disponibilidade?");
  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
});

render();
