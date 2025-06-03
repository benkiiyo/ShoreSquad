document.addEventListener('DOMContentLoaded', function() {
    // Initialize map centered on Vancouver
    const map = L.map('cleanup-map').setView([49.2827, -123.1207], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Sample cleanup locations
    const cleanupLocations = [
        {
            name: "English Bay Beach",
            coords: [49.2867, -123.1418],
            date: "June 15, 2025",
            time: "09:00 AM"
        },
        {
            name: "Kitsilano Beach",
            coords: [49.2754, -123.1536],
            date: "June 22, 2025",
            time: "10:00 AM"
        }
    ];

    // Add markers for each cleanup location
    cleanupLocations.forEach(location => {
        L.marker(location.coords)
            .addTo(map)
            .bindPopup(`
                <strong>${location.name}</strong><br>
                Date: ${location.date}<br>
                Time: ${location.time}<br>
                <button onclick="alert('Joining cleanup at ${location.name}!')">Join Cleanup</button>
            `);
    });
});