import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { RiLeafLine } from "react-icons/ri";

const Veg = () => {
  const theme = useTheme();
  const bpSMd = theme.breakpoints.down("sm");
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0.5}
      sx={{
        color: "white",
        padding: "6px 8px",
        borderRadius: "10px",
        backgroundColor: "#5AFF15",
        backgroundImage: "linear-gradient(133deg, #5AFF15 0%, #00B712 74%)",
      }}
    >
      <RiLeafLine
        color="white"
        style={{[bpSMd]: { fontSize: "0.5em" } }}
      />
      <Typography variant="body2" sx={{ [bpSMd]: { fontSize: "0.8em" } }}>
        Veg
      </Typography>
    </Stack>
  );
};

export default Veg;
