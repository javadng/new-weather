import { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import getData from '../lib/getData';
import WeatherContext from './weather-context';

const WeatherProvider = props => {
  const [sendRequest, httpState] = useHttp(getData);
  const [weatherData, setWeatherData] = useState({});
  const [favCities, setFavCities] = useState([]);
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const failGeo = async () => {
    setNotification({
      type: 'ERROR',
      message: "we can't access to your location",
    });
    sendRequest('lat=32.653897&lon=51.665966');
  };

  const successGeo = async position => {
    try {
      const { latitude, longitude } = position.coords;

      await sendRequest(`lat=${latitude}&lon=${longitude}`);
    } catch (error) {
      console.log(`💥💥 ${error}`);
      setNotification({
        type: 'ERROR',
        message: error.message || 'Somthing went wrong.',
      });
    }
  };

  useEffect(() => {
    setFavCities(JSON.parse(localStorage.getItem('cities')));
  }, []);

  useEffect(() => {
    let isSendigRequest = true;
    if (isSendigRequest) {
      navigator.geolocation.getCurrentPosition(successGeo, failGeo);
    }

    return () => {
      isSendigRequest = false;
    };
  }, [navigator]);

  // format data
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
      });
    }
    // set error notification
    if (httpState.error) {
      setNotification({
        type: 'ERROR',
        message: httpState.error,
      });
    }
  }, [setNotification, setWeatherData, httpState]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        favCities,
        setWeatherData,
        setFavCities,
        setNotification,
        notification,
        httpStatus: httpState.status,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
