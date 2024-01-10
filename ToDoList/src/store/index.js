import { configureStore } from '@reduxjs/toolkit';
import { toDoListReducer } from './slices/toDoListSlice';

const store = configureStore({
  reducer: {
    toDoList: toDoListReducer,
  },
});

export default store;
