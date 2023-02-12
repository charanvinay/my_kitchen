import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import HeadingLG from "../../Common/HeadingLG";
import HeadingMD from "../../Common/HeadingMD";
import ImgWithBorder from "../../Common/ImgWithBorder";
import ImgWithLabelCard from "../../Common/ImgWithLabelCard";
import Subtitle1 from "../../Common/Subtitle1";

const CompleteRecipe = (props) => {
    let { recipe } = props;
//   let recipe = {
//     id: "le1ferji_16762087480140_22796628937348018",
//     title: "Chicken biryani",
//     ingredients: [
//       {
//         id: "le1fe0p0_16762087132200_32998127174541203",
//         title: "Chicken",
//         imgSrc:
//           "blob:http://localhost:3000/d6f978c8-b0db-46ef-bf38-e1a8baf163e1",
//         createdAt: {
//           seconds: 1676208713,
//           nanoseconds: 220000000,
//         },
//       },
//       {
//         id: "le1feb4m_16762087267420_10024070629064674",
//         title: "Salt",
//         imgSrc:
//           "blob:http://localhost:3000/2609901a-62c1-4a31-9379-2b67ba374a14",
//         createdAt: {
//           seconds: 1676208726,
//           nanoseconds: 742000000,
//         },
//       },
//       {
//         id: "le1fepwr_16762087458990_45916759469240254",
//         title: "Tamarind",
//         imgSrc:
//           "blob:http://localhost:3000/b2d7260f-63da-4ea5-8771-e5fe5b87b47f",
//         createdAt: {
//           seconds: 1676208745,
//           nanoseconds: 899000000,
//         },
//       },
//     ],
//     steps: [
//       {
//         id: "le1ferjv_16762087480270_2655375414961756",
//         rules: [
//           {
//             message: "* Please fill this step",
//           },
//         ],
//         errors: [],
//         imgSrc:
//           "https://www.foodandwine.com/thmb/dMG6keGBcEF7XF8LZdR2y5dPrxc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jamaican-jerk-chicken-FT-RECIPE0918-eabbd55da31f4fa9b74367ef47464351.jpg",
//         value:
//           "<p>Take three kg of chicken and mix them with</p><ul><li>Curd - 1 ½ packet</li><li>Salt - ½ table spoon</li></ul><p>&nbsp;</p><p>asdfjakl ksdjflajdsflajsdfljalkdsf jalk d lka jflajd lkfkjads lkf jalsdj fladskjf lkdssjf klsdk jf lka sdj fklsd sj flkasajdfkl j asdaklf jasdslk fj lkaskads jfldsjf lkdsjf lkasadsjf kl</p>",
//       },
//       {
//         id: "le1fgozv_16762088380270_17245168540354938",
//         rules: [
//           {
//             message: "* Please fill this step",
//           },
//         ],
//         errors: [],
//         imgSrc: null,
//         value:
//           "<p>Place them on the pan and heat</p><p><strong>Take the biryani mix</strong></p><p><i><strong>Also add them in the pan</strong></i></p><ol><li>In the pan mix &nbsp;them wll</li><li>Increase the flame</li><li>asdfjalksdkjflk</li></ol>",
//       },
//     ],
//     finish: {
//       id: "le1fi0xp_16762089001570_8420704768480496",
//       rules: [
//         {
//           type: "text",
//           message: "Please fill the final step field",
//         },
//         {
//           type: "image",
//           message: "Please Upload the final image",
//         },
//       ],
//       errors: [],
//       imgSrc: "blob:http://localhost:3000/85d25e6b-1273-442b-8dbf-099b42a2c412",
//       value: "<p>Serve it with a mix of onions and lemon</p>",
//     },
//     createdAt: {
//       seconds: 1676208748,
//       nanoseconds: 14000000,
//     },
//   };
  return (
    <Container maxWidth="xl" sx={{ marginY: 3 }}>
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
              {step.imgSrc && <ImgWithBorder imgSrc={step.imgSrc}/>}
            </Box>
          );
        })}
      </Stack>
      <Box sx={{ margin: "20px 0 10px 0" }}>
        <HeadingMD text={"FINAL STEP"} />
      </Box>
      <Stack direction={"column"} spacing={2}>
        <Subtitle1 text={recipe.finish.value} />
        {recipe.finish.imgSrc && <ImgWithBorder imgSrc={recipe.finish.imgSrc}/>}
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
