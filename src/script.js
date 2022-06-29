// for live date and time
let realTime = new Date();

// function for capitalization of first letter
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

// function to get real date and time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[realTime.getDay()];
  let currentDate = realTime.getDate();
  let currentMonth = months[realTime.getMonth()];
  let currentHour = padTo2Digits(realTime.getHours());
  let currentMinutes = padTo2Digits(realTime.getMinutes());
  let hour = document.querySelector("#current-hour");
  hour.innerHTML = `${currentHour}`;
  let minutes = document.querySelector("#current-minutes");
  minutes.innerHTML = `${currentMinutes}`;
  let realDate = document.querySelector("#current-date");
  realDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;

  return realDate;
}

console.log(formatDate());

// function to get days for forecast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Weather for searching any city using API 🔍
function showCurrentWeather(response) {
  let cityName = response.data.name;
  temperatureCelsius = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let weatherDescription =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);

  // icon
  let iconElement = document.querySelector("#icon");
  let resourceId = response.data.weather[0].id;
  let icon = response.data.weather[0].icon;

  iconElement.src = getWeatherIconResource(resourceId, icon);

  iconElement.setAttribute(`alt`, response.data.weather[0].description);

  // forecast
  getForecast(response.data.coord);

  displayWeatherData(
    cityName,
    temperatureCelsius,
    humidity,
    windSpeed,
    weatherDescription
  );
}

// function to get API URL and data
function getCurrentWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

// Show weather for current location using API 📍
function displayWeatherForCurrentPosition(response) {
  let cityName = response.data.list[2].name;
  temperatureCelsius = response.data.list[2].main.temp;
  let humidity = response.data.list[2].main.humidity;
  let windSpeed = response.data.list[2].wind.speed;
  let weatherDescription =
    response.data.list[2].weather[0].description.charAt(0).toUpperCase() +
    response.data.list[2].weather[0].description.slice(1);

  // icon
  let iconElement = document.querySelector("#icon");
  let resourceId = response.data.list[2].weather[0].id;
  let icon = response.data.list[2].weather[0].icon;

  iconElement.src = getWeatherIconResource(resourceId, icon);

  iconElement.setAttribute(`alt`, response.data.list[2].weather[0].description);

  displayWeatherData(
    cityName,
    temperatureCelsius,
    humidity,
    windSpeed,
    weatherDescription
  );
}

// function for get url of current position
function getCurrentPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let currentTempUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  // forecast
  getForecastForCurrentPosition(position.coords);

  axios.get(currentTempUrl).then(displayWeatherForCurrentPosition);
}

// function to get current coordinates
function onclickWeather() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

// Function to generalise code (city, temp, humidity, wind speed, weather description)
function displayWeatherData(
  city,
  temperature,
  humidity,
  windSpeed,
  description
) {
  // City
  let cityName = document.querySelector("h1");
  cityName.innerHTML = city;
  // temperature
  let temp = document.querySelector(".degrees");
  temp.innerHTML = Math.round(temperature);
  // humidity
  let humid = document.querySelector(".humidity-level");
  humid.innerHTML = Math.round(humidity);
  // wind speed
  let wind = document.querySelector(".wind-speed");
  wind.innerHTML = Math.round(windSpeed);
  // weather description
  let weatherDescription = document.querySelector(".description");
  weatherDescription.innerHTML = description;
}

// Function for getting icon and implament it into project
function getWeatherIconResource(resourceId, icon) {
  let weatherIconResource = "";
  if (resourceId >= 200 && resourceId <= 232) {
    weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/thunderstorms-extreme.svg`;
  } else if (
    resourceId >= 300 &&
    resourceId <= 321 &&
    resourceId >= 520 &&
    resourceId <= 521
  ) {
    weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-rain.svg`;
  } else if (resourceId >= 500 && resourceId <= 504) {
    if (icon === `10d`) {
      weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-day-rain.svg`;
    } else {
      weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-night-rain.svg`;
    }
  } else if (resourceId === 511 && resourceId >= 600 && resourceId <= 622) {
    weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-snow.svg`;
  } else if (resourceId >= 701 && resourceId <= 781) {
    weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-fog.svg`;
  } else if (resourceId === 800) {
    if (icon === `01d`) {
      weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/clear-day.svg`;
    } else {
      weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/clear-night.svg`;
    }
  } else if (resourceId === 801) {
    if (icon === `02d`) {
      weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-day.svg`;
    } else {
      weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-night.svg`;
    }
  } else if (resourceId >= 802 && resourceId <= 804) {
    weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme.svg`;
  } else {
    weatherIconResource = `https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/clear-day.svg`;
  }

  return weatherIconResource;
}

// Forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  // let iconElement = document.querySelector(".icon-forecast");

  console.log(response.data.daily);

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row g-2 five-days-forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let resourceIconId = forecastDay.weather[0].id;
      let iconResource = forecastDay.weather[0].icon;
      forecastHTML =
        forecastHTML +
        `<div class="col each-day shadow-sm p-3 mb-5 rounded">
      <h3 class="m-0">${formatForecastDay(forecastDay.dt)}</h3>
      <img alt="" class="icon-forecast" id="icon" src="${getWeatherIconResource(
        resourceIconId,
        iconResource
      )}" width=50/>
      <p class="m-0">${Math.round(forecastDay.temp.max)}°C<span> ${Math.round(
          forecastDay.temp.min
        )}°C</span></p>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Forecast for searching city;

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

// Forecast for current position

function getForecastForCurrentPosition(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

// for APi
let apiKey = "79f70b2ad3b2dd1674fdade45f3dc3d5";

// search form
document.querySelector("form").addEventListener("submit", getCurrentWeather);

// "click" on Current button
document
  .querySelector(`#current-btn`)
  .addEventListener("click", onclickWeather);

// Convert celsius to Fahrenheit
function changeToFahrenheit() {
  // remove the active class from #celsius
  let changeCelsius = document.querySelector("#celsius");
  changeCelsius.classList.remove("active");
  let changeFahrenhit = document.querySelector("#fahrenheit");
  changeFahrenhit.classList.add("active");

  let degreesF = document.querySelector("#degrees");
  degreesF.innerHTML = Math.round((temperatureCelsius * 9) / 5 + 32);

  return degreesF;
}

let temperatureCelsius = null;

document.querySelector(`#fahrenheit`).onclick = function () {
  changeToFahrenheit(temperatureCelsius);
};

//----Back to Celsius
function changeToCelsius() {
  let changeCelsius = document.querySelector("#celsius");
  changeCelsius.classList.add("active");
  let changeFahrenhit = document.querySelector("#fahrenheit");
  changeFahrenhit.classList.remove("active");
  let degreesC = document.querySelector("#degrees");
  degreesC.innerHTML = Math.round(temperatureCelsius);

  return degreesC;
}

document.querySelector(`#celsius`).onclick = function () {
  changeToCelsius();
};
