import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from '../../../slices/tasksSlice';
import ListControls from './ListControls';

describe('ListControls', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasksList: tasksSlice.reducer,
      },
    });

    jest.spyOn(store, 'dispatch');
  });

  const activeFilter = 'All';
  const setActiveFilter = jest.fn();

  const renderListConrols = (tasks = []) => {
    render(
      <Provider store={store}>
        <ListControls
          tasks={tasks}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </Provider>,
    );
  };

  it('renders task counter correctly for one not completed task', () => {
    const tasks = [{ completed: false }, { completed: true }];
    renderListConrols(tasks);

    const counterElement = screen.getByText('1 item left');

    expect(counterElement).toBeInTheDocument();
  });

  it('renders no tasks info for all tasks completed', () => {
    const tasks = [{ completed: true }, { completed: true }];
    renderListConrols(tasks);

    const counterElement = screen.getByText('No tasks left');

    expect(counterElement).toBeInTheDocument();
  });

  it('renders no tasks info for empty list', () => {
    const tasks = [];
    renderListConrols(tasks);

    const counterElement = screen.getByText('No tasks left');

    expect(counterElement).toBeInTheDocument();
  });

  it('renders buttons', () => {
    renderListConrols();

    const allButtonElement = screen.getByText('All');
    const activeButtonElement = screen.getByText('Active');
    const completedButtonElement = screen.getByText('Completed');
    const clearCompletedButtonElement = screen.getByText('Clear Completed');

    expect(allButtonElement).toBeInTheDocument();
    expect(activeButtonElement).toBeInTheDocument();
    expect(completedButtonElement).toBeInTheDocument();
    expect(clearCompletedButtonElement).toBeInTheDocument();
  });

  it('calls the correct handlers when buttons are clicked', () => {
    renderListConrols();

    const allButtonElement = screen.getByText('All');
    const activeButtonElement = screen.getByText('Active');
    const completedButtonElement = screen.getByText('Completed');
    const clearCompletedButtonElement = screen.getByText('Clear Completed');

    userEvent.click(allButtonElement);
    expect(setActiveFilter).toHaveBeenCalledWith('All');

    userEvent.click(activeButtonElement);
    expect(setActiveFilter).toHaveBeenCalledWith('Active');

    userEvent.click(completedButtonElement);
    expect(setActiveFilter).toHaveBeenCalledWith('Completed');

    userEvent.click(clearCompletedButtonElement);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
