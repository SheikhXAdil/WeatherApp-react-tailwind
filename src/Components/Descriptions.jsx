import React from 'react'
import { UilArrowDown, UilArrowUp, UilSmileBeam, UilCompressArrows, UilRaindropsAlt, UilWind  } from '@iconscout/react-unicons'

const Descriptions = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <UilArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <UilArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <UilSmileBeam />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <UilCompressArrows />,
      title: "pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <UilRaindropsAlt />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <UilWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];
  return (
    <div className="section w-full p-4 rounded-md text-white section__descriptions grid grid-cols-3 gap-10 lg:grid-cols-2">
      {cards.map(({ id, icon, title, data, unit }) => (
      <div key={id} className="card flex flex-col items-center justify-between bg-black/70 p-4 rounded-md">
        <div className="description__card-icon flex flex-row items-center justify-center w-full gap-1 mb-3">
        {icon}
        <small className='capitalize'>{title}</small>
        </div>
        <h2 className='text-2xl'>{`${data} ${unit}`}</h2>
      </div>
         ))}
    </div>
  )
}

export default Descriptions
