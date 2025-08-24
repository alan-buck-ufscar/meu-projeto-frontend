import { render, screen, waitFor } from '@testing-library/react';
import { ProdutoComponent } from '../components/ProdutoComponent';
import { createRoutesStub } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('ProdutoComponent', () => {
  const Stub = createRoutesStub([
    {
      path: 'produto',
      Component: ProdutoComponent,
      HydrateFallback: () => <p>Carregando produtos...</p>,
      loader: () => [
        {
          id: '1',
          name: 'Camiseta Básica',
          description: 'Camiseta de algodão 100% com corte regular.',
          price: 49.9,
          category: 'Moda',
          pictureUrl: 'https://example.com/images/camiseta-basica.jpg'
        },
        {
          id: '2',
          name: 'Smartphone X10',
          description: 'Smartphone com 128GB de armazenamento e câmera de 48MP.',
          price: 1999.99,
          category: 'Eletronicos',
          pictureUrl: 'https://example.com/images/smartphone-x10.jpg'
        },
        {
          id: '5',
          name: 'Sofá 3 Lugares',
          description: 'Sofá confortável com revestimento em tecido de alta qualidade.',
          price: 1299,
          category: 'CasaDecoracao',
          pictureUrl: 'https://example.com/images/sofa-3-lugares.jpg'
        },

      ],      
    }
  ]);

  it('Verificando a exibição da lista', async () => {
    render(<Stub initialEntries={['/produto']} />);
    const listaProd = await waitFor(() => screen.findAllByRole('img'));
    
    expect(listaProd).toHaveLength(3);

    expect(listaProd[0].nextElementSibling?.firstChild?.textContent).toBe('(1) Camiseta Básica');
    expect(listaProd[1].nextElementSibling?.firstChild?.textContent).toBe('(2) Smartphone X10');
    expect(listaProd[2].nextElementSibling?.firstChild?.textContent).toBe('(5) Sofá 3 Lugares');
  });

  it('Verificando a exibição de um item filtrado', async () => {
    render(<Stub initialEntries={['/produto']} />);
    const input = await waitFor(() => screen.findByPlaceholderText('Digite o ID'));
    await waitFor(() => userEvent.type(input, '1'));
    const listaProd = await waitFor(() => screen.findAllByRole('img'));
    expect(listaProd).toHaveLength(1);
    expect(listaProd[0].nextElementSibling?.firstChild?.textContent).toBe('(1) Camiseta Básica');
    expect(listaProd[0].nextElementSibling?.children[1]?.textContent).toBe('Moda');
    expect(listaProd[0].nextElementSibling?.children[2]?.textContent).toBe('R$49.9');
  });
});
