import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const BikeDetails = () => {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const { data } = await api.get(`/bikes/get-bike-by-id/${bikeId}`);
        setBike(data.bike);
      } catch (err) {
        setMessage('Failed to load bike details');
      }
    };
    fetchBike();
  }, [bikeId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/get-review-of-bike/${bikeId}`);
        setReviews(data.reviews);
      } catch (err) {
        console.log('Failed to fetch reviews');
      }
    };
    fetchReviews();
  }, [bikeId]);

  useEffect(() => {
    if (startTime && endTime && bike) {
      const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
      setTotalPrice(duration > 0 ? duration * bike.pricePerHour : 0);
    }
  }, [startTime, endTime, bike]);

  const handleBooking = async () => {
    if (!startTime || !endTime) {
      setMessage('Please select both start and end time');
      return;
    }

    try {
      const { data } = await api.post('/bookings/new-booking', {
        bikeId,
        startTime,
        endTime
      });
      setMessage(data.message);
      setShowReviewModal(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  const handleReviewSubmit = async () => {
    if (!rating || !comment) {
      setReviewMessage('Please provide both rating and comment');
      return;
    }

    try {
      const { data } = await api.post('/reviews/post-review', {
        bikeId,
        rating,
        comment
      });
      setReviewMessage(data.message);
      setTimeout(() => {
        setShowReviewModal(false);
        navigate('/my-bookings');
      }, 1500);
    } catch (err) {
      setReviewMessage(err.response?.data?.message || 'Review submission failed');
    }
  };

  if (!bike) {
    return <div className="text-center py-20 text-gray-600">Loading bike details...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <img src={bike.imageUrl} alt={bike.name} className="w-full h-64 object-cover rounded" />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{bike.name}</h2>
          <p className="text-gray-600">{bike.brand}</p>
          <p className="text-gray-700 font-medium mt-2">₹{bike.pricePerHour}/hr</p>
          <p className="text-sm text-gray-500 mt-1">
            {bike.location?.address}, {bike.location?.city} - {bike.location?.pincode}
          </p>
          <p className="mt-2 text-sm text-green-600">
            {bike.available ? 'Available for booking' : 'Currently unavailable'}
          </p>

          {/* Booking Form */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Book this bike</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="input-field"
              />
              <input
                type="datetime-local"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="input-field"
              />
            </div>
            {totalPrice > 0 && (
              <p className="mt-4 text-blue-600 font-semibold">
                Estimated Price: ₹{totalPrice.toFixed(2)}
              </p>
            )}
            <button
              onClick={handleBooking}
              disabled={!bike.available}
              className={`mt-4 w-full py-2 rounded text-white ${
                bike.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              } transition`}
            >
              Confirm Booking
            </button>
            {message && <p className="mt-4 text-red-600 text-sm">{message}</p>}
          </div>

          {/* Reviews Section */}
          <div className="mt-10 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">User Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet for this bike.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-4">
                    <p className="text-yellow-500 font-semibold">Rating: {review.rating} / 5</p>
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Posted on {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Rate Your Experience</h3>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={e => setRating(e.target.value)}
              placeholder="Rating (1-5)"
              className="input-field mb-3"
            />
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your review..."
              className="input-field mb-3"
              rows={4}
            />
            <div className="flex justify-between">
              <button
                onClick={handleReviewSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Skip
              </button>
            </div>
            {reviewMessage && <p className="mt-4 text-sm text-green-600">{reviewMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeDetails;