import React from 'react';

const WeatherContext = React.createContext({
  current: {},
  forecast: {},
  location: {},
  favCities: [],
  Notification: null,
  httpStatus: null,
  setFavCity: city => {},
});

export default WeatherContext;
