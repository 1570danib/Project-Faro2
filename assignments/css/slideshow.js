/**
 * Slideshow / Carrusel Functionality
 * Manages multiple slideshows on the page with navigation controls
 */

// Store slide indices for each slideshow container
const slideIndices = {};

/**
 * Initialize all slideshows on page load
 * Sets up the first slide to be visible for each slideshow container
 */
document.addEventListener('DOMContentLoaded', function() {
  const slideshows = document.querySelectorAll('.slideshow-container');
  
  slideshows.forEach(slideshow => {
    const slideshowId = slideshow.id;
    if (slideshowId) {
      slideIndices[slideshowId] = 1;
      showSlides(1, slideshowId);
    }
  });
});

/**
 * Change slide by incrementing or decrementing the index
 * @param {number} n - The number to add to the current slide index (1 for next, -1 for previous)
 * @param {string} containerId - The ID of the slideshow container
 */
function changeSlide(n, containerId) {
  if (slideIndices[containerId] !== undefined) {
    slideIndices[containerId] += n;
    showSlides(slideIndices[containerId], containerId);
  }
}

/**
 * Display the slide at the specified index
 * Handles wrapping around to the beginning/end of the slide list
 * @param {number} n - The slide index to display
 * @param {string} containerId - The ID of the slideshow container
 */
function showSlides(n, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const slides = container.querySelectorAll('.slide');
  
  // Handle wrap-around: if we go past the last slide, go to the first
  if (n > slides.length) {
    slideIndices[containerId] = 1;
  }
  // Handle wrap-around: if we go before the first slide, go to the last
  if (n < 1) {
    slideIndices[containerId] = slides.length;
  }
  
  // Hide all slides
  slides.forEach(slide => {
    slide.style.display = 'none';
  });
  
  // Show the current slide
  if (slides.length > 0) {
    slides[slideIndices[containerId] - 1].style.display = 'block';
  }
}

/*PROFE OLIVER*/
function initializeCarousel(carouselId) {
  let slideIndex = 0;
  showSlides(carouselId, slideIndex);

  function plusSlides(carouselId, n) {
    showSlides(carouselId, slideIndex += n);
  }

  function showSlides(carouselId, n) {
    let i;
    let carousel = document.getElementById(carouselId);
    let slides = carousel.getElementsByClassName("slide");
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "flex";
  }

  document.querySelectorAll('.prev[data-target="' + carouselId + '"]').forEach(button => {
    button.addEventListener('click', function() {
      plusSlides(carouselId, -1);
    });
  });
  document.querySelectorAll('.next[data-target="' + carouselId + '"]').forEach(button => {
    button.addEventListener('click', function() {
      plusSlides(carouselId, 1);
    });
  });
}

// pESTAÑAS MAJO
// Función para cambiar entre pestañas
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  
  // Esconder todo el contenido de las pestañas
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }

  // Quitar la clase "active" de todos los botones
  tablinks = document.getElementsByClassName("tab-btn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Mostrar la pestaña actual y añadir clase active al botón
  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// Lógica básica para mover slides (ajustada para múltiples carruseles)
function moveSlide(carouselId, direction) {
  const container = document.getElementById(carouselId);
  const slides = container.getElementsByClassName("slide");
  let activeIndex = -1;

  // Encontrar el slide que se está mostrando
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].style.display === "block" || getComputedStyle(slides[i]).display === "block") {
      activeIndex = i;
      slides[i].style.display = "none";
      break;
    }
  }

  // Si no hay ninguno visible por defecto, empezamos en 0
  if (activeIndex === -1) activeIndex = 0;

  let nextIndex = activeIndex + direction;
  if (nextIndex >= slides.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = slides.length - 1;

  slides[nextIndex].style.display = "block";
}

// Inicializar el primer slide de cada carrusel al cargar
document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.slideshow-container');
    carousels.forEach(c => {
        const slides = c.getElementsByClassName("slide");
        if(slides.length > 0) slides[0].style.display = "block";
    });
});