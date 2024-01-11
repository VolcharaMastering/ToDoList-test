import { configureStore } from '@reduxjs/toolkit';
import { toDoListReducer } from './slices/toDoListSlice';
import { popupReducer } from './slices/togglePopupSlice';

const store = configureStore({
  reducer: {
    toDoList: toDoListReducer,
    popup: popupReducer,
  },
});

export default store;
