const API_KEY = '184c589241e0a8a6a87b1a81ca8d61a7'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchWeatherData(city) {
    const weatherUrl = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error('City not found');
    const weatherData = await response.json();

    const { lat, lon } = weatherData.coord;

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=uv_index`;
    try {
        const uvResponse = await fetch(openMeteoUrl);
        const uvData = await uvResponse.json();
        weatherData.uv = uvData.current.uv_index; 
    } catch (e) {
        console.warn("Failed to fetch UV from Open-Meteo, defaulting to 0");
        weatherData.uv = 0;
    }

    const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    
    weatherData.pop = Math.round((forecastData.list[0].pop || 0) * 100);

    weatherData.hourlyForecast = forecastData.list.slice(0, 8).map(item => {
        return {
            time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon
        };
    });

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
        hourlyForecast: data.hourlyForecast,
        date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        })
    };
}