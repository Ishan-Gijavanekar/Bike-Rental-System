import { useState } from 'react';
import BookingsPanel from './BookinfPanel';
import ReviewsPanel from './ReviewsPanel';
import UsersPanel from './UserPanel';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          {['bookings', 'reviews', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'bookings' && <BookingsPanel />}
        {activeTab === 'reviews' && <ReviewsPanel />}
        {activeTab === 'users' && <UsersPanel />}
      </div>
    </div>
  );
};

export default Dashboard;