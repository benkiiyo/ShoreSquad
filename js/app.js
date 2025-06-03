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

// Initialize weather functionality
async function initWeather() {
    // Default coordinates (can be updated based on user location)
    const defaultLat = 25.7617;  // Miami Beach coordinates
    const defaultLon = -80.1918;
    
    try {
        // Get user's location if permitted
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => fetchWeather(position.coords.latitude, position.coords.longitude),
                error => {
                    console.log('Using default location:', error);
                    fetchWeather(defaultLat, defaultLon);
                }
            );
        } else {
            fetchWeather(defaultLat, defaultLon);
        }
    } catch (error) {
        console.error('Weather initialization error:', error);
        updateWeatherUI({
            error: true,
            message: 'Unable to fetch weather data'
        });
    }
}

// Fetch weather data from API
async function fetchWeather(lat, lon) {
    try {
        const response = await fetch(
            `${config.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${config.WEATHER_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Weather fetch error:', error);
        updateWeatherUI({
            error: true,
            message: 'Unable to fetch weather data'
        });
    }
}

// Update weather UI with fetched data
function updateWeatherUI(data) {
    const weatherIcon = document.querySelector('.weather-icon i');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const uvIndex = document.querySelector('.uv-index');

    if (data.error) {
        description.textContent = data.message;
        return;
    }

    // Update weather icon based on condition
    const iconClass = getWeatherIconClass(data.weather[0].main);
    weatherIcon.className = `fas ${iconClass}`;

    // Update weather information
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    humidity.textContent = `${data.main.humidity}%`;
    
    // UV Index is not available in the free API
    uvIndex.textContent = 'UV: N/A';
}

// Helper function to map weather conditions to Font Awesome icons
function getWeatherIconClass(condition) {
    const iconMap = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Smoke': 'fa-smog',
        'Haze': 'fa-smog',
        'Dust': 'fa-smog',
        'Fog': 'fa-smog',
        'Sand': 'fa-smog',
        'Ash': 'fa-smog',
        'Squall': 'fa-wind',
        'Tornado': 'fa-tornado'
    };

    return iconMap[condition] || 'fa-sun';
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
