(function() {
  const iniciarTemaNatal = () => {
    
    // --- PARTE 1: EFEITO DE NEVE ---
    
    // Evita duplicidade (se já tiver neve, não cria de novo)
    if (document.querySelector(".neve-container")) return;

    console.log("❄ [Tema Natal] Iniciando neve e textos... ❄");

    // 1. Cria o container da neve
    const container = document.createElement("div");
    container.classList.add("neve-container");
    document.body.appendChild(container);

    // 2. Configura os flocos
    // Certifique-se que as imagens estão na pasta img/ dentro do tema ou ajuste o caminho abaixo
    const imagens = ["floco1.png", "floco2.png", "floco3.png", "floco4.png", "floco5.png"];
    const caminhoBase = "../temas/flocos-e-sonhos/img/"; 

    // Cria 40 flocos
    for (let i = 0; i < 40; i++) {
      const floco = document.createElement("div");
      floco.classList.add("floco");
      
      const img = imagens[Math.floor(Math.random() * imagens.length)];
      floco.style.backgroundImage = `url('${caminhoBase}${img}')`;
      
      // Posições e tempos aleatórios
      floco.style.left = Math.random() * 100 + "vw";
      floco.style.animationDuration = (Math.random() * 5 + 5) + "s"; // Entre 5s e 10s
      floco.style.animationDelay = (Math.random() * 5) + "s";
      
      const size = Math.random() * 15 + 10; // Tamanho entre 10px e 25px
      floco.style.width = size + "px";
      floco.style.height = size + "px";
      
      container.appendChild(floco);
    }

    // --- PARTE 2: ALTERAÇÃO DE TEXTO (Igual ao sombras-e-petalas) ---

    const bannerTitulo = document.querySelector("#destaque h2");
    const bannerSubtitulo = document.querySelector("#destaque p strong");

    // Verifica se o elemento existe para não dar erro no console
    if (bannerTitulo) {
        bannerTitulo.innerText = "Seja o Papai Noel ou o Tio do Pavê"; 
    } 
    if (bannerSubtitulo) {
        bannerSubtitulo.innerText = "A Flor de Papel tem um livro pra encantar você.";
    }
  };

  // Garante que o HTML carregou antes de rodar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarTemaNatal);
  } else {
    iniciarTemaNatal();
  }
})();