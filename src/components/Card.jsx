import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";

const Card = ({ showData, loadingData, weather, forecast }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setDate(formattedDate);

    let hour = today.getHours();
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    const formattedTime = `${hour}:${minutes}`;
    setTime(formattedTime);

    if (showData) {
      const url = "https://openweathermap.org/img/wn/";
      const iconUrl = url + weather.weather[0].icon + ".png";
      setIconUrl(iconUrl);
    }
  }, [showData, weather]);

  const daysOfWeek = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

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

  if (loadingData) {
    return <Spinner />;
  }

  return (
    <div>
      {showData === true ? (
        <div className="pt-5">
          <div className="bg-gray-800 grid grid-cols-2 gap-2 w-full h-60 p-3 rounded-lg text-gray-300">
            <div className="flex flex-col justify-center items-center">
              <div className="text-3xl font-bold text-white">
                <h3>{weather.name}</h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={iconUrl} alt="icon" className="w-[130px]" />
                <p className="text-xs">
                  {weather.weather[0].description.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center w-full">
              <div className="flex flex-col justify-center items-end gap-1 w-full">
                <h4 className="text-4xl font-semibold text-white">{time}</h4>
                <h4 className="text-lg font-semibold ">{date}</h4>
              </div>
              <div className="flex flex-col items-end gap-5 w-full">
                <div>
                  <h1 className="text-6xl text-white">
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
          <br />
          <hr />
          <div>
            <div>
              {forecastData?.map((forecastItem, index) => {
                return (
                  <div
                    className="flex justify-between items-center w-full pt-3"
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
