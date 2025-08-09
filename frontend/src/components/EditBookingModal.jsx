import { useState } from 'react';
import api from '../services/api';

const EditBookingModal = ({ booking, onClose, onUpdated }) => {
  const [startTime, setStartTime] = useState(booking.startDate);
  const [endTime, setEndTime] = useState(booking.endDate);
  const [status, setStatus] = useState(booking.status);

  const handleUpdate = async () => {
    try {
      await api.put(`/bookings/update-booking/${booking._id}`, {
        bikeId: booking.bike._id,
        startTime,
        endTime,
        status
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Update failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Booking</h3>
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="input-field mb-3" />
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} className="input-field mb-3" />
        <select value={status} onChange={e => setStatus(e.target.value)} className="input-field mb-3">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;