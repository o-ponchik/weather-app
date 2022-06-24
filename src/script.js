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
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute(`alt`, response.data.weather[0].description);

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
  console.log(response);
  console.log(response.data.list[0].main.temp);
  let cityName = response.data.list[2].name;
  temperatureCelsius = response.data.list[2].main.temp;
  let humidity = response.data.list[2].main.humidity;
  let windSpeed = response.data.list[2].wind.speed;
  let weatherDescription =
    response.data.list[2].weather[0].description.charAt(0).toUpperCase() +
    response.data.list[2].weather[0].description.slice(1);

  // icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`
  );

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
  console.log(currentTempUrl);

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

// for APi
let apiKey = "8fe82db9f96fcaef6fefb61a912cecd3";

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
