import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const CustomerCare = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Customer Care</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Call Us</h2>
          </div>
          <p className="text-gray-600 mb-2">24/7 Support Available</p>
          <p className="text-lg font-medium">1800-123-4567</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Email Support</h2>
          </div>
          <p className="text-gray-600 mb-2">Response within 24 hours</p>
          <p className="text-lg font-medium">support@flixerbux.com</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Live Chat</h2>
          </div>
          <p className="text-gray-600 mb-2">Available 9 AM - 9 PM</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Start Chat
          </button>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "How can I cancel my booking?",
              a: "You can cancel your booking up to 6 hours before departure through the Recent Bookings section."
            },
            {
              q: "What is the refund policy?",
              a: "Refunds are processed within 5-7 working days, with cancellation charges based on how early you cancel."
            },
            {
              q: "Can I modify my booking?",
              a: "Yes, you can modify your travel date or passenger details up to 12 hours before departure."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;