import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  getToDoList,
  updateTask,
} from "../../api/toDoListApi";

export const axiosToDoList = createAsyncThunk(
  "toDoList/axiosToDoList",
  async () => {
    const result = await getToDoList();
    console.log("in dispatch", result);
    return result;
  }
);

export const axiosAddTask = createAsyncThunk(
  "toDoList/addTask",
  async (newTaskData) => {
    return addTask(newTaskData);
  }
);

export const axiosDeleteTask = createAsyncThunk(
  "toDoList/deleteTask",
  async (taskId) => {
    return deleteTask(taskId);
  }
);

export const axiosEditTask = createAsyncThunk(
  "toDoList/editTask",
  async ({ taskId, taskData }) => {
    return updateTask(taskId, taskData);
  }
);

const initialState = {
  toDoList: [],
  error: null,
};

export const toDoListSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosToDoList.pending, (state) => {
        state.error = null;
      })
      .addCase(axiosToDoList.fulfilled, (state, action) => {
        console.log("InStaTE" ,action.payload );
        state.toDoList = action.payload;
      })
      .addCase(axiosToDoList.rejected, (state, action) => {
        console.log("InStaTE ER" ,action.error.message);
        state.error = action.error.message;
      })
      .addCase(axiosAddTask.pending, (state) => {
        state.error = null;
      })
      .addCase(axiosAddTask.fulfilled, (state, action) => {
        state.toDoList.push(action.payload);
      })
      .addCase(axiosAddTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(axiosDeleteTask.pending, (state) => {
        state.error = null;
      })
      .addCase(axiosDeleteTask.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(axiosDeleteTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(axiosEditTask.pending, (state) => {
        state.error = null;
      })
      .addCase(axiosEditTask.fulfilled, (state, action) => {
        const editedTask = action.payload;
        state.toDoList = state.toDoList.map((task) => {
          if (task._id === editedTask._id) {
            return editedTask;
          }
          return task;
        });
        state.error = null;
      })
      .addCase(axiosEditTask.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const toDoListReducer = toDoListSlice.reducer;
