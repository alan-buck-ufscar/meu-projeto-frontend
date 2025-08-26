import { Link, Outlet } from "react-router";
// import "../css/styles.css";

function Header () {
    return (
      <>
        <div className="container">
          <header>
            <h1>Projeto de Disciplina</h1>
          </header>
          <div className="content">
            <aside>
              <Link to='/'>Home</Link><br></br>
              <Link to='/produto'>Produto</Link><br></br>
              <Link to='/produto_novo'>Produto Novo</Link><br></br>
              <Link to='/envia_csv'>Envia CSV</Link><br></br>
              <Link to='/sobre'>Sobre</Link><br></br>
            </aside>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </>
    );
}

export default Header;