const API_BASE = "http://127.0.0.1:8000";

export async function fetchLinks() {
  const res = await fetch(`${API_BASE}/links`);
  if (!res.ok) throw new Error("Failed to fetch links");
  return res.json();
}

export async function analyzeLink(link) {
  const res = await fetch(`${API_BASE}/analyze/link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ link }),
  });

  if (!res.ok) {
    throw new Error("Analysis failed");
  }

  return res.json();
}
