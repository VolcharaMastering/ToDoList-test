import axios from "axios";

const url = "http://localhost:3000";
const getToDoList = async () => {
  try {
    const data = await axios.get(url);
    console.log("API data", data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const addTask = async (taskData) => {
  try {
    const data = await axios.post(`${url}/task`, {
      taskData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateTask = async (taskId, taskData) => {
  try {
    const data = await axios.put(`${url}/task/:${taskId}`, {
      taskData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteTask = async (taskId) => {
  try {
    const data = await axios.delete(`${url}/task/:${taskId}`, {
      taskId,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// export { getToDoList };
export { getToDoList, addTask, updateTask, deleteTask };
