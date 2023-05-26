import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('state', JSON.stringify(state));
};

const getStateFromLocalStorage = () => {
  const state = localStorage.getItem('state');
  return state ? JSON.parse(state) : [];
};

const initialState = {
  tasks: getStateFromLocalStorage().tasks || [],
  tasksOrder: getStateFromLocalStorage().tasksOrder || [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const newId = uuidv4();
      state.tasks.push({ ...action.payload, id: newId });
      state.tasksOrder.push(newId);

      saveStateToLocalStorage(state);
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

      saveStateToLocalStorage(state.tasks);
    },
    checkTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      saveStateToLocalStorage(state);
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

      saveStateToLocalStorage(state);
    },
    reorderTasks(state, action) {
      const { source, destination } = action.payload;

      const movedTaskId = state.tasksOrder[source.index];
      state.tasksOrder.splice(source.index, 1);
      state.tasksOrder.splice(destination.index, 0, movedTaskId);

      saveStateToLocalStorage(state);
    },
  },
});

export const {
  addTask, removeTask, checkTask, clearCompletedTasks, reorderTasks,
} = tasksSlice.actions;
export default tasksSlice;
