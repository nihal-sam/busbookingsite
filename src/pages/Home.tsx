import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Search, MapPin, Calendar, Users, Star, Shield, Clock, Award, Bus, Phone, Mail, ChevronDown } from 'lucide-react';

const cities = {
  fromCities: [
    'Chennai', 'Salem', 'Madurai', 'Coimbatore', 'Trichy', 
    'Tirunelveli', 'Vellore', 'Thanjavur', 'Erode', 'Theni'
  ],
  toCities: {
    Chennai: ['Salem', 'Madurai', 'Coimbatore', 'Trichy', 'Tirunelveli', 'Vellore', 'Thanjavur', 'Erode', 'Theni'],
    Salem: ['Chennai'],
    Madurai: ['Chennai'],
    Coimbatore: ['Chennai'],
    Trichy: ['Chennai'],
    Tirunelveli: ['Chennai'],
    Vellore: ['Chennai'],
    Thanjavur: ['Chennai'],
    Erode: ['Chennai'],
    Theni: ['Chennai']
  }
};

const popularRoutes = [
  { from: 'Chennai', to: 'Madurai', frequency: '50+ buses daily', price: 'from ₹800', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop' },
  { from: 'Chennai', to: 'Coimbatore', frequency: '40+ buses daily', price: 'from ₹750', image: 'https://i.ibb.co/tM3sWSvT/route.jpg" alt="route ' },
  { from: 'Chennai', to: 'Salem', frequency: '35+ buses daily', price: 'from ₹500', image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1972&auto=format&fit=crop' },
  { from: 'Chennai', to: 'Trichy', frequency: '45+ buses daily', price: 'from ₹600', image: 'https://i.ibb.co/Vs04LkT/tricrou.jpg" alt="tricrou' }
];

const popularCities = [
  {
    name: 'Chennai',
    description: 'Gateway of South India',
    image: 'https://i.ibb.co/m5FkGCYj/chennai.jpg'
  },
  {
    name: 'Madurai',
    description: 'Temple City',
    image: 'https://i.ibb.co/bMb5Y6jw/Madurai-India.jpg'
  },
  {
    name: 'Coimbatore',
    description: 'Manchester of South India',
    image: 'https://i.ibb.co/W4w2KrbF/covai.jpg" alt="covai'
  },
  {
    name: 'Salem',
    description: 'Steel City',
    image: 'https://i.ibb.co/4n7JLwyf/salemcity.webp'
  }
]


const operators = [
  { name: 'KPN Travels', rating: '4.5★', routes: '100+', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop' },
  { name: 'TAT Express', rating: '4.3★', routes: '80+', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop' },
  { name: 'KRS Travels', rating: '4.2★', routes: '75+', image: 'https://i.ibb.co/nNC2PzJL/krstravel.jpg' },
  { name: 'SRT Travels', rating: '4.4★', routes: '90+', image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=1970&auto=format&fit=crop' }
];

const faqs = [
  {
    question: 'How do I book a bus ticket?',
    answer: 'Select your source, destination, date of journey, and number of passengers. Choose from available buses and select your preferred seats. Complete the payment to confirm your booking.'
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Cancellation charges vary based on how early you cancel. Generally, cancellations made 24 hours before departure get a full refund minus a small processing fee.'
  },
  {
    question: 'Can I modify my booking?',
    answer: 'Yes, you can modify your travel date or passenger details up to 6 hours before departure through the Recent Bookings section.'
  },
  {
    question: 'How many seats can I book at once?',
    answer: 'You can book up to 6 seats in a single booking. For group bookings of more than 6 seats, please contact our customer care.'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleFromChange = (selectedFrom: string) => {
    setFrom(selectedFrom);
    setTo('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/search', state: { from, to, date, passengers } } });
      return;
    }
    navigate('/search', { 
      state: { from, to, date, passengers }
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="min-h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop")',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Book Smart, Travel Smarter
            </h1>
            <p className="text-xl text-gray-200">
              Find and book the perfect bus journey across Tamil Nadu
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      value={from}
                      onChange={(e) => handleFromChange(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select city</option>
                      {cities.fromCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={!from}
                    >
                      <option value="">Select city</option>
                      {from && cities.toCities[from as keyof typeof cities.toCities]?.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Journey
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <DatePicker
                      selected={date}
                      onChange={(date: Date) => setDate(date)}
                      minDate={new Date()}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Find Buses Now</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Star className="h-8 w-8 text-yellow-500" />, title: 'Best Prices', desc: 'Guaranteed lowest fares' },
              { icon: <Shield className="h-8 w-8 text-green-500" />, title: 'Secure Booking', desc: 'Safe payment options' },
              { icon: <Clock className="h-8 w-8 text-blue-500" />, title: '24/7 Support', desc: 'Round-the-clock assistance' },
              { icon: <Award className="h-8 w-8 text-purple-500" />, title: 'Verified Operators', desc: 'Quality checked partners' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Bus Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 relative">
                  <img 
                    src={route.image} 
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{route.from} → {route.to}</h3>
                  <p className="text-gray-600">{route.frequency}</p>
                  <p className="text-blue-600 font-medium mt-2">{route.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Cities Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCities.map((city, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 relative">
                  <img 
                    src={city.image} 
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{city.name}</h3>
                    <p className="text-sm">{city.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bus Operators Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Bus Operators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operators.map((operator, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 relative">
                  <img 
                    src={operator.image} 
                    alt={operator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{operator.name}</h3>
                  <p className="text-gray-600">Rating: {operator.rating}</p>
                  <p className="text-gray-600">Routes: {operator.routes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About FlixerBux</h3>
              <p className="text-gray-400">
                FlixerBux is Tamil Nadu's leading online bus ticket booking platform,
                connecting thousands of travelers with the best bus operators across the state.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about-us" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/terms-conditions" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/customer-care" className="text-gray-400 hover:text-white">Customer Care</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Chennai to Madurai</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Chennai to Coimbatore</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Chennai to Salem</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Chennai to Trichy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  1800-123-4567
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  support@flixerbux.com
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 FlixerBux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;