import './App.css';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router';
import "./css/styles.css";
import Home from './components/Home';
import Sobre from './components/Sobre';
import RotaInvalida from './components/RotaInvalida';
import { ProdutoNovo } from './components/ProdutoNovo';
import Produto from './components/Produto';
import { ProdutoComponent } from './components/ProdutoComponent';
import { ProdutoLoader, ProdutoAction } from './routes/dataRoute';
import { EnviaCSV } from './components/EnviaCSV';
import { ProdutoEdita } from './components/ProdutoEdita';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'sobre',
        element: <Sobre />,
      },
      {
        path: 'produto_antigo',
        element: <Produto />,
      },
      {
        path: 'produto',
        element: <ProdutoComponent />,
        loader: ProdutoLoader,
        action: ProdutoAction,
      },
      {
        path: 'produto_novo',
        element: <ProdutoNovo />,
      },
      {
        path: 'produto_edita/:id',
        element: <ProdutoEdita />,
      },
      {
        path: 'envia_csv',
        element: <EnviaCSV />,
      },
      {
        path: '*',
        element: <RotaInvalida />,
      }
    ],
  },
]);


function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
