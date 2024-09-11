import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CryptoList from './components/CryptoList';
import CryptoDetailPage from './components/CryptoDetailPage';
import CryptoConverter from './components/CryptoConverter';
import Navbar from './components/Navbar'; // Import Navbar

const App: React.FC = () => {
  return (
    <div className="App min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<CryptoList />} />
            <Route path="/crypto/:id" element={<CryptoDetailPage />} />
            <Route path="/converter" element={<CryptoConverter />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 text-center">
        <p>&copy; 2024 CryptoInfo | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
