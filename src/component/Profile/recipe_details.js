import { Avatar, Box, Container, Fab, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import HeadingMD from "../../Common/HeadingMD";
import HeadingXLBold from "../../Common/HeadingXLBold";
import ImgWithBorder from "../../Common/ImgWithBorder";
import Subtitle1 from "../../Common/Subtitle1";

import { doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import Serves from "../../Common/Ribbons/Serves";
import Veg from "../../Common/Ribbons/Veg";
import { db } from "../../services/firebase";
import { BookLoaderComponent } from "../../Common/BookLoader";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../redux/slices/userSlice";
import { setSelectedRecipe } from "../../redux/slices/recipeSlice";
import { returnType } from "../../Common/Constants";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = new URLSearchParams(search).get("id");
  const loggedUser = useSelector(getLoggedUser);

  useEffect(() => {
    console.log(id);
    if (id) {
      viewRecipe(id);
    }
  }, []);

  const viewRecipe = (id) => {
    setLoading(true);
    const docRef = doc(db, "recipes", id);
    try {
      getDoc(docRef)
        .then((docSnap) => {
          console.log(docSnap.data());
          setRecipe({ ...docSnap.data() });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <BookLoaderComponent height={"90vh"} />
      ) : (
        <Container
          maxWidth="lg"
          sx={{ marginTop: 6, marginBottom: 5, position: "relative" }}
        >
          <Stack direction={"row"} spacing={1}>
            <Avatar src={recipe.photoURL} />
            <Stack>
              <Typography
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif !important",
                }}
              >
                {recipe.name}
              </Typography>
              <Typography variant="caption" sx={{ color: grey[600] }}>
                posted on {moment(recipe.createdAt).format("LLL")}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <HeadingXLBold text={recipe.title} />
            <Stack direction={"row"} spacing={0.5} alignItems="center">
              {returnType(recipe.type)}
              <Serves serves={recipe.serves} />
            </Stack>
          </Box>
          <Box sx={{ margin: "20px 0 10px 0" }}>
            <HeadingMD text={"INGREDIENTS"} width={70} />
          </Box>
          <Stack spacing={1} sx={{ margin: "5px 10px" }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>S.No</th>
                  <th>Name</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((step, skey) => {
                  return (
                    <tr key={step.id}>
                      <td>{skey + 1}</td>
                      <td>
                        <Subtitle1 text={step.value} />
                      </td>
                      <td>
                        <Subtitle1 text={step.units} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Stack>
          <Box sx={{ margin: "25px 0px 15px 0px" }}>
            <HeadingMD text={"STEPS"} width={35} />
          </Box>
          <Stack spacing={1} sx={{ margin: "5px 10px" }}>
            <ol type="1">
              {recipe.steps.map((step, skey) => {
                return (
                  <li key={step.id} style={{ marginLeft: "12px" }}>
                    <Subtitle1 text={step.value} />
                  </li>
                );
              })}
            </ol>
          </Stack>
          <Box sx={{ margin: "20px 0 10px 0" }}>
            <HeadingMD text={"FINAL STEP"} width={50} />
          </Box>
          <Stack direction={"column"} spacing={2}>
            <Subtitle1 text={recipe.finish.value} />
            {recipe.finish.imgSrc && (
              <ImgWithBorder imgSrc={recipe.finish.imgSrc} />
            )}
          </Stack>
          {loggedUser.uid == recipe.uid && (
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
              }}
              onClick={() => {
                navigate("/edit");
                dispatch(setSelectedRecipe(recipe));
              }}
            >
              <EditIcon />
            </Fab>
          )}
        </Container>
      )}
    </>
  );
};

export default RecipeDetails;
