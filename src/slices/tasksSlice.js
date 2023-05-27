import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { saveTasks, loadTasks } from '../repositories/taskRepository';

const initialState = {
  tasks: loadTasks().tasks || [],
  tasksOrder: loadTasks().tasksOrder || [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const newId = uuidv4();
      state.tasks.push({ ...action.payload, id: newId });
      state.tasksOrder.push(newId);

      saveTasks(state);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          const index = state.tasksOrder.findIndex((taskId) => taskId === task.id);
          if (index !== -1) {
            state.tasksOrder.splice(index, 1);
          }

          return { ...task, deleted: true };
        }
        return task;
      });

      saveTasks(state.tasks);
    },
    checkTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      saveTasks(state);
    },
    clearCompletedTasks(state) {
      state.tasks = state.tasks.map((task) => {
        if (task.completed) {
          const index = state.tasksOrder.findIndex((taskId) => taskId === task.id);
          if (index !== -1) {
            state.tasksOrder.splice(index, 1);
          }

          return { ...task, deleted: true };
        }
        return task;
      });

      saveTasks(state);
    },
    reorderTasks(state, action) {
      const { source, destination } = action.payload;

      const movedTaskId = state.tasksOrder[source.index];
      state.tasksOrder.splice(source.index, 1);
      state.tasksOrder.splice(destination.index, 0, movedTaskId);

      saveTasks(state);
    },
  },
});

export const {
  addTask, removeTask, checkTask, clearCompletedTasks, reorderTasks,
} = tasksSlice.actions;
export default tasksSlice;
