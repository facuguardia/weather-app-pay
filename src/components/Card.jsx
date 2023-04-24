import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";

const daysOfWeek = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

const Card = ({ showData, loadingData, weather, forecast }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [forecastData, setForecastData] = useState([]);

  // Fecha
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  // Hora
  var hour = today.getHours();
  var minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  const formattedTime = `${hour}:${minutes}`;

  useEffect(() => {
    if (showData) {
      const url = "https://openweathermap.org/img/wn/";
      const iconUrl = url + weather.weather[0].icon + ".png";
      setIconUrl(iconUrl);
    }
    setDate(formattedDate);
    setTime(formattedTime);

    const forecastData = forecast?.list
      ?.slice(1, 6)
      ?.map((forecastItem, index) => {
        const todayIndex = new Date().getDay();
        const dayOfWeekIndex = (todayIndex + index + 1) % 7;
        const dayOfWeek = daysOfWeek[dayOfWeekIndex];
        return {
          dayOfWeek,
          maxTemp: forecastItem.main.temp_max.toFixed(1),
          minTemp: forecastItem.main.temp_min.toFixed(1),
          icon: `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`,
        };
      });
    setForecastData(forecastData);
  }, [showData, weather, forecast]);

  if (loadingData) {
    return <Spinner />;
  }

  return (
    <div>
      {showData === true ? (
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-2 gap-12 h-64 pt-3 pb-2 text-gray-300">
            <div className="flex flex-col justify-center items-center pt-3">
              <div className="text-4xl font-bold text-white">
                <h3>{weather.name}</h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={iconUrl} alt="icon" className="w-[130px]" />
                <p className="text-xs">
                  {weather.weather[0].description.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="flex flex-col justify-center items-end gap-1 w-full pt-4">
                <h4 className="text-2xl font-semibold text-white">{time}</h4>
                <h4 className="text-lg font-semibold ">{date}</h4>
              </div>
              <div className="flex flex-col items-end gap-5 w-full">
                <div>
                  <h1 className="text-6xl text-white font-bold">
                    {weather.main.temp.toFixed(1)}°
                  </h1>
                </div>
                <div className="flex items-center gap-4 pb-3 pr-3">
                  <h5 className="flex items-center gap-1">
                    <HiOutlineArrowNarrowUp className="text-red-600" />
                    {weather.main.temp_max.toFixed(1)}°
                  </h5>
                  <h5 className="flex items-center gap-1">
                    <HiOutlineArrowNarrowDown className="text-blue-600" />
                    {weather.main.temp_min.toFixed(1)}°
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center gap-3 pt-5 pb-5 text-white font-semibold">
              {forecastData?.map((forecastItem, index) => {
                return (
                  <div
                    className="grid grid-cols-3 items-center w-full py-2 px-4 border border-orange-300 rounded-xl shadow-xl"
                    key={index}
                  >
                    <h4>{forecastItem.dayOfWeek}</h4>
                    <p>
                      <img src={forecastItem.icon} alt="icon" />
                    </p>
                    <p>
                      {forecastItem.maxTemp}°C - {forecastItem.minTemp}°C
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
