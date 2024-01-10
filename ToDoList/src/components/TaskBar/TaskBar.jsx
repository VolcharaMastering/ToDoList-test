/* eslint-disable react/prop-types */

import { useState } from "react";
import TaskButtons from "../TaskButtons/TaskButtons";
import "./TaskBar.scss";
import { useEffect } from "react";

function TaskBar({ gotTask }) {
  const [task, setTask] = useState(gotTask);

  return (
    <article className="task-bar">
      <div className="task-bar__header">
        <div className="task-bar__header-box">
          <h2 className="task-bar__title">{task.title}</h2>
          <p className="task-bar__state">{task.state}</p>
        </div>
        {task && <TaskButtons task={task} setTask={setTask} />}
      </div>
      <p className="task-bar__description">{task.description}</p>
      <div className="task-bar__dates">
        <p className="task-bar__date">создано: {task.addDate}</p>
        <p className="task-bar__date">
          Последнее изменение: {task.lastChangeDate}
        </p>
      </div>
    </article>
  );
}

export default TaskBar;
