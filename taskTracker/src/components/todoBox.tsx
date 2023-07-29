import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  Task,
  addTask,
  completeTask,
  removeTask,
} from "../storage/todoSlice.tsx";
import { RootState } from "../storage/store.tsx";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { BasicModal } from "./Modal.tsx";

interface BoxProps {
  name: string;
  box: string;
}

export const TodoBox: React.FunctionComponent<BoxProps> = (props) => {
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = React.useState("");

  const todoTasks = useSelector((state: RootState) => state.todo.tasks);

  const handleAddBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (newTaskText !== "") {
      const newTask: Task = {
        id: new Date().getTime(),
        text: newTaskText,
        completed: false,
        modal: false,
        tag: [],
      };
      dispatch(addTask(newTask)); //закидываем новую таску в State изменение store через использование редуктора addTask и actions
      setNewTaskText("");
    }
  };

  return (
    <>
      <div className="box" id={props.name}>
        <div>{props.name}</div>
        <TextField
          id="outlined-basic"
          label="New task"
          variant="outlined"
          size="small"
          onChange={(e) => setNewTaskText(e.target.value)} // получаем текст из input
          value={newTaskText}
        />
        <Button variant="contained" size="small" onClick={handleAddBtn}>
          Add
        </Button>
        {
          <ul>
            {todoTasks.map((task) => (
              <li key={task.id}>
                <div className="text-container">
                  <Checkbox
                    size="small"
                    checked={task.completed}
                    onChange={() => dispatch(completeTask(task.id))} // по task.id меняем complete в state у конкретного task
                  />
                  <span
                    className="task-text"
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                </div>

                <div className="task-actions">
                  <BasicModal editorTask={task} />
                  {/* пробрасываем данные task в модальное окно */}
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => dispatch(removeTask(task.id))}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </>
  );
};
