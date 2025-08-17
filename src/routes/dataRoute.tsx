import { LoaderFunction, ActionFunction } from "react-router-dom";
import dadosJSON from '../data.json'; // Importa o arquivo JSON

const listaProdutos: Produto[] = JSON.parse(JSON.stringify(dadosJSON));

const ProdutoLoader: LoaderFunction = async () => {
  return listaProdutos;
}

const ProdutoCreator: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const produto: Produto = {
    id: Number(formData.get('id')),
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    category: formData.get('category') as string,
    pictureUrl: formData.get('pictureUrl') as string
  }

  listaProdutos.push(produto);
  console.log('Produto criado:', produto);
}

export { ProdutoLoader, ProdutoCreator };

