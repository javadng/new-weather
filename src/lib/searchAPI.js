import { API_oncall, API_SEARCH, TIMEOUT_SEC } from '../config/config';
import timeout from './timeoutPromise';

const searchAPI = async cityName => {
  const response = await fetch(`${API_SEARCH}${cityName}`);
  if (!response.ok)
    throw new Error(
      `Somthing went wrong, Error : ${response.status} ${response.statusText}`
    );

  const [dataSearch] = await response.json();
  if (!dataSearch) throw new Error(`City Not Found. Try again 🙏.`);

  let coords = { lat: dataSearch.lat, lon: dataSearch.lon };
  const responsedata = await Promise.race([
    fetch(`${API_oncall}lat=${coords.lat}&lon=${coords.lon}`),
    timeout(TIMEOUT_SEC),
  ]);

  const data = await responsedata.json();

  return {
    weatherData: data,
    location: {
      country: dataSearch.country,
      suburb: dataSearch.name,
      city: dataSearch.state,
    },
  };
};

export default searchAPI;
