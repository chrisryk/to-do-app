import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  const title = 'Test text';
  const onClickHandler = jest.fn();

  it('renders correct text', () => {
    render(<Button title={title} onClickHandler={onClickHandler} />);

    const buttonElement = screen.getByText(title);

    expect(buttonElement).toBeInTheDocument();
  });

  it('renders children', () => {
    const firstChildText = '1st test child';
    const secondChildText = '2nd test child';

    const children = (
      <>
        <span>{firstChildText}</span>
        <span>{secondChildText}</span>
      </>
    );
    render(<Button onClickHandler={onClickHandler}>{children}</Button>);

    const firstChildElement = screen.getByText(firstChildText);
    const secondChildElement = screen.getByText(secondChildText);

    expect(firstChildElement).toBeInTheDocument();
    expect(secondChildElement).toBeInTheDocument();
  });

  it('handles onClick when button is clicked', () => {
    render(<Button title={title} onClickHandler={onClickHandler} />);

    const buttonElement = screen.getByText(title);
    userEvent.click(buttonElement);

    expect(onClickHandler).toBeCalled();
  });
});
