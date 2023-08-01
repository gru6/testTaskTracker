import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Task } from "../storage/todoSlice";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import "../mainContainer.css";
import {
  delHashTagSymbol,
  findHashTag,
  handleDeleteTask,
  highlightHashTag,
} from "../utils/taskUtils";
import { addFilterTag } from "../storage/filterSlice";

const containerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EditModalProps {
  editorTask: Task;
  box: string;
  id: number;
}

export const EditModal: React.FunctionComponent<EditModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newText, setNewText] = React.useState(props.editorTask.fullText);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleEditTask = (
    taskID: number,
    newText: string,
    newTag: string[]
  ) => {
    const actionType = `${props.box}/editTask`;
    dispatch({
      type: actionType,
      payload: {
        id: taskID,
        fullText: newText,
        text: delHashTagSymbol(newText),
        tag: newTag,
      },
    });
    dispatch(addFilterTag({ filter: [] })); // при редактировании tag сбрасываем его в store
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ minWidth: "0px" }}>
        <EditIcon fontSize="inherit" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box sx={containerStyle}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ textAlign: "center", marginBottom: "20px" }}
          >
            Task
          </Typography>

          {/* было так до contentEditable      
              <TextField
            fullWidth
            label="text"
            id="text"
            value={highlightHashTag(props.editorTask.fullText)}
            sx={{ marginBottom: "50px" }}
            onBlur={(e) => setNewText(e.target.value)}
          /> */}

          {/* TODO консоль ругается на contentEditable */}
          <div
            className="div-input"
            contentEditable="true"
            onBlur={(e) => setNewText(e.target.textContent || "")}
          >
            {highlightHashTag(props.editorTask.fullText)}
          </div>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <IconButton
              aria-label="delete"
              onClick={() =>
                handleDeleteTask(
                  dispatch,
                  props.editorTask.id,
                  props.editorTask.tag,
                  props.box
                )
              }
            >
              <DeleteIcon fontSize="large" />
            </IconButton>

            <IconButton
              aria-label="done"
              onClick={() => {
                handleEditTask(
                  props.editorTask.id,
                  newText,
                  findHashTag(newText)
                );
                setOpen(false);
              }}
            >
              <CheckCircleOutlineIcon fontSize="large" />
            </IconButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
