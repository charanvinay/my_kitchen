import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import HeadingMD from "../../Common/HeadingMD";
import HeadingXLBold from "../../Common/HeadingXLBold";
import ImgWithBorder from "../../Common/ImgWithBorder";
import Subtitle1 from "../../Common/Subtitle1";
import { getRecipe } from "../../redux/slices/recipeSlice";

import Serves from "../../Common/Ribbons/Serves";
import Veg from "../../Common/Ribbons/Veg";

const RecipeDetails = () => {
  const recipe = useSelector(getRecipe);
  return (
    <Container maxWidth="lg" sx={{ marginTop: 6, marginBottom: 5 }}>
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
          <Veg/>
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
    </Container>
  );
};

export default RecipeDetails;
