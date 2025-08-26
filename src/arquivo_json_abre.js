import React, { useState } from 'react';
import dadosJSON from './data.json'; // Importa o arquivo JSON
import "./css/styles.css";

function AbreJSON() {
  const [dados] = useState(dadosJSON);
  const [id, setId] = useState('');
  const [resultado, setResultado] = useState('');

  const handleFiltrar = () => {
    const itemFiltrado = dados.find(item => item.id === parseInt(id));
    if (id === '') {  // Código em branco
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
    <>
      <div className='form_container'>
      {/* <div className='item_input_group'> */}
        <h2>Produto</h2>
        <div className='item_input_group'>
          <label htmlFor="meuInput">Código:</label>
          <input
            type="text"
            placeholder="Digite o ID"
            value={id}
            id='meuInput'
            onChange={(e) => setId(e.target.value)}
          />
          <button onClick={handleFiltrar}>Filtrar</button>
        </div>
      </div>
      <div id="resultado">{resultado}</div>
    </>
  );
}

export { AbreJSON };
