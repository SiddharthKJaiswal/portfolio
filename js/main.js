function GetMediaHTML(item)
{
    if(item.video)
    {
        return `
        <iframe
            src="${item.video}"
            title="${item.title}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
        </iframe>
        `;
    }

    return `
    <img
        class="project-image"
        src="${
            item.image ||
            'assets/images/under-development.png'
        }"
        alt="${item.title}"
        onerror="this.src='assets/images/under-development.png'">
    `;
}

const projectsContainer =
document.getElementById("projects-container");

projects.forEach(project =>
{
    const card =
    document.createElement("div");

    card.className =
    "project-card";

    card.innerHTML = `

<div class="project-media">
    ${GetMediaHTML(project)}
	<div class="tags">
        ${project.technologies
            .map(tag =>
                `<span class="tag">${tag}</span>`
            )
            .join("")}
    </div>

    <div class="project-links">

    ${
        project.links
        ?
        project.links.map(link =>

            `<a
                class="button secondary"
                href="${link.url}"
                target="_blank">
                ${link.label}
            </a>`

        ).join("")
        :
        ""
    }

	</div>
</div>

<div class="project-content">

    <h3>${project.title}</h3>

    <p>
        <strong>${project.role}</strong>
    </p>

    <p style="margin-top:15px;">
        ${project.description}
    </p>

    <h4 style="margin-top:20px;">
        My Contributions
    </h4>

    <ul>
        ${project.contributions
            .map(item => `<li>${item}</li>`)
            .join("")}
    </ul>
</div>
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

    card.innerHTML = `

<div class="leisure-media">
    ${GetMediaHTML(leisure)}
	<div class="tags">
        ${leisure.technologies
            .map(tag =>
                `<span class="tag">${tag}</span>`
            )
            .join("")}
    </div>

    <div class="leisure-links">

    ${
        leisure.links
        ?
        leisure.links.map(link =>

            `<a
                class="button secondary"
                href="${link.url}"
                target="_blank">
                ${link.label}
            </a>`

        ).join("")
        :
        ""
    }

	</div>
</div>

<div class="leisure-content">

    <h3>${leisure.title}</h3>

    <p>
        <strong>${leisure.role}</strong>
    </p>

    <p style="margin-top:15px;">
        ${leisure.description}
    </p>

    <h4 style="margin-top:20px;">
        My Contributions
    </h4>

    <ul>
        ${leisure.contributions
            .map(item => `<li>${item}</li>`)
            .join("")}
    </ul>

</div>
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