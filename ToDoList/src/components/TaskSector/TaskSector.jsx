import { useEffect, useState } from "react";
import { getToDoList } from "../../api/toDoListApi";
import TaskBar from "../TaskBar/TaskBar";
import "./TaskSector.scss";

function TaskSector() {
  const [toDoList, setToDoList] = useState();

  const apiRequest = async () => {
    const gotTasks = await getToDoList();
    setToDoList(gotTasks);
    console.log("inFunc", gotTasks);
  };
  useEffect(() => {
    apiRequest();
  }, []);
  useEffect(() => {
    console.log("effect ", toDoList);
  }, [toDoList]);
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
