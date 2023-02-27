import { ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { theme } from "./Common/Constants";
import Home from "./component/home";
import Login from "./component/login";
import Navbar from "./component/navbar";
import Profile from "./component/Profile/profile";
import RecipeDetails from "./component/Profile/recipe_details";
import AddRecipe from "./component/Recipe/add";
import { store } from "./redux/store";

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {location.pathname !== "/" && <Navbar />}
        {location.pathname !== "/" && <Toolbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favourites" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/edit" element={<AddRecipe />} />
          <Route path="/view" element={<RecipeDetails />} />
        </Routes>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
