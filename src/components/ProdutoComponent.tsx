import { useLoaderData, useActionData } from 'react-router-dom';
import { useState } from 'react';

interface Produto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
}

function ProdutoComponent() {
  const dados = useLoaderData() as Produto[];
  const actionData = useActionData();
  const [id, setId] = useState<any>('');
  const [resultado, setResultado] = useState<any>('');
  // const [exibePesquisa, setExibePesquisa] = useState<any>('');

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

  // const handleNovoProduto = () => {
  //   setExibePesquisa(null);
  // }

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
        {/* {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>} */}
        {/* <button onClick={handleNovoProduto}>Novo Produto</button> */}
        {/* <div id="exibePesquisa">{exibePesquisa}</div> */}

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

      {dados ? (
        <div id="resultado">{resultado}</div>
        // <ul>
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
        // </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}


// const DataDisplay: React.FC = () => {
//   const data = useLoaderData() as Produto[];

//   return (
//     <div>
//       <h2>Dados Carregados:</h2>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// function DataLoader() {
//   const data = useLoaderData();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (data.error) {
//       navigate('/erro', { state: { message: data.error } });
//     }
//   }, [data, navigate]);


//   if (data.isLoading) {
//     return <p>Carregando...</p>;
//   }

//   return (
//     <div>
//       <h1>Dados Carregados:</h1>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>
//             <strong>{item.name}</strong>: {item.description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


export default ProdutoComponent;