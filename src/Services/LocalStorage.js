const salvarLocalStorage = (itens) => {
    localStorage.setItem("lista-compras", JSON.stringify(itens));
  };
  
  const carregarLocalStorage = () => {
    const dados = localStorage.getItem("lista-compras");
    return dados ? JSON.parse(dados) : [];
  };
  