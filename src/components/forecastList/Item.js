import { WiSandstorm } from 'react-icons/wi';
import covertTime from '../../lib/timeConverter';

const Item = props => {
  const date = covertTime(props.date, { weekday: 'long' });

  return (
    <li className="grid grid-cols-[70px_repeat(3,_minmax(20px,_1fr))] md:grid-cols-[100px_repeat(3,_minmax(20px,_1fr))] gap-2 justify-between items-center bg-slate-700 p-3 rounded-xl my-3">
      <span>{date}</span>
      <figure className="col-start-2 col-end-3">
        <img className="object-cover" src={props.weatherIcon} />
      </figure>
      <span className="flex items-center flex-wrap font-normal text-2xl ">
        <WiSandstorm size="3.5rem" />
        {props.windSpeed} km/h
      </span>
      <div className='flex flex-wrap justify-between'>
        <span className="text-red-300 ">
          {props.maxTemp}
          <sup>°</sup>
        </span>
        <span className="text-blue-400">
          {props.minTemp}
          <sup>°</sup>
        </span>
      </div>
    </li>
  );
};

export default Item;
