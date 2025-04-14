import { useState } from "react";
import { MapPin, Thermometer, Droplets, Wind } from "lucide-react";
import { motion } from "framer-motion";

const API_KEY = "8bb13378aea5ca651fa3ed61526d04d1";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch weather info based on city input
  const handleSearch = async () => {
    if (!city.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    setWeatherData(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeatherData(data);
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-white flex items-center justify-center px-4 py-10 sm:py-0">
      <div className="w-full max-w-md sm:max-w-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          🌦️ Weather Forecast
        </h1>

        {/* Search input and button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}

        {/* Weather info display */}
        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white/5 rounded-xl p-5 border border-white/10 space-y-2"
          >
            <h2 className="text-xl font-semibold flex flex-wrap items-center justify-center gap-2 text-center">
              <MapPin size={18} />
              {weatherData.name}, {weatherData.sys.country}
            </h2>

            <p className="text-sm text-white/70 text-center capitalize">
              {weatherData.weather[0].description}
            </p>

            <div className="mt-3 text-center">
              <div className="text-4xl font-bold flex justify-center items-center gap-2">
                <Thermometer size={28} />
                {weatherData.main.temp}°C
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Droplets size={16} />
                  {weatherData.main.humidity}%
                </div>
                <div className="flex items-center gap-1">
                  <Wind size={16} />
                  {weatherData.wind.speed} m/s
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
