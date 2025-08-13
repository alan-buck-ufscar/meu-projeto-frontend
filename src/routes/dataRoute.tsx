import { LoaderFunction, ActionFunction, useNavigate, redirect } from "react-router-dom";
import dadosJSON from '../data.json'; // Importa o arquivo JSON
//import Produto from "../components/Produto";

interface Produto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
}

//let listaProdutos = dadosJSON;
const listaProdutos: Produto[] = JSON.parse(JSON.stringify(dadosJSON));


const ProdutoLoader: LoaderFunction = async () => {
  return listaProdutos;
  /*
  try {
    const response = await fetch('../data.json', {
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log('passei aqui 1');
    if (!response.ok) {
      console.log('passei aqui 2');
      throw new Error(`Erro ao carregar o arquivo JSON: ${response.status}`);
    }
    console.log('passei aqui 3');
    const data: Produto[] = await response.json();
    console.log('passei aqui 4');
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
    */
}

//const ProdutoCreator: ActionFunction = async ( {request}: { request: Request }) => {
const ProdutoCreator: ActionFunction = async ({ request }) => {
  // const navigate = useNavigate();
  const formData = await request.formData();
  const produto: Produto = {
    id: Number(formData.get('id')),
    name: formData.get('nome') as string,
    description: formData.get('descricao') as string,
    price: Number(formData.get('preco')),
    category: formData.get('categoria') as string,
    pictureUrl: formData.get('urlImagem') as string
  }

  listaProdutos.push(produto);
  console.log('Produto criado:', produto);
  // return navigate('/produto');
  // return navigate('.');
  // return produto;
  // return redirect('/produto');
  //return redirect('.');




  // const formData = await request.formData();
  // const itemName = formData.get('newItem');
  // if (itemName) {
  //   const newItem = { id: Date.now(), text: itemName };
  //   initialItems = [...initialItems, newItem];
  //   return { success: true, newItem };
  // }
  // return { success: false };

}

export { ProdutoLoader, ProdutoCreator };


// async function itemsLoader() {
//   const response = await fetch('/api/items');
//   const items = await response.json();
//   return items;
// }

// async function itemLoader( params: Produto ) {
//     const response = await fetch(`/api/items/${params.id}`);
//     const item = await response.json();
//     return item;
// }

// function Items() {
//     const items = useLoaderData();
//     return (
//         <>
//         {items.map(item => (
//           <div key={item.id} className='item_caixa'>
//             <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
//             <div>
//               <p className='item_titulo'>({item.id}) {item.name}</p>
//               <p>{item.category}</p>
//               <p>R${item.price}</p>
//             </div>
//           </div>
//         ))}
//         </>
//     );
// }



// import { LoaderFunction } from 'react-router-dom';
// import ProdutoComponent from '../components/ProdutoComponent';

// export const dataLoader: LoaderFunction = async () => {
//     const response = await fetch('../data.json');
//     if (!response.ok) {
//         throw new Response("", {
//             status: response.status,
//             statusText: response.statusText,
//         });
//     }
//     const data = await response.json();
//     return data;
// };

// const DataRoute = {
//   path: "/produto_rota",
//   element: <ProdutoComponent />,
//   loader: dataLoader,
// };

// export default DataRoute;

