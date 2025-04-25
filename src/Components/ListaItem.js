import React from "react";

function ListaProdutos({ produtos, aoEditar, aoExcluir }) {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Nome do Produto</th>
          <th>Preço (R$)</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">Nenhum produto adicionado</td>
          </tr>
        ) : (
          produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.preco.toFixed(2)}</td>
              <td>{produto.quantidade}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => aoEditar(produto)}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => aoExcluir(produto.id)}
                >
                  <i className="fas fa-trash"></i> Excluir
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ListaProdutos;
