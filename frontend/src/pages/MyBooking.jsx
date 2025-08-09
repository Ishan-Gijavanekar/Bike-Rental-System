import { useEffect, useState } from 'react';
import api from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/get-my-bookings');
        setBookings(data.bookings);
        setMessage(data.message);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to fetch bookings');
      }
    };
    fetchBookings();
  }, []);

  const handleViewDetails = async (bookingId) => {
    try {
      const { data } = await api.get(`/bookings/get-booking-by-id/${bookingId}`);
      setSelectedBooking(data.booking);
      setShowModal(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to fetch booking details');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h2>

        {message && <p className="text-blue-600 mb-4">{message}</p>}

        {bookings.length === 0 ? (
          <p className="text-gray-600">You have no bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white shadow rounded-lg p-4">
                <img
                  src={booking.bike.imageUrl}
                  alt={booking.bike.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2">{booking.bike.name}</h3>
                <p className="text-gray-600">{booking.bike.brand}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {booking.bike.location?.address}, {booking.bike.location?.city}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Start:</strong> {new Date(booking.startDate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>End:</strong> {new Date(booking.endDate).toLocaleString()}
                </p>
                <button
                  onClick={() => handleViewDetails(booking._id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Booking Details Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Booking Details</h3>
              <p><strong>Bike:</strong> {selectedBooking.bike.name}</p>
              <p><strong>Brand:</strong> {selectedBooking.bike.brand}</p>
              <p><strong>Location:</strong> {selectedBooking.bike.location?.address}, {selectedBooking.bike.location?.city}</p>
              <p><strong>Start Time:</strong> {new Date(selectedBooking.startDate).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(selectedBooking.endDate).toLocaleString()}</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;