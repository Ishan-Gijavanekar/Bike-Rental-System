import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Terms and Conditions</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing or using BikeRental, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <p className="text-gray-700">
            You must be at least 18 years old and possess a valid government-issued ID to rent a bike. You are responsible for ensuring that you meet all legal requirements.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Rental Terms</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Rental duration and fees are clearly stated during booking.</li>
            <li>Bikes must be returned in good condition at the designated location.</li>
            <li>Late returns may incur additional charges.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Use the bike safely and responsibly.</li>
            <li>Do not engage in illegal activities while using the bike.</li>
            <li>Report any damage or theft immediately.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Payment & Refunds</h2>
          <p className="text-gray-700">
            All payments are processed securely. Refunds are subject to our cancellation policy and may be issued at our discretion.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
          <p className="text-gray-700">
            BikeRental is not liable for any injuries, damages, or losses incurred during the rental period. Users assume full responsibility for their actions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your access to our services at any time for violations of these terms or misuse of our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms and Conditions from time to time. Continued use of the service after changes implies acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p className="text-gray-700">
            For questions or concerns regarding these Terms and Conditions, please contact us at <span className="text-blue-600">support@bikerental.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;