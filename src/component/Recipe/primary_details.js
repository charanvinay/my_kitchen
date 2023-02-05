import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React, { useState } from "react";
import { db, auth } from "../../services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrimaryDetails = () => {
  const initialValues = { title: "", description: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const navigate = useNavigate();
  const bpSMd = theme.breakpoints.down("sm"); //max-width:599.95px
  const bpXLd = theme.breakpoints.down("xl"); //max-width:1535.95px

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(handleValidation(formValues));
    console.log(handleValidation(formValues));
    if (Object.values(handleValidation(formValues)).length !== 0) {
      alert(Object.values(handleValidation(formValues))[0]);
    } else {
      handleAdd(formValues);
    }
  };

  const handleAdd = async (formValues) => {
    try {
      await addDoc(collection(db, "tasks"), {
        title: formValues.title,
        description: formValues.description,
        completed: false,
        created: Timestamp.now(),
        uid: user?.uid,
      });
      navigate(`/`);
    } catch (err) {
      alert(err);
    }
  };

  const handleValidation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.title) {
      errors.title = "title is required";
    }
    if (!values.description) {
      errors.description = "description is required";
    }
    return errors;
  };

  const handleImages = (e) => {
    console.log(e);
    console.log(e.target.files);
    let img = URL.createObjectURL(e.target.files[0]);
    console.log(img);
    setUploadedImage(img);
  };

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Typography
        variant="subtitle2"
        sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
      >
        Title
      </Typography>

      <TextField
        InputProps={{
          style: {
            letterSpacing: 0.6,
          },
          placeholder: "Eg: Chicken Biryani ",
        }}
        fullWidth
        variant="outlined"
        name="title"
        value={formValues.title}
        onChange={handleChanges}
      />
      <Box sx={{ height: "10px" }}></Box>
      <Typography
        variant="subtitle2"
        //   color="#fff"
        sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
      >
        Ingredients
      </Typography>
      <Box
        sx={{
          border: "2px solid rgba(0, 0, 0, 0.1)",
          height: "100px",
          borderRadius: "1",
          borderStyle: "dashed",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleClickOpen}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: "rgba(0, 0, 0, 0.3)" }}
        >
          + Add Ingredient
        </Typography>
      </Box>

      <Box
        sx={{
          margin: "20px 0px 10px 0px",
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Cancel</Button>

          <Button variant="contained" onClick={handleSubmit}>
            Next
          </Button>
        </Stack>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Ingredient
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ marginY: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ letterSpacing: 0.6 }}
              >
                Name
              </Typography>
              <TextField
                InputProps={{
                  style: {
                    letterSpacing: 0.6,
                  },
                  placeholder: "Eg: Chilli Powder",
                }}
                fullWidth
                variant="outlined"
                name="name"
                value={formValues.name}
                onChange={handleChanges}
              />
            </Box>
            {uploadedImage && (
              <img src={uploadedImage} alt={uploadedImage} loading="lazy" />
            )}
            <Button
              component="label"
              sx={{
                border: "2px solid rgba(0, 0, 0, 0.1)",
                height: "50vh",
                borderRadius: "1",
                borderStyle: "dashed",
                "&:hover": {
                  backgroundColor: "transparent",
                  borderStyle: "dashed",
                  outline: "none",
                },
              }}
            >
              <Stack direction="row" spacing={1}>
                <PhotoCamera sx={{ color: "rgba(0, 0, 0, 0.2)" }} />
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: "rgba(0, 0, 0, 0.3)" }}
                >
                  Upload Image
                </Typography>
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleImages}
                />
              </Stack>
            </Button>
          </Stack>
        </Container>
      </Dialog>
    </Box>
  );
};

export default PrimaryDetails;
