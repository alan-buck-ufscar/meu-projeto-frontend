import { createBrowserRouter, RouterProvider, Route, Link, useLoaderData } from "react-router-dom";
import dadosJSON from '../data.json'; // Importa o arquivo JSON
import ProdutoComponent from '../components/ProdutoComponent';
import { useState } from "react";

interface Produto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    pictureUrl: string;
}

export async function loader() {
  // Adicionar lógica adicional, como chamadas de API, etc.
  return dadosJSON; // Retorna o objeto JSON
}

function DataRoute() {
  const data = useLoaderData() as Produto[]; // Use o tipo definido

  return (
        <>
        {data.map(item => (
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
}

export default DataRoute;

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

