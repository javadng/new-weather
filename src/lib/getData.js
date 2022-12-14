import { API_oncall, API_REVERSEGOE } from '../config/config';

const getData = async (options = '') => {
  try {
    const weatherData = await fetch(`${API_oncall}&${options}`);
    const geoData = await fetch(`${API_REVERSEGOE}${options}`);

    if (!weatherData.ok || !geoData.ok)
      throw new Error(`Somting went wrong: ${response.status}`);

    const response = await Promise.all([weatherData, geoData]);

    const weather = await response[0].json();
    const { results: geo } = await response[1].json();

    return { weather, geo: geo[0] };
  } catch (error) {
    console.error(error.message);
  }
};

export default getData;
