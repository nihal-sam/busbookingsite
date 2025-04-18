import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Wifi, Power, Coffee, BatteryCharging } from 'lucide-react';

interface BusRoute {
  id: string;
  operator: string;
  type: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  rating: number;
  amenities: string[];
  seatsAvailable: number;
}

const busRoutes: BusRoute[] = [
  {
    id: 'bus1',
    operator: 'Royal Travels',
    type: 'AC Sleeper',
    departure: '21:00',
    arrival: '06:00',
    duration: '9h',
    price: 1200,
    rating: 4.5,
    amenities: ['wifi', 'charging', 'food'],
    seatsAvailable: 12
  },
  {
    id: 'bus2',
    operator: 'Green Line',
    type: 'AC Seater',
    departure: '22:30',
    arrival: '07:30',
    duration: '9h',
    price: 800,
    rating: 4.2,
    amenities: ['wifi', 'charging'],
    seatsAvailable: 18
  },
  {
    id: 'bus3',
    operator: 'Express Riders',
    type: 'Non-AC Sleeper',
    departure: '20:00',
    arrival: '05:30',
    duration: '9.5h',
    price: 600,
    rating: 4.0,
    amenities: ['charging'],
    seatsAvailable: 15
  }
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-4 w-4 text-gray-600" />;
      case 'charging':
        return <BatteryCharging className="h-4 w-4 text-gray-600" />;
      case 'food':
        return <Coffee className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{from} → {to}</h2>
            <p className="text-gray-600">{date}</p>
          </div>
          <div className="flex gap-4">
            <select className="border rounded-md px-3 py-1">
              <option>Sort by Price</option>
              <option>Sort by Duration</option>
              <option>Sort by Rating</option>
            </select>
            <select className="border rounded-md px-3 py-1">
              <option>All Types</option>
              <option>AC</option>
              <option>Non-AC</option>
              <option>Sleeper</option>
              <option>Seater</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {busRoutes.map((bus) => (
          <div key={bus.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{bus.operator}</h3>
                <p className="text-gray-600">{bus.type}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{bus.price}</p>
                <p className="text-green-600">{bus.seatsAvailable} seats left</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-lg font-semibold">{bus.departure}</p>
                  <p className="text-gray-600">{from}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-20 h-0.5 bg-gray-300"></div>
                  <Clock className="h-5 w-5 text-gray-500 mx-2" />
                  <span className="text-sm text-gray-600">{bus.duration}</span>
                  <div className="w-20 h-0.5 bg-gray-300"></div>
                </div>
                <div>
                  <p className="text-lg font-semibold">{bus.arrival}</p>
                  <p className="text-gray-600">{to}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/select-seats/${bus.id}`)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Select Seats
              </button>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{bus.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                {bus.amenities.map((amenity, index) => (
                  <div key={index} className="tooltip" title={amenity}>
                    {getAmenityIcon(amenity)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;