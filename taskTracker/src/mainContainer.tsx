import * as React from "react";
import "./mainContainer.css";
import { TaskBox } from "./components/TaskBox";
import { useSelector } from "react-redux";
import { RootState } from "./storage/store";

export const MainContainer: React.FunctionComponent = () => {
  const todoTasks = useSelector((state: RootState) => state.todo.tasks);
  const scheduleTasks = useSelector((state: RootState) => state.sсhedule.tasks);
  const delegateTasks = useSelector((state: RootState) => state.delegate.tasks);
  const deleteTasks = useSelector((state: RootState) => state.delete.tasks);

  return (
    <>
      <div className="mainContainer">
        <div className="boxContainer">
          <div></div>
          <div>Important</div>
          <div>Less important</div>
          <div className="vertical-title">Urgent</div>
          <div className="vertical-title" id="item5">
            Less urgent
          </div>
          <TaskBox name="To Do" box="todoTasks" tasks={todoTasks} />
          <TaskBox
            name="Schedule"
            box="scheduleTasks"
            tasks={scheduleTasks}
          />
          <TaskBox
            name="Delegate"
            box="delegateTasks"
            tasks={delegateTasks}
          />
          <TaskBox name="Delete" box="deleteTasks" tasks={deleteTasks} />
        </div>
      </div>
    </>
  );
};
