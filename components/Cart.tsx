import React, { useState } from 'react';
import { OrderItem } from '../types';
import { CartIcon, TrashIcon } from './Icons';

interface CartProps {
  cartItems: OrderItem[];
  updateQuantity: (itemId: number, newQuantity: number) => void;
  onPlaceOrder: (customerName: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, updateQuantity, onPlaceOrder }) => {
  const [customerName, setCustomerName] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      alert('Please enter your name.');
      return;
    }
    onPlaceOrder(customerName);
    setCustomerName('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <CartIcon className="h-7 w-7 text-red-600" />
        Your Order
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Add some items from the menu!</p>
      ) : (
        <>
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 h-6 w-6 rounded-full font-bold text-gray-700">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 h-6 w-6 rounded-full font-bold text-gray-700">+</button>
                  <button onClick={() => updateQuantity(item.id, 0)} className="text-red-500 hover:text-red-700 ml-2">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between items-center font-bold text-xl mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg disabled:bg-gray-400"
            disabled={!customerName.trim() || cartItems.length === 0}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
