import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import BikeCard from '../components/BikeCard';

const Home = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      const { data } = await api.get('/bikes/get-all-bikes');
      setBikes(data.bikes.slice(0, 5)); // ✅ limit to 10
    };
    fetchBikes();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Rent Your Ride</h1>
        <p className="text-lg">Affordable, reliable, and fast bike rentals near you</p>
      </header>

      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Available Bikes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map(bike => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/get-all-bikes')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            View All Bikes
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;