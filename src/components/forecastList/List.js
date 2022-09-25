import Item from './Item';

const List = props => {
  console.log(props.forecastArr);
  return (
    <ul className="px-10 my-10">
      {props.forecastArr.map(item => (
        <Item
          key={item.dt.toString()}
          id={item.dt.toString()}
          weatherIcon={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
          date={item.dt}
          maxTemp={Math.ceil(item.temp.max)}
          minTemp={Math.ceil(item.temp.min)}
          windSpeed={item.wind_speed}
        />
      ))}
    </ul>
  );
};

export default List;
