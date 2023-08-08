import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../storage/todoSlice.tsx";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { EditModal } from "./editModal.tsx";
import {
  delHashTagSymbol,
  findHashTag,
  handleDeleteTask,
} from "../utils/taskUtils.tsx";
import { RootState } from "../storage/persistStore";

interface BoxProps {
  title: string;
  box: string;
  tasks: Task[];
}

export const TaskBox: React.FunctionComponent<BoxProps> = (props) => {
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = React.useState("");

  const filteredTags = useSelector((state: RootState) => state.filter);

  const filteredTasks = props.tasks.filter((task) => {
    if (filteredTags.length > 0) {
      return filteredTags.some((tag) => task.tag.includes(tag));
    } else return true;
  });

  const handleAddBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (newTaskText !== "") {
      const newTask: Task = {
        id: new Date().getTime(),
        fullText: newTaskText,
        text: delHashTagSymbol(newTaskText),
        completed: false,
        modal: false,
        tag: findHashTag(newTaskText),
        filteredtags: [],
      };
      //закидываем новую таску в State изменение store через использование редуктора addTask и actions
      const actionType = `${props.box}/addTask`;
      dispatch({ type: actionType, payload: newTask });
      setNewTaskText("");
    }
  };

  const handleCompleteTask = (taskID: number) => {
    const actionType = `${props.box}/completeTask`;
    dispatch({ type: actionType, payload: taskID });
  };

  return (
    <>
      <div className="box" id={props.title}>
        <div className="bg-text">{props.title}</div>
        <div className="input-container">
          <TextField
            id="outlined-basic"
            label="New task"
            variant="outlined"
            size="small"
            onChange={(e) => setNewTaskText(e.target.value)} // получаем текст из input
            value={newTaskText}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleAddBtn}
            sx={{ marginLeft: "10px" }}
          >
            Add
          </Button>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <div className="task-container">
                <Checkbox
                  size="small"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id)} // по task.id меняем complete в state у конкретного task
                />

                <div className="text-container">
                  <span
                    className="task-text"
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>

                  <div className="task-tag">
                    {task.tag.map((tag) => tag + " ")}
                  </div>
                </div>

                <div className="task-actions">
                  <EditModal box={props.box} editorTask={task} id={task.id} />
                  {/* пробрасываем данные task в модальное окно */}
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() =>
                      handleDeleteTask(dispatch, task.id, task.tag, props.box)
                    }
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
