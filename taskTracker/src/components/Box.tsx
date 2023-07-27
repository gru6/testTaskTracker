import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Task, addTask, completeTask, removeTask } from "../storage/taskSlice";
import { RootState } from "../storage/store";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
export const Box: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = React.useState("");

  const allTasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleAddBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
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
      <div className="box" id="box-1">
        <div>To do</div>
        <TextField
          id="outlined-basic"
          label="New task"
          variant="outlined"
          size="small"
          onChange={(event) => setNewTaskText(event.target.value)} // получаем текст из input
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
                  onChange={() => dispatch(completeTask(task.id))} // по task.id меняем complete в state у конкретного task
                />

                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => dispatch(removeTask(task.id))}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </li>
            ))}
          </ul>
        }
      </div>
    </>
  );
};
