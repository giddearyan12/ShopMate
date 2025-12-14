import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path as needed

import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaShoppingCart,
    FaUser,
    FaBars
} from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { useCart } from "../context/CartContext.jsx";
import formatPrice from "../utils/formatPrice.js";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [profileOpen, setProfileOpen] = useState(false);
    const { addToCart, cartCount } = useCart();
    const profileRef = useRef();
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const featuredRef = useRef(null);


    useEffect(() => {
        fetch("http://localhost:9090/api/inventory/all")
            .then((res) => res.json())
            .then((data) => {
                const updated = data.map((p) => ({
                    ...p,
                    image: `https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop%27`
                }));
                setProducts(updated);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    // cartCount is derived from CartContext

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (location.hash === "#featured") {
            // small delay to ensure DOM is ready
            setTimeout(() => {
                featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        }
    }, [location]);

    const handleLogout = () => {
        logout();          // clears auth state
        navigate("/login");
    };

    // addToCart is provided by CartContext

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* NAVBAR */}
            <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ShopMate
                    </h1>

                    <div className="hidden md:flex items-center w-1/3">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex space-x-6 items-center">
                        <div className="relative cursor-pointer hover:scale-110 transition" onClick={() => navigate('/cart')}>
                            <FaShoppingCart size={26} className="text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        </div>
                        {user?.role === 'admin' && (
                            <div className="hidden md:block ml-4">
                                <button onClick={() => navigate('/admin/dashboard')} className="text-sm text-indigo-600 hover:underline">Dashboard</button>
                            </div>
                        )}

                        <div className="relative" ref={profileRef}>
                            <FaUser
                                size={26}
                                className="text-indigo-600 cursor-pointer hover:scale-110 transition"
                                onClick={() => setProfileOpen(!profileOpen)}
                            />
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 text-gray-700 z-50">
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={() => alert("View Profile clicked")}
                                    >
                                        View Profile
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        <FaBars size={28} className="md:hidden cursor-pointer text-gray-700" />
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white relative overflow-hidden">
                <div className="absolute -top-16 -left-16 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/10 rounded-full blur-2xl"></div>

                <div className="text-center px-6 relative">
                    <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
                        Discover Premium Products
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg opacity-90">
                        High-quality gadgets, stylish accessories, and unbeatable deals — all in one place.
                    </p>

                    <button onClick={() => navigate('/home#featured')} className="mt-8 bg-white text-indigo-700 font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                        Start Shopping
                    </button>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section ref={featuredRef} id="featured" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
                        Featured Products
                    </h2>

                    {products.length === 0 && (
                        <p className="text-center text-gray-500 text-lg">Loading products...</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {products.map((p) => (
                            <div
                                key={p.id}
                                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                            >
                                <div className="relative">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-500"
                                    />
                                    <span className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full shadow">
                                        ₹{formatPrice(p.price)}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600">
                                        {p.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Stock Available: {p.stock}
                                    </p>
                                    <button onClick={() => addToCart(p)} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                        <FaShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-gray-300 mt-10 pt-14">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                        <img src={logo} className="h-14 rounded-md mb-3" alt="ShopMate Logo" />
                        <h3 className="text-2xl font-bold text-white">ShopMate</h3>
                        <p className="text-gray-400 mt-2">Your trusted store for premium shopping.</p>

                        <div className="flex space-x-4 mt-4">
                            <FaFacebook className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                            <FaInstagram className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                            <FaTwitter className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                            <FaYoutube className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg text-white font-semibold mb-3">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white">New Arrivals</li>
                            <li className="hover:text-white">Best Sellers</li>
                            <li className="hover:text-white">Discounts</li>
                            <li className="hover:text-white">Categories</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg text-white font-semibold mb-3">Help</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white">FAQ</li>
                            <li className="hover:text-white">Shipping</li>
                            <li className="hover:text-white">Returns</li>
                            <li className="hover:text-white">Support</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg text-white font-semibold mb-3">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-white">Privacy Policy</li>
                            <li className="hover:text-white">Terms of Service</li>
                            <li className="hover:text-white">Cookies</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-gray-500 mt-10 py-6 border-t border-gray-700">
                    © 2025 ShopMate. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
