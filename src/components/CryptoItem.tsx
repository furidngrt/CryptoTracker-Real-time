import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';

interface Crypto {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
}

const CryptoItem = ({ crypto }: { crypto: Crypto }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl relative group">
      <div className="p-4 flex items-center">
        <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full mr-4 shadow-md" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{crypto.name}</h2>
          <p className="text-gray-600 flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Price: ${crypto.current_price.toLocaleString()}
          </p>
          <p className="text-gray-600 flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Market Cap: ${crypto.market_cap.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Hovered content */}
      <div className="absolute inset-0 bg-indigo-600 bg-opacity-90 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white text-center">
          <h3 className="text-2xl font-bold">{crypto.name}</h3>
          <p>Click for more details</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoItem;
