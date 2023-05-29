import { saveTasks } from '../repositories/taskRepository';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    [
      'tasks/addTask',
      'tasks/removeTask',
      'tasks/checkTask',
      'tasks/clearCompletedTasks',
      'tasks/reorderTasks',
    ].includes(action.type)
  ) {
    saveTasks(store.getState().tasksList);
  }

  return result;
};

export default localStorageMiddleware;
