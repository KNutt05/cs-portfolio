const projectData = {
  styling: {
    eyebrow: "Product logic + style scoring",
    title: "ML Styling App",
    summary:
      "A personal styling app that builds a weighted taste profile, calibrates risk as the user reacts to pieces, and helps combine clothing into outfit ideas.",
    visual: "image",
    image: "assets/styling-app-preview.png",
    alt: "ML Styling App fitting room preview",
    sections: [
      {
        heading: "What it does",
        body:
          "The app starts with an onboarding quiz, then turns the user's answers into a style profile. Users can like, save, skip, and organize pieces into a personal portfolio."
      },
      {
        heading: "Data model",
        body:
          "Each clothing item has structured tags for aesthetics, expression, occasion, color, fit, silhouette, material, and other physical traits. The user profile stores weighted evidence for the tags the app has learned."
      },
      {
        heading: "Risk logic",
        body:
          "Risk is based on distance from the user's current style. Familiar tags increase alignment; unfamiliar or avoided tags increase risk. This creates safe, slight stretch, noticeable shift, and bold challenge recommendations."
      },
      {
        heading: "Best features",
        body:
          "Riskiness calibration, adaptive taste profiling, and a personal style portfolio that groups saved inspiration into a clearer map of the user's taste."
      }
    ],
    formula: "risk score = 1 - alignment score + avoided trait penalty"
  },
  league: {
    eyebrow: "API + SQL data project",
    title: "Video Game Data Display",
    summary:
      "A League of Legends dashboard that uses Riot Games API data, stores leaderboard results in SQLite, and displays sortable player statistics by region and game mode.",
    visual: "dashboard",
    sections: [
      {
        heading: "What it does",
        body:
          "The user chooses a region, queue type, and player count. The app returns a ranked leaderboard with stats such as tier, LP, wins, losses, games played, win rate, and hot streak."
      },
      {
        heading: "API flow",
        body:
          "A Node.js server requests ranked data from Riot's public API, normalizes the response, and sends clean JSON to the browser dashboard."
      },
      {
        heading: "SQL layer",
        body:
          "Leaderboard results are cached in SQLite tables so the app can query stored data and still show a reliable demo when live API access is unavailable."
      },
      {
        heading: "Best feature",
        body:
          "The table can sort players by meaningful stats, turning raw API data into an interactive analysis tool for comparing top-ranked players."
      }
    ],
    formula: "win rate = wins / (wins + losses) * 100"
  }
};

const modal = document.querySelector("#project-modal");
const modalContent = document.querySelector("#modal-content");
const projectButtons = document.querySelectorAll("[data-project]");
const closeButtons = document.querySelectorAll("[data-close-modal]");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeProject);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeProject();
  }
});

function openProject(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  modalContent.innerHTML = buildProjectMarkup(project);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProject() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function buildProjectMarkup(project) {
  const visual =
    project.visual === "image"
      ? `<img class="walkthrough-image" src="${project.image}" alt="${project.alt}">`
      : buildDashboardVisual();

  return `
    <div class="walkthrough-hero">
      <div>
        <p class="eyebrow">${project.eyebrow}</p>
        <h2 id="modal-title">${project.title}</h2>
        <p>${project.summary}</p>
      </div>
      <div class="walkthrough-visual">${visual}</div>
    </div>
    <div class="walkthrough-grid">
      ${project.sections
        .map(
          (section) => `
            <article class="walkthrough-card">
              <h3>${section.heading}</h3>
              <p>${section.body}</p>
            </article>
          `
        )
        .join("")}
    </div>
    <div class="formula-box">
      <span>Interview math</span>
      <code>${project.formula}</code>
    </div>
  `;
}

function buildDashboardVisual() {
  return `
    <div class="dashboard-window modal-dashboard">
      <div class="dashboard-topline"></div>
      <div class="dashboard-metrics">
        <span></span><span></span><span></span>
      </div>
      <div class="dashboard-table">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  `;
}
