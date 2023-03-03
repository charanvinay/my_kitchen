import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NoData from "../../Assets/no_data_found.svg";
import HeadingLG from "../../Common/HeadingLG";
import HeadingLGBlue from "../../Common/HeadingLGBlue";
import RecipeCardSkeleton from "../../Common/Skeletons/RecipeCard";
import { auth, db } from "../../services/firebase";
import RecipeCard from "./recipe_card";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [recipesList, setRecipesList] = useState([]);
  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      getUserRecipes();
    }
  }, [user, loading]);

  const getUserRecipes = async () => {
    setRecipesList([]);
    setLoadding(true);
    let user_ref = query(
      collection(db, "recipes")
      // where("uid", "==", user?.uid)
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

  return (
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
        <Box sx={{ marginTop: 2 }}>
          <HeadingLGBlue text1="Explore" text2="Recipes" />
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {recipesList?.map((recipe) => {
              return (
                <Grid item xs={12} md={4} key={recipe._id}>
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    navTo={`/view?id=${recipe._id}`}
                    getUserRecipes={getUserRecipes}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
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
  );
};

export default Dashboard;
