// Initialize the Leaflet map
const map = L.map('map').setView([-2.5, 118.5], 5) // Default center: Indonesia

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map)

// Function to load radar data (already implemented)
function loadRadarData() {
    const radarLayer = L.tileLayer('https://tile.openweathermap.org/map/rain/{z}/{x}/{y}.png?appid=6e580ae8d4ad24d6c68cae64befa67f1', {
        maxZoom: 19,
        attribution: '&copy <a href="https://openweathermap.org">OpenWeatherMap</a>',
        opacity: 0.9
    })
    radarLayer.addTo(map)
}

// Function to search for a location using Nominatim API
function searchLocation(city) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = data[0].lat
                const lon = data[0].lon

                // Set the map view to the searched location
                map.setView([lat, lon], 10) // Zoom level set to 10
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error)
        })
}

// Function to show the details section and resize the map
function showDetails() {
    document.querySelector('.details').style.display = 'block' // Show the details
    map.invalidateSize() // Trigger resize of the map
}

// Add event listener to the search button
document.querySelector('.search-btn').addEventListener('click', () => {
    const cityInput = document.querySelector('.city-input').value
    if (cityInput) {
        searchLocation(cityInput)  // Trigger search and map update
    }
})

document.querySelector('.city-input').addEventListener('keydown', (event) => {
    const cityInput = document.querySelector('.city-input')
    if(event.key == 'Enter' && cityInput.value.trim() != ''){
        searchLocation(cityInput.value)  // Trigger search and map update
    }
})

// Event listener for the button
document.getElementById("loadRadarBtn").addEventListener("click", function() {
    loadRadarData()
    showDetails() // Call showDetails when loading radar data
})