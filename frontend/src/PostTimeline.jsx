import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "https://shrexx-momentum-ai.hf.space";

export default function PostTimeline() {
  const [posts, setPosts] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [reviewed, setReviewed] = useState(new Set());
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await fetch(`${API_BASE}/dashboard`);
      const data = await res.json();
      setPosts(data.contents || []);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    }
  }

  async function analyzePost(contentId) {
    setSelectedId(contentId);
    try {
      const res = await fetch(`${API_BASE}/content/${contentId}`);
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Analysis failed:", err);
    }
  }


  function toggleReviewed(contentId) {
    const updated = new Set(reviewed);

    if (updated.has(contentId)) {
      updated.delete(contentId);
    } else {
      updated.add(contentId);
    }

    setReviewed(updated);
  }

  function nextPost() {
    const remaining = posts.filter(
      (post) => !reviewed.has(post.content_id)
    );

    if (remaining.length === 0) {
      alert("All posts reviewed 🎉");
      return;
    }

    analyzePost(remaining[0].content_id);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI Engagement Analyst</h1>
        <button className="primary-btn" onClick={nextPost}>
          Next post to improve →
        </button>
      </header>

      <div className="layout">
        {/* LEFT PANEL */}
        <section className="panel posts">
          <h2>Needs Attention</h2>

          {posts.length === 0 && <p>No posts need attention 🎉</p>}

          {posts.map((post) => {
            const isReviewed = reviewed.has(post.content_id);

            return (
              <div
                key={post.content_id}
                className={`post-card 
                      ${isReviewed ? "reviewed" : ""} 
                      ${selectedId === post.content_id ? "active" : ""}`}
              >
                <div className="post-header">
                  <strong>ID: {post.content_id}</strong>
                  <span className={`priority-badge`}>
                    {post.priority}
                  </span>

                </div>

                <p className="hint">Hint: {post.hint}</p>

                <label className="review-label">
                  <input
                    type="checkbox"
                    checked={isReviewed}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleReviewed(post.content_id);
                    }}
                  />
                  <span>Mark as reviewed</span>
                </label>

              </div>
            );
          })}
        </section>

        {/* RIGHT PANEL */}
        <section className="panel analysis">
          <h2>Content Analysis</h2>

          {analysis ? (
            <div className="analysis-card">
              <div className="metric">
                <strong>Performance</strong>
                <span>{analysis.performance}</span>
              </div>

              <div className="metric">
                <strong>Success Driver</strong>
                <span>{analysis.analysis.success_driver}</span>
              </div>

              <div className="metric">
                <strong>Recommendation</strong>
                <span>{analysis.analysis.recommendations[0]}</span>
              </div>

              <div className="metric">
                <strong>Confidence</strong>
                <span>{analysis.analysis.confidence}</span>
              </div>
            </div>
          ) : (
            <p>Select a post to see analysis.</p>
          )}
        </section>
      </div>
    </div>
  );

}
