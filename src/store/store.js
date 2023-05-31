import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tasksSlice from '../slices/tasksSlice';
import localStorageMiddleware from '../middlewares/localStorageMiddleware';

const store = configureStore({
  reducer: {
    tasksList: tasksSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), localStorageMiddleware],
});

export default store;
