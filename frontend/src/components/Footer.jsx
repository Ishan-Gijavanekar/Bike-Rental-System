import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} BikeRental. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</a>
          <a href="/terms-and-condition" className="hover:text-blue-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;