import * as React from "react";
import "./mainContainer.css";
import {Box} from "./components/Box";




export const MainContainer: React.FunctionComponent = () => {


  return (
    <>
      <div className="mainContainer">
        <div className="boxContainer">
          <div></div>
          <div>Important</div>
          <div>Less important</div>
          <div className="vertical-title">Urgent</div>

          <Box/>
          <div className="box" id="box-2">
            Schedule
          </div>

          <div className="vertical-title">Less urgent</div>
          <div className="box" id="box-3">
            Delegate
          </div>

          <div className="box" id="box-4">
            Delete
          </div>
        </div>
      </div>
    </>
  );
};
