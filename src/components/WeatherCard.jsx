import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherCard({ city, setWeather, weather }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      
      const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
      console.log(geoRes.data);
      if (!geoRes.data.length) throw new Error("City not found");
      const { lat, lon } = geoRes.data[0];

      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      setWeather(res.data.current_weather);
    } catch (err) {
      setError(err.message || "Error fetching weather");
      setWeather(null);
    }

    setLoading(false);
  };

  useEffect(() => { fetchWeather(); }, [city]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    weather && (
      <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2">{city}</h2>
        <p className="text-lg mb-1">Temperature: {weather.temperature}°C</p>
        <p className="text-lg mb-1">Wind Speed: {weather.windspeed} m/s</p>
        <p className="text-lg mb-1">Wind Direction: {weather.winddirection}°</p>
      </div>
    )
  );
}
