import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Task } from "../storage/todoSlice";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import "../mainContainer.css";

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

interface BasicModalProps {
  editorTask: Task;
  box: string;
}

export const BasicModal: React.FunctionComponent<BasicModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newText, setNewText] = React.useState("");
  /*   const [newTag, setNewTag] = React.useState(""); */
  console.log("props :>> ", props);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleDeleteTask = (taskID: number) => {
    const actionType = `${props.box}/removeTask`;
    dispatch({ type: actionType, payload: taskID });
  };

  const handleEditTask = (taskID: number, newText: string) => {
    const actionType = `${props.box}/editTask`;
    dispatch({ type: actionType, payload: { id: taskID, text: newText } });
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

          <TextField
            fullWidth
            label="text"
            id="text"
            defaultValue={props.editorTask.text}
            sx={{ marginBottom: "20px" }}
            onBlur={(e) => setNewText(e.target.value)}
          />
          <TextField
            fullWidth
            label="#tag"
            id="tag"
            defaultValue={props.editorTask.tag}
            sx={{ marginBottom: "50px" }}
          />

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteTask(props.editorTask.id)}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>

            <IconButton
              aria-label="done"
              onClick={() => {
                handleEditTask(props.editorTask.id, newText);
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
