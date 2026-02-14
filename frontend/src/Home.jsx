import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>AI Engagement Analyst</h1>
      <p>Select a dashboard to view:</p>
      <button onClick={() => navigate("/timeline")} style={{ margin: "10px" }}>
        Go to Post Timeline
      </button>
      <button onClick={() => navigate("/workbench")} style={{ margin: "10px" }}>
        Go to Signal Workbench
      </button>
    </div>
  );
}
