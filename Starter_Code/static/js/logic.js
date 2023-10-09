// Initialize the map
const map = L.map('map').setView([0, 0], 2);

// Add a tile layer (you can choose a different one)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Define a function to customize marker style based on magnitude and depth
function getMarkerStyle(magnitude, depth) {
    // Customize marker style here
}

// Load and add earthquake data to the map
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(response => response.json())
    .then(data => {
        // Process the earthquake data and add markers to the map
        data.features.forEach(quake => {
            const coordinates = quake.geometry.coordinates;
            const magnitude = quake.properties.mag;
            const depth = coordinates[2];

            const marker = L.circleMarker([coordinates[1], coordinates[0]], getMarkerStyle(magnitude, depth)).addTo(map);

            // Create a popup with additional earthquake information
            const popupContent = `<b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth} km`;
            marker.bindPopup(popupContent);
        });
    })
    .catch(error => console.error('Error loading data:', error));

// Create a legend
const legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
    // Customize legend content here
};
legend.addTo(map);

