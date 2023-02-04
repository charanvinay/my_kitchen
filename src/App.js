import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import Login from "./component/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
