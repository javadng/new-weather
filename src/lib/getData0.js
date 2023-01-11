import { API_KEY, API_URL } from '../config/config';

const getData = async (dataType, options = '') => {
  const response = await fetch(
    `${API_URL}${dataType}.json?key=${API_KEY}&${options}`
  );

  if (!response.ok) throw new Error(`Somting went wrong: ${response.status}`);

  const data = await response.json();
  return data;
};

export default getData;
