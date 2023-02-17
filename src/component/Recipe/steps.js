import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getUniqueId } from "../../Common/Constants";
import ErrorAlert from "../../Common/ErrorAlert";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import CKeditor from "../../Common/Skeletons/CKeditor";
import Step from "../../Common/Skeletons/Step";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  editStep,
  getRecipe,
  handleStepValidation,
} from "../../redux/slices/recipeSlice";
import { handleBack, handleNext } from "../../redux/slices/userSlice";

const CKeditorRender = lazy(() => import("../../Common/CKEditorComp.js"));

const RecipeSteps = (props) => {
  const [snackopen, setsnackOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [displayEditors, setDisplayEditors] = useState(false);

  const recipe = useSelector(getRecipe);
  console.log(recipe);

  const dispatch = useDispatch();

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
    let v = val;
    if (type === "image") {
      v = URL.createObjectURL(val);
    }
    dispatch(editStep({ id, val: v, type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = handleValidation();
    if (!errors.includes(false)) {
      goToNextPage();
    } else {
      setsnackOpen(true);
      setErrorText("Please fill all the steps");
    }
  };

  const goToPreviousPage = () => {
    dispatch(handleBack());
  };

  const goToNextPage = () => {
    dispatch(handleNext());
  };

  const handleAdd = () => {
    let newStep = {
      id: getUniqueId(),
      errors: [],
      imgSrc: "",
      value: null,
    };
    dispatch(addItem({ name: "steps", value: newStep }));
  };

  const handleValidation = () => {
    dispatch(handleStepValidation());
    let errors = [];
    recipe.steps.map((step) => {
      if (!Boolean(step.value)) {
        errors.push(false);
      }
    });
    return errors;
  };
  return (
    <Box component="main" sx={{ px: 1, py: 2 }}>
      {displayEditors ? (
        <>
          {recipe.steps?.map((step, skey) => {
            return (
              <Box key={step.id}>
                <Typography
                  variant="subtitle2"
                  sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
                >
                  {`Step ${skey + 1}`}
                </Typography>
                <Suspense fallback={<CKeditor />}>
                  <div className="ckeditor" style={{ position: "relative" }}>
                    <CKeditorRender
                      value={step.value}
                      id={step.id}
                      handleChanges={handleChanges}
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
                            handleChanges(step.id, e.target.files[0], "image")
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
                            handleChanges(step.id, e.target.files[0], "image")
                          }
                        />
                      </Button>
                    </Box>
                  </div>
                </Suspense>
                {step?.errors.map((error, ekey) => {
                  return (
                    <Typography key={ekey} variant="caption" color="error">
                      {error.message}
                    </Typography>
                  );
                })}
                <Box sx={{ marginY: "15px" }}>{step.imgSrc && <Divider />}</Box>
                <Grid container spacing={2}>
                  {step.imgSrc && (
                    <Grid item xs={12} md>
                      <ImgWithLabelCard
                        imgSrc={step.imgSrc}
                        title={`Step ${skey + 1} Image`}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            );
          })}
          <Box sx={{ margin: "20px 0px 10px 0px" }}>
            <Button fullWidth={true} onClick={handleAdd}>
              + Add Step
            </Button>
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
                Next
              </Button>
            </Stack>
          </Box>
        </>
      ) : (
        <Step />
      )}
      <ErrorAlert
        snackopen={snackopen}
        handleClose={handleCloseSnackbar}
        text={errorText}
      />
    </Box>
  );
};

export default RecipeSteps;
