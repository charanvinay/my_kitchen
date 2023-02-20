import { Typography, useTheme } from "@mui/material";
import React from "react";

function Subtitle1(props) {
  const theme = useTheme();
  const bpSMd = theme.breakpoints.down("sm");
  return (
    <Typography
      variant="subtitle1"
      color="text.primary"
      className="custom-subtitle1"
      sx={{ fontSize: "14px", [bpSMd]: { fontSize: "14px" } }}
    >
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </Typography>
  );
}

export default Subtitle1;
