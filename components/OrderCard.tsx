import React from 'react';
import { Order, OrderStatus } from '../types';
// FIX: Remove unused and non-existent ClockIcon import.
import { CheckCircleIcon } from './Icons';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
  const isNew = order.status === OrderStatus.NEW;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border-l-4 ${isNew ? 'border-yellow-400' : 'border-green-500'}`}>
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-semibold text-gray-500">{order.id}</p>
                <h3 className="text-xl font-bold text-gray-800">{order.customerName}</h3>
                <p className="text-xs text-gray-400 mt-1">{order.timestamp.toLocaleString()}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${isNew ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {order.status}
            </span>
        </div>
        
        <div className="border-t my-4"></div>

        <ul className="space-y-2 text-sm text-gray-700">
          {order.items.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.quantity} x {item.name}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-5 mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600">Total</span>
          <p className="text-2xl font-bold text-red-600">${order.total.toFixed(2)}</p>
        </div>
        {isNew && (
          <button
            onClick={() => onUpdateStatus(order.id, OrderStatus.COMPLETED)}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors shadow"
          >
            <CheckCircleIcon className="h-5 w-5" />
            Mark as Completed
          </button>
        )}
         {!isNew && (
            <div className="flex items-center gap-2 text-green-600">
                <CheckCircleIcon className="h-6 w-6" />
                <span className="font-semibold">Order Fulfilled</span>
            </div>
         )}
      </div>
    </div>
  );
};

export default OrderCard;
