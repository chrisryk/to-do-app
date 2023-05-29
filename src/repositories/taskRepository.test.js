import { configureStore } from '@reduxjs/toolkit';
import { saveTasks, loadTasks } from './taskRepository';
import tasksSlice from '../slices/tasksSlice';

describe('taskRepository', () => {
  let setItemSpy;
  let getItemSpy;
  let originalGetItem;

  beforeEach(() => {
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    originalGetItem = Storage.prototype.getItem;
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockImplementation(() => null);
  });

  afterEach(() => {
    setItemSpy.mockRestore();
    getItemSpy.mockRestore();
    Storage.prototype.getItem = originalGetItem;
  });

  describe('saveTasks', () => {
    it('should save tasks to localStorage', () => {
      const store = configureStore({
        reducer: {
          tasksList: tasksSlice.reducer,
        },
      });

      const state = store.getState();

      saveTasks(state);

      expect(setItemSpy).toHaveBeenCalledWith(
        'tasks',
        JSON.stringify(state.tasks),
      );
    });
  });

  describe('loadTasks', () => {
    it('should load tasks from localStorage', () => {
      const tasks = [
        { id: '1', name: 'Task 1' },
        { id: '2', name: 'Task 2' },
      ];

      getItemSpy.mockImplementation(() => JSON.stringify(tasks));

      const result = loadTasks();

      expect(result).toEqual(tasks);
    });

    it('should return an empty array when there are no tasks', () => {
      const result = loadTasks();

      expect(result).toEqual([]);
    });
  });
});
