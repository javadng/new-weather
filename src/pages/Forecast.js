import Main from '../components/layout/Main';
import { WiSandstorm, WiHumidity } from 'react-icons/wi';
import {
  BsSpeedometer,
  BsFillSunriseFill,
  BsFillSunsetFill,
} from 'react-icons/bs';

import { Fragment, useContext } from 'react';
import Spinner from '../components/UI/Spinner';
import List from '../components/forecastList/List';
import WeatherContext from '../store/weather-context';
import convertTime from '../lib/timeConverter';

const Forecast = props => {
  const { weatherData } = useContext(WeatherContext);

  const { forecast, location, current } = weatherData;
  return (
    <Main>
      {!current && <Spinner />}
      {current && (
        <Fragment>
          <div className="grid grid-cols-2 gap-10">
            <div className="col-start-1 text-center text-gray-300">
              <span>
                {location.city}, {location.country}
              </span>
              <h1 className="text-5xl my-10">
                {Math.ceil(current.temp)}
                <sup>°</sup>C
              </h1>
              <span className="bg-gray-800 p-3 px-6 text-white text-2xl rounded-lg m-2">
                {current.weather[0].description}
              </span>
            </div>
            <figure className="col-start-2 justify-self-end w-full h-full">
              <img
                src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                className="object-cover md:w-60"
                alt={current.weather[0].description}
              />
            </figure>
            <div className="col-start-1 col-span-2 flex flex-wrap justify-between w-4/5 m-auto mb-10 text-2xl">
              <div className="flex items-center mb-3">
                <WiHumidity size="3.5rem" />
                <strong className="ml-2">{current.humidity} %</strong>
              </div>
              <div className="flex items-center mb-3">
                <BsSpeedometer size="2rem" />
                <strong className="ml-2">{current.pressure} m/Bar</strong>
              </div>
              <div className="flex items-center mb-3">
                <WiSandstorm size="3.5rem" />
                <strong className="ml-2">{current.wind_speed} km/h</strong>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold flex justify-between px-10 py-10 bg-gradient-to-tr from-slate-600 to-slate-900">
            <div className="flex items-center">
              <BsFillSunriseFill size="4rem" />
              <span className="ml-3">{convertTime(current.sunrise)}</span>
            </div>{' '}
            <div className="flex items-center">
              <span className="mr-3">{convertTime(current.sunset)}</span>
              <BsFillSunsetFill size="4rem" />
            </div>
          </div>
          <List forecastArr={forecast.slice(1)} />
        </Fragment>
      )}
    </Main>
  );
};

export default Forecast;
