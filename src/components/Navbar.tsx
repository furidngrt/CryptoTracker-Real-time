import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">CRYPTOINFO</Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/converter"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                CONVERTER
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
