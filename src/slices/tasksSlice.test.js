import { configureStore } from '@reduxjs/toolkit';
import tasksSlice, {
  addTask,
  checkTask,
  clearCompletedTasks,
  removeTask,
  reorderTasks,
} from './tasksSlice';

describe('tasksSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasksList: tasksSlice.reducer,
      },
    });
  });

  it('handles addTask', () => {
    const task = { description: 'Task', completed: false, deleted: false };

    store.dispatch(addTask(task));
    const state = store.getState();

    expect(state.tasksList.tasks.length).toBe(1);
    expect(state.tasksList.tasks[0].description).toBe(task.description);
    expect(state.tasksList.tasks[0].completed).toBe(task.completed);
    expect(state.tasksList.tasks[0].deleted).toBe(task.deleted);
  });

  it('handles removeTask', () => {
    const task = {
      description: 'Task',
      completed: false,
      deleted: false,
    };

    store.dispatch(addTask(task));
    let state = store.getState();
    const taskId = state.tasksList.tasks[0].id;
    store.dispatch(removeTask({ id: taskId }));
    state = store.getState();

    expect(state.tasksList.tasks.length).toBe(1);
    expect(state.tasksList.tasks[0].deleted).toBe(true);
  });

  it('handles checkTask', () => {
    const task = {
      description: 'Task',
      completed: false,
      deleted: false,
    };

    store.dispatch(addTask(task));
    let state = store.getState();
    const taskId = state.tasksList.tasks[0].id;
    store.dispatch(checkTask({ id: taskId }));
    state = store.getState();

    expect(state.tasksList.tasks.length).toBe(1);
    expect(state.tasksList.tasks[0].completed).toBe(!task.completed);
  });

  it('handles clearCompletedTasks', () => {
    const tasks = [
      {
        description: 'Task completed',
        completed: true,
        deleted: false,
      },
      {
        description: 'Task not completed',
        completed: false,
        deleted: false,
      },
    ];

    tasks.forEach((task) => store.dispatch(addTask(task)));
    store.dispatch(clearCompletedTasks());
    const state = store.getState();

    expect(state.tasksList.tasks.length).toBe(tasks.length);
    expect(state.tasksList.tasks[0].deleted).toBe(!tasks[0].deleted);
    expect(state.tasksList.tasks[1].deleted).toBe(tasks[1].deleted);
  });

  it('handles reorderTasks', () => {
    const tasks = [
      {
        description: 'Task 1',
        completed: false,
        deleted: false,
      },
      {
        description: 'Task 2',
        completed: false,
        deleted: false,
      },
    ];

    tasks.forEach((task) => store.dispatch(addTask(task)));
    store.dispatch(
      reorderTasks({ source: { index: 0 }, destination: { index: 1 } }),
    );
    let state = store.getState();
    const firstTaskId = state.tasksList.tasks[0].id;
    const secondTaskId = state.tasksList.tasks[1].id;
    state = store.getState();

    expect(state.tasksList.tasks.length).toBe(tasks.length);
    expect(state.tasksList.tasks[0].id).toBe(firstTaskId);
    expect(state.tasksList.tasks[1].id).toBe(secondTaskId);
  });
});
