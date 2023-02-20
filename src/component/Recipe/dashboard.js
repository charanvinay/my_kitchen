import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import RecipeCard from "./recipe_card";
import RecipeCardSkeleton from "../../Common/Skeletons/RecipeCard";
import NoData from "../../Assets/no_data_found.svg";
import { grey } from "@mui/material/colors";

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
      collection(db, "recipes"),
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
                  navTo={"/view"}
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
            height: "80vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={NoData} style={{ width: "150px", height: "150px" }} />
          <Typography variant="body2" sx={{textAlign:"center", color: grey[300]}}>No Recipes found {<br/>} Click on the '+' button to add a recipe</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
