const API_KEY = '184c589241e0a8a6a87b1a81ca8d61a7'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchWeatherData(city) {
    const weatherUrl = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error('City not found');
    const weatherData = await response.json();

    const { lat, lon } = weatherData.coord;
    const cloudCover = weatherData.clouds.all;

    const uvUrl = `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const uvResponse = await fetch(uvUrl);
    const uvData = await uvResponse.json();
    const clearSkyUv = uvData.value;

    //The Cloud Attenuation Algorithm
    let actualUv = clearSkyUv;
    // Only reduce UV if there is significant cloud cover (>20%)
    if (cloudCover > 20) {
        // At 100% overcast, this math reduces the UV by 55%
        const attenuationFactor = 1 - ((cloudCover / 100) * 0.55);
        actualUv = clearSkyUv * attenuationFactor;
    }

    const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    weatherData.uv = Math.round(actualUv * 100) / 100;
    
    weatherData.pop = Math.round((forecastData.list[0].pop || 0) * 100);

    return weatherData;
}

function formatWeatherData(data) {
    return {
        name: data.name,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        visibility: (data.visibility / 1609.34).toFixed(1),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        uv: data.uv,
        pop: data.pop,
        date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        })
    };
}