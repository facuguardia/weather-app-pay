import WeatherPanel from "./container/WeatherPanel";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 w-full h-screen overflow-hidden flex flex-col justify-between p-4">
      <div className="text-white flex flex-col justify-between md:justify-center w-full h-screen">
        <WeatherPanel />
      </div>
      <Footer />
    </div>
  );
}

export default App;
