import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import CKeditor from "../../Common/Skeletons/CKeditor";
import Step from "../../Common/Skeletons/Step";
import CompleteRecipe from "./complete_recipe";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  editFinish,
  getRecipe,
  handleFinishValidation,
} from "../../redux/slices/recipeSlice";
import { getLoggedUser, handleBack } from "../../redux/slices/userSlice";

const CKeditorRender = lazy(() => import("../../Common/CKEditorComp.js"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Finish = (props) => {
  const [displayEditors, setDisplayEditors] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipe = useSelector(getRecipe);
  const loggedUser = useSelector(getLoggedUser);

  const handleClickOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayEditors(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChanges = (val, type) => {
    let v = val;
    if (type === "image") {
      v = URL.createObjectURL(val);
    }
    dispatch(editFinish({ val: v, type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleFinishValidation());
    let errors = handleValidation();
    if (!errors.includes(false)) {
      goToNextPage();
    }
  };

  const goToPreviousPage = () => {
    dispatch(handleBack());
  };

  const goToNextPage = () => {
    handleClickOpen();
  };

  const handleValidation = () => {
    let errors = [];
    if (!Boolean(recipe.finish.value) || !Boolean(recipe.finish.imgSrc)) {
      errors.push(false);
    }
    return errors;
  };

  const handleFinish = async () => {
    try {
      let recipe_obj = {
        uid: loggedUser.uid,
        name: loggedUser.name,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        ...recipe,
      };
      console.log(recipe_obj);
      await addDoc(collection(db, "recipes"), recipe_obj);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };
  return (
    <Box component="main" sx={{ px: 1, py: 2 }}>
      {displayEditors ? (
        <>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
            >
              Final Step
            </Typography>
            <Suspense fallback={<CKeditor />}>
              <div className="ckeditor" style={{ position: "relative" }}>
                <CKeditorRender
                  value={recipe.finish.value}
                  id={recipe.finish.id}
                  handleChanges={(id, val, editor) => {
                    handleChanges(val, editor);
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    top: 9,
                    right: 9,
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      minWidth: "20px",
                      color: grey[700],
                      padding: "0px 6px",
                    }}
                  >
                    <ImageIcon color="black" />
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      name="imgSrc"
                      onChange={(e) =>
                        handleChanges(e.target.files[0], "image")
                      }
                    />
                  </Button>
                  <Button
                    component="label"
                    sx={{
                      minWidth: "20px",
                      padding: "1px 0px 0px 0px",
                      color: grey[700],
                    }}
                  >
                    <CameraAltIcon color="black" />
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      capture="user"
                      name="imgSrc"
                      onChange={(e) =>
                        handleChanges(e.target.files[0], "image")
                      }
                    />
                  </Button>
                </Box>
              </div>
            </Suspense>
            {recipe.finish.errors.length > 0 && (
              <Typography variant="caption" color="error">
                {recipe.finish.errors[0]?.message}
              </Typography>
            )}
            <Box sx={{ marginY: "15px" }}>
              {recipe.finish.imgSrc && <Divider />}
            </Box>
            <Grid container spacing={2}>
              {recipe.finish.imgSrc && (
                <Grid item xs={12} md>
                  <ImgWithLabelCard
                    imgSrc={recipe.finish.imgSrc}
                    title={`Final Image`}
                  />
                </Grid>
              )}
            </Grid>
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
              <Button variant="outlined" onClick={goToPreviousPage}>
                Previous
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Preview
              </Button>
            </Stack>
          </Box>
        </>
      ) : (
        <Step />
      )}
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
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Preview
            </Typography>
            <Button variant="outlined" color="inherit" onClick={handleFinish}>
              Finish
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <CompleteRecipe />
      </Dialog>
    </Box>
  );
};

export default Finish;
