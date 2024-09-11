import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { CryptoDetail } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { RingLoader } from 'react-spinners';

const CryptoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Fetch the crypto ID from URL
  const [crypto, setCrypto] = useState<CryptoDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setCrypto(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#4A90E2" loading={loading} size={150} />
      </div>
    );
  }

  // Error state
  if (error || !crypto) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="text-red-500 mb-4" />
        <p className="text-gray-600 text-lg">No cryptocurrency found or an error occurred.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go back to the list</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/" className="text-blue-500 hover:underline">← Back to List</Link>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        {/* Crypto Image and Name */}
        <div className="flex items-center mt-4">
          <img src={crypto.image.large} alt={crypto.name} className="w-24 h-24 mr-6 rounded-full shadow-md" />
          <h2 className="text-4xl font-bold text-indigo-700">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
        </div>

        {/* Crypto Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold text-gray-700">Current Price</p>
            <p className="text-xl font-bold text-green-600">${crypto.market_data.current_price.usd.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold text-gray-700">Market Cap</p>
            <p className="text-xl font-bold">${crypto.market_data.market_cap.usd.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold text-gray-700">Total Volume</p>
            <p className="text-xl font-bold">${crypto.market_data.total_volume.usd.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold text-gray-700">24h High</p>
            <p className="text-xl font-bold text-green-500">${crypto.market_data.high_24h.usd.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold text-gray-700">24h Low</p>
            <p className="text-xl font-bold text-red-500">${crypto.market_data.low_24h.usd.toLocaleString()}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">About {crypto.name}</h3>
          <p className="text-gray-600 leading-relaxed">{crypto.description?.en || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailPage;
