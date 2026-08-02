let currentModalMediaIndex = 0;

function openModal(containerId, index) {
  let items = [];
  if (containerId === 'projects-container') items = projects;
  else if (containerId === 'personal-container') items = personalProjects;
  else if (containerId === 'published-container') items = publishedProjects;
  else return;
  if (!items || !items[index]) return;

  const item = items[index];
  currentModalMediaIndex = 0;

  let mediaItems = [];
  if (item.media && Array.isArray(item.media) && item.media.length > 0) mediaItems = item.media;
  else if (item.video) mediaItems = [{ type: 'video', src: item.video }];
  else if (item.image) mediaItems = [{ type: 'image', src: item.image }];
  else mediaItems = [{ type: 'image', src: 'assets/images/under-development.png' }];

  const modalOverlay = document.getElementById('modal-overlay');
  if (!modalOverlay) return;

  const viewer = modalOverlay.querySelector('.modal-media-viewer');
  const details = modalOverlay.querySelector('.modal-details');

  renderModalMedia(mediaItems, 0);

  details.innerHTML = `
    <h2>${item.title}</h2>
    <div class="role">${item.role || ''}</div>
    <div class="description">${item.description || ''}</div>
    <h4>My Contributions</h4>
    <ul>${(item.contributions || []).map(c => `<li>${c}</li>`).join('')}</ul>
    <div class="modal-links">
      ${item.links ? item.links.map(link => `<a class="button secondary" href="${link.url}" target="_blank">${link.label}</a>`).join('') : ''}
    </div>
  `;

  modalOverlay.dataset.mediaItems = JSON.stringify(mediaItems);
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function renderModalMedia(mediaItems, index) {
  const viewer = document.querySelector('.modal-media-viewer');
  if (!viewer) return;
  const item = mediaItems[index];
  viewer.innerHTML = `
    ${getMediaHTML(item)}
    ${mediaItems.length > 1 ? `<button class="modal-nav-btn prev" onclick="navigateModalMedia(-1)">‹</button>` : ''}
    ${mediaItems.length > 1 ? `<button class="modal-nav-btn next" onclick="navigateModalMedia(1)">›</button>` : ''}
  `;
}

function navigateModalMedia(direction) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  const mediaItems = JSON.parse(overlay.dataset.mediaItems || '[]');
  if (mediaItems.length <= 1) return;
  currentModalMediaIndex = (currentModalMediaIndex + direction + mediaItems.length) % mediaItems.length;
  renderModalMedia(mediaItems, currentModalMediaIndex);
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });