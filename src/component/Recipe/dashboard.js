import { Box, Container, Grid } from "@mui/material";
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

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
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
      where("uid", "==", user?.uid)
    );
    let user_docs = await getDocs(user_ref);
    if (user_docs.docs.length > 0) {
      let recipes = [];
      user_docs.docs.map((doc) => {
        console.log(doc);
        recipes.push({ id: doc.id, ...doc.data() });
      });
      console.log(recipes);
      setRecipesList([...recipes]);
      setLoadding(false);
    }
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
        {loadding || (
          <Grid container spacing={3}>
            {recipesList?.map((recipe) => {
              return (
                <Grid item xs={12} md={4} key={recipe.id}>
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    handleDelete={() => handleDelete(recipe.id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
    </Container>
  );
};

export default Dashboard;
