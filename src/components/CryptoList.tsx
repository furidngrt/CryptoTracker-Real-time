import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CryptoItem from './CryptoItem';
import { RingLoader } from 'react-spinners'; // For loading spinner

interface Crypto {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

const CryptoList = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cryptoPerPage] = useState<number>(20); // Display 20 items per page
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
      },
    })
    .then(response => {
      setCryptos(response.data);
      setFilteredCryptos(response.data);
      setLoading(false); // Stop loading spinner once data is loaded
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(value) ||
      crypto.id.toLowerCase().includes(value)
    );
    setFilteredCryptos(filtered);
  };

  const indexOfLastCrypto = currentPage * cryptoPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptoPerPage;
  const currentCryptos = filteredCryptos.slice(indexOfFirstCrypto, indexOfLastCrypto);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search cryptocurrency..."
          className="w-full px-4 py-3 border rounded-lg shadow-sm pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        />
        <i className="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"></i>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RingLoader color="#4A90E2" loading={loading} size={150} />
        </div>
      ) : (
        <>
          {/* Crypto Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentCryptos.length > 0 ? (
              currentCryptos.map((crypto) => (
                <Link to={`/crypto/${crypto.id}`} key={crypto.id}>
                  <CryptoItem crypto={crypto} />
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600">No cryptocurrency found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center my-6 space-x-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-300 text-sm md:text-base rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              Previous
            </button>
            {Array.from({ length: Math.ceil(filteredCryptos.length / cryptoPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-2 text-sm md:text-base rounded-lg transition duration-300 ${
                  currentPage === index + 1
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredCryptos.length / cryptoPerPage)}
              className="px-3 py-2 bg-gray-300 text-sm md:text-base rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoList;
