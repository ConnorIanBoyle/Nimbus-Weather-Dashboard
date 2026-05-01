# Nimbus - Real-Time Weather Dashboard

Nimbus is a sleek, dark-themed weather dashboard built with Vanilla JavaScript, HTML5, and Bootstrap. It fetches real-time meteorological data from the OpenWeatherMap API to provide current conditions, detailed weather metrics, and a custom-calculated UV index.

## Features
* **Real-Time Search:** Get current weather data for any global city.
* **Cyber-Dark UI:** A modern, high-contrast interface featuring "Electric Lime" accents and glassmorphism elements.
* **Detailed Metrics:** Displays Temperature, Feels Like, Humidity, Wind Speed, Visibility, Precipitation Probability, and UV Index.
* **24-Hour Forecast Timeline:** A dynamically generated, horizontally scrolling widget displaying the temperature and weather conditions in 3-hour intervals for the next 24 hours.
* **Dynamic Iconography:** Weather icons dynamically update and apply custom CSS filters to match the application's neon aesthetic.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing using Bootstrap's grid system.

## Data Calculations & Accuracy Disclaimer
To provide a rich user experience using OpenWeatherMap's free API tier (v2.5), this application utilizes **API chaining** and **custom algorithms**. As a result, some data points are approximations and may differ slightly from premium weather services:

1. **UV Index (Cloud Attenuation Algorithm):**
    The free OpenWeatherMap UV endpoint returns a "Clear Sky" UV Index, which ignores real-time cloud cover. To provide a more accurate, real-world UV rating, Nimbus uses a custom mathematical algorithm. It fetches the current cloud cover percentage and applies an attenuation factor (reducing the UV by up to 55% during heavy overcast conditions). *This is an estimation and should not be used for medical or strict health purposes.*

2. **Precipitation Probability (PoP):**
   Because the standard "Current Weather" endpoint does not include precipitation chance, Nimbus makes a secondary call to the 5-Day/3-Hour Forecast endpoint. The percentage shown represents the *probability of precipitation in the current 3-hour window*, rather than a live radar reading.

3. **Forecast Intervals:**
   The forecast timeline utilizes the 5-Day forecast endpoint, which returns data in strictly 3-hour blocks rather than 1-hour blocks.

4. **Coordinate Shifting:**
   Searching for a city by name queries the central coordinates of that city. The weather at these exact coordinates might vary slightly from localized neighborhood sensors.

## Technologies Used
* **Frontend:** HTML5, CSS3 (Custom Variables & Filters)
* **Framework:** Bootstrap 5.3 (via CDN)
* **Icons:** Bootstrap Icons
* **JavaScript:** Vanilla JS (ES6 Modules, Async/Await, Fetch API)
* **API:** OpenWeatherMap API (Current Weather, Forecast, and UV endpoints)

## Installation and Setup

Because this project utilizes ES6 Modules (`import`/`export` across multiple JavaScript files), it **must be run on a local server**. Opening the `index.html` file directly in your browser will result in CORS errors.

### 1. Clone the repository
```bash
git clone https://github.com/ConnorIanBoyle/Nimbus-Weather-Dashboard.git
cd nimbus-weather
```

### 2. Get an API Key
1. Go to OpenWeatherMap and create a free account.
2. Generate an API key. *(Note: New keys can take up to 2 hours to activate).*
3. Open `src/api.js` and paste your key into the `API_KEY` variable:
   `const API_KEY = 'YOUR_API_KEY_HERE';`

### 3. Run a Local Server
You can use any local server of your choice:
* **VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
* **Python:** Run `python -m http.server 8000` in your terminal, then go to `http://localhost:8000` in your browser.
* **Node.js:** Run `npx serve .` in your terminal.

## Project Structure
nimbus-weather/
│
├── index.html          # Main HTML structure
├── style.css           # Custom dark mode & neon green styling
│
└── src/
    ├── app.js          # Main controller & event listeners
    ├── api.js          # API fetch logic & custom data calculations
    └── ui.js           # DOM manipulation and data rendering

## Future Improvements
* Add a toggle for Celsius / Fahrenheit.
* Add a 5-day visual forecast chart using Chart.js.
* Implement Geolocation API to automatically load the user's local weather on startup.
* Add `localStorage` to save the user's most recently searched cities.