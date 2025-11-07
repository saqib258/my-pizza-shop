import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../constants';
import { Order, OrderItem, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';
import Cart from './Cart';
import { PizzaIcon, BurgerIcon, DrinkIcon, SearchIcon } from './Icons';

interface CustomerViewProps {
  addOrder: (newOrderData: Omit<Order, 'id' | 'status' | 'timestamp'>) => void;
}

const CustomerView: React.FC<CustomerViewProps> = ({ addOrder }) => {
  const [cart, setCart] = useState<Map<number, OrderItem>>(new Map());
  const [activeCategory, setActiveCategory] = useState<'Pizza' | 'Burger' | 'Drink'>('Pizza');
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      // FIX: Explicitly type the new Map to ensure correct type inference for its items.
      const newCart = new Map<number, OrderItem>(prevCart);
      const existingItem = newCart.get(item.id);
      if (existingItem) {
        newCart.set(item.id, { ...existingItem, quantity: existingItem.quantity + 1 });
      } else {
        newCart.set(item.id, { ...item, quantity: 1 });
      }
      return newCart;
    });
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCart(prevCart => {
      // FIX: Explicitly type the new Map to ensure correct type inference for its items.
      const newCart = new Map<number, OrderItem>(prevCart);
      if (newQuantity <= 0) {
        newCart.delete(itemId);
      } else {
        const item = newCart.get(itemId);
        if (item) {
          newCart.set(itemId, { ...item, quantity: newQuantity });
        }
      }
      return newCart;
    });
  };
  
  const cartItems = useMemo(() => Array.from(cart.values()), [cart]);

  const placeOrder = (customerName: string) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    addOrder({ customerName, items: cartItems, total });
    setCart(new Map());
  };
  
  const filteredMenu = MENU_ITEMS.filter(item => 
    item.category === activeCategory &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CategoryButton = ({ category, icon }: { category: 'Pizza' | 'Burger' | 'Drink', icon: React.ReactNode }) => {
    const isActive = activeCategory === category;
    return (
        <button 
            onClick={() => setActiveCategory(category)}
            className={`flex-1 sm:flex-initial sm:w-32 flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${
                isActive ? 'bg-red-600 text-white shadow' : 'bg-white text-gray-600 hover:bg-red-100'
            }`}
        >
            {icon}
            {category}
        </button>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Menu</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
            <div className="flex flex-col sm:flex-row gap-3 bg-gray-200 p-2 rounded-xl w-full md:w-auto">
                <CategoryButton category="Pizza" icon={<PizzaIcon className="h-6 w-6" />} />
                <CategoryButton category="Burger" icon={<BurgerIcon className="h-6 w-6" />} />
                <CategoryButton category="Drink" icon={<DrinkIcon className="h-6 w-6" />} />
            </div>
            <div className="relative w-full md:flex-1 md:max-w-sm ml-auto">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type="text"
                    placeholder="Search in this category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
            </div>
        </div>
        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMenu.map(item => (
              <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-700">No Matching Items</h3>
              <p className="text-gray-500 mt-2">
                  We couldn't find any items matching your search "{searchTerm}" in the {activeCategory} category.
              </p>
          </div>
        )}
      </div>
      <div className="lg:col-span-1">
        <Cart cartItems={cartItems} updateQuantity={updateQuantity} onPlaceOrder={placeOrder} />
      </div>
    </div>
  );
};

export default CustomerView;