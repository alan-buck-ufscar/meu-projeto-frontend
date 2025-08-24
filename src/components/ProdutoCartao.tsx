function closeDialog() {
    const dialog = document.getElementsByTagName("dialog")[0];
    dialog.open = false;
};

function deleteProduto(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    console.log(`Produto excluído id: ${id}`);
    closeDialog();
}

function onClickExcluir(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    const dialog = document.getElementsByTagName("dialog")[0];
    console.log(`Produto selecionado id: ${id}`);
    dialog.open = true;
}  


export const ProdutoCartao = (item: Produto) => {
    return(
      <div key={item.id} className='item_caixa'>
        <img src={item.pictureUrl} alt='Imagem' className='item_img_circulo'></img>
        <div>
            <p className='item_titulo'>({item.id}) {item.name}</p>
            <p>{item.category}</p>
            <p>R${item.price}</p>
            <div className='button_div'>
                <button>Editar</button>
                <button className='button_excluir' id='botao_excluir' onClick={event => onClickExcluir(event, item.id)}>Excluir</button>
            </div>
        </div>
        <dialog className="dialog_excluir_item">
            <p>Você quer mesmo excluir este produto? {item.id}</p>
            <button onClick={event => deleteProduto(event, item.id)}>Sim</button>
            <button onClick={() => closeDialog()}>Não</button>
        </dialog>
      </div>
    );
}
