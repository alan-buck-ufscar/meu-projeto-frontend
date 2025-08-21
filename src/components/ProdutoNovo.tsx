import { useState } from 'react';
import { Form, useNavigate } from 'react-router';

export const ProdutoNovo: React.FC = () => {
    const navigate = useNavigate();

    const [produto, setProduto] = useState<Produto>({
        id: '',
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
                    <label htmlFor="name">Nome:</label>
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
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={produto.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="price">Preço:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={produto.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form_group'>
                    <label htmlFor="category">Categoria:</label>
                    <select
                        id="category"
                        name="category"
                        value={produto.category}
                        onChange={handleChange}
                        required
                    >
                    <option value="">Selecione...</option>
                    <option value="SaudeBeleza">Saúde e Beleza</option>
                    <option value="Eletronicos">Eletrônicos</option>
                    <option value="Brinquedos">Brinquedos</option>
                    <option value="CasaDecoracao">Casa e Decoração</option>
                    <option value="Moda">Moda</option>
                    <option value="EsporteLazer">Esporte e Lazer</option>
                    <option value="Livros">Livros</option>
                    <option value="Papelaria">Papelaria</option>
                    </select>
                </div>
                <div className='form_group'>
                    <label htmlFor="pictureUrl">URL da Imagem:</label>
                    <input
                        type="url"
                        id="pictureUrl"
                        name="pictureUrl"
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
