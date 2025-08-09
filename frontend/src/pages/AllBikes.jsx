import { useEffect, useState } from 'react';
import api from '../services/api';
import BikeCard from '../components/BikeCard';

const AllBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    city: '',
    available: ''
  });

  const fetchFilteredBikes = async () => {
    const params = new URLSearchParams();
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.city) params.append('city', filters.city);
    if (filters.available) params.append('available', filters.available);

    try {
      const { data } = await api.get(`/bikes/get-all-bikes?${params.toString()}`);
      setBikes(data.bikes);
    } catch (err) {
      setBikes([]);
    }
  };

  useEffect(() => {
    fetchFilteredBikes();
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">All Bikes</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by brand"
            value={filters.brand}
            onChange={e => setFilters(prev => ({ ...prev, brand: e.target.value }))}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Filter by city"
            value={filters.city}
            onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))}
            className="input-field"
          />
          <select
            value={filters.available}
            onChange={e => setFilters(prev => ({ ...prev, available: e.target.value }))}
            className="input-field"
          >
            <option value="">Availability</option>
            <option value="true">Available</option>
            <option value="false">Rented</option>
          </select>
        </div>

        {/* Bike Grid */}
        {bikes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map(bike => (
              <BikeCard key={bike._id} bike={bike} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No bikes found with selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default AllBikes;