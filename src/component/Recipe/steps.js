import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getUniqueId } from "../../Common/Constants";
import ErrorAlert from "../../Common/ErrorAlert";
import { PhotoCamera } from "@mui/icons-material";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import CKeditor from "../../Common/Skeletons/CKeditor";
import Step from "../../Common/Skeletons/Step";

const CKeditorRender = lazy(() => import("../../Common/CKEditorComp.js"));

const RecipeSteps = (props) => {
  let { formValues, setformValues } = props;
  const intialStepObj = {
    id: getUniqueId(),
    errors: [],
    imgSrc: "",
    value: null,
  };
  const [steps, setSteps] = useState([]);
  const [snackopen, setsnackOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [displayEditors, setDisplayEditors] = useState(false);

  useEffect(() => {
    setSteps(
      formValues["steps"] && formValues["steps"].length
        ? [...formValues["steps"]]
        : [intialStepObj]
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
    steps.map((step) => {
      if (step.id === id) {
        if (type === "image") {
          let img = URL.createObjectURL(val);
          step.imgSrc = img;
        } else {
          step.value = val;
        }
      }
      return step;
    });
    setSteps([...steps]);
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
    setformValues({ ...formValues, steps: steps });
    props.handleBack();
  };

  const goToNextPage = () => {
    setformValues({ ...formValues, steps: steps });
    props.handleNext();
  };

  const handleAdd = () => {
    let newStep = {
      id: getUniqueId(),
      errors: [],
      imgSrc: "",
      value: null,
    };
    setSteps([...steps, newStep]);
    // console.log(steps);
  };

  const handleValidation = () => {
    let errors = [];
    steps.map((step) => {
      step["errors"] = [];
      if(!Boolean(step.value)){
        step["errors"].push({ message: "* Please fill this step" });
        errors.push(false);
      }
    });
    setSteps([...steps]);
    // console.log(steps);
    return errors;
  };
  return (
    <Box component="main" sx={{ px: 1, py: 2 }}>
      {displayEditors ? (
        <>
          {steps?.map((step, skey) => {
            return (
              <Box key={step.id}>
                <Typography
                  variant="subtitle2"
                  sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
                >
                  {`Step ${skey + 1}`}
                </Typography>
                <Suspense fallback={<CKeditor />}>
                  <div className="ckeditor">
                    <CKeditorRender
                      value={step.value}
                      id={step.id}
                      handleChanges={handleChanges}
                    />
                  </div>
                </Suspense>
                {step.errors.map((error, ekey) => {
                  return (
                    <Typography key={ekey} variant="caption" color="error">
                      {error.message}
                    </Typography>
                  );
                })}
                <Box sx={{ marginY: "15px" }}>
                  <Divider />
                </Box>
                <Grid container spacing={2}>
                  {step.imgSrc && (
                    <Grid item xs={12} md>
                      <ImgWithLabelCard
                        imgSrc={step.imgSrc}
                        title={`Step ${skey + 1} Image`}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} md>
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
                          {step.imgSrc
                            ? `Change Step ${skey + 1} Image`
                            : `Upload Image (Optional)`}
                        </Typography>
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          name="imgSrc"
                          onChange={(e) =>
                            handleChanges(step.id, e.target.files[0], "image")
                          }
                        />
                      </Stack>
                    </Button>
                  </Grid>
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
