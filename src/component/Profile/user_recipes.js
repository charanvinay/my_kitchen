import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../../Assets/no_data_found.svg";
import RecipeCardSkeleton from "../../Common/Skeletons/RecipeCard";
import { getLoggedUser } from "../../redux/slices/userSlice";
import { db } from "../../services/firebase";
import RecipeCard from "../Recipe/recipe_card";

const UserRecipes = () => {
  const [recipesList, setRecipesList] = useState([]);
  const [loadding, setLoadding] = useState(true);
  const loggedUser = useSelector(getLoggedUser);

  useEffect(() => {
    if (loggedUser) {
      getUserRecipes();
    }
  }, [loggedUser]);

  const getUserRecipes = async () => {
    setRecipesList([]);
    setLoadding(true);
    let user_ref = query(
      collection(db, "recipes"),
      where("uid", "==", loggedUser?.uid)
    );
    let user_docs = await getDocs(user_ref);
    if (user_docs.docs.length > 0) {
      let recipes = [];
      user_docs.docs.map((doc) => {
        recipes.push({ _id: doc.id, ...doc.data() });
      });
      console.log(recipes);
      setRecipesList([...recipes]);
    }
    setLoadding(false);
  };

  const handleDelete = async (id) => {
    let task_ref = doc(db, "recipes", id);
    try {
      await deleteDoc(task_ref);
      getUserRecipes();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {loadding || <Stack
        sx={{ textAlign: "center", margin: "15px 0px 0px 0px" }}
        spacing={1}
      >
        <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
          Total Recipes - {recipesList.length}
        </Typography>
      </Stack>}
      <Container maxWidth="lg" sx={{ p: 3 }}>
        {loadding && (
          <Grid container spacing={{ xs: 6, md: 3 }}>
            {[1, 2, 3, 4, 5, 6].map((loader) => (
              <Grid item xs={12} md={4} key={loader}>
                <RecipeCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}
        {!loadding && recipesList.length > 0 ? (
          <Grid container spacing={3}>
            {recipesList?.map((recipe) => {
              return (
                <Grid item xs={12} md={4} key={recipe._id}>
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    navTo={"/edit"}
                    handleDelete={() => handleDelete(recipe._id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "40vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={NoData} style={{ width: "150px", height: "150px" }} />
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: grey[300] }}
            >
              No Recipes found {<br />} Click on the '+' button to add a recipe
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UserRecipes;
