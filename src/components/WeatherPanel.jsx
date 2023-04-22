import { useState, useEffect } from "react";
import Card from "./Card";

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
        console.log(position);
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
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

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=8f038170deb6063a7bd475915f57cec4&lang=es`;
      fetch(url)
        .then((response) => console.log(response))
        .then((response) => {
          if (!response.ok) {
            throw Error("No se pudo obtener el clima");
          }
          return response.json();
        })
        .then((data) => {
          console.log("datos pegada ciudad: ", data);
          setWeatherData(data);
          setLoading(false);
          setShow(true);
        })
        .catch((error) => {
          console.log("error pegada ciudad: ", error);
          setLoading(false);
          setShow(false);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=8f038170deb6063a7bd475915f57cec4&lang=es`;
      fetch(url)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw Error("No se pudo obtener el clima");
          }
          return response.json();
        })
        .then((data) => {
          console.log("datos pegada ciudad: ", data);
          setWeatherData(data);
          setLoading(false);
          setShow(true);
        })
        .catch((error) => {
          console.log("error pegada ciudad: ", error);
          setLoading(false);
          setShow(false);
        });
    }
  }, [selectedCity]);

  return (
    <div>
      <div className="flex justify-between items-center gap-4 pb-5">
        <div>
          <button
            className="border border-orange-300 py-2 px-4 rounded-full bg-orange-400 hover:bg-orange-300 transition-all duration-300 font-medium text-md text-black"
            onClick={getCurrentLocation}
          >
            Ubicación actual
          </button>
        </div>
        <div>
          <select
            className="bg-gray-900 py-2 px-4 rounded-md text-sm items-center"
            onChange={handleCityChange}
          >
            <option>Selecciona una ciudad</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {show && (
            <div>
              <Card data={weatherData} loading={loading} />

              {forecast.list.map((forecast) => (
                <Card key={forecast.dt} forecast={forecast} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </div>
  );
}

export default WeatherPanel;