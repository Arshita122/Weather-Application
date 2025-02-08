import "./App.css";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";

function App() {
  const [currentWeatherFetch, setCurrentWeatherFetch] = useState(null);
  const [forecastFetch, setForecastFetch] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeatherFetch({ city: searchData.label, ...weatherResponse });
        setForecastFetch({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeatherFetch);
  console.log(forecastFetch);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />

      {currentWeatherFetch && <CurrentWeather data={currentWeatherFetch} />}
      {forecastFetch && <Forecast data={forecastFetch} />}
    </div>
  );
}

export default App;
