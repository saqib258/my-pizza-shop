import React from 'react';
import { PizzaIcon, UserShieldIcon } from './Icons';

interface HeaderProps {
  activeView: 'customer' | 'admin';
  setActiveView: (view: 'customer' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const commonButtonClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200";
  const activeButtonClasses = "bg-red-600 text-white shadow-md";
  const inactiveButtonClasses = "bg-white text-gray-700 hover:bg-gray-200";

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
           <PizzaIcon className="h-8 w-8 text-red-600" />
           <h1 className="text-xl md:text-2xl font-bold text-gray-800">My Pizza Shop</h1>
        </div>
        <nav className="flex items-center gap-2 p-1 bg-gray-200 rounded-xl">
          <button
            onClick={() => setActiveView('customer')}
            className={`${commonButtonClasses} ${activeView === 'customer' ? activeButtonClasses : inactiveButtonClasses}`}
          >
            Order
          </button>
          <button
            onClick={() => setActiveView('admin')}
            className={`${commonButtonClasses} ${activeView === 'admin' ? activeButtonClasses : inactiveButtonClasses}`}
          >
            <UserShieldIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
