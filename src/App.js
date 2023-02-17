import { Toolbar } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import Login from "./component/login";
import Navbar from "./component/navbar";
import AddRecipe from "./component/Recipe/add";
import { store } from "./redux/store";

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      {location.pathname !== "/" && <Navbar />}
      {location.pathname !== "/" && <Toolbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
    </Provider>
  );
}

export default App;
