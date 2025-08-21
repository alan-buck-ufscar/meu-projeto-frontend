import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('Renderizando um cabeçalho da Home', () => {
  render(<Home />);
  const headingElement = screen.getByText(/Desenvolvimento de Software do Front ao Back End/i);
  expect(headingElement).toBeInTheDocument();
});
