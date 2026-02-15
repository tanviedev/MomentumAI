import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* HERO */}
      <section className="home-hero">
        <h1>AI Engagement Analyst</h1>
        <p className="home-subtitle">
          Detect weak engagement signals, analyze performance patterns,
          and generate actionable AI-powered recommendations.
        </p>
      </section>

      {/* FEATURES */}
      <section className="home-features">
        <div className="feature-card">
          <h3>📊 Detect Underperforming Posts</h3>
          <p>
            Automatically prioritize content that needs attention based
            on engagement signals.
          </p>
        </div>

        <div className="feature-card">
          <h3>🧠 Signal-Level Analysis</h3>
          <p>
            Break down hook strength, shareability, timing quality,
            and audience alignment.
          </p>
        </div>

        <div className="feature-card">
          <h3>✨ AI Recommendations</h3>
          <p>
            Generate structured insights and clear improvement actions
            using LLM-powered reasoning.
          </p>
        </div>
      </section>

      {/* DASHBOARD NAVIGATION */}
      <section className="home-navigation">
        <div
          className="nav-card"
          onClick={() => navigate("/timeline")}
        >
          <h2>Open Post Timeline →</h2>
          <p>Review prioritized posts and analyze performance.</p>
        </div>

        <div
          className="nav-card"
          onClick={() => navigate("/workbench")}
        >
          <h2>Open Signal Workbench →</h2>
          <p>Experiment with signals and generate AI insights.</p>
        </div>
      </section>
    </div>
  );
}
