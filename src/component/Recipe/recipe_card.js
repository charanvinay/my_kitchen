import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const RecipeCard = (props) => {
  let { title, description } = props.recipe;
  
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small" onClick={()=>props.handleDelete()}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
