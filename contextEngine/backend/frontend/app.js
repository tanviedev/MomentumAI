

const API = "http://127.0.0.1:8000";

const contentList = document.getElementById("contentList");
const detailContent = document.getElementById("detailContent");
const nextBtn = document.getElementById("nextBtn");

// --------------------
// Load dashboard
// --------------------
fetch(`${API}/dashboard`)
  .then(res => res.json())
  .then(data => {
    renderList(data.contents);
  });

function renderList(contents) {
  contentList.innerHTML = "";

  contents.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.content_id}</strong><br/>
      <span class="hint">${item.hint}</span>
    `;

    li.onclick = () => loadContent(item.content_id);
    contentList.appendChild(li);
  });
}

// --------------------
// Load single content analysis
// --------------------
function loadContent(contentId) {
  fetch(`${API}/content/${contentId}`)
    .then(res => res.json())
    .then(data => {
      detailContent.innerHTML = `
        <p><strong>ID:</strong> ${data.content_id}</p>
        <p><strong>Performance:</strong> ${data.performance}</p>
        <p><strong>Why:</strong> ${data.analysis.success_driver}</p>
        <p><strong>What to do:</strong></p>
        <ul>
          ${data.analysis.recommendations
            .map(r => `<li>${r}</li>`)
            .join("")}
        </ul>
      `;
    });
}

// --------------------
// Next post to improve
// --------------------
nextBtn.onclick = () => {
  fetch(`${API}/next`)
    .then(res => res.json())
    .then(data => {
      if (data.content_id) {
        loadContent(data.content_id);
      } else {
        alert(data.message);
      }
    });
};


