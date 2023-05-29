import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import TaskCreated from './TaskCreated';
import tasksSlice, { checkTask, removeTask } from '../../../slices/tasksSlice';

describe('TaskCreated', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasksList: tasksSlice.reducer,
      },
    });

    jest.spyOn(store, 'dispatch');
  });

  const task = {
    id: '1',
    description: 'Task 1',
    completed: false,
    deleted: false,
  };

  const renderTaskCreated = () => {
    render(
      <Provider store={store}>
        <TaskCreated task={task} />
      </Provider>,
    );
  };

  it('calls correct dispatch when checkbox is clicked', () => {
    renderTaskCreated();

    const checkboxElement = screen.getByTestId('task-checkbox');
    userEvent.click(checkboxElement);

    expect(store.dispatch).toHaveBeenCalledWith(
      checkTask({ completed: !task.completed, id: task.id }),
    );
  });

  it('calls correct dispatch when cross button is clicked', () => {
    renderTaskCreated();

    const buttonElement = screen.getByTestId('task-remove-button');
    userEvent.click(buttonElement);

    expect(store.dispatch).toHaveBeenCalledWith(removeTask({ id: task.id }));
  });
});
