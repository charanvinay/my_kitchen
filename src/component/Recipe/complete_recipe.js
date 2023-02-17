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
      <Box sx={{ marginY: "10px" }}>
        <HeadingMD text={"STEPS"} />
      </Box>
      <Stack spacing={1} sx={{ margin: "5px 10px" }}>
        {recipe.steps.map((step, skey) => {
          return (
            <Box key={step.id}>
              <Stack direction={"row"} spacing={1}>
                <Subtitle1 text={`${skey + 1}. `} />
                <Subtitle1 text={step.value} />
              </Stack>
              {step.imgSrc && <ImgWithBorder imgSrc={step.imgSrc} />}
            </Box>
          );
        })}
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
      <Box sx={{ margin: "20px 0 10px 0" }}>
        <HeadingMD text={"INGREDIENTS"} />
      </Box>
      <Grid container spacing={2}>
        {recipe.ingredients.length > 0 &&
          recipe.ingredients.map((ingredient) => {
            return (
              <Grid item xs={6} md={3} key={ingredient.id}>
                <ImgWithLabelCard
                  imgSrc={ingredient.imgSrc}
                  title={ingredient.title}
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default CompleteRecipe;
