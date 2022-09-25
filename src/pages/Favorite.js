import { useContext } from 'react';
import FavItem from '../components/FavItem';
import Main from '../components/layout/Main';
import WeatherContext from '../store/weather-context';

const Favorite = props => {
  const { favCities } = useContext(WeatherContext);
  let favoriteContent;

  if (!favCities?.length || !favCities) {
    favoriteContent = (
      <h2 className="text-center text-4xl mt-20 text-cyan-200">
        No marked city
      </h2>
    );
  } else {
    favoriteContent = favCities.map(city => {
      return (
        <FavItem
          key={city.location.city}
          temp={city.current.temp}
          locationName={city.location.suburb}
          city={city.location.city}
          country={city.location.country}
          imgIcon={city.current.weather[0].icon}
          speedWind={city.current.wind_speed}
          humidity={city.current.humidity}
        />
      );
    });
  }

  return (
    <Main>
      <div className="grid grid-cols-2 gap-0 pb-10">{favoriteContent}</div>
    </Main>
  );
};

export default Favorite;
