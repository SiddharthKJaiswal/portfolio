// ----- Helper: Get Media HTML -----
function getMediaHTML(mediaItem) {
  if (!mediaItem) return '';
  if (mediaItem.type === 'video') {
    return `<iframe src="${mediaItem.src}" title="Media" loading="lazy" allowfullscreen></iframe>`;
  }
  return `<img src="${mediaItem.src}" alt="Media" onerror="this.src='assets/images/under-development.png'">`;
}

// ----- Calculate Years of Experience -----
function getExperienceString() {
  if (!profile || !profile.careerStart) return '5+';
  const start = new Date(profile.careerStart);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) { years--; months += 12; }
  return `${years}.${months}`;
}