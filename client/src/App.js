import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeInfo from "./pages/RecipeInfo";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipe-info" element={<RecipeInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
