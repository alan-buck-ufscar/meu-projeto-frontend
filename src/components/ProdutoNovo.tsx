import { useState } from 'react';
// import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
// import dadosJSON from '../data.json'

interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    urlImagem: string;
}

// const ProdutoNovo: React.FC = () => {
function ProdutoNovo() {
    const navigate = useNavigate();

    const [produto, setProduto] = useState<Produto>({
        id: '',
        nome: '',
        descricao: '',
        preco: 0,
        categoria: '',
        urlImagem: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
        ...prevProduto,
        [name]: name === 'preco' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para salvar o produto,
        // como enviar para uma API ou atualizar o estado.
        console.log('Produto a ser criado:', produto);
        navigate('/produto');
    };

    const handleCancelar = () => {
        // setProduto({
        //     id: '',
        //     nome: '',
        //     descricao: '',
        //     preco: 0,
        //     categoria: '',
        //     urlImagem: '',
        // });
        console.log('Formulário cancelado');
        navigate('/produto');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='item_input_group'>
                <div>
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
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={produto.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="preco">Preço:</label>
                    <input
                        type="number"
                        id="preco"
                        name="preco"
                        value={produto.preco}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="categoria">Categoria:</label>
                    <select
                        id="categoria"
                        name="categoria"
                        value={produto.categoria}
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
                <div>
                    <label htmlFor="urlImagem">URL da Imagem:</label>
                    <input
                        type="url"
                        id="urlImagem"
                        name="urlImagem"
                        value={produto.urlImagem}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Criar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
            </div>
        </form>
    );
};

export default ProdutoNovo;

/*
function ProdutoNovo () {
    const [dados] = useState(dadosJSON);
    const [id, setId] = useState('');
    return (
        <>
            <label htmlFor="meuInput">Código:</label>
            <input
                type="text"
                placeholder="Digite o ID"
                value={id}
                id='meuInput'
                onChange={(e) => setId(e.target.value)}
            />
        </>
    );
}

export default ProdutoNovo;

*/

