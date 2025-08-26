import { render, screen, waitFor } from '@testing-library/react';
import Sobre from '../components/Sobre';

test('Renderizando a página Sobre', async () => {
  render(<Sobre />);
  const cabecalho = await waitFor(() => screen.findAllByRole('heading', { level: 2 })); // o mesmo que <h2>
  expect(cabecalho).toHaveLength(1);
  expect(cabecalho[0]).toHaveTextContent('Projeto da disciplina Desenvolvimento de Software do Front ao Back End');
});
