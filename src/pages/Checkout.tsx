import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PassengerDetails {
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    name: '',
    age: '',
    gender: 'male',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passengerDetails.name || !passengerDetails.age || !passengerDetails.phone) {
      alert('Please fill in all passenger details');
      return;
    }

    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Create new booking
    const newBooking = {
      id: Date.now().toString(),
      from: location.state?.from || 'Chennai',
      to: location.state?.to || 'Salem',
      date: location.state?.date || new Date().toLocaleDateString(),
      seats: location.state?.selectedSeats || [],
      boardingPoint: location.state?.boardingPoint,
      droppingPoint: location.state?.droppingPoint,
      amount: location.state?.totalAmount || 0,
      status: 'confirmed',
      passengerDetails
    };
    
    // Add new booking to start of array
    localStorage.setItem('bookings', JSON.stringify([newBooking, ...existingBookings]));

    // Show success message and redirect
    alert('Booking confirmed successfully!');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Passenger Details Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={passengerDetails.name}
                onChange={(e) => setPassengerDetails({ ...passengerDetails, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                min="1"
                max="120"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={passengerDetails.age}
                onChange={(e) => setPassengerDetails({ ...passengerDetails, age: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={passengerDetails.gender}
                onChange={(e) => setPassengerDetails({ ...passengerDetails, gender: e.target.value as 'male' | 'female' | 'other' })}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={passengerDetails.phone}
                onChange={(e) => setPassengerDetails({ ...passengerDetails, phone: e.target.value })}
                required
              />
            </div>
          </form>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Bus Type</span>
              <span className="font-medium">AC Sleeper</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Seat Numbers</span>
              <span className="font-medium">{location.state?.selectedSeats?.join(', ') || 'L-12'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Boarding Point</span>
              <span className="font-medium">{location.state?.boardingPoint || 'Central Bus Stand'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Dropping Point</span>
              <span className="font-medium">{location.state?.droppingPoint || 'CMBT Chennai'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-medium">₹{location.state?.totalAmount || 850}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Tax & Fees</span>
              <span className="font-medium">₹{Math.round((location.state?.totalAmount || 850) * 0.18)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{(location.state?.totalAmount || 850) + Math.round((location.state?.totalAmount || 850) * 0.18)}</span>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;