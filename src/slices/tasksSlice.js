import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const initialState = {
  tasks: getTasksFromLocalStorage(),
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({...action.payload, id: uuidv4()})
      saveTasksToLocalStorage(state.tasks)
    },
    removeTask(state, action) {
      state.tasks = state.tasks.map(task => {
        if (task.id === action.payload.id) {
           return { ...task, deleted: true }
          }
        return task
      })
      saveTasksToLocalStorage(state.tasks)
    },
    checkTask(state, action) {
      state.tasks = state.tasks.map(task => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed}
        }
        return task
      })
      saveTasksToLocalStorage(state.tasks)
    },
    clearCompletedTasks(state) {
      state.tasks = state.tasks.map(task => {
        if (task.completed) {
          return { ...task, deleted: true}
        }
        return task
      })
      saveTasksToLocalStorage(state.tasks)
    }
  }
})

export const { addTask, removeTask, checkTask, clearCompletedTasks } = tasksSlice.actions;
export default tasksSlice