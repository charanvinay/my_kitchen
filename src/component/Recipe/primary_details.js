import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Grid,
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
import { Timestamp } from "firebase/firestore";
import ErrorAlert from "../../Common/ErrorAlert";
import { getUniqueId } from "../../Common/Constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrimaryDetails = () => {
  const initialValues = { title: "", ingredients: [] };
  const initialIngredientValues = { title: "", imgSrc: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [ingredient, setIngredient] = useState(initialIngredientValues);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [snackopen, setsnackOpen] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackOpen(false);
  };

  const handleClickOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setIngredient(initialIngredientValues);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleIngredientChanges = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    if (name == "title") {
      setIngredient({ ...ingredient, [name]: value });
    } else {
      // console.log(e);
      let img = URL.createObjectURL(e.target.files[0]);
      setIngredient({ ...ingredient, [name]: img });
    }
    // console.log(ingredient);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(handleValidation(formValues)).length !== 0) {
      setErrorText(Object.values(handleValidation(formValues))[0]);
      setsnackOpen(true);
    } else {
      let form = {
        id: getUniqueId(),
        title: formValues.title,
        ingredients: formValues.ingredients,
        createdAt: Timestamp.now(),
      };
      setformValues(form);
      console.log(formValues);
    }
  };

  const handleSaveIngredient = () => {
    if (!ingredient.title) {
      setErrorText("Enter title of the Ingredient");
      setsnackOpen(true);
    } else if (!ingredient.imgSrc) {
      setErrorText("Please upload the Ingredient image");
      setsnackOpen(true);
    } else {
      let ing = {
        id: getUniqueId(),
        title: ingredient.title,
        imgSrc: ingredient.imgSrc,
        createdAt: Timestamp.now(),
      };
      let form = formValues;
      form.ingredients.push(ing);
      setformValues(form);
      console.log(form);
      handleClose();
    }
  };

  const handleValidation = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter the title of your recipe";
    }
    if (values.ingredients.length < 2) {
      errors.description = "Add minimum two ingredients";
    }
    return errors;
  };

  return (
    <Box component="main" sx={{ px: 1, py: 2 }}>
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
      <Grid container spacing={2}>
        {formValues.ingredients.length > 0 &&
          formValues.ingredients.map((ingredient) => {
            return (
              <Grid item xs={6} md={3} key={ingredient.id}>
                <Card sx={{ width: "100%" }}>
                  <Stack
                    direction="column"
                    spacing={1}
                    height={120}
                    sx={{ position: "relative" }}
                  >
                    <Box sx={{ width: "100%", height: "100%" }}>
                      <img
                        src={ingredient.imgSrc}
                        alt={ingredient.src}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          position: "absolute",
                          bottom: 0,
                          width: "100%",
                          textAlign: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {ingredient.title}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Box sx={{ height: "20px" }}></Box>
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
        open={modalOpen}
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
            <Button autoFocus color="inherit" onClick={handleSaveIngredient}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ marginY: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ letterSpacing: 0.6 }}>
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
                name="title"
                value={ingredient.title}
                onChange={handleIngredientChanges}
              />
            </Box>
            {ingredient && (
              <img
                src={ingredient.imgSrc}
                alt={ingredient.name}
                loading="lazy"
              />
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
                  name="imgSrc"
                  onChange={handleIngredientChanges}
                />
              </Stack>
            </Button>
          </Stack>
        </Container>
      </Dialog>
      <ErrorAlert
        snackopen={snackopen}
        handleClose={handleCloseSnackbar}
        text={errorText}
      />
    </Box>
  );
};

export default PrimaryDetails;
