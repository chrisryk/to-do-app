import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders icon if checked', () => {
    render(<Checkbox checked onCheckboxClickHandler={jest.fn()} />);

    const iconElement = screen.getByTestId('icon');

    expect(iconElement).toBeInTheDocument();
  });

  it('does not render icon if not checked', () => {
    render(<Checkbox checked={false} onCheckboxClickHandler={jest.fn()} />);

    const iconElement = screen.queryByTestId('icon');

    expect(iconElement).toBeNull();
  });

  it('triggers onCheckboxClickHandler when button is clicked', async () => {
    let checked = false;
    const onCheckboxClickHandler = () => {
      checked = !checked;
    };

    const { container, rerender } = render(
      <Checkbox
        checked={checked}
        onCheckboxClickHandler={onCheckboxClickHandler}
      />,
    );

    const buttonElement = container.querySelector('button');
    userEvent.click(buttonElement);
    rerender(
      <Checkbox
        checked={checked}
        onCheckboxClickHandler={onCheckboxClickHandler}
      />,
    );
    const iconElement = await screen.findByTestId('icon');

    expect(iconElement).toBeInTheDocument();
  });
});
