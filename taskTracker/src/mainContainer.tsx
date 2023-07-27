import * as React from "react";
import "./mainContainer.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Task, addTask, completeTask } from "./storage/taskSlice";
import { RootState } from "./storage/store";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
export const MainContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = React.useState("");


  const allTasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleAddBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("newTaskText :>> ", newTaskText);
    if (newTaskText !== "") {
      const newTask: Task = {
        id: new Date().getTime(),
        text: newTaskText,
        completed: false,
      };
      dispatch(addTask(newTask)); //закидываем новую таску в State
      setNewTaskText("");
      console.log("allTasks :>> ", allTasks);
    }
    
  };

  return (
    <>
      <div className="mainContainer">
        <div className="boxContainer">
          <div></div>
          <div>Important</div>
          <div>Less important</div>
          <div className="vertical-title">Urgent</div>

          <div className="box" id="box-1">
            <div>To do</div>
            <TextField
              id="outlined-basic"
              label="New task"
              variant="outlined"
              size="small"
              onChange={(event)=>setNewTaskText(event.target.value)} // получаем текст из input
              value={newTaskText}
            />
            <Button variant="contained" size="small" onClick={handleAddBtn}>
              Add
            </Button>
            {
              <ul>
                {allTasks.map((task) => (
                  <li key={task.id}>
                    <Checkbox
                      size="small"
                      checked={task.completed}
                      onChange={()=> dispatch(completeTask(task.id))} // по task.id меняем complete в state у конкретного task
                    />

                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.text}
                    </span>

                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    {/* { {!task.completed && (
                    <button onClick={() => handleCompleteTask(task.id)}>
                      Complete
                    </button>
                  )}
                  <button onClick={() => handleRemoveTask(task.id)}>
                    Remove
                  </button> } */}
                  </li>
                ))}
              </ul>
            }
          </div>
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
