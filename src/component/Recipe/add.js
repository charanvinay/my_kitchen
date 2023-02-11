import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import PrimaryDetails from "./primary_details";
import RecipeSteps from "./steps";
import { Stack } from "@mui/material";

const steps = [
  {
    label: "Title & Ingredients",
  },
  {
    label: "Step by Step Procedure",
  },
  {
    label: "Finishing touch",
  },
];

export default function AddRecipe() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const initialValues = { title: "", ingredients: [], steps: [] };
  const [formValues, setformValues] = useState(initialValues);

  // create an event listener
  useEffect(() => {
    setIsMobile(window.innerWidth < 800);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const cmp_PrimaryDetails = () => (
    <PrimaryDetails
      handleNext={handleNext}
      handleBack={handleBack}
      formValues={formValues}
      setformValues={setformValues}
    />
  );
  const cmp_RecipeSteps = () => (
    <RecipeSteps
      handleNext={handleNext}
      handleBack={handleBack}
      formValues={formValues}
      setformValues={setformValues}
    />
  );
  const cmp_Finish = () => (
    <Paper square elevation={0} sx={{ p: 3 }}>
      <Typography>All steps completed - you&apos;re finished</Typography>
      <Box
        sx={{
          margin: "20px 0px 10px 0px",
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleBack}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleBack}>
            Finish
          </Button>
        </Stack>
      </Box>
    </Paper>
  );

  return (
    <Box component="main" sx={{ paddingX: 3, paddingY: 6 }}>
      <Stepper
        activeStep={activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            {isMobile && (
              <StepContent>
                {activeStep === 0 && cmp_PrimaryDetails()}
                {activeStep === 1 && cmp_RecipeSteps()}
                {activeStep === 2 && cmp_Finish()}
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
      {!isMobile && activeStep === 0 && cmp_PrimaryDetails()}
      {!isMobile && activeStep === 1 && cmp_RecipeSteps()}
      {!isMobile && activeStep === 2 && cmp_Finish()}
    </Box>
  );
}
