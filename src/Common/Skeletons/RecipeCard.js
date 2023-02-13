import { Skeleton, Stack } from "@mui/material";
import React from "react";

const RecipeCardSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Stack spacing={2} direction={"row"} sx={{padding:"15px"}}>
        <Skeleton variant="circular" width={40} height={40} />
        <Stack>
          <Skeleton variant="text" width={200} sx={{ width:"100%", fontSize: "1rem", marginBottom: "5px" }} />
          <Skeleton variant="text" width={100} sx={{ fontSize: "0.5rem" }} />
        </Stack>
      </Stack>
      <Skeleton variant="rectangular" height={160} />
      <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
    </Stack>
  );
};

export default RecipeCardSkeleton;
