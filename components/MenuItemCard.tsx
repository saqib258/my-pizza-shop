import React from 'react';
import { MenuItem } from '../types';
import { CartIcon } from './Icons';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-red-600">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition-colors duration-200"
          >
            <CartIcon className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
