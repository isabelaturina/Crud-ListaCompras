import React, { useEffect, useState } from "react";
import FormularioItem from "./Components/ItemForm";
import ListaProdutos from "./Components/ListaItem";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Estilos personalizados, se houver

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  // Carrega os produtos salvos no LocalStorage ao iniciar o app
  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("lista-compras")) || [];
    setProdutos(produtosSalvos);
  }, []);

  // Atualiza o LocalStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("lista-compras", JSON.stringify(produtos));
  }, [produtos]);

  // Adiciona novo produto ou atualiza existente
  const salvarProduto = (produto) => {
    if (produto.id) {
      setProdutos(produtos.map((p) => (p.id === produto.id ? produto : p)));
    } else {
      produto.id = Date.now(); // Gera um ID único baseado no tempo
      setProdutos([...produtos, produto]);
    }
    setProdutoEditando(null);
  };

  // Remove produto da lista
  const excluirProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  // Prepara produto para edição
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
