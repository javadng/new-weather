import { useState } from 'react';
import { API_SEARCH } from '../config/config';
import getDataO from '../lib/getDatao';
import useHttp from './use-http';

const useSearch = () => {
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [sendRequest, httpState] = useHttp(getDataO);

  const searchAJAX = async function (query) {
    setSearchIsLoading(true);

    try {
      const response = await fetch(`${API_SEARCH}${query}`);

      if (!response.ok)
        throw new Error(
          `Somthing went wrong, Error : ${response.status} ${response.statusText}`
        );

      const [dataSearch] = await response.json();

      if (!dataSearch) throw new Error(`City Not Found. Try again 🙏.`);

      let coords = { lat: dataSearch.lat, lon: dataSearch.lon };

      await sendRequest(`lat=${coords.lat}&lon=${coords.lon}`);
    } catch (err) {
      setSearchError(err);
    }

    setSearchIsLoading(false);
  };

  return {
    searchIsLoading,
    searchError,
    searchAJAX,
    httpState,
  };
};
export default useSearch;
