import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
