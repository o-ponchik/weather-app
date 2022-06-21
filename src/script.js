// Feature #1 Change current time
let realTime = new Date();
let temperatureCelsium = 0;

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

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
  // let currentDateAndMonth = `${currentDay}, ${currentDate} ${currentMonth}`;
  let hour = document.querySelector("#current-hour");
  hour.innerHTML = `${currentHour}`;
  let minutes = document.querySelector("#current-minutes");
  minutes.innerHTML = `${currentMinutes}`;
  let realDate = document.querySelector("#current-date");
  realDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;

  return realDate;
}

console.log(formatDate(new Date()));

// Weather for searching city using API 🔍
let apiKey = "8fe82db9f96fcaef6fefb61a912cecd3";

function showCurrentWeather(response) {
  let cityName = response.data.name;
  temperatureCelsium = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let weatherDescription =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);

  displayWeatherData(
    cityName,
    temperatureCelsium,
    humidity,
    windSpeed,
    weatherDescription
  );
}

function getCurrentWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

document.querySelector("form").addEventListener("submit", getCurrentWeather);

// Show weather for current location using API 📍

function displayWeatherForCurrentPosition(response) {
  console.log(response);
  console.log(response.data.list[0].main.temp);
  let cityName = response.data.list[2].name;
  temperatureCelsium = response.data.list[2].main.temp;
  let humidity = response.data.list[2].main.humidity;
  let windSpeed = response.data.list[2].wind.speed;
  let weatherDescription =
    response.data.list[2].weather[0].description.charAt(0).toUpperCase() +
    response.data.list[2].weather[0].description.slice(1);
  displayWeatherData(
    cityName,
    temperatureCelsium,
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
  console.log(currentTempUrl);

  axios.get(currentTempUrl).then(displayWeatherForCurrentPosition);
}

function onclickWeather() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

document
  .querySelector(`#current-btn`)
  .addEventListener("click", onclickWeather);

// Function for generalise code (city, temp, humidity, wind speed, weather description)
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

// Feature #3 ---Fahrenheit
function changeToFahrenheit(celsius) {
  let selectF = document.querySelector("#fahrenheit");
  selectF.innerHTML = `<span style="font-weight:400; font-size: 30px;">°F</span>`;
  let changeC = document.querySelector("#celsium");
  changeC.innerHTML = `<span style="font-weight:100; font-size: 25px;"> °C</span>`;
  let degreesF = document.querySelector("#degrees");
  degreesF.innerHTML = Math.round((celsius * 9) / 5 + 32);

  return degreesF;
}

document.querySelector(`#fahrenheit`).onclick = function () {
  changeToFahrenheit(temperatureCelsium);
};

//----Back to Celsius
function changeToCelsius() {
  let changeC = document.querySelector("#celsium");
  changeC.innerHTML = `<span style="font-weight:400; font-size: 30px;"> °C</span>`;
  let selectF = document.querySelector("#fahrenheit");
  selectF.innerHTML = `<span style="font-weight:100; font-size: 25px;">°F</span>`;
  let degreesC = document.querySelector("#degrees");
  degreesC.innerHTML = Math.round(temperatureCelsium);

  return degreesC;
}

document.querySelector(`#celsium`).onclick = function () {
  changeToCelsius();
};
