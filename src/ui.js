function renderWeather(data) {
    const weatherContainer = document.querySelector('#weather-container');
    const errorMessage = document.querySelector('#error-message');

    errorMessage.classList.add('d-none');
    weatherContainer.classList.remove('d-none');

    // Main Info
    document.querySelector('#city-name').textContent = data.name;
    document.querySelector('#current-date').textContent = data.date;
    document.querySelector('#temperature').textContent = `${data.temp}°F`;
    document.querySelector('#description').textContent = data.description;
    
    const iconElement = document.querySelector('#weather-icon');
    iconElement.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

    // Stats Grid
    document.querySelector('#humidity').textContent = `${data.humidity}%`;
    document.querySelector('#wind-speed').textContent = `${Math.round(data.wind)} mph`;
    document.querySelector('#feels-like').textContent = `${data.feelsLike}°F`;
    document.querySelector('#visibility').textContent = `${data.visibility} mi`;
    
    // New Stats
    document.querySelector('#precipitation').textContent = `${data.pop}%`;
    
    const uvElement = document.querySelector('#uv-index');
    uvElement.textContent = data.uv;

    // UV Logic Color Coding
    if (data.uv > 7) uvElement.style.color = '#ff4d4d'; // Red
    else if (data.uv > 3) uvElement.style.color = '#ffa500'; // Orange
    else uvElement.style.color = '#00ff4c'; // Your neon green
}

function showError(message) {
    document.querySelector('#weather-container').classList.add('d-none');
    const err = document.querySelector('#error-message');
    err.classList.remove('d-none');
    err.textContent = message;
}