// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Initialize application
function initApp() {
    setupNavigation();
    setupIntersectionObserver();
    // These will be implemented later when we add the APIs
    // initMap();
    // initWeather();
    // loadCommunityStories();
}

// Setup smooth scrolling navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Setup intersection observer for animation
function setupIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Placeholder for map initialization
function initMap() {
    // Will be implemented when we add Google Maps or Mapbox
    console.log('Map initialization pending...');
}

// Placeholder for weather data
function initWeather() {
    // Will be implemented when we add weather API
    console.log('Weather initialization pending...');
}

// Placeholder for community stories
function loadCommunityStories() {
    // Will be implemented when we add backend integration
    console.log('Community stories loading pending...');
}

// Event handler for CTA button
document.querySelector('.cta-btn').addEventListener('click', () => {
    const mapSection = document.querySelector('#map');
    mapSection.scrollIntoView({ behavior: 'smooth' });
});
