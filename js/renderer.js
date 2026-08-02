// ----- 3D Tilt Effect (Golden) -----
function applyTiltEffect() {
  const cards = document.querySelectorAll('.project-card, .published-card, .personal-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.05s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ----- Render Projects (Core Function) -----
function renderProjects(containerId, dataArray, cardClass, contentClass) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // If no data, hide the entire parent section
  if (!dataArray || dataArray.length === 0) {
    const section = container.closest('section');
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = dataArray.map((item, idx) => {
    const carousel = buildCarouselHTML(item);
    const tagsHtml = item.technologies ? item.technologies.map(t => `<span class="tag">${t}</span>`).join('') : '';
    const dataIndex = `data-index="${idx}" data-type="${containerId}"`;

    return `
      <div class="${cardClass}" ${dataIndex}>
        <div class="${cardClass}-media">
          ${carousel.html}
          <div class="tags">${tagsHtml}</div>
        </div>
        <div class="${contentClass}">
		<h3>${item.title}</h3>
		<p><strong>${item.role || ''}</strong> ${item.status ? `<span class="status-badge">${item.status}</span>` : ''}</p>
		<p>${item.description ? item.description.substring(0, 120) + (item.description.length > 120 ? '...' : '') : ''}</p>
		</div>
        <div class="card-click-hint">⚔ Click for details</div>
      </div>
    `;
  }).join('');

  // Attach events after DOM update
  setTimeout(() => {
    attachCarouselEvents();
    applyTiltEffect();

    // Card click -> open modal
    document.querySelectorAll(`.${cardClass}`).forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.carousel-thumbnails') || e.target.closest('.carousel-main')) return;
        const index = parseInt(card.dataset.index);
        const type = card.dataset.type;
        openModal(type, index);
      });
    });
  }, 50);
}

// ----- Render Profile (Uses helpers) -----
function renderProfile() {
  if (typeof profile === 'undefined') return;
  const expStr = getExperienceString();

  // Hero
  document.getElementById('hero-title').textContent = profile.heroTitle || 'Building Gameplay Systems...';
  const bioText = (profile.bio || '').replace(/\{years\}/g, expStr);
  document.getElementById('hero-bio').textContent = bioText;
  document.getElementById('resume-btn').href = profile.resumeLink || '#';

  // Stats
  const statsContainer = document.getElementById('stats');
  if (profile.stats && profile.stats.length) {
    statsContainer.innerHTML = profile.stats.map(stat => {
      let displayNumber = stat.number;
      if (stat.number === "auto") displayNumber = expStr;
      return `<div class="stat-card"><h3>${displayNumber}</h3><p>${stat.label}</p></div>`;
    }).join('');
  }

  // Contact
  const contactMessage = document.getElementById('contact-message');
  if (profile.contactMessage) contactMessage.textContent = profile.contactMessage;
  const contactLinks = document.getElementById('contact-links');
  if (profile.contact && profile.contact.length) {
    contactLinks.innerHTML = profile.contact.map(item =>
      `<li>${item.label}: ${item.url ? `<a href="${item.url}" target="_blank">${item.text}</a>` : item.text}</li>`
    ).join('');
  }
}

// ----- Render Experience -----
function renderExperience() {
  if (typeof experience === 'undefined' || !experience.length) {
    const sec = document.getElementById('experience');
    if (sec) sec.style.display = 'none';
    return;
  }
  const container = document.getElementById('experience-container');
  container.innerHTML = experience.map(job => `
    <div class="experience-card">
      <h3>${job.company}</h3>
      <div class="role">${job.role}</div>
      <div class="duration">${job.duration}</div>
      <ul>${(job.highlights || []).map(h => `<li>${h}</li>`).join('')}</ul>
    </div>
  `).join('');
}

// ----- Render Skills -----
function renderSkills() {
  if (typeof skills === 'undefined' || !skills.length) {
    const sec = document.getElementById('skills');
    if (sec) sec.style.display = 'none';
    return;
  }
  const container = document.getElementById('skills-container');
  container.innerHTML = skills.map(skill => `
    <div class="skill-card">
      <h3>${skill.category}</h3>
      <div class="tags">${(skill.items || []).map(item => `<span class="tag">${item}</span>`).join('')}</div>
    </div>
  `).join('');
}

// ----- INIT -----
renderProfile();
renderProjects('projects-container', projects, 'project-card', 'project-content');
renderProjects('published-container', publishedProjects, 'published-card', 'published-content');
renderProjects('personal-container', personalProjects, 'personal-card', 'personal-content');
renderExperience();
renderSkills();