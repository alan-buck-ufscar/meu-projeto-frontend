import { useLoaderData, useActionData } from 'react-router';
import React, { useState, useEffect, useCallback } from 'react';
import { ProdutoCartao } from './ProdutoCartao';

export const ProdutoComponent: React.FC = () => {
  const dados = useLoaderData() as Produto[];
  const actionData = useActionData();
  const [id, setId] = useState<string>('');
  const [resultado, setResultado] = useState<any>('');

  const handleFiltrar = useCallback(() => {
    if (dados) {
      const itemFiltrado = dados.find(item => String(item.id) === String(id));
      //if ((Number.isNaN(id)) || (id === 0)) {  // Código em branco
      if (id === '') {  // Código em branco
        setResultado(
          <>
          {dados.map(item => (
            ProdutoCartao(item)
          ))}
          </>
        );
      } else if (itemFiltrado) {  // Código válido
        setResultado(
          ProdutoCartao(itemFiltrado)
        );
      } else {  // Código inválido
        setResultado(null);
      }
    } else {
      <p>Carregando...</p>
    }

  },[dados, id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFiltrar();
    }, 500);
    return () => clearTimeout(timeout);
  }, [id, handleFiltrar]);

  return (
    <div>
      <div className='form_container'>
        <h2>Produto</h2>
        {actionData?.success && (
          <p style={{ color: "green" }}>Item adicionado com sucesso!</p>
        )}
        {actionData?.error && (
          <p style={{ color: "red" }}>{actionData.error}</p>
        )}

        <div className='item_input_group'>
          <label htmlFor="meuInput">Código:</label>
          <input
            type='text'
            placeholder='Digite o ID'
            value={id}
            id='meuInput'
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </div>
      <div id="resultado">{resultado}</div>
    </div>
  );
}
