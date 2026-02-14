const API_BASE = "http://127.0.0.1:8000";

//Post Timeline jsx
export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function fetchContent(contentId) {
  const res = await fetch(`${API_BASE}/content/${contentId}`);
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json();
}

export async function fetchNext() {
  const res = await fetch(`${API_BASE}/next`);
  if (!res.ok) throw new Error("Failed to fetch next post");
  return res.json();
}



//signal workbench jsx
export async function fetchLinks() {
  const res = await fetch(`${API_BASE}/links`);
  if (!res.ok) throw new Error("Failed to fetch links");
  return res.json();
}

export async function fetchContentByLink(link) {
  const res = await fetch(`${API_BASE}/content/link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link })
  });

  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json();
}

export async function analyzeRaw(signals) {
  const res = await fetch(`${API_BASE}/analyze/raw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signals)
  });

  if (!res.ok) throw new Error("Analysis failed");
  return res.json();
}
