import React, { useState, useEffect } from "react";

function FormularioItem({ aoSalvar, itemParaEditar }) {
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    if (itemParaEditar) {
      setNomeProduto(itemParaEditar.nome);
      setPrecoProduto(itemParaEditar.preco);
      setQuantidadeProduto(itemParaEditar.quantidade);
    }
  }, [itemParaEditar]);

  const aoSubmeterFormulario = (evento) => {
    evento.preventDefault();

    if (!nomeProduto || !precoProduto || !quantidadeProduto) {
      setMensagemErro("Por favor, preencha todos os campos.");
      return;
    }

    const preco = parseFloat(precoProduto);
    const quantidade = parseInt(quantidadeProduto, 10);

    if (preco <= 0 || quantidade <= 0) {
      setMensagemErro("Preço e quantidade devem ser maiores que zero.");
      return;
    }

    setMensagemErro("");

    const item = {
      id: itemParaEditar ? itemParaEditar.id : null,
      nome: nomeProduto,
      preco: preco,
      quantidade: quantidade
    };

    aoSalvar(item);

    setNomeProduto("");
    setPrecoProduto("");
    setQuantidadeProduto("");
  };

  return (
    <form onSubmit={aoSubmeterFormulario} className="mb-4">
      <h2>{itemParaEditar ? "Editar Produto" : "Adicionar Produto"}</h2>

      {mensagemErro && <div className="alert alert-danger">{mensagemErro}</div>}

      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="nomeProduto">Nome do Produto</label>
          <input
            id="nomeProduto"
            className="form-control"
            type="text"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="precoProduto">Preço (R$)</label>
          <input
            id="precoProduto"
            className="form-control"
            type="number"
            step="0.01"
            min="0.01"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="quantidadeProduto">Quantidade</label>
          <input
            id="quantidadeProduto"
            className="form-control"
            type="number"
            min="1"
            value={quantidadeProduto}
            onChange={(e) => setQuantidadeProduto(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" type="submit">
            {itemParaEditar ? "Atualizar" : "Adicionar"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormularioItem;
