import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  seats: string[];
  amount: number;
  status: 'confirmed' | 'cancelled';
}

const Bookings = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/bookings' } });
    }
  }, [isLoggedIn, navigate]);

  // Get bookings from localStorage
  const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');

  if (!isLoggedIn) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Recent Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {booking.from} → {booking.to}
                  </h3>
                  <p className="text-gray-600">{booking.date}</p>
                  <p className="text-gray-600">Seats: {booking.seats.join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">₹{booking.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;