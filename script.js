const API_KEY = "7f2a6b3ecad04407834143311260902";

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("weatherIcon");

cityInput.addEventListener("input", async () => {
  const query = cityInput.value;
  if (query.length < 2) {
    suggestions.innerHTML = "";
    return;
  }

  const res = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
  );
  const data = await res.json();

  suggestions.innerHTML = "";
  data.forEach(city => {
    const li = document.createElement("li");
    li.textContent = `${city.name}, ${city.country}`;
    li.onclick = () => {
      cityInput.value = city.name;
      suggestions.innerHTML = "";
      getWeather(city.name);
    };
    suggestions.appendChild(li);
  });
});

async function getWeather(city) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  );
  const data = await res.json();

  cityName.textContent = `${data.location.name}, ${data.location.country}`;
  temperature.textContent = `${data.current.temp_c}°C`;
  condition.textContent = data.current.condition.text;
  humidity.textContent = data.current.humidity;
  wind.textContent = data.current.wind_kph;
  icon.src = data.current.condition.icon;

  updateBackground(data.current.temp_c);
}

function updateBackground(temp) {
  if (temp > 30) {
    document.body.style.background =
      "linear-gradient(135deg, #ff512f, #dd2476)";
  } else if (temp > 20) {
    document.body.style.background =
      "linear-gradient(135deg, #f7971e, #ffd200)";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #74ebd5, #acb6e5)";
  }
}
