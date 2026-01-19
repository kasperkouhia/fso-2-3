import { useState, useEffect } from "react";
import axios from "axios";

function WeatherInfo({ lat, lon, units = "metric" }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      )
      .then((response) => setWeatherData(response.data));
  }, [lat, lon, units]);

  return weatherData ? (
    <>
      <div>
        <figure className="rounded-sm bg-blue-300 p-2 drop-shadow-sm">
          <img
            className="h-auto max-w-25 object-contain drop-shadow-sm"
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={
              weatherData.weather[0].description.charAt(0).toUpperCase() +
              weatherData.weather[0].description.slice(1)
            }
          />
        </figure>
      </div>
      <div className="rounded-sm bg-white p-4 drop-shadow-sm">
        <p>
          <strong>Temperature:</strong> {weatherData.main.temp} °C
        </p>
        <p>
          <strong>Feels like:</strong> {weatherData.main.feels_like} °C
        </p>
        <p>
          <strong>Wind:</strong> {weatherData.wind.speed} m/s
        </p>
      </div>
    </>
  ) : (
    <p className="opacity-50">Loading weather data...</p>
  );
}

export default WeatherInfo;
