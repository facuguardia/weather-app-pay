import { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import NavBar from "./NavBar";

const cities = ["Buenos Aires", "Santa Fe", "Córdoba", "Neuquen", "San Luis"];

function WeatherPanel() {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = async (e) => {
    const city = e.target.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8f038170deb6063a7bd475915f57cec4&units=metric&lang=es`
    );
    const data = await response.json();
    setForecast(data.list.slice(0, 6));
    setSelectedCity(city);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Geolocalización: ", position);
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setSelectedCity("");
      });
    }
  };

  useEffect(() => {
    if (
      (currentLocation.latitude && currentLocation.longitude) ||
      selectedCity
    ) {
      setLoading(true);
      let urlCurrentWhater;
      let urlCurrentForecast;

      if (selectedCity) {
        urlCurrentWhater = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=8f038170deb6063a7bd475915f57cec4&lang=es`;
        urlCurrentForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=8f038170deb6063a7bd475915f57cec4&lang=es`;
      } else {
        urlCurrentWhater = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=8f038170deb6063a7bd475915f57cec4&lang=es`;
        urlCurrentForecast = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=8f038170deb6063a7bd475915f57cec4&lang=es`;
      }

      fetch(urlCurrentWhater)
        .then((response) => {
          if (!response.ok) {
            throw Error("No se pudo obtener el clima");
          }
          return response.json();
        })
        .then((weatherData) => {
          console.log("datos pegada: ", weatherData);
          setWeather(weatherData);
        })
        .catch((error) => {
          console.log("error pegada: ", error);
          setLoading(false);
          setShow(false);
        });

      fetch(urlCurrentForecast)
        .then((response) => {
          if (!response.ok) {
            throw Error("No se pudo obtener el clima");
          }
          return response.json();
        })
        .then((forecastData) => {
          console.log("datos pegada 2: ", forecastData);
          setForecast(forecastData);
          setLoading(false);
          setShow(true);
        })
        .catch((error) => {
          console.log("error pegada 2: ", error);
          setLoading(false);
          setShow(false);
        });
    }
  }, [currentLocation, selectedCity]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center lg:pb-20 lg:pt-20">
      <div className="flex flex-col justify-center items-center">
        <NavBar />
        <Button
          getCurrentLocation={getCurrentLocation}
          handleCityChange={handleCityChange}
          cities={cities}
          weatherData={weatherData}
          loading={loading}
          show={show}
          forecast={forecast}
        />
      </div>
      <div>
        <Card
          showData={show}
          loadingData={loading}
          weather={weather}
          forecast={forecast}
        />
      </div>
    </div>
  );
}

export default WeatherPanel;
