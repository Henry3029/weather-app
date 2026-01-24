import { API_KEY } from "./config.js";
const btn = document.getElementById("btn");
let currentTempC = null;
let isCelsius = true;

btn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  const p = document.getElementById("message");
  const iconImg = document.getElementById("weatherIcon");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Fail to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    iconImg.style.display = "block";
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const usefulData = processWeatherData(data);
    console.log(usefulData);
    p.style.color = "green";
    
    currentTempC = usefulData.temperature - 273.15; // Kelvin → Celsius

p.textContent = `Weather in ${usefulData.city}: 
${currentTempC.toFixed(1)} °C, 
${usefulData.description}, 
Wind: ${usefulData.wind} m/s`;

document.getElementById("toggleUnit").style.display = "block";
    
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
	
const toggleBtn = document.getElementById("toggleUnit");
toggleBtn.addEventListener("click", () => {
	if (currentTempC === null) return;
	const p = document.getElementById("message");
	if (isCelsius) {
    const f = (currentTempC * 9/5) + 32;
    p.textContent = p.textContent.replace(/-?\d+(\.\d+)? °C/, `${f.toFixed(1)} °F`);
    toggleBtn.textContent = "Switch to °C";
	} else {
    p.textContent = p.textContent.replace(/-?\d+(\.\d+)? °F/, `${currentTempC.toFixed(1)} °C`);
    toggleBtn.textContent = "Switch to °F";
  }

  isCelsius = !isCelsius;
});
