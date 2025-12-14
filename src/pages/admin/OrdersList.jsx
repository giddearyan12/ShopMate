import React, { useEffect, useState } from 'react';
import formatPrice from '../../utils/formatPrice.js';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:9090/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Orders</h3>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-100"><tr><th className="p-3">Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{o.id}</td>
                <td>{o.customerName || o.user?.name || '—'}</td>
                <td>₹{formatPrice(o.total || 0)}</td>
                <td>{o.status || 'NEW'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
