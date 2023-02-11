import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getUniqueId } from "../../Common/Constants";
import ErrorAlert from "../../Common/ErrorAlert";
import { PhotoCamera } from "@mui/icons-material";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";

const CKeditorRender = lazy(() => import("../../Common/CKEditorComp.js"));

const RecipeSteps = (props) => {
  let { formValues, setformValues } = props;
  const intialStepObj = {
    id: getUniqueId(),
    rules: [
      {
        test: (value) => {
          return value !== null && value.length > 0;
        },
        message: "* Please fill this step",
      },
    ],
    errors: [],
    imgSrc: null,
    value: null,
  };
  const [steps, setSteps] = useState([]);
  const [snackopen, setsnackOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);

  useEffect(() => {
    setSteps(
      formValues["steps"] && formValues["steps"].length
        ? [...formValues["steps"]]
        : [intialStepObj]
    );
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
      rules: [
        {
          test: (value) => {
            return value !== null && value.length > 0;
          },
          message: "* Please fill this step",
        },
      ],
      errors: [],
      imgSrc: null,
      value: null,
    };
    setSteps([...steps, newStep]);
    // console.log(steps);
  };

  const handleValidation = () => {
    let errors = [];
    steps.map((step) => {
      step["errors"] = [];
      step.rules.map((rule) => {
        if (
          rule.test !== undefined &&
          typeof rule.test === "function" &&
          !rule.test(step["value"])
        ) {
          step["errors"].push({ message: rule.message });
          errors.push(false);
        }
        return rule;
      });
    });
    setSteps([...steps]);
    // console.log(steps);
    return errors;
  };
  return (
    <Box component="main" sx={{ px: 1, py: 2 }}>
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
              <Suspense
                fallback={
                  <div className="d-flex py-2 justify-content-center align-items-center">
                    Loading
                  </div>
                }
              >
                <CKeditorRender
                  value={step.value}
                  id={step.id}
                  handleChanges={handleChanges}
                />
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
                          : "Upload Image (Optional)"}
                      </Typography>
                      <input
                        hidden
                        accept="image/*"
                        multiple
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
          <Button variant="outlined" fullWidth={true} onClick={handleAdd}>
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
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Next
            </Button>
          </Stack>
        </Box>
      </>
      <ErrorAlert
        snackopen={snackopen}
        handleClose={handleCloseSnackbar}
        text={errorText}
      />
    </Box>
  );
};

export default RecipeSteps;
