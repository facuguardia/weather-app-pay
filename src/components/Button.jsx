function Button({ getCurrentLocation, handleCityChange, cities }) {
  const renderCityOptions = () => {
    return (
      <>
        <option>Selecciona una ciudad</option>
        {cities?.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4 pb-5 p-1">
        <div>
          <button
            className="bg-orange-300 hover:bg-orange-200 transition-all duration-300 py-2 px-4 rounded-full font-medium text-md text-black shadow-md"
            onClick={() => getCurrentLocation()}
          >
            Ubicación actual
          </button>
        </div>
        <div>
          <select
            className="bg-gray-800 py-2 px-4 rounded-md text-sm font-medium text-white border border-orange-300 shadow-md hover:border-orange-200 transition-all duration-300"
            onChange={handleCityChange}
          >
            {renderCityOptions()}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Button;
