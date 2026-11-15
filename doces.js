import { PRODUCTS, WHATSAPP } from "./data.js";
import "./common.js";

const $ = s => document.querySelector(s);
const money = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* ---------- doces finos ---------- */
function render(filter = "Todos") {
  $("#products").innerHTML = PRODUCTS.filter(p => filter === "Todos" || p.cat === filter).map(p => `
    <a class="product" target="_blank" rel="noopener" draggable="false" title="${p.desc}"
       href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de consultar uma encomenda de " + p.name + ".")}">
      <div class="product-img${p.cut ? " is-cut" : ""}">${p.cut || p.img ? `<img loading="lazy" draggable="false" src="${p.cut || p.img}" alt="${p.name}" onerror="this.remove()">` : ""}</div>
      <div class="product-line"><h3>${p.name}</h3><span>${money(p.price)}</span></div>
      <p>${p.desc}</p>
    </a>`).join("");
  $("#products").scrollLeft = 0;
}

document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("[data-filter]").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
  render(b.dataset.filter);
}));

/* ---------- carrossel: arrastar ---------- */
(() => {
  const track = $("#products"), cursor = $("#drag-cursor");
  let down = false, startX = 0, startLeft = 0, moved = 0;
  track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = 0; startX = e.clientX; startLeft = track.scrollLeft; track.classList.add("dragging"); });
  window.addEventListener("pointerup", () => { down = false; track.classList.remove("dragging"); });
  track.addEventListener("pointermove", e => {
    if (cursor) { const r = track.getBoundingClientRect(); cursor.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`; }
    if (!down) return; const dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx)); track.scrollLeft = startLeft - dx;
  });
  track.addEventListener("click", e => { if (moved > 6) { e.preventDefault(); moved = 0; } }, true);
  track.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") track.parentElement.classList.add("show-cursor"); });
  track.addEventListener("pointerleave", () => track.parentElement.classList.remove("show-cursor"));
})();

render();
