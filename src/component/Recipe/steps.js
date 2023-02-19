import React, { lazy, Suspense, useEffect, useState } from "react";
import ErrorAlert from "../../Common/ErrorAlert";
import CKeditor from "../../Common/Skeletons/CKeditor";
import Step from "../../Common/Skeletons/Step";
import { getUniqueId } from "../../Common/Constants";
import { handleBack, handleNext } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, getRecipe } from "../../redux/slices/recipeSlice";
import { Box, Button, Stack, Typography } from "@mui/material";

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

  const handleChanges = (id, value, name, type) => {
    dispatch(editItem({ id, name, value, type }));
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
    dispatch(handleNext());
  };

  const handleAdd = () => {
    let newStep = {
      id: getUniqueId(),
      errors: [],
      value: null,
    };
    dispatch(addItem({ name: "steps", value: newStep }));
  };

  const handleValidation = () => {
    let errors = {};
    recipe.steps.map((step, skey) => {
      if (!Boolean(step.value)) {
        errors[`Step ${skey + 1}`] = `Please fill Step ${skey + 1}`;
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
                      handleChanges={(e) =>
                        handleChanges(step.id, e, "steps", "value")
                      }
                    />
                  </div>
                </Suspense>
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
