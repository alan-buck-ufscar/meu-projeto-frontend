import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('Renderizando um cabeçalho da Home', () => {
  render(<Home />);
  
  const headingElement = screen.getByText(/Desenvolvimento de Software do Front ao Back End/i);
  const headingNome = screen.getByText(/Alan Buck/i);
  
  expect(headingElement).toBeInTheDocument();
  expect(headingNome).toBeInTheDocument();
});
