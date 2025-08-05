import { useLoaderData } from 'react-router-dom';

interface Produto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
}

function ProdutoComponent() {
  const data = useLoaderData() as Produto[]; // Type assertion

  return (
    <div>
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
    </div>
  );
}

export default ProdutoComponent;