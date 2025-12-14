import React from 'react';
import ProductsCRUD from './ProductsCRUD.jsx';
import OrdersList from './OrdersList.jsx';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold">Overview</h3>
            <div className="mt-4 text-gray-600">Quick stats and KPIs can go here.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 col-span-2">
            <h3 className="font-semibold">Recent Activity</h3>
            <div className="mt-4 text-gray-600">Placeholder for activity charts and summaries.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ProductsCRUD />
          </div>
          <div>
            <OrdersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
