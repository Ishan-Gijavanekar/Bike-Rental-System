// src/pages/AddBike.jsx
import { useState } from 'react';
import api from '../services/api';

const AddBike = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    pricePerHour: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, brand, pricePerHour, address, city, pincode } = formData;

    if (!name || !brand || !pricePerHour || !address || !city || !pincode) {
      alert('All fields are required');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('brand', brand);
    data.append('pricePerHour', pricePerHour);
    data.append('address', address);
    data.append('city', city);
    data.append('pincode', pincode);
    if (image) data.append('image', image);

    try {
      setLoading(true);
      await api.post('/bikes/add-bike', data);
      alert('Bike added successfully');
      setFormData({
        name: '',
        brand: '',
        pricePerHour: '',
        address: '',
        city: '',
        pincode: ''
      });
      setImage(null);
    } catch (err) {
      alert('Error adding bike');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Add a New Bike</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Bike Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter bike name"
          />
        </div>
        <div>
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter brand"
          />
        </div>
        <div>
          <label className="block font-medium">Price Per Hour (₹)</label>
          <input
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter price"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter address"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter pincode"
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Adding...' : 'Add Bike'}
        </button>
      </form>
    </div>
  );
};

export default AddBike;