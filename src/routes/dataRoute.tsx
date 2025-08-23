import { LoaderFunction, ActionFunction } from "react-router";
import axios from "axios";

const URL_BACKEND = 'http://localhost:3001/api/product';

const ProdutoLoader: LoaderFunction = async () => {
  try {
    const response = await axios.get(URL_BACKEND);
    return (response.data);
  }
  catch (error) {
    console.log(error);
    alert(error);
  }
}

const ProdutoAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const method = request.method;

  if (method === 'POST') {
    try {
      return await axios.post(URL_BACKEND, {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        category: formData.get('category'),
        pictureUrl: formData.get('pictureUrl'),
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }  else if (method === 'DELETE') {
    try {
      const id = formData.get('id');
      await axios.delete(`${URL_BACKEND}/${id}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
}


export { ProdutoLoader, ProdutoAction };

