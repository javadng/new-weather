import { useContext, useEffect, useRef, useState } from 'react';

import Spinner from '../components/UI/Spinner';
import WeatherContext from '../store/weather-context';
import useSearch from '../hooks/useSearch';

const Search = props => {
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState('');

  const { searchAJAX, searchError, searchIsLoading, httpState } = useSearch();

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

    await searchAJAX(searchInput);

    if (searchError) {
      setNotification({
        type: 'ERROR',
        message: searchError,
      });

      return;
    }

    setSearchInput('');

    searchInputRef.current.blur();
  };

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
  }, [httpState, setWeatherData]);

  return (
    <form onSubmit={SubmitHandler} className="col-span-full mb-5 text-center">
      {searchIsLoading && <Spinner />}
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
