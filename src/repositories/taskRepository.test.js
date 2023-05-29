import { saveTasks, loadTasks } from './taskRepository';

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
      const state = {
        tasks: [
          { id: '1', name: 'Task 1' },
          { id: '2', name: 'Task 2' },
        ],
      };

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
