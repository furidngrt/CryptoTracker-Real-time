import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoConverter: React.FC = () => {
  const [cryptoList, setCryptoList] = useState<{ id: string; symbol: string }[]>([]);
  const [fromCrypto, setFromCrypto] = useState<string>('bitcoin');
  const [toCurrency, setToCurrency] = useState<string>('usd');
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetching the top 100 cryptocurrencies by market cap
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
        },
      })
      .then((response) => {
        const cryptoData = response.data.map((crypto: any) => ({
          id: crypto.id,
          symbol: crypto.symbol,
        }));
        setCryptoList(cryptoData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleConvert = () => {
    setLoading(true); // Show loading spinner
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto}&vs_currencies=${toCurrency}`)
      .then((response) => {
        const rate = response.data[fromCrypto][toCurrency];
        setResult(rate * amount);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); // Hide loading spinner
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">Crypto Converter</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* From Crypto */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">From Crypto</label>
          <select
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={fromCrypto}
            onChange={(e) => setFromCrypto(e.target.value)}
          >
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.symbol.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* To Currency */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">To Currency</label>
          <select
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="idr">IDR</option>
            {/* Add more currencies as needed */}
          </select>
        </div>

        {/* Amount */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        {/* Convert Button */}
        <div className="flex items-end justify-center mt-4 md:mt-0">
          <button
            onClick={handleConvert}
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </div>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm w-full">
            <h3 className="text-2xl font-semibold mb-2">Conversion Result</h3>
            <p className="text-lg text-indigo-600">
              {amount} {fromCrypto.toUpperCase()} = {result.toLocaleString()} {toCurrency.toUpperCase()}
            </p>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-8 flex justify-center">
          <div className="spinner border-indigo-500"></div>
        </div>
      )}
    </div>
  );
};

export default CryptoConverter;
