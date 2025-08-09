import { useEffect, useState } from 'react';
import api from '../services/api';
import EditReviewModal from '../components/EditReviewModal';
import ConfirmDialog from '../components/ConfirmDialog';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchReviews = async () => {
    try {
      const { data } = await api.get('/reviews/get-my-reviews');
      setReviews(data.reviews);
    } catch (err) {
      console.error('Failed to fetch reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/reviews/delete-review/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchReviews();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const paginated = reviews.slice((page - 1) * limit, page * limit);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">My Reviews</h2>

        {paginated.length === 0 ? (
          <p className="text-gray-600">You haven't posted any reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {paginated.map(review => (
              <div key={review._id} className="border-b pb-4">
                <p className="text-yellow-500 font-semibold">Rating: {review.rating} / 5</p>
                <p className="text-gray-700 mt-1">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">Bike: {review.bike?.name || 'N/A'}</p>
                <div className="mt-2 space-x-4">
                  <button onClick={() => setSelectedReview(review)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => setConfirmDeleteId(review._id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(Math.ceil(reviews.length / limit)).keys()].map(i => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedReview && (
        <EditReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onUpdated={fetchReviews}
        />
      )}

      {confirmDeleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this review?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default MyReviews;