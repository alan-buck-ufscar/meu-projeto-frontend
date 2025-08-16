import './App.css';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./css/styles.css";
import Home from './components/Home';
import Sobre from './components/Sobre';
import RotaInvalida from './components/RotaInvalida';
import { ProdutoNovo } from './components/ProdutoNovo';
import Produto from './components/Produto';
import { ProdutoComponent } from './components/ProdutoComponent';
//import ProdutoLoader from './routes/dataRoute';
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
        // action: ProdutoCreator,
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

    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={ <Header /> } >
    //       <Route index element={ <Home /> }/>
    //       <Route path='/produto' element={ <Produto /> }/>
    //       <Route path='/produto_novo' element={ <ProdutoNovo /> }/>
    //       <Route path='/sobre' element={ <Sobre /> }/>
    //       {/* <Route path='/produtos' element={ <ProdutoComponent /> } loader={ DataRoute } /> */}
    //       <Route path='/produtos' element={ <ProdutoComponent /> } loader={ loader } />
    //       <Route path='*' element={ <RotaInvalida /> }/>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>

    /*
    const sidebarItems = ['Início', 'Produtos', 'Ajuda'];
    <div className="container">
      <Header title="Aula 3" />
      <div className="content">
        <Sidebar items={sidebarItems} />
        <main>
          <AbreJSON/>
        </main>
      </div>
    </div>
    */

    /*
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
    */

    /*
    <div>
      <header>
        <AbreJSON/>
      </header>
    </div>
    */
  );
}

export default App;
