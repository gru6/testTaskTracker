import * as React from "react";
import "./mainContainer.css";
import { TaskBox } from "./components/TaskBox";
import { useSelector } from "react-redux";
import { RootState } from "./storage/persistStore";
import { FilterModal } from "./components/filterModal";
import { findAllTagsInStore } from "./utils/filterUtils";

export const MainContainer: React.FunctionComponent = () => {
  const todoTasks = useSelector((state: RootState) => state.todo.tasks);
  const scheduleTasks = useSelector((state: RootState) => state.schedule.tasks);
  const delegateTasks = useSelector((state: RootState) => state.delegate.tasks);
  const deleteTasks = useSelector((state: RootState) => state.delete.tasks);

  return (
    <>
      <FilterModal tags={findAllTagsInStore()}></FilterModal>
      <div className="mainContainer">
        <div className="boxContainer">
          <div></div>
          <div>Urgent</div>
          <div>Less urgent</div>
          <div className="vertical-title">Important</div>
          <div className="vertical-title" id="item5">
            Less important
          </div>
          <TaskBox title="To Do" box="todo" tasks={todoTasks} />
          <TaskBox title="Schedule" box="schedule" tasks={scheduleTasks} />
          <TaskBox title="Delegate" box="delegate" tasks={delegateTasks} />
          <TaskBox title="Delete" box="delete" tasks={deleteTasks} />
        </div>
      </div>
    </>
  );
};
