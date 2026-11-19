document.querySelector("#year").textContent = new Date().getFullYear();

async function loadProjects() {
  const container = document.querySelector("#project-list");
  try {
    const response = await fetch("projects.json");
    if (!response.ok) throw new Error("Project data unavailable");
    const projects = await response.json();

    container.innerHTML = "";
    projects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const image = project.image
        ? `<img src="${project.image}" alt="${project.imageAlt || project.title}" loading="lazy">`
        : `<div class="project-placeholder" aria-hidden="true"></div>`;

      const links = [];
      if (project.playUrl) links.push(`<a href="${project.playUrl}" target="_blank" rel="noreferrer">Play ↗</a>`);
      if (project.projectUrl) links.push(`<a href="${project.projectUrl}" target="_blank" rel="noreferrer">Details ↗</a>`);
      if (project.sourceUrl) links.push(`<a href="${project.sourceUrl}" target="_blank" rel="noreferrer">Source ↗</a>`);

      card.innerHTML = `
        <div class="project-image">${image}</div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <span>${project.type || ""}</span>
        </div>
        ${project.description ? `<p class="project-description">${project.description}</p>` : ""}
        ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = '<p class="quiet">Project list unavailable.</p>';
    console.error(error);
  }
}
loadProjects();
