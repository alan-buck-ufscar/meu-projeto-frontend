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
      // setResultado(
      //   <>
      //   {dados.map(item => (
      //     <div key={item.id} className='item_caixa'>
      //       <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
      //       <div>
      //         <p className='item_titulo'>({item.id}) {item.name}</p>
      //         <p>{item.category}</p>
      //         <p>R${item.price}</p>
      //       </div>
      //     </div>
      //   ))}
      //   </>
      // );
    }
  }

  return (
    <>
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
      <div id="resultado">{resultado}</div>
      {/* Renderize os dados aqui */
      // <>
      //   <button onClick={handleFiltrar}>Filtrar</button>
      //   <div id="resultado">{resultado}</div>
      // </>
      }
      
      {/* {itemFiltrado ? (
        <>
          <p>Achou!</p>
          <div key={itemFiltrado.id} className='item_caixa'>
            <img src={itemFiltrado.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
            <div>
              <p className='item_titulo'>({itemFiltrado.id}) {itemFiltrado.name}</p>
              <p>{itemFiltrado.category}</p>
              <p>R${itemFiltrado.price}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Item não encontrado.</p>
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
      )} */}
      
    </>
  );
}

export { AbreJSON };




/* SOLUÇÃO 2
import React, { useState, useEffect } from 'react';

function AbreJSON() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setDados(data))
      .catch(error => console.error('Erro ao carregar dados:', error));
  }, []);

  if (!dados) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {/* Renderização dos dados }
      {dados.map(item => (
        <div key={item.id}>
          <p>name: {item.name}</p>
          <p>description: {item.description}</p>
          <p>price: {item.price}</p>
          <p>category: {item.category}</p>
          <p>pictureUrl: {item.pictureURL}</p>
        </div>
      ))}
    </>
  );
}

export { AbreJSON };
*/



/* SOLUÇÃO 1
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from './data.json';

// Estrutura do JSON
interface Data {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

function MyComponent() {
  const [myData, setMyData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Se o JSON estiver em um arquivo local:
        setMyData(data); // Define diretamente
        
        // Se for uma API externa:
        //const response = await axios.get<Data>('./data.json'); // Substitua pela URL
        //setMyData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      {myData && (
        <div>
          <p>Nome: {myData.name}</p>
          <p>Idade: {myData.age}</p>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
*/