import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React, { useState } from "react";
import ErrorAlert from "../../Common/ErrorAlert";
import { getUniqueId } from "../../Common/Constants";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  editItem,
  getRecipe,
  handlePrimitiveState,
} from "../../redux/slices/recipeSlice";
import moment from "moment";
import { handleNext } from "../../redux/slices/userSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PrimaryDetails = (props) => {
  const initialIngredientValues = { id: "", title: "", imgSrc: "" };
  const [ingredient, setIngredient] = useState(initialIngredientValues);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [snackopen, setsnackOpen] = useState(false);
  const [ingredientEdit, setIngredientEdit] = useState(false);
  const navigate = useNavigate();
  const recipe = useSelector(getRecipe);
  const dispatch = useDispatch();
  console.log(recipe);

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
    dispatch(handlePrimitiveState({ name, value }));
  };

  const handleIngredientChanges = (e) => {
    const { name, value } = e.target;
    if (name == "title") {
      setIngredient({ ...ingredient, [name]: value });
    } else {
      let img = URL.createObjectURL(e.target.files[0]);
      setIngredient({ ...ingredient, [name]: img });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(handleValidation(recipe)).length !== 0) {
      setErrorText(Object.values(handleValidation(recipe))[0]);
      setsnackOpen(true);
    } else {
      dispatch(handlePrimitiveState({ name: "id", value: getUniqueId() }));
      dispatch(
        handlePrimitiveState({ name: "createdAt", value: moment().format() })
      );
      dispatch(handleNext());
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
        createdAt: moment().format(),
      };
      dispatch(addItem({ name: "ingredients", value: ing }));
      handleClose();
    }
  };

  const handleEditIngredient = () => {
    if (!ingredient.title) {
      setErrorText("Enter title of the Ingredient");
      setsnackOpen(true);
    } else if (!ingredient.imgSrc) {
      setErrorText("Please upload the Ingredient image");
      setsnackOpen(true);
    } else {
      let ing = {
        id: ingredient.id,
        title: ingredient.title,
        imgSrc: ingredient.imgSrc,
        createdAt: moment().format(),
      };
      dispatch(editItem({ name: "ingredients", value: ing }));
      handleClose();
      setIngredientEdit(false);
    }
  };

  const handleValidation = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter the title of your recipe";
    }
    if (!values.type) {
      errors.type = "Please enter the type of your recipe";
    }
    if (values.ingredients.length < 1) {
      errors.description = "Add minimum one ingredient";
    }
    return errors;
  };

  return (
    <Box component="main" sx={{ px: 1, py: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
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
            value={recipe.title}
            onChange={handleChanges}
          />
        </Grid>
        <Grid item xs={12} md={6} key={ingredient.id}>
          <Typography
            variant="subtitle2"
            sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
          >
            Type
          </Typography>
          <Select
            value={recipe.type || ""}
            displayEmpty
            name="type"
            sx={{ width: "100%" }}
            renderValue={(selected) => {
              if (!Boolean(selected)) {
                return <p style={{ color: "rgb(191 191 191)" }}>Eg: Non-Veg</p>;
              }
              return selected;
            }}
            onChange={handleChanges}
          >
            <MenuItem value={"Veg"}>Veg</MenuItem>
            <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
            <MenuItem value={"Egg"}>Egg</MenuItem>
            <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
            <MenuItem value={"Snacks"}>Snacks</MenuItem>
            <MenuItem value={"Beverage"}>Beverage</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Box sx={{ height: "10px" }}></Box>
      <Typography
        variant="subtitle2"
        //   color="#fff"
        sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
      >
        Ingredients
      </Typography>
      <Grid container spacing={1}>
        {recipe.ingredients.length > 0 &&
          recipe.ingredients.map((ingredient) => {
            return (
              <Grid
                item
                xs={6}
                md={3}
                key={ingredient.id}
                onClick={() => {
                  setIngredient(ingredient);
                  setModalOpen(true);
                  setIngredientEdit(true);
                }}
              >
                <ImgWithLabelCard
                  imgSrc={ingredient.imgSrc}
                  title={ingredient.title}
                />
              </Grid>
            );
          })}
        <Grid item xs>
          <Box
            sx={{
              border: "2px solid rgba(0, 0, 0, 0.1)",
              height: 120,
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
        </Grid>
      </Grid>
      <Box
        sx={{
          margin: "20px 0px 10px 0px",
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/home")}>
            Cancel
          </Button>
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
        <AppBar>
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
              {ingredientEdit ? "Edit " : "Add"} Ingredient
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                if (ingredientEdit) {
                  handleEditIngredient();
                } else {
                  handleSaveIngredient();
                }
              }}
            >
              {ingredientEdit ? "Update " : "Save"}
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
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
                textTransform: "none",
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
                  type="file"
                  name="imgSrc"
                  capture
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
