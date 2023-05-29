import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadTasks } from '../repositories/taskRepository';

const initialState = {
  tasks: loadTasks() || [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const newId = uuidv4();
      state.tasks.push({ ...action.payload, id: newId });
    },
    removeTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, deleted: true };
        }
        return task;
      });
    },
    checkTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    },
    clearCompletedTasks(state) {
      state.tasks = state.tasks.map((task) => {
        if (task.completed) {
          return { ...task, deleted: true };
        }
        return task;
      });
    },
    reorderTasks(state, action) {
      const { source, destination } = action.payload;

      const activeTasks = state.tasks.filter((task) => !task.deleted);

      const movedTask = activeTasks[source.index];
      const remainingTasks = activeTasks.filter((task, index) => index !== source.index);
      const reorderedTasks = [
        ...remainingTasks.slice(0, destination.index),
        movedTask,
        ...remainingTasks.slice(destination.index),
      ];

      const tasksArray = state.tasks.map((task) => {
        if (task.deleted) {
          return task;
        }
        return reorderedTasks.shift();
      });

      state.tasks = tasksArray;
    },
  },
});

export const {
  addTask,
  removeTask,
  checkTask,
  clearCompletedTasks,
  reorderTasks,
} = tasksSlice.actions;
export default tasksSlice;
