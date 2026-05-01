function renderWeather(data) {
    const weatherContainer = document.querySelector('#weather-container');
    const errorMessage = document.querySelector('#error-message');

    errorMessage.classList.add('d-none');
    weatherContainer.classList.remove('d-none');

    document.querySelector('#city-name').textContent = data.name;
    document.querySelector('#current-date').textContent = data.date;
    document.querySelector('#temperature').textContent = `${data.temp}°F`;
    document.querySelector('#description').textContent = data.description;
    
    const iconElement = document.querySelector('#weather-icon');
    iconElement.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

    document.querySelector('#humidity').textContent = `${data.humidity}%`;
    document.querySelector('#wind-speed').textContent = `${Math.round(data.wind)} mph`;
    document.querySelector('#feels-like').textContent = `${data.feelsLike}°F`;
    document.querySelector('#visibility').textContent = `${data.visibility} mi`;
    
    document.querySelector('#precipitation').textContent = `${data.pop}%`;
    
    const uvElement = document.querySelector('#uv-index');
    uvElement.textContent = data.uv;

    if (data.uv > 7) uvElement.style.color = '#ff4d4d';
    else if (data.uv > 3) uvElement.style.color = '#ffa500';
    else uvElement.style.color = '#00ff4c';

    // Update Hourly/3-Hour Forecast
    const hourlyContainer = document.querySelector('#hourly-container');
    hourlyContainer.innerHTML = ''; // Clear previous results

    data.hourlyForecast.forEach(forecast => {
        // Create a new div for each block
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('hourly-item');
        
        // Inject the HTML template
        forecastElement.innerHTML = `
            <p class="text-muted mb-1 small fw-bold">${forecast.time}</p>
            <img class="hourly-icon my-1" src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="Forecast Icon">
            <h5 class="fw-bold mb-0">${forecast.temp}°</h5>
        `;
        
        hourlyContainer.appendChild(forecastElement);
    });

}

function showError(message) {
    document.querySelector('#weather-container').classList.add('d-none');
    const err = document.querySelector('#error-message');
    err.classList.remove('d-none');
    err.textContent = message;
}