
import React from 'react';
import { ShieldCheckIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-100 tracking-wider">
              Painel de Controle de Presença GCM
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
