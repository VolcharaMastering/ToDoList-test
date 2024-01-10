import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TaskSector.scss";

import { axiosToDoList } from "../../store/slices/toDoListSlice";
import TaskBar from "../TaskBar/TaskBar";

function TaskSector() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.toDoList.toDoList);
  const [toDoList, setToDoList] = useState();

  const apiRequest = async () => {
    setToDoList(tasks);
  };
  useEffect(() => {
    dispatch(axiosToDoList());
  }, []);
  useEffect(() => {
    apiRequest();
    console.log("effect ", toDoList);
  }, [tasks]);
  return toDoList ? (
    <section className="task-sector">
      {toDoList.map((task) => (
        <TaskBar key={task._id} gotTask={task} />
      ))}
    </section>
  ) : (
    <h1>No TASKS</h1>
  );
}

export default TaskSector;
