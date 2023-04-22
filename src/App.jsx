import NavBar from "./components/NavBar";
import WeatherPanel from "./components/WeatherPanel";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-900 w-full min-h-screen text-white flex flex-col justify-between items-center p-3">
      <div className="flex flex-col items-center" >
        <NavBar />
        <WeatherPanel />
      </div>
      <Footer />
    </div>
  );
}

export default App;
