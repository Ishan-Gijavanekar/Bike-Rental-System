import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import api from '../services/api';

const stripePromise = loadStripe('pk_test_51QfXrlBL4mcdWmSPpUPh874MuKha1WMkPic9OCDOGdkyhdpRQ1xUOylVC6lMPbllCXgjG75kvanlPLT92w506lH600vgK');

const CheckoutForm = () => {
  const { paymentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { clientSecret, amount, bikeName } = location.state || {};

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setProcessing(true);

    if (!stripe || !elements) {
      setError('Stripe is not loaded yet.');
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card input not found.');
      setProcessing(false);
      return;
    }

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        await api.post('/payment/confirm-payment', {
          paymentId,
          status: 'paid',
        });
        setSuccess('✅ Payment successful!');
        setTimeout(() => navigate('/my-bookings'), 2000);
      } else {
        setError(`Unexpected status: ${paymentIntent.status}`);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Pay for <span className="text-blue-600">{bikeName}</span>
        </h2>
        <p className="text-gray-600">Amount: ₹{amount?.toFixed(2)}</p>
      </div>

      <div className="border border-gray-300 rounded-md p-4 bg-white">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {error && (
        <div className="text-red-600 text-sm border border-red-300 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-600 text-sm border border-green-300 bg-green-50 p-3 rounded">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-4 rounded text-white font-medium transition ${
          processing || !stripe
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
