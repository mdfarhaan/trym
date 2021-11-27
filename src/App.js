import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Redirect from "./components/Redirect/Redirect";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/:id" element={<Redirect />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
