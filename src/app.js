const searchBtn = document.querySelector('#search-btn');
const cityInput = document.querySelector('#city-input');

searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        searchBtn.disabled = true;
        searchBtn.textContent = "...";

        const rawData = await fetchWeatherData(city);
        const cleanData = formatWeatherData(rawData);
        renderWeather(cleanData);

    } catch (error) {
        showError("City not found or API still activating.");
        console.error(error);
    } finally {
        searchBtn.disabled = false;
        searchBtn.innerHTML = '<i class="bi bi-search"></i> Search';
    }
}