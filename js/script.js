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

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
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
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
