/* eslint-disable react/prop-types */
import { useState } from "react";
import "./TaskButtons.scss";
import { updateTask } from "../../api/toDoListApi";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import { useEffect } from "react";

function TaskButtons({ task, setTask }) {
  const [taskPopup, setTaskPopup] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState();

  const handleUpdateTask = () => {
    setTaskPopup(true);
  };
  const toggleState = async () => {
    if (task.state != "in_process") {
      task.state = "in_process";
    } else {
      task.state = "paused";
    }
    setTask(await updateTask(task._id, task));
  };
  const handleConfirm = () => {
    setConfirmPopup(true);
  };

  // useEffect(() => {
  //   console.log("TASKSTATE", task.state, task);
  // }, [task]);

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
        onClick={handleConfirm}
        aria-label="Pause task"
      ></button>

      {confirmPopup && <ConfirmPopup task={task._id} />}
    </div>
  );
}

export default TaskButtons;
