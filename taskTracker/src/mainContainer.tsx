import * as React from "react";
import "./mainContainer.css";
import { TodoBox } from "./components/todoBox";
import { SheduleBox } from "./components/ScheduleBox";
import { DelegateBox } from "./components/DelegateBox";
import { DeleteBox } from "./components/DeleteBox";

export const MainContainer: React.FunctionComponent = () => {
  return (
    <>
      <div className="mainContainer">
        <div className="boxContainer">
          <div></div>
          <div>Important</div>
          <div>Less important</div>
          <div className="vertical-title">Urgent</div>
          <TodoBox name="To Do" box="todoTasks" />
          <SheduleBox name="Schedule" box="scheduleTasks" />
          <div className="vertical-title">Less urgent</div>
          <DelegateBox name="Delegate" box="delegateTasks" />
          <DeleteBox name="Delete" box="deleteTasks" />
        </div>
      </div>
    </>
  );
};
