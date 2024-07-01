document.getElementById('distance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';  // Replace with your Google Maps API key

    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
        origins: [start],
        destinations: [end],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
    }, function(response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            const distance = response.rows[0].elements[0].distance.text;
            const distanceValue = response.rows[0].elements[0].distance.value;  // in meters
            const distanceKm = distanceValue / 1000;  // Convert to kilometers
            const price = calculatePrice(distanceKm);  // Calculate the price based on the distance
            document.getElementById('result').textContent = `Distance: ${distance}, Price: €${price.toFixed(2)}`;
        }
    });
});

function calculatePrice(distance) {
    const pricePerKm = 1;  // Set your price per kilometer
    return distance * pricePerKm;
}