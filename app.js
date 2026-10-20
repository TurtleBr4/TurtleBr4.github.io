async function renderProjects() {
  const container = document.querySelector("#project-list");
  try {
    const response = await fetch("projects.json");
    if (!response.ok) throw new Error("Could not load projects.json");
    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error("projects.json must contain an array");
    if (projects.length === 0) {
      container.innerHTML = '<p class="loading-message">Projects are on their way. Check back soon.</p>';
      return;
    }
    container.innerHTML = projects.map((project, index) => {
      const tags = Array.isArray(project.tags) ? project.tags : [];
      const image = project.image
        ? `<img src="${escapeAttr(project.image)}" alt="${escapeAttr(project.title)} screenshot" loading="lazy">`
        : `<div class="image-placeholder"><span>${escapeHtml(project.title)}</span></div>`;
      const playLink = project.webBuild
        ? `<a class="play-link" href="play.html?game=${encodeURIComponent(project.id)}">PLAY IN BROWSER ↗</a>`
        : `<span class="unavailable">BROWSER BUILD COMING SOON</span>`;
      const externalLink = project.projectUrl
        ? `<a href="${escapeAttr(project.projectUrl)}" target="_blank" rel="noopener noreferrer">VIEW PROJECT ↗</a>`
        : "";
      return `<article class="project-card">
        <div class="project-image">${image}<span class="project-number">${String(index + 1).padStart(2,"0")} / ${String(projects.length).padStart(2,"0")}</span></div>
        <div class="project-body">
          <div class="project-meta"><span>${escapeHtml(project.type || "GAME PROJECT")}</span><span>${escapeHtml(project.year || "")}</span></div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description || "")}</p>
          ${tags.length ? `<div class="skill-chips">${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
          <div class="project-actions">${playLink}${externalLink}</div>
        </div>
      </article>`;
    }).join("");
  } catch (error) {
    container.innerHTML = '<p class="loading-message">Could not load projects. Check that projects.json is valid JSON and the site is being served over HTTP/HTTPS.</p>';
    console.error(error);
  }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function escapeAttr(value) { return escapeHtml(value); }
document.querySelector("#year").textContent = new Date().getFullYear();
renderProjects();
