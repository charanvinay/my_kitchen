import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import GradientBLACK from "../../Assets/20210113_083213.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { setSelectedRecipe } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";

const RecipeCard = (props) => {
  let { title, name, finish } = props.recipe;
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        dispatch(setSelectedRecipe(props.recipe));
        navigate("/edit");
      }}
      sx={{
        position: "relative",
        boxShadow:
          "1px 2px 2px hsl(0deg 0% 50% / 0.2), 2px 4px 4px hsl(0deg 0% 50% / 0.2), 4px 8px 8px hsl(0deg 0% 50% / 0.2), 8px 16px 16px hsl(0deg 0% 50% / 0.2), 16px 32px 32px hsl(0deg 0% 50% / 0.2)",
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
        <Typography variant="h4" color="white" sx={{ textTransform: "capitalize" }}>
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="white"
          sx={{ textTransform: "capitalize" }}
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
  );
};

export default RecipeCard;
