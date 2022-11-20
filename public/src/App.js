import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { userScehma } from "./Validation/schema";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

import { AiOutlineClose } from "react-icons/ai";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function App() {
  const [isModal, setIsModal] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [list, setList] = useState([]);

  const listOfItems = async () => {
    try {
      const isValid = await userScehma.validate(data);
      console.log(isValid);
      setList((old) => {
        return [...old, data];
      });
      setData({
        name: "",
        email: "",
        comment: "",
      });

      setIsModal(true);
    } catch (err) {
      setValidationError(err.errors[0]);
    }
  };

  return (
    <div className="container" style={{ padding: 10 }}>
      {validationError.length > 1 && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setValidationError("");
                }}
              >
                <AiOutlineClose />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {validationError}
          </Alert>
        </Stack>
      )}

      <div className="row">
        <div className="col-4" style={{ marginTop: "6rem" }}>
          <h2>Upcoming Meetings</h2>
          {list.map((test) => {
            return (
              <div style={{ fontSize: "20px", fontFamily: "cursive" }}>
                {test.name}

                <h3>15 min meeting !</h3>

                {test.email}
                <br />
                {test.comment}
                <br />
              </div>
            );
          })}
        </div>
        <div className="col-8" style={{ marginTop: "6rem" }}>
          <h3>Enter Details</h3>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "75ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              id="outlined-basic-name"
              label="Name*"
              name="name"
              value={data.name}
              onChange={(e) =>
                setData((state) => {
                  return { ...state, name: e.target.value };
                })
              }
              variant="outlined"
            />

            <TextField
              id="outlined-basic-email"
              label="Email*"
              name="email"
              variant="outlined"
              value={data.email}
              onChange={(e) =>
                setData((state) => {
                  return { ...state, email: e.target.value };
                })
              }
            />
          </Box>

          <Button onClick={handleOpen} variant="outlined">
            Add Guest
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles}>
              <TextField
                id="outlined-basic-email"
                label="Email*"
                variant="outlined"
              />
            </Box>
          </Modal>
          <div className="form-floating mt-4">
            <h5>
              Please share everything that will help prepare for our meeting.
            </h5>

            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              value={data.comment}
              name="comment"
              onChange={(e) =>
                setData((state) => {
                  return { ...state, comment: e.target.value };
                })
              }
              style={{ height: "100px" }}
            ></textarea>

            <Stack className="mt-3" spacing={2} direction="row">
              <Button variant="contained" onClick={() => listOfItems()}>
                Schedule Event
              </Button>
            </Stack>
          </div>
        </div>
      </div>

      <Modal
        open={isModal}
        onClose={() => setIsModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...styles, width: 400 }}>
          <h2 id="parent-modal-title">Your Meeting has been created Successfully</h2>
          <p>Name : {list[list.length - 1]?.name}</p>
          <p> Email : {list[list.length - 1]?.email}</p>
          <p> Comment : {list[list.length - 1]?.comment}</p>
        </Box>
      </Modal>
    </div>
  );
}
