import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

export const ProdutoNovo: React.FC = () => {
    const navigate = useNavigate();

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        category: '',
        pictureUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
        ...prevProduto,
        [name]: name === 'price' ? parseFloat(value) : value,
        }));
    };

    const handleCancelar = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Formulário cancelado');
        navigate('/produto');
    };

    return (
        <Form method="post" action='/produto'>
            <div className='form_container'>
                <h2>Produto Novo</h2>
                <div className='form_group'>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={produto.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={produto.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={produto.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="preco">Preço:</label>
                    <input
                        className='.form_group textarea'
                        type="number"
                        id="preco"
                        name="preco"
                        value={produto.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <div className='form_group_textarea'>
                        <label htmlFor="categoria">Categoria:</label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={produto.category}
                            onChange={handleChange}
                            required
                        >
                        <option value="">Selecione...</option>
                        <option value="Celulares e Smartphones">Celulares e Smartphones</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Livros">Livros</option>
                        <option value="Roupas">Roupas</option>
                        </select>
                    </div>
                </div>
                <div className='form_group'>
                    <label htmlFor="urlImagem">URL da Imagem:</label>
                    <input
                        type="url"
                        id="urlImagem"
                        name="urlImagem"
                        value={produto.pictureUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className='form_group_buttons'>
                    <button type="submit">Criar</button>
                    <button type="button" onClick={evento => handleCancelar(evento)}>Cancelar</button>
                </div>
            </div>
        </Form>
    );
};

//export default ProdutoNovo;
