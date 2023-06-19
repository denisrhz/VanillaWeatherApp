const API_KEY = "e80c8041846b522d45f42f383271eb63";

function showWeather(city) {
  defaultLogo.hidden = true;
  document.getElementById("cityName").innerText = city.name;
  document.getElementById("cityState").innerText = `${city.state}, ${city.country}`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`)
    .then(responce => responce.json())
    .then((weather) => {
      document.getElementById("weatherMainTemp").innerText = `${Math.round(weather.main.temp)}°`;
      document.getElementById("weatherFeelTemp").innerText = `Feels like ${Math.round(weather.main.feels_like)}°`;
      document.getElementById("weatherImageTemp").src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
      document.getElementById("weatherMain").innerText = `${weather.weather[0].main}`;
      document.getElementById("weatherInfoPressure").innerText = `${weather.main.pressure}`;
      document.getElementById("weatherInfoWind").innerText = `${weather.wind.speed}`;
      document.getElementById("weatherInfoHumidity").innerText = `${weather.main.humidity}`;
      document.getElementById("weatherInfoVisibility").innerText = `${Math.floor(weather.visibility / 1000)}`;
      weatherElement.hidden = false;
    })
}

function showSuggestions() {
  let cityName = searchInput.value;
  searchSuggestions.innerHTML = "";
  searchSuggestions.hidden = false;

  if (cityName) {
    let limit = 10;
    
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`)
      .then(responce => responce.json())
      .then((cities) => {
        cities.forEach(city => {
          let divSuggestion = document.createElement("a");
          divSuggestion.className = "suggestion";
          divSuggestion.innerText = `${city.country}, ${city.name}`;
          divSuggestion.addEventListener("click", () => {
            searchSuggestions.hidden = true;
            searchInput.value = "";
            showWeather(city);
          });
          searchSuggestions.appendChild(divSuggestion);
        });
      })
  }
}

let search = document.getElementById("search");
let searchBar = document.getElementById("searchBar");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let searchSuggestions = document.getElementById("searchSuggestions");
let defaultLogo = document.getElementById("defaultLogo");
let weatherElement = document.getElementById("weather");

searchButton.addEventListener("click", showSuggestions);