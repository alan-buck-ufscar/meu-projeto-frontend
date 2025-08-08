import { useLoaderData } from 'react-router-dom';

interface Produto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
}

// const ProdutoComponent: React.FC = () => {
function ProdutoComponent() {
  const data = useLoaderData() as Produto[];

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item) => (
            <div key={item.id}>
              <p>ID: {item.id}</p>
              <p>Nome: {item.name}</p>
              <p>Descrição: {item.description}</p>
              <p>Preço: {item.price}</p>
              <p>Categoria: {item.category}</p>
              <p>Imagem: {item.pictureUrl}</p>
            </div>
          ))}
      </ul>
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