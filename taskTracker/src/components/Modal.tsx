import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Task, editTask, removeTask } from "../storage/todoSlice";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
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
  height: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  editorTask: Task;
}

export const BasicModal: React.FunctionComponent<BasicModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newText, setNewText] = React.useState("");
/*   const [newTag, setNewTag] = React.useState(""); */

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={handleOpen}>
        {" "}
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

          <Grid container columns={2}>
            <Grid xs={1} sx={{ textAlign: "center" }}>
              <IconButton
                aria-label="delete"
                onClick={() => dispatch(removeTask(props.editorTask.id))}   
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid xs={1} sx={{ textAlign: "center" }}>
              <IconButton
                aria-label="done"
                onClick={() => {
                  dispatch(
                    editTask({ id: props.editorTask.id, text: newText })
                  );
                  setOpen(false);
                }}
              >
                <CheckCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
