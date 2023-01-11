import { useContext, useEffect, useRef, useState } from 'react';

import Spinner from '../components/UI/Spinner';
import WeatherContext from '../store/weather-context';
import useHttp from '../hooks/use-http';
import searchAPI from '../lib/searchAPI';

const Search = props => {
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState('');

  const [sendRequest, httpState] = useHttp(searchAPI);

  const { setNotification, setWeatherData } = useContext(WeatherContext);

  const inputChangeHandler = e => {
    setSearchInput(e.target.value);
  };

  const SubmitHandler = async e => {
    e.preventDefault();
    // Guard
    if (searchInput.trim().length < 3) return;

    // reset notification
    setNotification({
      type: null,
      message: null,
    });

    sendRequest(searchInput);
    if (httpState.error) {
      setNotification({
        type: 'ERROR',
        message: httpState.error,
      });
      return;
    }

    setSearchInput('');
    searchInputRef.current.blur();
  };

  useEffect(() => {
    if (httpState.status === 'SUCCESS') {
      setWeatherData({
        current: httpState.data.weatherData.current,
        forecast: httpState.data.weatherData.daily,
        location: {
          country: httpState.data.location.country,
          city: httpState.data.location.city,
          suburb: httpState.data.location.suburb,
        },
      });
    }
  }, [httpState, setWeatherData]);

  return (
    <form onSubmit={SubmitHandler} className="col-span-full mb-5 text-center">
      {httpState.status === 'LOADING' && <Spinner />}
      <input
        placeholder="Search..."
        ref={searchInputRef}
        value={searchInput}
        onChange={inputChangeHandler}
        className="inline-block w-1/2 transition-all focus:placeholder:text-slate-800 text-black placeholder:text-slate-200 bg-slate-500 appearance-none border-2 border-gray-600 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-purple-500"
      />

      <button className="bg-slate-700 text-slate-200 inline-block py-2 px-4 rounded-md">
        Search...
      </button>
    </form>
  );
};

export default Search;
