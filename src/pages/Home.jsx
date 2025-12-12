import React from "react";
import logo from "../assets/logo.jpg";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';


const Home = () => {
    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            rating: 4.5,
            reviews: 128
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
            rating: 4.8,
            reviews: 256
        },
        {
            id: 3,
            name: 'Laptop Backpack',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
            rating: 4.3,
            reviews: 89
        },
        {
            id: 4,
            name: 'Portable Speaker',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
            rating: 4.6,
            reviews: 174
        },
        {
            id: 5,
            name: 'Fitness Tracker',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
            rating: 4.4,
            reviews: 203
        },
        {
            id: 6,
            name: 'Sunglasses',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
            rating: 4.7,
            reviews: 145
        },
        {
            id: 7,
            name: 'Running Shoes',
            price: 119.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
            rating: 4.9,
            reviews: 312
        },
        {
            id: 8,
            name: 'Coffee Maker',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
            rating: 4.5,
            reviews: 98
        }
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">

                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 
                 bg-clip-text text-transparent">
                            ShopMate
                        </h1>
                    </div>

                    {/* Right Search Bar */}
                    <div className="hidden md:flex ml-auto mr-6">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-64 px-4 py-2 rounded-full border border-gray-300 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Cart Icon */}
                        <div className="relative cursor-pointer hover:scale-110 transition">
                            <FaShoppingCart size={26} className="text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                3
                            </span>
                        </div>

                        {/* User Icon */}
                        <div className="cursor-pointer hover:scale-110 transition">
                            <FaUser size={28} className="text-indigo-600" />
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="md:hidden cursor-pointer hover:scale-110 transition">
                            <FaBars size={28} className="text-gray-700" />
                        </div>
                    </div>

                </div>
            </nav>



            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white py-32">

                {/* Floating blurred blobs */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-28 -right-20 w-[28rem] h-[28rem] bg-pink-400/20 rounded-full blur-[100px]"></div>

                {/* Light texture overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="relative max-w-6xl mx-auto px-6 text-center z-10">

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-2xl">
                        Upgrade Your Shopping Experience
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 opacity-95">
                        Discover premium gadgets, stylish accessories, and exclusive deals —
                        all in one beautifully crafted marketplace made for smart shoppers.
                    </p>

                    {/* CTA Button */}
                    <a
                        href="/home"
                        className="inline-block bg-white text-indigo-700 font-semibold px-10 py-4 rounded-full 
                 shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 
                 text-lg transform hover:-translate-y-1 hover:scale-[1.04]"
                    >
                        Get Started
                    </a>

                    <div className="mt-14 flex flex-wrap justify-center gap-6">
                        <div className="backdrop-blur-lg bg-white/10 px-6 py-3 rounded-xl border border-white/20 text-sm">
                            🔥 Best Prices Guaranteed
                        </div>
                        <div className="backdrop-blur-lg bg-white/10 px-6 py-3 rounded-xl border border-white/20 text-sm">
                            🚚 Fast Delivery
                        </div>
                        <div className="backdrop-blur-lg bg-white/10 px-6 py-3 rounded-xl border border-white/20 text-sm">
                            ⭐ Premium Quality Products
                        </div>
                    </div>

                </div>
            </section>


            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Section Title */}
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
                        Featured Products
                    </h2>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 
                     overflow-hidden transform hover:-translate-y-2"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Price Tag */}
                                    <span className="absolute top-3 right-3 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full shadow">
                                        ₹{product.price}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-500 text-sm mt-2">
                                        Premium quality product at the best price.
                                    </p>

                                    {/* Add to Cart Button */}
                                    <button
                                        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg
                         shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <FaShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-xl transition duration-300">
                            <h3 className="font-semibold text-xl mb-2">Fast Shipping</h3>
                            <p className="text-gray-600">Get your orders delivered quickly and safely.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-xl transition duration-300">
                            <h3 className="font-semibold text-xl mb-2">Secure Payments</h3>
                            <p className="text-gray-600">100% secure payment options with full protection.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-xl transition duration-300">
                            <h3 className="font-semibold text-xl mb-2">Quality Products</h3>
                            <p className="text-gray-600">We sell only the best products at competitive prices.</p>
                        </div>
                    </div>
                </div>
            </section>



            <footer className="bg-gray-900 text-gray-300 mt-20 pt-14">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Logo + About */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img src={logo} alt="Logo" className="h-12 w-auto rounded-md" />
                            <h3 className="text-2xl font-bold text-white">ShopMate</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Your trusted store for premium products, fast delivery, and secure shopping.
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-4 mt-4">
                            <FaFacebook className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                            <FaInstagram className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                            <FaTwitter className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                            <FaYoutube className="text-gray-400 hover:text-white cursor-pointer text-xl" />
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Shop</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-white">New Arrivals</a></li>
                            <li><a href="/" className="hover:text-white">Best Sellers</a></li>
                            <li><a href="/" className="hover:text-white">Discount Offers</a></li>
                            <li><a href="/" className="hover:text-white">Categories</a></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-white">FAQ</a></li>
                            <li><a href="/" className="hover:text-white">Customer Service</a></li>
                            <li><a href="/" className="hover:text-white">Shipping Info</a></li>
                            <li><a href="/" className="hover:text-white">Returns & Refunds</a></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="/" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="/" className="hover:text-white">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-700 py-5 text-center text-gray-500">
                    &copy; 2025 ShopMate. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default Home;
