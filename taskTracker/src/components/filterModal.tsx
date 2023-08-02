import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "../mainContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/persistStore";
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

interface FilterModalProps {
  tags: string[];
}

export const FilterModal: React.FunctionComponent<FilterModalProps> = (
  props
) => {
  const [open, setOpen] = React.useState(false);

  const filteredTag = useSelector((state: RootState) => state.filter);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTag = event.target.name;

    if (event.target.checked) {
      // закидываем в store фильтрующие tags
      dispatch(addFilterTag({ filter: [...filteredTag, checkedTag] }));
    } else {
      // убираем из store фильтрующие tags по checkbox
      dispatch(
        addFilterTag({
          filter: filteredTag.filter((tag) => tag !== checkedTag),
        })
      );
    }
  };

  return (
    <div style={{ paddingLeft: "30px" }}>
      <Button
        onClick={handleOpen}
        sx={{ minWidth: "0px", marginBottom: "10px" }}
        variant="contained"
        size="small"
      >
        Filter
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
            Chose #tags
          </Typography>

          <FormControl component="fieldset">
            <FormGroup>
              {props.tags.length === 0 ? (
                <div>No tags</div>
              ) : (
                props.tags.map((tag) => (
                  <FormControlLabel
                    key={tag}
                    control={<Checkbox />}
                    label={tag}
                    checked={filteredTag.includes(tag)}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => handleCheckboxChange(e)}
                    name={tag}
                  />
                ))
              )}
            </FormGroup>
          </FormControl>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              aria-label="done"
              onClick={() => {
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
