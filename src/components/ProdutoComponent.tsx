import { useLoaderData, useActionData, useNavigate } from 'react-router';
import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'react-router';

/*
function closeDialog() {
    const dialog = document.getElementsByTagName("dialog")[0];
    dialog.close();
};
*/

export const ProdutoComponent: React.FC = () => {
  const dados = useLoaderData() as Produto[];
  const actionData = useActionData();
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [resultado, setResultado] = useState<any>('');
  const [idProdDelInt, setidProdDelInt] = useState<string>('');

  const closeDialog = () => {
      const dialog = document.getElementsByTagName("dialog")[0];
      dialog.close();
  };

  const handleCancelar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Exclusão cancelada');
    closeDialog();
  };

  const handleExcluir = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const dialog = document.getElementsByTagName("dialog")[0];
    console.log(`Produto selecionado id: ${id}`);
    setidProdDelInt(id);
    dialog.showModal();
  }

  const handleEditar = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    console.log(`Id no ProdutoComponent: ${id}`)
    navigate(`/produto_edita/${id}`);
  }, [navigate]);

  const ProdutoCartao = useCallback((item: Produto) => {
    return(
      <div key={item.id} className='item_caixa'>
        <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
        <div>
            <p className='item_titulo'>({item.id}) {item.name}</p>
            <p>{item.category}</p>
            <p>R${item.price}</p>
            <div className='button_div'>
                {/* <Link to={`/itens/editar/${item.id}`}>
                  <button>Editar</button>
                </Link> */}

                <button onClick={event => handleEditar(event, item.id)}>Editar</button>
                <button className='button_excluir' id='botao_excluir' onClick={event => handleExcluir(event, item.id)}>Excluir</button>
            </div>
        </div>
      </div>
    );
  }, [handleEditar]);

  const handleFiltrar = useCallback(() => {
    if (dados) {
      const itemFiltrado = dados.find(item => String(item.id) === String(id));
      //if ((Number.isNaN(id)) || (id === 0)) {  // Código em branco
      if (id === '') {  // Código em branco
        setResultado(
          <>
          {dados.map(item => (
            ProdutoCartao(item)
          ))}
          </>
        );
      } else if (itemFiltrado) {  // Código válido
        setResultado(
          ProdutoCartao(itemFiltrado)
        );
      } else {  // Código inválido
        setResultado(null);
      }
    } else {
      setResultado(<p>Carregando...</p>);
    }

  },[dados, id, ProdutoCartao]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFiltrar();
    }, 500);
    return () => clearTimeout(timeout);
  }, [id, handleFiltrar]);

  return (
    <div>
      <div className='form_container'>
        <h2>Produto</h2>
        {actionData?.success && (
          <p style={{ color: "green" }}>Item adicionado com sucesso!</p>
        )}
        {actionData?.error && (
          <p style={{ color: "red" }}>{actionData.error}</p>
        )}

        <div className='item_input_group'>
          <label htmlFor="meuInput">Código:</label>
          <input
            type='text'
            placeholder='Digite o ID'
            value={id}
            id='meuInput'
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </div>
      <div id="resultado">{resultado}</div>
      <dialog className="dialog_excluir_item">
        <p>Você quer mesmo excluir este produto?</p>
        <Form method="DELETE" action='/produto'>
          <input type="hidden" name="idProd" value={idProdDelInt} />
          <button type="submit" onClick={() => closeDialog()}>Sim</button>
          <button onClick={event => handleCancelar(event)}>Não</button>
        </Form>
      </dialog>
    </div>
  );
}
