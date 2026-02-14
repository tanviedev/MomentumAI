import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000";

export default function PostTimeline() {
  const [posts, setPosts] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [reviewed, setReviewed] = useState(new Set());

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
    <div>
      <header>
        <h1>AI Engagement Analyst</h1>
        <button onClick={nextPost}>Next post to improve →</button>
      </header>

      <main>
        <section>
          <h2>Needs Attention</h2>

          {posts.length === 0 && <p>No posts need attention 🎉</p>}

          <ul>
            {posts.map((post) => {
              const isReviewed = reviewed.has(post.content_id);

              return (
                <li
                  key={post.content_id}
                  style={{
                    opacity: isReviewed ? 0.5 : 1,
                    textDecoration: isReviewed ? "line-through" : "none",
                  }}
                >
                  <div onClick={() => analyzePost(post.content_id)}>
                    <strong>ID: {post.content_id}</strong>
                    <div className="hint">
                      Priority: {post.priority}
                    </div>
                    <div className="hint">
                      Hint: {post.hint}
                    </div>
                  </div>

                  <label style={{ marginTop: "6px", display: "block" }}>
                    <input
                      type="checkbox"
                      checked={isReviewed}
                      onChange={() => toggleReviewed(post.content_id)}
                    />{" "}
                    Mark as reviewed
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2>Content Analysis</h2>

          {analysis ? (
            <div>
              <p>
                <strong>Performance:</strong> {analysis.performance}
              </p>

              <p>
                <strong>Success Driver:</strong>{" "}
                {analysis.analysis.success_driver}
              </p>

              <p>
                <strong>Recommendation:</strong>{" "}
                {analysis.analysis.recommendations[0]}
              </p>

              <p>
                <strong>Confidence:</strong>{" "}
                {analysis.analysis.confidence}
              </p>
            </div>
          ) : (
            <p>Select a post to see analysis.</p>
          )}
        </section>
      </main>
    </div>
  );
}