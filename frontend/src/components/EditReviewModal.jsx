import { useState } from 'react';
import api from '../services/api';

const EditReviewModal = ({ review, onClose, onUpdated }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleUpdate = async () => {
    try {
      await api.put(`/reviews/update-my-review/${review._id}`, {
        bikeId: review.bike._id,
        rating,
        comment
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Review update failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Review</h3>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="input-field mb-3"
          placeholder="Rating (1-5)"
        />
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="input-field mb-3"
          rows={4}
          placeholder="Your comment"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;