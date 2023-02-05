import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, getDocs, collection, where, doc, deleteDoc } from "firebase/firestore";
import RecipeCard from "./recipe_card";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [recipesList, setRecipesList] = useState([]);

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
    let user_ref = query(
      collection(db, "tasks"),
      where("uid", "==", user?.uid)
    );
    let user_docs = await getDocs(user_ref);
    if (user_docs.docs.length > 0) {
      let recipes = [];
      user_docs.docs.map((doc) => {
        console.log(doc);
        recipes.push({id:doc.id, ...doc.data()});
      });
      console.log(recipes);
      setRecipesList([...recipes]);
    }
  };

  const handleDelete = async (id) => {
    let task_ref = doc(db, "tasks", id);
    try {
        await deleteDoc(task_ref);
        getUserRecipes();
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Box component="main" sx={{ p: 3 }}>
      {recipesList?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} handleDelete={()=>handleDelete(recipe.id)}/>
      ))}
    </Box>
  );
};

export default Dashboard;
