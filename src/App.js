import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main';
import Spinner from './components/UI/Spinner';
import WeatherProvider from './store/WeatherProvider';

const Home = React.lazy(() => import('./pages/Home'));
const Forecast = React.lazy(() => import('./pages/Forecast'));
const Favorite = React.lazy(() => import('./pages/Favorite'));

const App = () => {
  return (
    <WeatherProvider>
      <Suspense
        fallback={
          <Main>
            <Spinner />
          </Main>
        }
      >
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/forecast" element={<Forecast />} />
        </Routes>
      </Suspense>
    </WeatherProvider>
  );
};

export default App;
