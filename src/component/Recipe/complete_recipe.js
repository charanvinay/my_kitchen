import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import HeadingLG from "../../Common/HeadingLG";
import HeadingMD from "../../Common/HeadingMD";
import ImgWithBorder from "../../Common/ImgWithBorder";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import Subtitle1 from "../../Common/Subtitle1";
import { getRecipe } from "../../redux/slices/recipeSlice";

const CompleteRecipe = () => {
  const recipe = useSelector(getRecipe);
  return (
    <Container maxWidth="xl" sx={{ marginTop: 2, marginBottom: 5 }}>
      <Box sx={{ textAlign: "center" }}>
        <HeadingLG text={recipe.title} />
      </Box>
      <Box sx={{ margin: "20px 0 10px 0" }}>
        <HeadingMD text={"INGREDIENTS"} />
      </Box>
      <Stack spacing={1} sx={{ margin: "5px 10px" }}>
        <ul>
          {recipe.ingredients.map((step, skey) => {
            return (
              <li key={step.id} style={{ marginLeft: "12px" }}>
                <Subtitle1 text={step.value + " - " + step.units} />
              </li>
            );
          })}
        </ul>
      </Stack>
      <Box sx={{ margin: "25px 0px 15px 0px" }}>
        <HeadingMD text={"STEPS"} />
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
        <HeadingMD text={"FINAL STEP"} />
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

export default CompleteRecipe;
