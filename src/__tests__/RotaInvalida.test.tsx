import { render, screen, waitFor } from '@testing-library/react';
import RotaInvalida from '../components/RotaInvalida';

test('Renderizando a página RotaInvalida', async () => {
  render(<RotaInvalida />);
  const cabecalho = await waitFor(() => screen.findAllByRole('heading', { level: 2 })); // o mesmo que <h2>
  expect(cabecalho).toHaveLength(1);
  expect(cabecalho[0]).toHaveTextContent('Rota inválida!');
});
