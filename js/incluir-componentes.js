document.addEventListener("DOMContentLoaded", () => {
  const carregarComponente = (seletor, arquivo) => {
    fetch(arquivo)
      .then(res => res.text())
      .then(html => {
        document.querySelector(seletor).innerHTML = html;
      });
  };

  carregarComponente("header", "../componentes/header.html");
  carregarComponente("footer", "../componentes/footer.html");
});
