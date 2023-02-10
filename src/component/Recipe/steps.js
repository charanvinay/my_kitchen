import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import { getUniqueId } from "../../Common/Constants";

const RecipeSteps = (props) => {
  const intialStepObj = {
    id: getUniqueId(),
    rules: [
      {
        test: (value) => {
          return value !== null && value > 0;
        },
        message: "Please enter Duration",
      },
    ],
    errors: [],
    value: null,
  };
  const [steps, setSteps] = useState([intialStepObj]);

  const handleChanges = (id, val) => {
    steps.map((step) => {
      if (step.id === id) {
        step.value = val;
      }
    });
    setSteps(steps);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleBack();
  };

  const handleAdd = () => {
    let newStep = {
      id: getUniqueId(),
      rules: [
        {
          test: (value) => {
            return value !== null && value > 0;
          },
          message: "Please enter Duration",
        },
      ],
      errors: [],
      value: null,
    }
    setSteps([...steps, newStep]);
    console.log(steps);
  };

  const handleValidation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.title) {
      errors.title = "title is required";
    }
    if (!values.description) {
      errors.description = "description is required";
    }
    return errors;
  };
  console.log(steps);
  return (
    <Box component="main" sx={{ p: 3 }}>
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
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: "Type your text here...",
                  // plugins: [ Paragraph, Bold, Italic, Essentials ],
                  toolbar: [
                    "bold",
                    "italic",
                    "bulletedList",
                    "numberedList",
                    "insertTable",
                  ],
                }}
                data={step.value}
                onReady={(editor) => {
                  editor.focus();
                }}
                key={step.id}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleChanges(step.id, data);
                }}
              />
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
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Next
            </Button>
          </Stack>
        </Box>
      </>
    </Box>
  );
};

export default RecipeSteps;
