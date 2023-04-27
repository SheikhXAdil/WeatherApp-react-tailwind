import './App.css';
import React from 'react';
import hotBg from "./Assets/hot.jpg";
import coldBg from "./Assets/cold.jpg";
import Descriptions from './Components/Descriptions';
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherSearvice";


function App() {

  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app min-w-full min-h-screen bg-center bg-cover" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay w-full h-screen bg-black/40">
      {weather && (
        <div className="container max-w-4xl m-auto h-full flex items-center justify-between flex-col p-4">
          <div className="section w-full p-4 rounded-md text-white section__inputs flex items-center justify-between bg-black/70">
            <input onKeyDown={enterKeyPressed} className='sm:w-3/5 rounded-sm border border-zinc-200 focus:outline-none focus:border-0 border-solid bg-transparent text-white p-2 text-lg font-extralight' type="text" name='city' placeholder='Enter city....' />
            <button  onClick={(e) => handleUnitsClick(e)} className='border-0 rounded-md px-8 py-1 text-xl font-medium bg-white text-black hover:bg-zinc-400'>°F</button>
          </div>
          <div className="section w-full p-4 rounded-md text-white section__temperature flex items-center justify-between bg-black/70">
          <div className="icons flex flex-col items-center justify-center">
            <h3 className='text-md font-light capitalize'>{`${weather.name}, ${weather.country}`}</h3>
            <img src={weather.iconURL} alt="" />
            <h3 className='text-md font-light capitalize'>{weather.description}</h3>
          </div>

          <div className="temperature text-6xl">
            <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
          </div>
          </div>

         <Descriptions weather={weather} units={units}/>
        </div>
        )}
      </div>
    </div>
  )

}

export default App;
