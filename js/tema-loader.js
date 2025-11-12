(function() {
  const now = new Date();
  const month = now.getMonth(); // Janeiro = 0
  const day = now.getDate();
  let tema = null;

  // 🌑 Tema Sombras e Pétalas: 25/10 até 07/11
  if ((month === 9 && day >= 25) || (month === 10 && day <= 7)) {
    tema = "sombras-e-petalas";
  }

  // 🎄 Tema de Fim de Ano: 15/12 até 07/01
  if ((month === 11 && day >= 15) || (month === 0 && day <= 7)) {
    tema = "festas";
  }

  // Permite teste manual: ?tema=sombras-e-petalas
  const params = new URLSearchParams(location.search);
  if (params.get("tema")) tema = params.get("tema");

  if (!tema) return; // Nenhum tema ativo

  // Aguarda o DOM antes de aplicar o tema
  document.addEventListener("DOMContentLoaded", () => {
    // Adiciona classe ao body
    document.body.classList.add(`tema-${tema}`);

    // Carrega o CSS do tema
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `../temas/${tema}/css/style.css`;
    link.onload = () => console.log(`Tema "${tema}" carregado com sucesso.`);
    document.head.appendChild(link);

    // Carrega o JS adicional (efeitos)
    const script = document.createElement("script");
    script.src = `../temas/${tema}/js/${tema}.js`;
    script.onload = () => console.log(`Efeitos do tema "${tema}" carregados.`);
    document.body.appendChild(script);
    // Força o CSS do tema a ser o último
    document.head.appendChild(link.cloneNode());

  });
})();
