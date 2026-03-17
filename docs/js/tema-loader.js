(function() {
  // Configuração dos Temas Disponíveis
  const TEMAS = [
    { id: 'padrao', nome: 'Padrão (Claro)', icone: '☀️' },
    { id: 'sombras-e-petalas', nome: 'Sombras e Pétalas', icone: '🥀' },
    { id: 'flocos-e-sonhos', nome: 'Sonhos de Neve', icone: '❄️' }
  ];

  // Função para identificar o tema baseado na data
  function getTemaPorData() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    // 🌑 Halloween: 25/10 a 07/11
    if ((month === 9 && day >= 25) || (month === 10 && day <= 7)) {
      return "sombras-e-petalas";
    }
    // 🎄 Fim de Ano: 15/12 a 07/01
    if ((month === 11 && day >= 15) || (month === 0 && day <= 7)) {
      return "flocos-e-sonhos";
    }
    return null;
  }

  // Função Principal de Carregamento
  function carregarGerenciadorDeTemas() {
    const params = new URLSearchParams(location.search);
    // Prioridade: URL > LocalStorage > Data > Padrão
    let temaAtivo = params.get("tema") || localStorage.getItem("tema_preferido") || getTemaPorData();

    // Se o tema for "padrao", tratamos como null para limpar as classes
    if (temaAtivo === 'padrao') temaAtivo = null;

    aplicarTema(temaAtivo);
    criarWidgetVisual(temaAtivo || 'padrao');
  }

  // Aplica o CSS, JS e Classes no Body
  function aplicarTema(temaId) {
    console.log(`[Tema Loader] Tentando aplicar tema: ${temaId}`);

    // 1. Limpa temas anteriores
    TEMAS.forEach(t => {
      if (t.id !== 'padrao') document.body.classList.remove(`tema-${t.id}`);
    });
    
    // 2. Remove scripts/links de temas antigos para evitar conflitos
    document.querySelectorAll('.elemento-tema-extra').forEach(el => el.remove());

    if (!temaId || temaId === 'padrao') {
      localStorage.setItem("tema_preferido", "padrao");
      return;
    }

    // 3. Ativa o novo tema
    document.body.classList.add(`tema-${temaId}`);
    localStorage.setItem("tema_preferido", temaId);

    // 4. Carrega o CSS do tema
    const link = document.createElement("link");
    link.rel = "stylesheet";
    // Usa timestamp para evitar cache durante o desenvolvimento
    link.href = `../temas/${temaId}/css/style.css?v=${new Date().getTime()}`;
    link.className = "elemento-tema-extra";
    document.head.appendChild(link);

    // 5. Carrega o JS do tema (Efeitos como neve ou pétalas)
    const script = document.createElement("script");
    script.src = `../temas/${temaId}/js/${temaId}.js?v=${new Date().getTime()}`; // Atenção: o nome do arquivo deve ser igual ao ID (festas.js)
    script.className = "elemento-tema-extra";
    
    script.onload = () => console.log(`[Tema Loader] Efeitos de ${temaId} carregados.`);
    script.onerror = () => console.warn(`[Tema Loader] Sem script extra para ${temaId} ou arquivo não encontrado.`);
    
    document.body.appendChild(script);
  }

  // Cria o Botão Flutuante na tela (Widget)
  function criarWidgetVisual(temaInicial) {
    if (document.getElementById('widget-temas')) return;

    // Estilos do Widget
    const style = document.createElement('style');
    style.innerHTML = `
      .widget-temas { position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: sans-serif; }
      .btn-toggle-tema { background: #333; color: #fff; border: 2px solid #fff; border-radius: 50%; width: 50px; height: 50px; font-size: 24px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.3s; display: flex; align-items: center; justify-content: center; }
      .btn-toggle-tema:hover { transform: scale(1.1); }
      .menu-temas { position: absolute; bottom: 60px; right: 0; background: white; border-radius: 8px; padding: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: none; flex-direction: column; gap: 5px; min-width: 180px; }
      .menu-temas.aberto { display: flex; animation: slideUp 0.3s ease; }
      .opcao-tema { background: none; border: none; text-align: left; padding: 8px 12px; cursor: pointer; border-radius: 4px; transition: background 0.2s; display: flex; align-items: center; gap: 8px; font-size: 14px; color: #333; }
      .opcao-tema:hover { background: #f0f0f0; }
      .opcao-tema.ativo { background: #e0e0e0; font-weight: bold; }
      @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'widget-temas';
    container.className = 'widget-temas';

    const menu = document.createElement('div');
    menu.className = 'menu-temas';

    TEMAS.forEach(tema => {
      const btn = document.createElement('button');
      btn.className = `opcao-tema ${tema.id === temaInicial ? 'ativo' : ''}`;
      btn.innerHTML = `<span>${tema.icone}</span> ${tema.nome}`;
      btn.onclick = () => {
        aplicarTema(tema.id);
        menu.classList.remove('aberto');
        document.querySelectorAll('.opcao-tema').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        
        // Reload forçado ao voltar para o padrão para limpar efeitos de JS persistentes (como a neve)
        if(tema.id === 'padrao') location.reload(); 
      };
      menu.appendChild(btn);
    });

    const toggle = document.createElement('button');
    toggle.className = 'btn-toggle-tema';
    toggle.innerHTML = '🎨';
    toggle.title = "Mudar Tema";
    toggle.onclick = () => menu.classList.toggle('aberto');

    container.appendChild(menu);
    container.appendChild(toggle);
    document.body.appendChild(container);

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) menu.classList.remove('aberto');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarGerenciadorDeTemas);
  } else {
    carregarGerenciadorDeTemas();
  }
})();