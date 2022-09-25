import React from 'react';

const WeatherContext = React.createContext({
  current: {},
  forecast: {},
  location: {},
  favCities: [],
  Notification: null,
  setFavCity: city => {},
});

export default WeatherContext;
