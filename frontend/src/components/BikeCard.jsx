import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

const BikeCard = ({ bike }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: bike.name,
    brand: bike.brand,
    pricePerHour: bike.pricePerHour,
    address: bike.location?.address || '',
    city: bike.location?.city || '',
    pincode: bike.location?.pincode || ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setUser(data.user);
        console.log(data.user.role);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleBook = () => {
    navigate(`/bike/${bike._id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bike?')) return;
    try {
      await api.delete(`/bikes/delete-bike/${bike._id}`);
      alert('Bike deleted successfully');
      window.location.reload(); // or trigger a state update in parent
    } catch (err) {
      alert('Error deleting bike');
    }
  };

  const handleUpdate = async e => {
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
      await api.put(`/bikes/update-bike/${bike._id}`, data);
      alert('Bike updated successfully');
      setShowUpdateForm(false);
      window.location.reload();
    } catch (err) {
      alert('Error updating bike');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
      <img src={bike.imageUrl} alt={bike.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{bike.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{bike.brand}</p>
        <p className="text-gray-700 font-medium">₹{bike.pricePerHour}/hr</p>
        <p className="text-sm text-gray-600 mt-1">
          {bike.location?.address}, {bike.location?.city} - {bike.location?.pincode}
        </p>
        <button
          onClick={handleBook}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Book Now
        </button>

        {/* Admin Controls */}
        {user?.role === 'admin' && (
          <div className="mt-4 space-y-2">
            <button
              onClick={() => setShowUpdateForm(true)}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
            >
              Update Bike
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Delete Bike
            </button>
          </div>
        )}
      </div>

      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Update Bike</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Bike Name"
                className="input-field"
              />
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Brand"
                className="input-field"
              />
              <input
                type="number"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={e => setFormData({ ...formData, pricePerHour: e.target.value })}
                placeholder="Price Per Hour"
                className="input-field"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="Address"
                className="input-field"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
                className="input-field"
              />
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="Pincode"
                className="input-field"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
                className="input-field"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeCard;