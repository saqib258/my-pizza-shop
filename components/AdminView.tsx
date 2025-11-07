import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import OrderCard from './OrderCard';

interface AdminViewProps {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ orders, updateOrderStatus }) => {
  const [filter, setFilter] = useState<OrderStatus | 'All'>(OrderStatus.NEW);

  const filteredOrders = orders.filter(order => {
    if (filter === 'All') return true;
    return order.status === filter;
  });

  const commonButtonClasses = "px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex-1";
  const activeButtonClasses = "bg-red-600 text-white shadow";
  const inactiveButtonClasses = "bg-white text-gray-700 hover:bg-gray-200";

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Incoming Orders</h2>
      <div className="mb-6 flex gap-2 p-1 bg-gray-200 rounded-xl max-w-md">
        <button
          onClick={() => setFilter('All')}
          className={`${commonButtonClasses} ${filter === 'All' ? activeButtonClasses : inactiveButtonClasses}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter(OrderStatus.NEW)}
          className={`${commonButtonClasses} ${filter === OrderStatus.NEW ? activeButtonClasses : inactiveButtonClasses}`}
        >
          New Orders
        </button>
        <button
          onClick={() => setFilter(OrderStatus.COMPLETED)}
          className={`${commonButtonClasses} ${filter === OrderStatus.COMPLETED ? activeButtonClasses : inactiveButtonClasses}`}
        >
          Completed
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-700">
            {filter === 'All' ? 'No orders found' : `No ${filter.toLowerCase()} orders`}
          </h3>
          <p className="text-gray-500 mt-2">
            {filter === 'All' ? 'When an order is placed, it will appear here.' : 'Check back later or switch tabs to see other orders.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminView;