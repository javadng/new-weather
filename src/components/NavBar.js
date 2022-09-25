import { NavLink } from 'react-router-dom';

import './navbar.css';

const NavBar = props => {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? 'text-red-400 flex flex-col items-center Active'
      : 'flex flex-col items-center';

  const svgClasses = 'h-10 w-10 md:h-16 md:w-16';

  return (
    <div className="fixed left-0 bottom-0 maxmd:w-[100vw] md:w[10rem] md:top-0 md:h-[100vh] font-bold">
      <ul className="flex justify-between items-center md:w-[10rem] md:flex-col md:h-[100vh] h-26 py-5 px-10 rounded-lg bg-slate-800 text-white w-full">
        <NavLink to="/" className={navLinkClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgClasses}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="ml-2 opacity-0">Home</span>
        </NavLink>
        <NavLink to="/favorite" className={navLinkClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgClasses}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="ml-2 opacity-0">Favorite</span>
        </NavLink>
        <NavLink to="/link3" className={navLinkClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgClasses}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
            />
          </svg>
          <span className="ml-2 opacity-0">Link3</span>
        </NavLink>
        <NavLink to="/forecast" className={navLinkClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={svgClasses}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2 opacity-0">Forecast</span>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;
