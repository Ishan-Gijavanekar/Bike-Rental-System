import { useEffect, useState } from 'react';
import api from '../services/api';

const ReviewsPanel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await api.get('/reviews/get-all-reviews');
      setReviews(data.reviews);
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r._id} className="bg-gray-50 p-4 rounded shadow">
            <p className="text-yellow-500 font-semibold">Rating: {r.rating} / 5</p>
            <p className="text-gray-700">{r.comment}</p>
            <p className="text-sm text-gray-500">Bike: {r.bike?.name || 'N/A'}</p>
            <p className="text-sm text-gray-500">User: {r.user?.name || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPanel;