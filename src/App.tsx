// import React from 'react';
import './App.css';
//import { AbreJSON } from './arquivo_json_abre';
//import Header from './Header';
//import Sidebar from './Sidebar';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import Layout from './Layout';
import "./css/styles.css";
import Home from './components/Home';
import Sobre from './components/Sobre';
import RotaInvalida from './components/RotaInvalida';
import ProdutoNovo from './components/ProdutoNovo';
import Produto from './components/Produto';
import DataRoute from './routes/dataRoute';
import ProdutoComponent from './components/ProdutoComponent';
// import DataRoute from './routes/dataRoute';
// import ProdutoComponent from './components/ProdutoComponent';

// const router = createBrowserRouter([
//   DataRoute
// ]);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Header /> } >
          <Route index element={ <Home /> }/>
          <Route path='/produto' element={ <Produto /> }/>
          <Route path='/produto_novo' element={ <ProdutoNovo /> }/>
          <Route path='/sobre' element={ <Sobre /> }/>
          <Route path='/produtos' element={ <ProdutoComponent /> } loader={ DataRoute } />
          <Route path='*' element={ <RotaInvalida /> }/>
        </Route>
      </Routes>
    </BrowserRouter>

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
