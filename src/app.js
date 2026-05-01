const searchBtn = document.querySelector('#search-btn');
const cityInput = document.querySelector('#city-input');

renderRecentSearches();

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

        saveRecentSearch(cleanData.name);

        renderRecentSearches();

    } catch (error) {
        showError("City not found or API still activating.");
        console.error(error);
    } finally {
        searchBtn.disabled = false;
        searchBtn.innerHTML = '<i class="bi bi-search"></i> Search';
    }
}

function saveRecentSearch(city) {
    let searches = JSON.parse(localStorage.getItem('nimbus_recent')) || [];

    searches = searches.filter(s => s.toLowerCase() !== city.toLowerCase());

    searches.unshift(city);

    if (searches.length > 5) {
        searches.pop();
    }

    localStorage.setItem('nimbus_recent', JSON.stringify(searches));

    renderRecentSearches();
}

function renderRecentSearches() {
    const container = document.querySelector('#recent-searches');
    const cityNameElement = document.querySelector('#city-name');
    const currentCity = cityNameElement ? cityNameElement.textContent.toLowerCase() : "";
    let searches = JSON.parse(localStorage.getItem('nimbus_recent')) || [];

    searches.sort((a, b) => a.localeCompare(b));

    container.innerHTML = '';

    searches.forEach(city => {
        const btn = document.createElement('button');
        btn.classList.add('recent-pill');
        btn.textContent = city;

        if (city.toLowerCase() === currentCity) {
            btn.classList.add('active');
        }
        
        btn.onclick = () => {
            document.querySelector('#city-input').value = city;
            handleSearch(); 
        };
        
        container.appendChild(btn);
    });
}