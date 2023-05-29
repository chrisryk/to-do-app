import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
  it('renders correct text', () => {
    const title = 'Test text';
    render(<Title title={title} />);

    const titleElement = screen.getByText(title);

    expect(titleElement).toBeInTheDocument();
  });
});
