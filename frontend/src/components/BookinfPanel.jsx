import { useEffect, useState } from 'react';
import api from '../services/api';
import EditBookingModal from './EditBookingModal';
import ConfirmDialog from './ConfirmDialog';

const BookingsPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchBookings = async () => {
    const { data } = await api.get('/bookings/get-all-bookings');
    setBookings(data.bookings);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async () => {
    await api.delete(`/admin/delete-booking/${confirmDeleteId}`);
    setConfirmDeleteId(null);
    fetchBookings();
  };

  const paginated = bookings.slice((page - 1) * limit, page * limit);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Bike</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(b => (
              <tr key={b._id} className="border-t">
                <td className="px-4 py-2">{b.user?.name || 'N/A'}</td>
                <td className="px-4 py-2">{b.bike?.name || 'N/A'}</td>
                <td className="px-4 py-2">{new Date(b.startDate).toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(b.endDate).toLocaleString()}</td>
                <td className="px-4 py-2">{b.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => setSelectedBooking(b)} className="text-blue-600">Edit</button>
                  <button onClick={() => setConfirmDeleteId(b._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(Math.ceil(bookings.length / limit)).keys()].map(i => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {selectedBooking && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdated={fetchBookings}
        />
      )}

      {confirmDeleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this booking?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default BookingsPanel;