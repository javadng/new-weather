import './favItem.css';
import { WiHumidity, WiSandstorm } from 'react-icons/wi';
import { useContext, useEffect } from 'react';
import WeatherContext from '../store/weather-context';
import Spinner from './UI/Spinner';
import { useNavigate } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import searchAPI from '../lib/searchAPI';

const FavItem = props => {
  const navigate = useNavigate();

  const { setWeatherData, setNotification } = useContext(WeatherContext);
  const [sendRequest, httpState] = useHttp(searchAPI);

  const cityNameReqHandler = () => {
    setNotification({
      type: null,
      message: null,
    });

    sendRequest(props.city);

    if (httpState.error) {
      setNotification({
        type: 'ERROR',
        message: searchError,
      });

      return;
    }
  };

  useEffect(() => {
    let isAllowed = true;

    if (isAllowed && httpState.status === 'SUCCESS') {
      setWeatherData({
        current: httpState.data.weatherData.current,
        forecast: httpState.data.weatherData.daily,
        location: {
          country: httpState.data.location.country,
          city: httpState.data.location.city,
          suburb: httpState.data.location.suburb,
        },
      });

      navigate('/');
    }

    return () => {
      isAllowed = false;
    };
  }, [httpState, setWeatherData]);

  // useEffect(() => {
  //   if (httpState.status === 'SUCCESS') {
  //     setWeatherData({
  //       current: httpState.data.weather.current,
  //       forecast: httpState.data.weather.daily,
  //       location: {
  //         country: httpState.data.geo.country,
  //         city: httpState.data.geo.city || httpState.data.geo.county,
  //         suburb: httpState.data.geo.suburb || httpState.data.geo.county,
  //       },
  //     });

  //     navigate('/');
  //   }
  // }, [httpState, setWeatherData]);

  return (
    <div
      onClick={cityNameReqHandler}
      className="city-fav-item cursor-pointer bg-slate-800 text-gray-300 rounded-xl p-5 m-3 grid gap-3 grid-rows-[repeat(3,_minmax(50px,70px))]"
    >
      {httpState.status === 'LOADING' && <Spinner />}
      <span className="text-6xl">
        {Math.ceil(props.temp)}
        <sup>°</sup>C
      </span>
      <div className="col-start-1">
        <span className="block cursor-pointer" onClick={cityNameReqHandler}>
          {props.locationName}, {props.city}
        </span>
        <span className="text-gray-400">{props.country}</span>
      </div>
      <figure className="col-start-2 row-span-full">
        <img
          className="object-cover"
          src={`http://openweathermap.org/img/wn/${props.imgIcon}@2x.png`}
          alt=""
        />
      </figure>
      <div className="col-start-1 row-start-3 col-span-2 flex flex-wrap justify-evenly items-center">
        <div className="flex items-center">
          <WiHumidity size="3.5rem" />
          <span>{props.humidity}%</span>
        </div>
        <div className="flex items-center">
          <WiSandstorm size="3.5rem" />
          <span className="ml-3">{props.speedWind}km/h</span>
        </div>
      </div>
    </div>
  );
};

export default FavItem;
