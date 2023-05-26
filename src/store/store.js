import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from '../slices/tasksSlice';

const store = configureStore({
  reducer: {
    tasksList: tasksSlice.reducer,
  },
});

export default store;
