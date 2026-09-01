document.getElementById("year").textContent = new Date().getFullYear();

const lines = [
  { prompt: "kewin@dev", cmd: "whoami" },
  { out: "Kewin Cauê — dev full-stack" },
  { prompt: "kewin@dev", cmd: "cat historico.txt" },
  { out: "2020 → HTML, CSS, JS puro, sozinho" },
  { out: "2026 → produtos completos com Claude Code" },
  { prompt: "kewin@dev", cmd: "ls projetos-com-ia/" },
  { out: "safesst  inventario-nr33  mycut.ai  lotuz-scout" },
  { out: "painel-financeiro  memoir  lari  wintech ..." },
  { prompt: "kewin@dev", cmd: "echo $STATUS" },
  { out: "disponível para novos projetos ✓" },
];

const body = document.getElementById("terminal-body");
let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex >= lines.length) {
    setTimeout(() => {
      body.textContent = "";
      lineIndex = 0;
      charIndex = 0;
      typeLine();
    }, 3200);
    return;
  }

  const line = lines[lineIndex];

  if (line.prompt) {
    const full = `${line.prompt} % ${line.cmd}`;
    if (charIndex === 0) {
      const promptSpan = document.createElement("span");
      promptSpan.className = "t-prompt";
      promptSpan.textContent = "";
      body.appendChild(promptSpan);
    }
    const lastSpan = body.lastElementChild;
    if (charIndex < full.length) {
      lastSpan.textContent = full.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeLine, 28 + Math.random() * 35);
      return;
    }
    body.appendChild(document.createElement("br"));
    lineIndex++;
    charIndex = 0;
    setTimeout(typeLine, 220);
    return;
  }

  const outSpan = document.createElement("span");
  outSpan.className = "t-muted";
  outSpan.textContent = line.out;
  body.appendChild(outSpan);
  body.appendChild(document.createElement("br"));
  body.appendChild(document.createElement("br"));
  lineIndex++;
  setTimeout(typeLine, 260);
}

if (body) typeLine();

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let gallery = [];
let galleryIndex = 0;

function showImage(index) {
  galleryIndex = (index + gallery.length) % gallery.length;
  const img = gallery[galleryIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || "";
  const multi = gallery.length > 1;
  lightboxPrev.classList.toggle("is-visible", multi);
  lightboxNext.classList.toggle("is-visible", multi);
}

function openLightbox(clickedImg) {
  const container = clickedImg.closest(".card__media, .project-row__media");
  gallery = container ? Array.from(container.querySelectorAll("img")) : [clickedImg];
  showImage(gallery.indexOf(clickedImg));
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".card__media img, .project-row__media img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", (e) => { e.stopPropagation(); showImage(galleryIndex - 1); });
lightboxNext.addEventListener("click", (e) => { e.stopPropagation(); showImage(galleryIndex + 1); });
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(galleryIndex - 1);
  if (e.key === "ArrowRight") showImage(galleryIndex + 1);
});
