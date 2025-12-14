import React, { useEffect, useState } from 'react';
import formatPrice from '../../utils/formatPrice.js';

const ProductsCRUD = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' });
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:9090/api/inventory');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    const payload = { ...form, price: parseFloat(form.price) || 0, stock: parseInt(form.stock || 0, 10) };
    await fetch('http://localhost:9090/api/inventory', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setForm({ name: '', category: '', price: '', stock: '' });
    fetchProducts();
  };

  const handleUpdate = async (id) => {
    const payload = { ...form, price: parseFloat(form.price) || 0, stock: parseInt(form.stock || 0, 10) };
    await fetch(`http://localhost:9090/api/inventory/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setEditing(null);
    setForm({ name: '', category: '', price: '', stock: '' });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete product?')) return;
    await fetch(`http://localhost:9090/api/inventory/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Products</h3>
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input placeholder="Name" name="name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input placeholder="Category" name="category" value={form.category} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input placeholder="Price" name="price" value={form.price} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input placeholder="Stock" name="stock" value={form.stock} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>
        <div className="mt-3">
          {editing ? (
            <button onClick={() => handleUpdate(editing)} className="bg-indigo-600 text-white px-4 py-2 rounded">Update</button>
          ) : (
            <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Product</button>
          )}
        </div>
      </div>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100"><tr><th className="p-3">Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td>{p.category}</td>
                <td>₹{formatPrice(p.price)}</td>
                <td>{p.stock}</td>
                <td className="p-3">
                  <button onClick={() => startEdit(p)} className="mr-2 text-indigo-600">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsCRUD;
