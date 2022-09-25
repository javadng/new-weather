import { useContext, useEffect } from 'react';
import { BsSpeedometer, BsHeart } from 'react-icons/bs';
import { WiHumidity, WiSandstorm } from 'react-icons/wi';
import { AiFillHeart } from 'react-icons/ai';
import Main from '../components/layout/Main';

import Spinner from '../components/UI/Spinner';
import WeatherContext from '../store/weather-context';
import Search from '../components/Search';

import convertTime from '../lib/timeConverter';

const Home = props => {
  const { weatherData, favCities, setFavCities } = useContext(WeatherContext);

  const isCityInFavArray = favCities?.find(
    item => item.location?.city === weatherData.location?.city
  );

  const toggleFavHandler = () => {
    console.log('clicked');
    if (isCityInFavArray) {
      const newfavCities = favCities.filter(
        city => city.location.city !== weatherData.location.city
      );

      setFavCities(newfavCities);
    } else {
      if (favCities) {
        setFavCities(prevState => [...prevState, weatherData]);
      } else {
        setFavCities([weatherData]);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('cities', [JSON.stringify(favCities)]);
  }, [favCities]);

  return (
    <Main>
      {weatherData.status === 'LOADING' && <Spinner />}
      {weatherData.status === 'SUCCESS' && (
        <div className="weather text-center">
          <div className="search">
            <Search />
          </div>
          <div className="flex items-baseline justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-300 mb-5">Your Loacation now</span>
          </div>
          <h3 className="mb-10">
            {weatherData.location.suburb}, {weatherData.location.city}
          </h3>
          <span className="text-gray-300 mb-5">
            {convertTime(weatherData.current.dt)}
          </span>

          <div className="md:flex md:justify-evenly md:items-center ">
            <figure className="w-full md:w-auto h-auto">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                className="object-cover m-auto h-full"
                alt={weatherData.current.weather[0].description}
              />
            <span className="rounded-3xl shadow-md shadow-slate-700 bg-gray-800 px-8 py-2 mb-10 inline-block">
              {weatherData.current.weather[0].description}
            </span>
            </figure>
            <h1 className="text-[9rem] mb-10">
              {Math.ceil(weatherData.current.temp)}
              <sup>°</sup>C
            </h1>
            <div className="my-12">
              {isCityInFavArray && (
                <AiFillHeart
                  size="4rem"
                  className="mx-auto cursor-pointer"
                  onClick={toggleFavHandler}
                  color="red"
                />
              )}
              {!isCityInFavArray && (
                <BsHeart
                  onClick={toggleFavHandler}
                  size="3rem"
                  className="mx-auto cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between w-3/4 m-auto md:mt-10" >
            <div className="flex flex-wrap justify-between w-4/5 m-auto mb-10 text-2xl">
              <div className="flex items-center mb-3">
                <WiHumidity size="3.5rem" />
                <strong className="ml-2">
                  {weatherData.current.humidity}%
                </strong>
              </div>
              <div className="flex items-center mb-3">
                <BsSpeedometer size="2rem" />
                <strong className="ml-2">
                  {weatherData.current.pressure}m/Bar
                </strong>
              </div>
              <div className="flex items-center mb-3">
                <WiSandstorm size="3.5rem" />
                <strong className="ml-2">
                  {weatherData.current.wind_speed}km/h
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default Home;
