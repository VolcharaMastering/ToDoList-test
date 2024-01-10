/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import TaskButtons from "../TaskButtons/TaskButtons";
import "./TaskBar.scss";

function TaskBar({ gotTask }) {
  return (
    <article className="task-bar">
      <div className="task-bar__header">
        <div className="task-bar__header-box">
          <h2 className="task-bar__title">{gotTask.title}</h2>
          <p className="task-bar__state">{gotTask.state}</p>
        </div>
        {gotTask && <TaskButtons task={gotTask} />}
      </div>
      <p className="task-bar__description">{gotTask.description}</p>
      <div className="task-bar__dates">
        <p className="task-bar__date">создано: {gotTask.addDate}</p>
        <p className="task-bar__date">
          Последнее изменение: {gotTask.lastChangeDate}
        </p>
      </div>
    </article>
  );
}

export default TaskBar;
