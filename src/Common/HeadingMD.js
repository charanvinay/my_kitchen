import { Typography, useTheme } from "@mui/material";
import React from "react";

function HeadingMD(props) {
  const theme = useTheme();
  const bpSMd = theme.breakpoints.down("sm"); //max-width:599.95px
  return (
    <Typography
      // gutterBottom
      variant="h1"
      sx={{
        fontSize: "25px",
        textTransform: "capitalize",
        color: props.color || "text.primary",
        letterSpacing: 1,
        marginY: "15px",
        [bpSMd]: { fontSize: "16px" },
      }}
    >
      {props.text}
    </Typography>
  );
}

export default HeadingMD;
