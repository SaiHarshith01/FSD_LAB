async function getWeather() {

    const city = document.getElementById("city").value;

    if (city == "") {
        document.getElementById("message").textContent = "Enter a city";
        return;
    }

    try {

        // Find city coordinates
        const geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geo.json();

        if (!geoData.results) {
            document.getElementById("message").textContent = "City not found";
            return;
        }

        const place = geoData.results[0];

        // Get weather
        const weather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );

        const data = await weather.json();
        const current = data.current; 

        // Display weather
        document.getElementById("location").textContent =
            place.name + ", " + place.country;

        document.getElementById("temperature").textContent =
            current.temperature_2m + "°C";

        document.getElementById("humidity").textContent =
            current.relative_humidity_2m;

        document.getElementById("wind").textContent =
            current.wind_speed_10m;

        document.getElementById("description").textContent =
            "Weather Code: " + current.weather_code;

        document.getElementById("message").textContent = "";

    } catch {
        document.getElementById("message").textContent =
            "Error fetching weather";
    }
}