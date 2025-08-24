import { useState, useEffect } from 'react';
import { Form, useNavigate, useParams } from 'react-router';
import { URL_BACKEND } from "../constants";
import axios from 'axios';

export const ProdutoEdita: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchItem = async () => {
        // Verifica se o ID existe
        if (!id) {
            setLoading(false);
            return;
        }

        try {
            // Usa o Axios para fazer a requisição GET
            const response = await axios.get<Produto>(`${URL_BACKEND}/${id}`);
            setProduto(response.data);
        } catch (error) {
            // O Axios facilita o tratamento de erros
            console.error('Erro ao buscar o item:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchItem();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!produto) {
        return <div>Produto não encontrado.</div>;
    }
    
    return (
        <Form method="PUT" action='/produto'>
            <div className='form_container'>
                <h2>Produto Edita</h2>
                <input
                    type="hidden"
                    id="id"
                    name="id"
                    value={produto.id}
                    onChange={handleChange}
                    required
                />
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
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={evento => handleCancelar(evento)}>Cancelar</button>
                </div>
            </div>
        </Form>
    );
};
