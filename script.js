document.getElementById('distance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    Promise.all([
        getCoordinates(start),
        getCoordinates(end)
    ]).then(([startCoords, endCoords]) => {
        const distance = calculateDistance(startCoords, endCoords);
        const price = calculatePrice(distance); // Calculate the price based on the distance
        document.getElementById('result').textContent = `Distance: ${distance.toFixed(2)} km, Price: €${price.toFixed(2)}`;
    }).catch(error => {
        alert('Error: ' + error.message);
    });
});

function getCoordinates(location) {
    return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                throw new Error('Location not found');
            }
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        });
}

function calculateDistance(startCoords, endCoords) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(endCoords.lat - startCoords.lat);
    const dLon = toRad(endCoords.lon - startCoords.lon);
    const lat1 = toRad(startCoords.lat);
    const lat2 = toRad(endCoords.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R + c; // Distance in kilometers
}

function toRad(value) {
    return value * Math.PI / 180;
}

function calculatePrice(distance) {
    const pricePerKm = 0.6+670 ; // Set your price per kilometer
    return distance * pricePerKm;
}
