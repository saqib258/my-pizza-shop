import React, { useState } from 'react';
import { Order, OrderStatus } from './types';
import Header from './components/Header';
import CustomerView from './components/CustomerView';
import AdminView from './components/AdminView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'customer' | 'admin'>('customer');
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (newOrderData: Omit<Order, 'id' | 'status' | 'timestamp'>) => {
    const order: Order = {
      ...newOrderData,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      status: OrderStatus.NEW,
      timestamp: new Date(),
    };
    setOrders(prevOrders => [order, ...prevOrders]);
    alert(`Order placed successfully! Your order ID is ${order.id}. Check the Admin view.`);
    setActiveView('admin');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {activeView === 'customer' ? (
          <CustomerView addOrder={addOrder} />
        ) : (
          <AdminView orders={orders} updateOrderStatus={updateOrderStatus} />
        )}
      </main>
    </div>
  );
};

export default App;
