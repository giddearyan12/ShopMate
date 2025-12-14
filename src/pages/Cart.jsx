import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import formatPrice from "../utils/formatPrice.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, cartTotal, cartCount } = useCart();
  const { logout, user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">ShopMate</h1>
          <div className="hidden md:flex items-center w-1/3">
            <input type="text" placeholder="Search products..." className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500" />
          </div>
            <div className="flex space-x-6 items-center">
            <div className="relative cursor-pointer hover:scale-110 transition" onClick={() => navigate('/cart')}>
              <FaShoppingCart size={26} className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
            </div>
            {user?.role === 'admin' && (
              <div className="hidden md:block ml-4">
                <button onClick={() => navigate('/admin/dashboard')} className="text-sm text-indigo-600 hover:underline">Dashboard</button>
              </div>
            )}
            <div className="relative" ref={profileRef}>
              <FaUser size={26} className="text-indigo-600 cursor-pointer hover:scale-110 transition" onClick={() => setProfileOpen(!profileOpen)} />
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 text-gray-700 z-50">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">View Profile</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
                </div>
              )}
            </div>
            <FaBars size={28} className="md:hidden cursor-pointer text-gray-700" />
          </div>
        </div>
      </nav>
      <div className="pt-28"></div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow text-gray-600 flex flex-col items-center gap-6">
            <div className="text-xl font-semibold">Your cart is empty.</div>
            <div className="text-gray-500">Looks like you haven't added anything to your cart yet.</div>
            <button onClick={() => navigate('/home#featured')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Start Shopping</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
              <div className="p-6">
                <table className="w-full text-left">
                <thead className="text-gray-600 border-b">
                  <tr>
                    <th className="py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Subtotal</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </div>
                      </td>
                      <td className="py-4">₹{formatPrice(item.price)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                          >
                            <FaMinus />
                          </button>
                          <div className="px-3">{item.qty}</div>
                          <button
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td className="py-4">₹{formatPrice((parseFloat(item.price) || 0) * (item.qty || 1))}</td>
                      <td className="py-4">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="col-span-1 bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-fit">
              <div className="text-gray-600 text-sm">Order Summary</div>
              <div className="text-2xl font-semibold mt-4">₹{formatPrice(cartTotal)}</div>
              <div className="mt-4 text-sm text-gray-500">Shipping calculated at checkout.</div>
              <button className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">Proceed to Checkout</button>
            </aside>
          </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Cart;
