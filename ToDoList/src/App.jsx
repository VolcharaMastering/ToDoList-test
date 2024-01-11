import { useSelector } from "react-redux";
import "./App.scss";
import TaskSector from "./components/TaskSector/TaskSector";
import TheHeader from "./components/TheHeader/TheHeader";

function App() {
  return (
    <>
      <main className="main">
        <TheHeader />
        <TaskSector />
      </main>
    </>
  );
}

export default App;
