import { API_SEARCH } from '../config/config';

const searchAPI = async cityName => {
  try {
    const res = await fetch(`${API_SEARCH}${cityName}`);

    if (!res.ok) throw new Error(`Somting went wrong: ${response.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    throw error.message;
  }
};

export default searchAPI;
