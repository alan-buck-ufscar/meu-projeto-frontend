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
import { ProdutoLoader, ProdutoCreator } from './routes/dataRoute';

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
        action: ProdutoCreator,
      },
      {
        path: 'produto_novo',
        element: <ProdutoNovo />,
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
