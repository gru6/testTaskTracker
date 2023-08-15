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
  const [validDrop, setValidDrop] = React.useState(false);
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
      };
      //закидываем новую таску в Store через использование редуктора addTask и actions
      const actionType = `${props.box}/addTask`;
      dispatch({ type: actionType, payload: newTask });
      setNewTaskText("");
    }
  };

  const handleCompleteTask = (taskID: number) => {
    const actionType = `${props.box}/completeTask`;
    dispatch({ type: actionType, payload: taskID });
  };

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.currentTarget.className === "box") {
      e.currentTarget.style.boxShadow = "2px 2px 3px grey";
      setValidDrop(true);
    }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void {
    if (e.currentTarget.className === "box") {
      e.currentTarget.style.boxShadow = "none";
    }
  }

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    task: Task
  ): void {
    // save the task data in the dataTransfer object
    e.dataTransfer.setData("text/plain", JSON.stringify(task));
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, box: string): void {
    e.preventDefault();
    // получаем transferred
    const transferredData = e.dataTransfer.getData("text/plain");
    if (transferredData) {
      const draggedTask = JSON.parse(transferredData) as Task;  //распаршиваем
      const actionType = `${box}/droppedTask`;       // закидываем в нужный box в Store
      dispatch({ type: actionType, payload: draggedTask });
    }
    if (e.currentTarget.className === "box") {
      e.currentTarget.style.boxShadow = "none";
    }
  }

  function dragEndHandler(
    box: string,
    task: Task
  ): void {
    // удаляем task из начального box если drop в valid zone
    if (validDrop) {
      const actionType = `${box}/removeTask`; 
      dispatch({ type: actionType, payload: task.id });
    }
    // Reset the validDrop state
    setValidDrop(false);
  }

  return (
    <>
      <div
        className="box"
        id={props.title}
        onDragOver={(e) => dragOverHandler(e)} // перетаскивается над допустимой зоной
        onDragLeave={(e) => dragLeaveHandler(e)} // покидает допустимую область сброса
        onDrop={(e) => dropHandler(e, props.box)} //элемент сброшен
      >
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
          {filteredTasks.reverse().map((task) => (
            <li key={task.id}>
              <div
                className="task-container"
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, task)} // начал перетаскивание
                onDragEnd={() => dragEndHandler(props.box, task)} //завершилось перетаскивание
              >
                <Checkbox
                  size="small"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id)} // по task.id меняем complete в Store у конкретного task
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
