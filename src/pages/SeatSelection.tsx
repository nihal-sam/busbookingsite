import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Seat {
  id: string;
  number: string;
  type: 'lower' | 'upper';
  status: 'available' | 'booked' | 'selected';
  price: number;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  
  // Lower Deck
  const lowerDeckLayout = [
    ['1', '2', '3', '4', '5', '6'],
    ['7', '8', '9', '10', '11', '12'],
    [], // Empty row for aisle
    ['13', '14', '15', '16', '17']
  ];

  // Upper Deck
  const upperDeckLayout = [
    ['18', '19', '20', '21', '22', '23'],
    ['24', '25', '26', '27', '28', '29']
  ];

  // Generate Lower Deck Seats
  lowerDeckLayout.forEach((row, rowIndex) => {
    row.forEach((seatNum) => {
      seats.push({
        id: `lower-${seatNum}`,
        number: seatNum,
        type: 'lower',
        status: Math.random() > 0.3 ? 'available' : 'booked',
        price: 1200
      });
    });
  });

  // Generate Upper Deck Seats
  upperDeckLayout.forEach((row, rowIndex) => {
    row.forEach((seatNum) => {
      seats.push({
        id: `upper-${seatNum}`,
        number: seatNum,
        type: 'upper',
        status: Math.random() > 0.3 ? 'available' : 'booked',
        price: 1100
      });
    });
  });

  return seats;
};

const cityBoardingPoints = {
  Chennai: [
    { id: 'bp1', name: 'Central Bus Stand', time: '20:30' },
    { id: 'bp2', name: 'Railway Station', time: '20:45' },
    { id: 'bp3', name: 'Airport Road', time: '21:00' },
    { id: 'bp4', name: 'City Center', time: '21:15' },
    { id: 'bp5', name: 'Highway Junction', time: '21:30' },
    { id: 'bp6', name: 'Metro Station', time: '21:45' }
  ],
  Salem: [
    { id: 'bp1', name: 'New Bus Stand', time: '20:00' },
    { id: 'bp2', name: 'Old Bus Stand', time: '20:15' },
    { id: 'bp3', name: 'Steel Plant', time: '20:30' },
    { id: 'bp4', name: 'Junction Road', time: '20:45' }
  ],
  // Add more cities as needed
};

const cityDroppingPoints = {
  Chennai: [
    { id: 'dp1', name: 'CMBT Chennai', time: '05:30' },
    { id: 'dp2', name: 'Koyambedu', time: '05:45' },
    { id: 'dp3', name: 'Guindy', time: '06:00' },
    { id: 'dp4', name: 'Tambaram', time: '06:15' },
    { id: 'dp5', name: 'Airport', time: '06:30' },
    { id: 'dp6', name: 'Central Station', time: '06:45' }
  ],
  Salem: [
    { id: 'dp1', name: 'Central Bus Terminal', time: '06:00' },
    { id: 'dp2', name: 'Railway Station', time: '06:15' },
    { id: 'dp3', name: 'Market Area', time: '06:30' },
    { id: 'dp4', name: 'Highway Stop', time: '06:45' }
  ],
  // Add more cities as needed
};

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [seats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [boardingPoint, setBoardingPoint] = useState('');
  const [droppingPoint, setDroppingPoint] = useState('');

  // Get the number of passengers from location state
  const maxSeats = location.state?.passengers || 6;

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      if (prev.length >= maxSeats) {
        alert(`You can only select up to ${maxSeats} seats`);
        return prev;
      }
      return [...prev, seatId];
    });
  };

  const renderSeatBlock = (type: 'lower' | 'upper', layout: string[][]) => {
    return layout.map((row, rowIndex) => (
      <div key={`${type}-row-${rowIndex}`} className="flex gap-2 mb-2">
        {row.map((seatNum) => {
          const seat = seats.find(s => s.id === `${type}-${seatNum}`);
          if (!seat) return <div key={`${type}-empty-${seatNum}`} className="w-12 h-16" />;
          
          return (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat.id)}
              disabled={seat.status === 'booked'}
              className={`
                w-12 h-16 border-2 rounded-sm flex flex-col items-center justify-center
                ${seat.status === 'booked' ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-blue-100'}
                ${selectedSeats.includes(seat.id) ? 'bg-blue-500 text-white border-blue-600' : 'border-gray-300'}
              `}
            >
              <span className="text-xs">{seat.number}</span>
              <span className="text-xs">₹{seat.price}</span>
            </button>
          );
        })}
      </div>
    ));
  };

  const handleContinue = () => {
    if (!selectedSeats.length) {
      alert('Please select at least one seat');
      return;
    }
    if (!boardingPoint) {
      alert('Please select a boarding point');
      return;
    }
    if (!droppingPoint) {
      alert('Please select a dropping point');
      return;
    }

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      alert('Please login to continue with booking');
      navigate('/login');
      return;
    }

    navigate('/checkout', {
      state: {
        selectedSeats,
        boardingPoint,
        droppingPoint,
        totalAmount: selectedSeats.reduce((total, seatId) => {
          const seat = seats.find(s => s.id === seatId);
          return total + (seat?.price || 0);
        }, 0)
      }
    });
  };

  // Get the from city from location state
  const fromCity = location.state?.from || 'Chennai';
  const boardingPoints = cityBoardingPoints[fromCity as keyof typeof cityBoardingPoints] || cityBoardingPoints.Chennai;
  const droppingPoints = cityDroppingPoints[fromCity as keyof typeof cityDroppingPoints] || cityDroppingPoints.Chennai;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
            
            {/* Lower Deck */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Lower Deck</h3>
              <div className="space-y-4">
                {renderSeatBlock('lower', [
                  ['1', '2', '3', '4', '5', '6'],
                  ['7', '8', '9', '10', '11', '12'],
                  [], // Empty row for aisle
                  ['13', '14', '15', '16', '17']
                ])}
              </div>
            </div>

            {/* Upper Deck */}
            <div>
              <h3 className="text-lg font-medium mb-4">Upper Deck</h3>
              <div className="space-y-4">
                {renderSeatBlock('upper', [
                  ['18', '19', '20', '21', '22', '23'],
                  ['24', '25', '26', '27', '28', '29']
                ])}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Boarding & Dropping Points</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Select Boarding Point</h3>
                <select
                  className="w-full border rounded-md p-2"
                  value={boardingPoint}
                  onChange={(e) => setBoardingPoint(e.target.value)}
                >
                  <option value="">Select boarding point</option>
                  {boardingPoints.map(point => (
                    <option key={point.id} value={point.id}>
                      {point.name} - {point.time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Select Dropping Point</h3>
                <select
                  className="w-full border rounded-md p-2"
                  value={droppingPoint}
                  onChange={(e) => setDroppingPoint(e.target.value)}
                >
                  <option value="">Select dropping point</option>
                  {droppingPoints.map(point => (
                    <option key={point.id} value={point.id}>
                      {point.name} - {point.time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span>Selected Seats</span>
                <span>{selectedSeats.length}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Fare</span>
                <span>₹{selectedSeats.reduce((total, seatId) => {
                  const seat = seats.find(s => s.id === seatId);
                  return total + (seat?.price || 0);
                }, 0)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total Amount</span>
                <span>₹{selectedSeats.reduce((total, seatId) => {
                  const seat = seats.find(s => s.id === seatId);
                  return total + (seat?.price || 0);
                }, 0)}</span>
              </div>
              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;