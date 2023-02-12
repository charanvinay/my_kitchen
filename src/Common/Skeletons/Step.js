import { Box, Skeleton } from "@mui/material";
import React from "react";
import CKeditor from "./CKeditor";

const Step = () => {
  return (
    <Box sx={{ padding: 0, margin: 0 }}>
      <Skeleton variant="rounded" animation="wave" width={40} sx={{marginY: "10px"}} height={15} />
      <CKeditor />
      <Skeleton variant="rectangular" animation="wave" width={"100%"} sx={{marginY: "20px"}} height={2} />
      <Skeleton variant="rectangular" animation="wave" width={"100%"} height={120} />
    </Box>
  );
};

export default Step;
