import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Redirect from "./components/Redirect/Redirect";
import CodePage from "./components/CodePage/CodePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/code" element={<CodePage />} />
          <Route path="/:id" element={<Redirect />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
