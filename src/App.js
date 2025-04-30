import React, { useEffect, useState } from "react";
import FormularioItem from "./Components/ItemForm";
import ListaProdutos from "./Components/ListaItem";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("lista-compras")) || [];
    setProdutos(produtosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem("lista-compras", JSON.stringify(produtos));
  }, [produtos]);

  const salvarProduto = (produto) => {
    if (produto.id) {
      setProdutos(produtos.map((p) => (p.id === produto.id ? produto : p)));
    } else {
      produto.id = Date.now();
      setProdutos([...produtos, produto]);
    }
    setProdutoEditando(null);
  };

  const excluirProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  const editarProduto = (produto) => {
    setProdutoEditando(produto);
  };

  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1>🛒 Lista de Compras</h1>
        <p>Adicione, edite ou remova seus produtos com facilidade!</p>
      </header>

      <FormularioItem
        aoSalvar={salvarProduto}
        itemParaEditar={produtoEditando}
      />

      <ListaProdutos
        produtos={produtos}
        aoEditar={editarProduto}
        aoExcluir={excluirProduto}
      />
    </div>
  );
}

export default App;
