import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradientBLACK from "../../Assets/20210113_083213.png";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { RiLeafLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { setSelectedRecipe } from "../../redux/slices/recipeSlice";

const RecipeCard = (props) => {
  let { title, name, finish, type, serves } = props.recipe;
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ position: "relative" }}>
      <Card
        sx={{
          borderRadius: "10px",
          position: "relative",
          cursor: "pointer",
          boxShadow:
            "1px 2px 2px hsl(0deg 0% 50% / 0.2), 2px 4px 4px hsl(0deg 0% 50% / 0.2), 4px 8px 8px hsl(0deg 0% 50% / 0.2), 8px 16px 16px hsl(0deg 0% 50% / 0.2), 16px 32px 32px hsl(0deg 0% 50% / 0.2)",
        }}
        onClick={() => {
          dispatch(setSelectedRecipe(props.recipe));
          navigate("/edit");
        }}
      >
        <Box sx={{ height: 300 }}>
          <img
            src={
              finish.imgSrc ||
              "https://www.foodandwine.com/thmb/dMG6keGBcEF7XF8LZdR2y5dPrxc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jamaican-jerk-chicken-FT-RECIPE0918-eabbd55da31f4fa9b74367ef47464351.jpg"
            }
            alt={"Recipe Image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </Box>
        <CardContent
          sx={{
            width: "90%",
            // padding: "20px",
            zIndex: 1,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Typography
            variant="h4"
            color="white"
            sx={{
              textTransform: "capitalize",
              fontFamily: "Product Sans Bold",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="#cbcaca"
            sx={{ textTransform: "capitalize", letterSpacing: 0.5 }}
          >
            {` by ${name}`}
          </Typography>
        </CardContent>
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgb(0 0 0 / 40%) 0%, transparent 20%)",
            height: "100%",
            position: "absolute",
            top: 0,
            zIndex: 0,
            width: "100%",
          }}
        />
        <img
          style={{
            height: "60%",
            position: "absolute",
            bottom: 0,
            zIndex: 0,
            width: "100%",
          }}
          src={GradientBLACK}
        />
      </Card>
      <IconButton
        size="large"
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        onClick={() => setLiked(!liked)}
      >
        {liked ? (
          <FavoriteIcon sx={{ fontSize: "1.5rem", color: "white" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: "1.5rem", color: "white" }} />
        )}
      </IconButton>
      <Stack
        sx={{ position: "absolute", top: 8, left: 8 }}
        direction="row"
        spacing={1}
      >
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
          <RiLeafLine color="white" style={{ fontSize: "1.5em" }} />
          <Typography variant="body2">{type}</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
          sx={{
            color: "white",
            padding: "6px 8px",
            borderRadius: "10px",
            backgroundColor: "#485461",
            backgroundImage: "linear-gradient(133deg, #485461 0%, #28313B 74%)",
          }}
        >
          <LocalDiningIcon color="white" />
          <Typography variant="body2">Serves - {serves}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RecipeCard;
