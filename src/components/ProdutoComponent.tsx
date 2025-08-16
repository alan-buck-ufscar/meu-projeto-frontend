import { useLoaderData, useActionData } from 'react-router-dom';
import React, { useState } from 'react';

export const ProdutoComponent: React.FC = () => {
  const dados = useLoaderData() as Produto[];
  const actionData = useActionData();
  const [id, setId] = useState<number>(0);
  const [resultado, setResultado] = useState<any>('');

  const handleFiltrar = () => {
    console.log(dados);
    const itemFiltrado = dados.find(item => item.id === id);
    if ((Number.isNaN(id)) || (id === 0)) {  // Código em branco
      setResultado(
        <>
        {dados.map(item => (
          <div key={item.id} className='item_caixa'>
            <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
            <div>
              <p className='item_titulo'>({item.id}) {item.name}</p>
              <p>{item.category}</p>
              <p>R${item.price}</p>
            </div>
          </div>
        ))}
        </>
      );
    } else if (itemFiltrado) {  // Código válido
      setResultado(
        <div key={itemFiltrado.id} className='item_caixa'>
          <img src={itemFiltrado.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
          <div>
            <p className='item_titulo'>({itemFiltrado.id}) {itemFiltrado.name}</p>
            <p>{itemFiltrado.category}</p>
            <p>R${itemFiltrado.price}</p>
          </div>
        </div>
      );
    } else {  // Código inválido
      setResultado(null);
    }
  }

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
          <button onClick={handleFiltrar}>Filtrar</button>
        </div>
        
      </div>

      {dados ? (
        <div id="resultado">{resultado}</div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
