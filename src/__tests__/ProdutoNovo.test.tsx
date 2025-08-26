import { render, screen, waitFor } from '@testing-library/react';
import { ProdutoNovo } from '../components/ProdutoNovo';
import { createRoutesStub } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('ProdutoNovo', () => {
    const Stub = createRoutesStub([
        {
            path: 'produto_novo',
            Component: ProdutoNovo,
        }
    ]);

    test('Renderizando a página ProdutoNovo', async () => {
        render(<Stub initialEntries={['/produto_novo']} />);
        
        const nameInput = screen.getByLabelText(/Nome:/i);
        userEvent.type(nameInput, 'Celular Samsung');
        expect(nameInput).toHaveValue('Celular Samsung');

        const descriptionInput = screen.getByLabelText(/Descrição:/i);
        userEvent.type(descriptionInput, 'Modelo Galaxy A55');
        expect(descriptionInput).toHaveValue('Modelo Galaxy A55');

        const priceInput = screen.getByLabelText(/Preço:/i);
        userEvent.type(priceInput, '1234');
        expect(priceInput).toHaveValue(1234);

        const categoryInput = screen.getByLabelText(/Categoria:/i);
        userEvent.selectOptions(categoryInput, 'Eletronicos');
        expect(categoryInput).toHaveValue('Eletronicos');

        const urlInput = screen.getByLabelText(/URL da Imagem:/i);
        userEvent.type(urlInput, 'https://exemplo-de-imagem.com/minhaimagem.jpg');
        expect(urlInput).toHaveValue('https://exemplo-de-imagem.com/minhaimagem.jpg');
    });
});
