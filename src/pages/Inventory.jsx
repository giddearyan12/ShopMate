import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUser, FaBars, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import formatPrice from "../utils/formatPrice.js";
import { useCart } from "../context/CartContext.jsx";

const Inventory = () => {

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart, cartCount } = useCart();
    const { user } = useAuth();

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/inventory");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ---------------- DELETE PRODUCT ----------------
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await fetch(`http://localhost:9090/api/inventory/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setProducts(products.filter((p) => p.id !== id));
            } else {
                console.log("Delete failed");
            }
        } catch (error) {
            console.log("Error deleting product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ------------------ HEADER ------------------ */}
            <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

                    {/* Logo */}
                    <h1 className="text-4xl font-extrabold bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 
                        bg-clip-text text-transparent">
                        ShopMate
                    </h1>

                    {/* Search Bar */}
                    <div className="hidden md:flex ml-auto mr-6">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-64 px-4 py-2 rounded-full border border-gray-300 
                                focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <div className="relative cursor-pointer hover:scale-110 transition" onClick={() => navigate('/cart')}>
                            <FaShoppingCart size={26} className="text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
                        </div>
                        {user?.role === 'admin' && (
                            <div className="hidden md:block ml-4">
                                <button onClick={() => navigate('/admin/dashboard')} className="text-sm text-indigo-600 hover:underline">Dashboard</button>
                            </div>
                        )}
                        <div className="cursor-pointer hover:scale-110 transition">
                            <FaUser size={28} className="text-indigo-600" />
                        </div>
                        <div className="md:hidden cursor-pointer hover:scale-110 transition">
                            <FaBars size={28} className="text-gray-700" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* ------------------ TOP CONTROLS ------------------ */}
            <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                
                {/* Search */}
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md w-full md:w-1/3 border">
                    <FaSearch className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Add Button */}
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
                    <FaPlus /> Add New Product
                </button>
            </div>

            {/* ------------------ PRODUCT TABLE ------------------ */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Product Name</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Price</th>
                                <th className="py-3 px-4 text-left">Stock</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products
                                .filter((p) =>
                                    p.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b hover:bg-gray-100 transition"
                                    >
                                        <td className="py-3 px-4">{product.id}</td>
                                        <td className="py-3 px-4 font-semibold">{product.name}</td>
                                        <td className="py-3 px-4">{product.category}</td>
                                        <td className="py-3 px-4">₹{formatPrice(product.price)}</td>
                                        <td className="py-3 px-4">{product.stock}</td>

                                        <td className="py-3 px-4 flex justify-center gap-4">
                                            <button className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-2" onClick={() => addToCart(product)}>
                                                <FaShoppingCart size={16} /> Add
                                            </button>
                                            <button className="text-indigo-600 hover:text-indigo-800 transition">
                                                <FaEdit size={20} />
                                            </button>

                                            <button
                                                className="text-red-600 hover:text-red-800 transition"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
