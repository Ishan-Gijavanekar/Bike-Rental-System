import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to BikeRental. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Personal details (name, email, phone number)</li>
            <li>Booking information (bike ID, rental duration)</li>
            <li>Payment details (processed securely via third-party)</li>
            <li>Location data (for bike pickup and drop-off)</li>
            <li>Device and usage data (IP address, browser type)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>To process bookings and payments</li>
            <li>To improve user experience and service quality</li>
            <li>To send notifications and updates</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Sharing Your Information</h2>
          <p className="text-gray-700">
            We do not sell your personal data. We may share information with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Payment processors</li>
            <li>Law enforcement (if legally required)</li>
            <li>Service providers (for hosting, analytics)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
          <p className="text-gray-700">
            We use cookies to enhance your browsing experience. You can manage cookie preferences in your browser settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Access your data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Data Security</h2>
          <p className="text-gray-700">
            We implement industry-standard security measures to protect your data. However, no system is 100% secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about this Privacy Policy, please contact us at <span className="text-blue-600">support@bikerental.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;