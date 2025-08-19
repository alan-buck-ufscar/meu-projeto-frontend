import { useLoaderData, useActionData } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

export const ProdutoComponent: React.FC = () => {
  const dados = useLoaderData() as Produto[];
  const actionData = useActionData();
  const [id, setId] = useState<number>(0);
  const [resultado, setResultado] = useState<any>('');

  const exibirItem = (item: Produto) => {
    return (
      <div key={item.id} className='item_caixa'>
        <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
        <div>
          <p className='item_titulo'>({item.id}) {item.name}</p>
          <p>{item.category}</p>
          <p>R${item.price}</p>
        </div>
      </div>
    )
  }

  const handleFiltrar = useCallback(() => {
    if (dados) {
      const itemFiltrado = dados.find(item => item.id === id);
      if ((Number.isNaN(id)) || (id === 0)) {  // Código em branco
        setResultado(
          <>
          {dados.map(item => (
            exibirItem(item)
          ))}
          </>
        );
      } else if (itemFiltrado) {  // Código válido
        setResultado(
          exibirItem(itemFiltrado)
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
            type="number"
            placeholder="Digite o ID"
            value={id}
            id='meuInput'
            onChange={(e) => setId(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div id="resultado">{resultado}</div>
    </div>
  );
}
