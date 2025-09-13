import { useState } from "react";
import WeatherCard from "./WeatherCard.jsx";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    
    navigate("/");
        window.location.reload(true);
    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6"> 
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </header>
      <div className="mb-6 flex justify-center">
        <input type="text" placeholder="Enter city name" className="border p-3 rounded w-80" value={city} onChange={e => setCity(e.target.value)} />
      </div>
      <WeatherCard city={city} setWeather={setWeather} weather={weather} />
    </div>
  );
}

export default Dashboard;
