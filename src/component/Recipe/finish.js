import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { getUniqueId } from "../../Common/Constants";
import ErrorAlert from "../../Common/ErrorAlert";
import { PhotoCamera } from "@mui/icons-material";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import CKeditor from "../../Common/Skeletons/CKeditor";
import Step from "../../Common/Skeletons/Step";

const CKeditorRender = lazy(() => import("../../Common/CKEditorComp.js"));

const Finish = (props) => {
  let { formValues, setformValues } = props;
  const intialStepObj = {
    id: getUniqueId(),
    rules: [
      {
        type: "text",
        test: (value) => {
          return value !== null && value.length > 0;
        },
        message: "Please fill the final step field",
      },
      {
        type: "image",
        test: (value) => {
          return value !== null && value.length > 0;
        },
        message: "Please Upload the final image",
      },
    ],
    errors: [],
    imgSrc: null,
    value: null,
  };
  const [finish, setFinish] = useState(intialStepObj);
  const [snackopen, setsnackOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [displayEditors, setDisplayEditors] = useState(false);

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
    // props.handleNext();
  };

  const handleValidation = () => {
    let errors = [];
    finish["errors"] = [];
    finish.rules.map((rule) => {
      if (
        rule.test !== undefined &&
        typeof rule.test === "function" &&
        rule.type === "text" &&
        !rule.test(finish["value"])
      ) {
        finish["errors"].push({ message: rule.message });
        errors.push(false);
      } else if (
        rule.test !== undefined &&
        typeof rule.test === "function" &&
        rule.type === "image" &&
        !rule.test(finish["imgSrc"])
      ) {
        finish["errors"].push({ message: rule.message });
        errors.push(false);
      }
      return rule;
    });
    setFinish({ ...finish });
    return errors;
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
              <div className="ckeditor">
                <CKeditorRender
                  value={finish.value}
                  id={finish.id}
                  handleChanges={handleChanges}
                />
              </div>
            </Suspense>
            <Box sx={{ marginY: "15px" }}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              {finish.imgSrc && (
                <Grid item xs={12} md>
                  <ImgWithLabelCard
                    imgSrc={finish.imgSrc}
                    title={`Final Image`}
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
                      {finish.imgSrc ? `Change Final Image` : "Upload Image"}
                    </Typography>
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      name="imgSrc"
                      onChange={(e) =>
                        handleChanges(finish.id, e.target.files[0], "image")
                      }
                    />
                  </Stack>
                </Button>
              </Grid>
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

export default Finish;
