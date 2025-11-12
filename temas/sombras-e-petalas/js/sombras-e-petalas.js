document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.classList.add("petalas-container");
  document.body.appendChild(container);

  for (let i = 0; i < 20; i++) {
    const petala = document.createElement("div");
    petala.classList.add("petala");
    petala.style.left = Math.random() * 100 + "vw";
    petala.style.animationDelay = Math.random() * 10 + "s";
    petala.style.animationDuration = 8 + Math.random() * 5 + "s";
    container.appendChild(petala);
  }

  // Frase poética opcional no topo
  const banner = document.createElement("div");
  banner.innerText = "Entre sombras e pétalas, a arte floresce no silêncio.";
  banner.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(25, 15, 35, 0.9);
    color: #e4d0ff;
    text-align: center;
    padding: 6px 0;
    font-family: 'Cinzel', serif;
    letter-spacing: 1px;
    font-size: 1em;
    z-index: 10;
    border-bottom: 1px solid rgba(180,130,255,0.2);
  `;
  document.body.prepend(banner);
});
