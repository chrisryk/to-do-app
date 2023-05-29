import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders children', () => {
    const firstChildText = '1st test child';
    const secondChildText = '2nd test child';

    const children = (
      <>
        <span>{firstChildText}</span>
        <span>{secondChildText}</span>
      </>
    );
    render(<Container>{children}</Container>);

    const firstChildElement = screen.getByText(firstChildText);
    const secondChildElement = screen.getByText(secondChildText);

    expect(firstChildElement).toBeInTheDocument();
    expect(secondChildElement).toBeInTheDocument();
  });
});
