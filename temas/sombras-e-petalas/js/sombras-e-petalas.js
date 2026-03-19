(function() {
  const iniciarEfeitos = () => {
    // 1. Evita duplicidade
    if (document.querySelector(".petalas-container")) return;

    console.log("[Tema Sombras] Iniciando efeitos visuais...");

    // 2. Cria pétalas
    const container = document.createElement("div");
    container.classList.add("petalas-container");
    document.body.appendChild(container);

    for (let i = 0; i < 25; i++) {
      const petala = document.createElement("div");
      petala.classList.add("petala");
      petala.style.left = Math.random() * 100 + "vw";
      petala.style.animationDelay = Math.random() * 10 + "s";
      petala.style.animationDuration = 6 + Math.random() * 6 + "s";
      container.appendChild(petala);
    }

    // 3. Trocar Texto do Banner Principal
    const bannerTitulo = document.querySelector("#destaque h2");
    const bannerSubtitulo = document.querySelector("#destaque p strong");

    // Verifica se os elementos existem antes de tentar trocar (evita erro em outras páginas)
    if (bannerTitulo) {
        bannerTitulo.innerText = "Não importa sua idade ou seu ritmo de leitura.";
    }
    
    if (bannerSubtitulo) {
        bannerSubtitulo.innerText = "A Flor de Papel tem um livro para assustar você.";
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarEfeitos);
  } else {
    iniciarEfeitos();
  }
})();