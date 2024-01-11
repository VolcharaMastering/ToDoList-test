/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import "./TaskButtons.scss";
import {
  axiosDeleteTask,
  axiosEditTask,
  axiosToDoList,
} from "../../store/slices/toDoListSlice";
import { openPopup } from "../../store/slices/togglePopupSlice";
import PopupForm from "../PopupForm/PopupForm";

function TaskButtons({ task }) {
  const isPopupOpen = useSelector(
    (state) => state.popup.updateTaskPopup[task._id]
  );
  const dispatch = useDispatch();
  const openUpdateTaskPopup = () => {
    dispatch(
      openPopup({ popupType: "updateTask", isOpen: true, taskId: task._id })
    );
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
      console.error("Error updating task:", error);
    }
  };
  const setDoneState = async () => {
    try {
      dispatch(
        axiosEditTask({
          taskId: task._id,
          taskData: { ...task, state: "done" },
        })
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleDeleteTask = async () => {
    try {
      await dispatch(axiosDeleteTask(task._id));
      await dispatch(axiosToDoList());
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      {isPopupOpen && (
        <PopupForm title={`Изменить ${task.title}`} data={task} />
      )}
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
          className={`taskButton__button  taskButton__button_done ${
            task.state === "done" && "taskButton__button_inactive"
          }`}
          type="button"
          onClick={setDoneState}
          aria-label="Done task"
        ></button>
        <button
          className="taskButton__button taskButton__button_edit"
          type="button"
          onClick={openUpdateTaskPopup}
          aria-label="Update task"
        ></button>
        <button
          className="taskButton__button taskButton__button_delete"
          type="button"
          onClick={handleDeleteTask}
          aria-label="Delete task"
        ></button>
      </div>
    </>
  );
}

export default TaskButtons;
