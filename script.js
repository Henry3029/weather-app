const API_KEY = "8bf97da2480236b6b157c649984fa870";
const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  const p = document.getElementById("message");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Fail to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const usefulData = processWeatherData(data);
    console.log(usefulData);
    p.style.color = "green";
    p.textContent = `Weather in ${usefulData.city}: ${usefulData.description} and wind speed: ${usefulData.wind}`
  } catch (error) {
    console.error(error.message);
    p.style.color = "red";
    p.textContent = error.message;
  }
});

function processWeatherData(data) {
	return {
		city: data.name,
		temperature: data.main.temp,
		description: data.weather[0].description,
		wind: data.wind.speed
		};
	}
