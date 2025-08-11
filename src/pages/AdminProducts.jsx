import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../components/Button';
import Input from '../components/Input';

const AdminProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Gaming PC', price: 150, status: 'Available', image: '/images/product1.jpg' },
    { id: 2, name: 'VR Headset', price: 80, status: 'Rented', image: '/images/product2.jpg' },
    { id: 3, name: 'Gaming Console', price: 100, status: 'Available', image: '/images/product3.jpg' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', status: 'Available', image: '' });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setShowAddModal(false);
    setNewProduct({ name: '', price: '', status: 'Available', image: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Products Management</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
        >
          <FaPlus /> Add New Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price/Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-slate-600 mr-3">
                      {/* Product Image */}
                    </div>
                    <div className="text-white">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">${product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Available' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className="text-blue-500 hover:text-blue-600">
                      <FaEdit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Add New Product</h2>
            <div className="space-y-4">
              <Input
                label="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                label="Price per Day"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input
                label="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
              <div className="flex justify-end space-x-3">
                <Button
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-600 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProduct}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;