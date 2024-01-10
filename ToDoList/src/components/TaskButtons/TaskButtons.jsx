/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./TaskButtons.scss";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import {
  axiosDeleteTask,
  axiosEditTask,
  axiosToDoList,
} from "../../store/slices/toDoListSlice";

function TaskButtons({ task }) {
  const dispatch = useDispatch();

  const [taskPopup, setTaskPopup] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState();

  const handleUpdateTask = () => {
    setTaskPopup(true);
  };
  const toggleState = async () => {
    const sendState = task.state != "in_process" ? "in_process" : "paused";

    try {
      dispatch(
        axiosEditTask({
          taskId: task._id,
          taskData: { ...task, state: sendState },
        })
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleConfirm = () => {
    setConfirmPopup(true);
  };
  const handleDeleteTask = async () => {
    try {
      dispatch(axiosDeleteTask(task._id));
      dispatch(axiosToDoList());
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    // task &&
    <div className="taskButton">
      {task.state != "in_process" ? (
        <button
          className="taskButton__button taskButton__button_start"
          type="button"
          onClick={toggleState}
          aria-label="Start task"
        ></button>
      ) : (
        <button
          className="taskButton__button taskButton__button_pause"
          type="button"
          onClick={toggleState}
          aria-label="Pause task"
        ></button>
      )}

      <button
        className={`taskButton__button  taskButton__button_done ${task.state} === "done" && "taskButton__button_inactive"`}
        type="button"
        onClick={handleConfirm}
        aria-label="Done task"
      ></button>
      <button
        className="taskButton__button taskButton__button_edit"
        type="button"
        onClick={handleUpdateTask}
        aria-label="Update task"
      ></button>
      <button
        className="taskButton__button taskButton__button_delete"
        type="button"
        onClick={handleDeleteTask}
        aria-label="Delete task"
      ></button>

      {confirmPopup && <ConfirmPopup task={task._id} />}
    </div>
  );
}

export default TaskButtons;
