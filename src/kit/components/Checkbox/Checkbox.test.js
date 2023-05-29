import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders icon if checked', () => {
    const onCheckboxClickHandler = jest.fn();
    render(<Checkbox checked onCheckboxClickHandler={onCheckboxClickHandler} />);

    const iconElement = screen.getByTestId('icon');

    expect(iconElement).toBeInTheDocument();
  });

  it('does not render icon if not checked', () => {
    const onCheckboxClickHandler = jest.fn();
    render(<Checkbox checked={false} onCheckboxClickHandler={onCheckboxClickHandler} />);

    const iconElement = screen.queryByTestId('icon');

    expect(iconElement).toBeNull();
  });

  it('triggers onCheckboxClickHandler when checkbox is clicked', async () => {
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

    const checkboxElement = container.querySelector('input');
    userEvent.click(checkboxElement);
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
