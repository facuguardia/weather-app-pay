import WeatherPanel from "./components/WeatherPanel";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-900 w-full min-h-screen text-white flex flex-col justify-between lg:justify-center items-center lg:items-stretch gap-5 p-3">
      <div>
        <WeatherPanel />
      </div>
      <div className=" ">
        <Footer />
      </div>
    </div>
  );
}

export default App;
