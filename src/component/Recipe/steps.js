import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { db, auth } from "../../services/firebase";
  import { collection, addDoc, Timestamp } from "firebase/firestore";
  import { useTheme } from "@mui/system";
  import { useNavigate } from "react-router-dom";
  import { useAuthState } from "react-firebase-hooks/auth";
  
  const RecipeSteps = () => {
    const initialValues = { title: "", description: "" };
    const [formValues, setformValues] = useState(initialValues);
    const [formErrors, setformErrors] = useState({});
    const [user, loading, error] = useAuthState(auth);
    const theme = useTheme();
    const navigate = useNavigate();
    const bpSMd = theme.breakpoints.down("sm"); //max-width:599.95px
    const bpXLd = theme.breakpoints.down("xl"); //max-width:1535.95px
  
    const handleChanges = (e) => {
      const { name, value } = e.target;
      setformValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setformErrors(handleValidation(formValues));
      console.log(handleValidation(formValues));
      if (Object.values(handleValidation(formValues)).length !== 0) {
        alert(Object.values(handleValidation(formValues))[0]);
      } else {
        handleAdd(formValues);
      }
    };
  
    const handleAdd = async (formValues) => {
      try {
        await addDoc(collection(db, "tasks"), {
          title: formValues.title,
          description: formValues.description,
          completed: false,
          created: Timestamp.now(),
          uid: user?.uid
        });
        navigate(`/`);
      } catch (err) {
        alert(err);
      }
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
  
    return (
      <Box component="main" sx={{ p: 3 }}>
        <Typography
          variant="subtitle2"
          //   color="#fff"
          sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
        >
          title
        </Typography>
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.1)",
            padding: "10px",
            borderRadius: "2px",
            [bpSMd]: { padding: "5px 10px" },
          }}
        >
          <TextField
            InputProps={{
              style: {
                letterSpacing: 0.6,
              },
              disableUnderline: true,
              placeholder: "e.g: s160123@rguktsklm.ac.in ",
            }}
            fullWidth
            variant="standard"
            name="title"
            value={formValues.title}
            onChange={handleChanges}
          />
        </Box>
        <Box sx={{ height: "10px" }}></Box>
        <Typography
          variant="subtitle2"
          //   color="#fff"
          sx={{ margin: "10px 0px", letterSpacing: 0.6 }}
        >
          description
        </Typography>
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.1)",
            padding: "10px",
            borderRadius: "2px",
            [bpSMd]: { padding: "5px 10px" },
            // width: "100%",
          }}
        >
          <TextField
            fullWidth
            type={"text"}
            onChange={handleChanges}
            value={formValues.description}
            name="description"
            InputProps={{
              style: {
                // color: "#fff",
                letterSpacing: 0.6,
              },
              disableUnderline: true,
              placeholder: "Enter description",
            }}
            variant="standard"
          />
        </Box>
        <Divider sx={{ margin: "15px 0px" }} />
        <Box sx={{ margin: "20px 0px 10px 0px" }}>
          <Button variant="contained" fullWidth={true} onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default RecipeSteps;
  