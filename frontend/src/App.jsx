import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import PostTimeline from "./PostTimeline.jsx";
import SignalWorkbench from "./SignalWorkbench.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<PostTimeline />} />
        <Route path="/workbench" element={<SignalWorkbench />} />
      </Routes>
    </Router>
  );
}
