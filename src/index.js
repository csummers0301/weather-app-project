function showTemperature(response) {
  console.log()
  let temperatureElement = document.querySelector("#temperature");
  let cityElement= document.querySelector("#searched-city");
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  let iconElement=document.querySelector("#icon");
  cityElement.innerHTML=response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML=`Humidity: ${humidity}%`
  windElement.innerHTML = `Wind: ${wind} mph`;
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].main;
    iconElement.setAttribute("src", `http:openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);           
}
function search(city) {
  let apiKey = "9613899aeff6104a2852d1a6d28e49cf";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "9613899aeff6104a2852d1a6d28e49cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
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
let month = months[now.getMonth()];
let year = now.getFullYear();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hours}:${minutes}`;

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

search("New York");
