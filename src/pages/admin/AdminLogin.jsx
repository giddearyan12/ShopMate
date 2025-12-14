import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Admin login failed');
      }
      const data = await res.json();
      const userFromRes = data.user ? data.user : { id: data.id, name: data.name, email: data.email };
      const userData = { ...userFromRes, role: userFromRes?.role ?? 'admin' };
      const token = data.token || data.accessToken || data.jwt;
      login(userData, token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow">
        <div className="flex justify-center mb-5">
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">ShopMate</h1>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">Want to login as user? <a href="/login" className="text-indigo-600">User Login</a></p>
      </div>
    </div>
  );
};

export default AdminLogin;
