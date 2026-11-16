// comum a todas as páginas: menu do celular e altura do cabeçalho
const $ = s => document.querySelector(s);
/* ---------- menu (celular) ---------- */
const menuBtn = $(".menu-btn");
menuBtn.addEventListener("click", () => { const open = document.body.classList.toggle("menu-open"); menuBtn.setAttribute("aria-expanded", open); });
$("#menu").addEventListener("click", e => { if (e.target.closest("a")) { document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); } });

/* altura do cabeçalho para o bem-casado "grudar" logo abaixo dele */
const setHeaderH = () => document.documentElement.style.setProperty("--header-h", $(".top").offsetHeight + "px");
setHeaderH(); addEventListener("resize", setHeaderH);

/* fecha o menu lateral ao tocar fora dele ou apertar Esc */
document.addEventListener("click", e => {
  if (!document.body.classList.contains("menu-open")) return;
  if (e.target.closest("#menu") || e.target.closest(".menu-btn")) return;
  document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false");
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); } });
