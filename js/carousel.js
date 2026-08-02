// ----- Build Carousel HTML -----
function buildCarouselHTML(item) {
  let mediaItems = [];
  if (item.media && Array.isArray(item.media) && item.media.length > 0) {
    mediaItems = item.media;
  } else if (item.video) {
    mediaItems = [{ type: 'video', src: item.video }];
  } else if (item.image) {
    mediaItems = [{ type: 'image', src: item.image }];
  } else {
    mediaItems = [{ type: 'image', src: 'assets/images/under-development.png' }];
  }

  let mainHTML = '';
  let thumbHTML = '';
  const mainId = `main-${item.id || Math.random()}`;

  mediaItems.forEach((media, index) => {
    const isActive = index === 0;
    const displayStyle = isActive ? 'block' : 'none';
    const activeClass = isActive ? 'active-thumb' : '';

    // Main slide
    mainHTML += `<div class="carousel-slide" style="display:${displayStyle}; width:100%; height:100%;">
      ${getMediaHTML(media)}
    </div>`;

    // Thumbnail generation
    if (media.type === 'video') {
      // Instead of looking for a missing PNG, we use a clean inline SVG play icon
      const svgIcon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d4a373'%3E%3Cpolygon points='5,3 19,12 5,21'/%3E%3C/svg%3E`;
      thumbHTML += `<img src="${svgIcon}" alt="Video ${index}" class="${activeClass}" data-index="${index}" style="background:#1a1410; padding: 8px; object-fit: contain;">`;
    } else {
      thumbHTML += `<img src="${media.src}" alt="Thumbnail ${index}" class="${activeClass}" data-index="${index}" onerror="this.src='assets/images/under-development.png'">`;
    }
  });

  return {
    mediaItems,
    html: `
      <div class="media-carousel" data-carousel-id="${item.id || 'carousel'}">
        <div class="carousel-main" id="${mainId}">${mainHTML}</div>
        <div class="carousel-thumbnails">${thumbHTML}</div>
      </div>
    `
  };
}

// ----- Attach Carousel Events -----
function attachCarouselEvents() {
  document.querySelectorAll('.media-carousel').forEach(carousel => {
    const mainContainer = carousel.querySelector('.carousel-main');
    if (!mainContainer) return;
    const slides = mainContainer.querySelectorAll('.carousel-slide');
    const thumbs = carousel.querySelectorAll('.carousel-thumbnails img');

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        slides.forEach(s => s.style.display = 'none');
        if (slides[index]) slides[index].style.display = 'block';
        thumbs.forEach(t => t.classList.remove('active-thumb'));
        thumb.classList.add('active-thumb');
      });
    });
  });
}