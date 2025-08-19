import { LoaderFunction, ActionFunction } from "react-router-dom";
 import dadosJSON from '../data.json'; // Importa o arquivo JSON
import axios from "axios";

const URL_BACKEND = 'http://localhost:3001/api/product';
const listaProdutos: Produto[] = JSON.parse(JSON.stringify(dadosJSON));

const ProdutoLoader: LoaderFunction = async () => {
  // return listaProdutos;
  try {
    //const listaProdutos = await axios.get(URL_BACKEND);
    //return (listaProdutos);
    const response = await axios.get(URL_BACKEND);
    return (response.data);
    // return (response.data as any[]).map(product => ({
    //   ...product,
    // }));
  }
  catch (error) {
    console.log(error);
    alert(error);
  }
}

const ProdutoCreator: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  try {
    return await axios.post(URL_BACKEND, {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      category: formData.get('category'),
      pictureUrl: formData.get('pictureUrl'),
    });
  }
  catch (error) {
    console.log(error);
    alert(error);
  }

  /*
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
  */
}

export { ProdutoLoader, ProdutoCreator };

