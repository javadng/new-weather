import { useEffect, useState } from 'react';
import { API_REVERSEGOE } from '../config/config';
import useHttp from '../hooks/use-http';
import getDataO from '../lib/getDatao';
import WeatherContext from './weather-context';

const WeatherProvider = props => {
  const [sendRequest, httpState] = useHttp(getDataO);
  const [weatherData, setWeatherData] = useState({});
  const [favCities, setFavCities] = useState([]);
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const failGeo = async () => {
    console.error("we can't access to your location");

    setNotification({
      type: 'ERROR',
      message: "we can't access to your location",
    });

    sendRequest('lat=32.653897&lon=51.665966');
  };

  useEffect(() => {
    setFavCities(JSON.parse(localStorage.getItem('cities')));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      try {
        const { latitude, longitude } = position.coords;

        await sendRequest(`lat=${latitude}&lon=${longitude}`);
      } catch (error) {
        console.log(`💥💥 ${error}`);

        setNotification({
          type: 'ERROR',
          message: error,
        });
      }
    }, failGeo);
  }, [API_REVERSEGOE, sendRequest]);

  useEffect(() => {
    if (httpState.status === 'SUCCESS') {
      setWeatherData({
        current: httpState.data.weather.current,
        forecast: httpState.data.weather.daily,
        location: {
          country: httpState.data.geo.country,
          city: httpState.data.geo.city,
          suburb: httpState.data.geo.suburb,
        },
        status: httpState.status,
      });
    }

    if (httpState.error) {
      setNotification({
        type: 'ERROR',
        message: httpState.error,
      });
    }
  }, [httpState, setWeatherData, setNotification]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        favCities,
        setWeatherData,
        setFavCities,
        setNotification,
        notification,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
