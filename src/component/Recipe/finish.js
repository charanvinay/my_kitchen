import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Skeleton,
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
import { useLocation, useNavigate } from "react-router-dom";
import { db, storage } from "../../services/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  editFinish,
  getRecipe,
  handleFinishValidation,
} from "../../redux/slices/recipeSlice";
import { getLoggedUser, handleBack, handleReset } from "../../redux/slices/userSlice";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  getStorage,
  deleteObject,
} from "firebase/storage";
import ErrorAlert from "../../Common/ErrorAlert";

const CKeditorRender = lazy(() => import("../../Common/CKEditorComp.js"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Finish = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [snackopen, setsnackOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [displayEditors, setDisplayEditors] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const recipe = useSelector(getRecipe);
  const loggedUser = useSelector(getLoggedUser);

  const handleClose = () => setModalOpen(false);
  const handleClickOpen = () => setModalOpen(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayEditors(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackOpen(false);
  };

  const handleChanges = (val, type) => {
    let v = val;
    if (type === "image") {
      let file = val;
      if (!file) return;
      setShowSkeleton(true);
      if (recipe.finish.imgSrc) {
        deletePreviousImage(recipe.finish.imgSrc);
      }
      handleUploadImage(file, type);
    } else {
      dispatch(editFinish({ val: v, type }));
    }
  };

  const handleUploadImage = (file, type) => {
    const storageRef = ref(storage, `images/${loggedUser.uid}/${file.name}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
            dispatch(editFinish({ val: url, type }));
            setShowSkeleton(false);
          })
          .catch((error) => {
            console.log(error.message);
            setShowSkeleton(false);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setShowSkeleton(false);
      });
  };

  const deletePreviousImage = (photo) => {
    const storage = getStorage();
    const storageRef = ref(storage, photo);
    console.log(storageRef);
    deleteObject(storageRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(handleValidation()).length !== 0) {
      setErrorText(Object.values(handleValidation())[0]);
      setsnackOpen(true);
    } else {
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
    let errors = {};
    if (!Boolean(recipe.finish.value)) {
      errors["Value"] = "Please fill the final step";
    }
    if (!Boolean(recipe.finish.imgSrc)) {
      errors["imageSrc"] = "Please upload the final image";
    }
    return errors;
  };

  const handleSave = async () => {
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
      dispatch(handleReset())
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };
  const handleUpdate = async () => {
    const taskDocRef = doc(db, 'recipes', recipe._id)
    console.log(taskDocRef);
    try {
      let recipe_obj = {
        uid: loggedUser.uid,
        name: loggedUser.name,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        ...recipe,
      };
      await updateDoc(taskDocRef, recipe_obj);
      navigate("/home");
      dispatch(handleReset())
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
                  handleChanges={(val) => {
                    handleChanges(val);
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
            <Box sx={{ marginY: "15px" }}>
              {recipe.finish.imgSrc && <Divider />}
            </Box>
            {showSkeleton ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={120}
              />
            ) : (
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
            )}
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
          <ErrorAlert
            snackopen={snackopen}
            handleClose={handleCloseSnackbar}
            text={errorText}
          />
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
            {location.pathname==="add" ? <Button variant="outlined" color="inherit" onClick={handleSave}>
              Save
            </Button> : <Button variant="outlined" color="inherit" onClick={handleUpdate}>
              Update
            </Button>}
          </Toolbar>
        </AppBar>
        <Toolbar />
        <CompleteRecipe />
      </Dialog>
    </Box>
  );
};

export default Finish;
