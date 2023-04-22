import Card from "./Card";

function Button({
  getCurrentLocation,
  handleCityChange,
  cities,
  weatherData,
  loading,
  show,
  forecast,
}) {
  const renderCityOptions = () => {
    return (
      <>
        <option>Selecciona una ciudad</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </>
    );
  };

  const renderForecastCards = () => {
    if (!show || !forecast.list || forecast.list.length === 0) {
      return null;
    }

    return (
      <>
        <Card data={weatherData} loading={loading} />
        {forecast.list.map((forecast) => (
          <Card key={forecast.dt} forecast={forecast} />
        ))}
      </>
    );
  };

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
            {renderCityOptions()}
          </select>
          {renderForecastCards()}
        </div>
      </div>
    </div>
  );
}

export default Button;
