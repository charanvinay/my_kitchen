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
import { getUniqueId } from "../../Common/Constants";
import CloseIcon from "@mui/icons-material/Close";
import ErrorAlert from "../../Common/ErrorAlert";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import CKeditor from "../../Common/Skeletons/CKeditor";
import Step from "../../Common/Skeletons/Step";
import CompleteRecipe from "./complete_recipe";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, addDoc, where, getDocs } from "firebase/firestore";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from '@mui/icons-material/Image';
import { grey } from "@mui/material/colors";

const CKeditorRender = lazy(() => import("../../Common/CKEditorComp.js"));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Finish = (props) => {
  let { formValues, setformValues } = props;
  const intialStepObj = {
    id: getUniqueId(),
    errors: [],
    imgSrc: "",
    value: null,
  };
  const [finish, setFinish] = useState(intialStepObj);
  const [snackopen, setsnackOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [displayEditors, setDisplayEditors] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/");
    }
    fetchUserDetails();
  }, [user, loading]);

  const fetchUserDetails = async () => {
    try {
      let logged_user = query(
        collection(db, "users"),
        where("uid", "==", user?.uid)
      );
      let user_docs = await getDocs(logged_user);
      // console.log(user_docs.docs[0].data());
      if (user_docs.docs.length > 0) {
        setLoggedUser(user_docs.docs[0].data());
      } else {
        setLoggedUser({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    setFinish(
      formValues["finish"] && Object.keys(formValues["finish"]).length
        ? { ...formValues["finish"] }
        : intialStepObj
    );
  }, []);

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

  const handleChanges = (id, val, type) => {
    if (type === "image") {
      let img = URL.createObjectURL(val);
      setFinish({ ...finish, imgSrc: img });
    } else {
      setFinish({ ...finish, value: val });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = handleValidation();
    if (!errors.includes(false)) {
      goToNextPage();
    } else {
      setsnackOpen(true);
      setErrorText(finish["errors"][0].message);
    }
  };

  const goToPreviousPage = () => {
    setformValues({ ...formValues, finish: finish });
    props.handleBack();
  };

  const goToNextPage = () => {
    setformValues({ ...formValues, finish: finish });
    handleClickOpen();
  };

  const handleValidation = () => {
    let errors = [];
    finish["errors"] = [];
    if (!Boolean(finish.value)) {
      finish["errors"].push({ message: "Please fill the final step" });
      errors.push(false);
    }
    if (!Boolean(finish.imgSrc)) {
      finish["errors"].push({ message: "Please Upload the final image" });
      errors.push(false);
    }
    setFinish({ ...finish });
    return errors;
  };

  const handleFinish = async () => {
    try {
      let recipe_obj = {
        uid: loggedUser.uid,
        ...formValues,
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
                  value={finish.value}
                  id={finish.id}
                  handleChanges={handleChanges}
                />
                <Box
                  sx={{
                    display:"flex",
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
                        handleChanges(finish.id, e.target.files[0], "image")
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
                        handleChanges(finish.id, e.target.files[0], "image")
                      }
                    />
                  </Button>
                </Box>
              </div>
            </Suspense>
            <Box sx={{ marginY: "15px" }}>{finish.imgSrc && <Divider />}</Box>
            <Grid container spacing={2}>
              {finish.imgSrc && (
                <Grid item xs={12} md>
                  <ImgWithLabelCard
                    imgSrc={finish.imgSrc}
                    title={`Final Image`}
                  />
                </Grid>
              )}
              {/* <Grid item xs={12} md>
                <Button
                  component="label"
                  sx={{
                    border: "2px solid rgba(0, 0, 0, 0.1)",
                    height: 120,
                    width: "100%",
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
                      {finish.imgSrc ? `Change Final Image` : "Upload Image"}
                    </Typography>
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      capture="user"
                      name="imgSrc"
                      onChange={(e) =>
                        handleChanges(finish.id, e.target.files[0], "image")
                      }
                    />
                  </Stack>
                </Button>
              </Grid> */}
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
        <CompleteRecipe recipe={formValues} />
      </Dialog>
      <ErrorAlert
        snackopen={snackopen}
        handleClose={handleCloseSnackbar}
        text={errorText}
      />
    </Box>
  );
};

export default Finish;
