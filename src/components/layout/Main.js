import { Fragment, useContext } from 'react';
import WeatherContext from '../../store/weather-context';
import NavBar from '../NavBar';

const Main = props => {
  const { notification } = useContext(WeatherContext);

  return (
    <Fragment>
      <div className="w-[100vw] pt-5 pb-24 sm:pb-10 md:h-[100vh] md:w-full md:pl-[10rem] relative bg-gradient-to-b from-slate-600 to-slate-900 text-white overflow-x-hidden overflow-y-auto mx-auto   h-[93vh] sm:rounded-xl">
        {notification.type === 'ERROR' && (
          <h2 className="text-4xl text-center text-red-300 font-bold mt-10">
            {notification.message}
          </h2>
        )}
        <div className="container m-auto">{props.children}</div>
      </div>
      <NavBar />
    </Fragment>
  );
};

export default Main;
