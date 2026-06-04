const projectsContainer =
document.getElementById("projects-container");

projects.forEach(project =>
{
    const card =
    document.createElement("div");

    card.className =
    "project-card";

    card.innerHTML =
    `
    <h3>${project.title}</h3>

    <p>
        <strong>${project.role}</strong>
    </p>

    <p style="margin-top:15px;">
        ${project.description}
    </p>

    <iframe
    src="${project.video}"
    allowfullscreen>
    </iframe>

    <h4 style="margin-top:20px;">
        Key Contributions
    </h4>

    <ul>
        ${project.contributions
            .map(item =>
            `<li>${item}</li>`)
            .join("")}
    </ul>

    <div class="tags">
        ${project.technologies
            .map(tag =>
            `<span class="tag">${tag}</span>`)
            .join("")}
    </div>

    ${
        project.website !== "#"
        ?
        `<p style="margin-top:20px;">
            <a
            class="button"
            target="_blank"
            href="${project.website}">
                External Link
            </a>
        </p>`
        :
        ""
    }
    `;

    projectsContainer.appendChild(card);
});

const leisureContainer =
document.getElementById("leisure-container");

leisure.forEach(leisure =>
{
    const card =
    document.createElement("div");

    card.className =
    "leisure-card";

    card.innerHTML =
    `
    <h3>${leisure.title}</h3>

    <p>
        <strong>${leisure.role}</strong>
    </p>

    <p style="margin-top:15px;">
        ${leisure.description}
    </p>

    <iframe
    src="${leisure.video}"
    allowfullscreen>
    </iframe>

    <h4 style="margin-top:20px;">
        Key Contributions
    </h4>

    <ul>
        ${leisure.contributions
            .map(item =>
            `<li>${item}</li>`)
            .join("")}
    </ul>

    <div class="tags">
        ${leisure.technologies
            .map(tag =>
            `<span class="tag">${tag}</span>`)
            .join("")}
    </div>

    ${
        leisure.website !== "#"
        ?
        `<p style="margin-top:20px;">
            <a
            class="button"
            target="_blank"
            href="${leisure.website}">
                External Link
            </a>
        </p>`
        :
        ""
    }
    `;

    leisureContainer.appendChild(card);
});

const experienceContainer =
document.getElementById("experience-container");

experience.forEach(job =>
{
    const card =
    document.createElement("div");

    card.className =
    "experience-card";

    card.innerHTML =
    `
    <h3>${job.company}</h3>

    <p>
        <strong>${job.role}</strong>
    </p>

    <p>
        ${job.duration}
    </p>

    <ul style="margin-top:15px;">
        ${job.highlights
            .map(item =>
            `<li>${item}</li>`)
            .join("")}
    </ul>
    `;

    experienceContainer.appendChild(card);
});

const skillsContainer =
document.getElementById("skills-container");

skills.forEach(skill =>
{
    const card =
    document.createElement("div");

    card.className =
    "skill-card";

    card.innerHTML =
    `
    <h3>${skill.category}</h3>

    <div class="tags">
        ${skill.items
            .map(item =>
            `<span class="tag">${item}</span>`)
            .join("")}
    </div>
    `;

    skillsContainer.appendChild(card);
});