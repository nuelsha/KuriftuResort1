import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Menu, Search, Calendar, Wifi, Coffee, Tv, Bath } from 'lucide-react';
import ReservationModal from '../components/ReservationModal';
import SuccessModal from '../components/SuccessModal';

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  available: boolean;
}

export default function RoomAvailability() {
  const { resortId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [selectedDates, setSelectedDates] = useState(
    searchParams.get('dates') || '04/11/2025 - 04/17/2025'
  );
  const [showNoRooms, setShowNoRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const rooms: Room[] = [
    {
      id: 'lake-view-suite',
      name: 'Lake View Suite',
      description: 'Luxurious suite overlooking the serene lake with a private balcony, perfect for romantic getaways or peaceful retreats.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2070',
      amenities: ['Lake View', 'Private Balcony', 'King Size Bed', 'Premium WiFi'],
      available: true
    },
    {
      id: 'garden-villa',
      name: 'Garden Villa',
      description: 'Spacious villa surrounded by lush gardens, featuring traditional Ethiopian architecture with modern amenities.',
      price: 350,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2070',
      amenities: ['Private Garden', 'Living Room', 'Mini Bar', 'Outdoor Shower'],
      available: true
    },
    {
      id: 'presidential-suite',
      name: 'Presidential Suite',
      description: 'Our most exclusive accommodation with panoramic views, butler service, and the ultimate luxury experience.',
      price: 500,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070',
      amenities: ['Butler Service', 'Private Pool', 'Dining Room', 'Spa Bath'],
      available: true
    }
  ];

  const handleCheckAvailability = () => {
    setShowNoRooms(false);
  };

  const handleReserveClick = (room: Room) => {
    setSelectedRoom(room);
    setShowReservationModal(true);
  };

  const handleConfirmReservation = () => {
    setShowReservationModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Navigation */}
      <nav className="bg-white px-6 py-4 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center">
            <img src="/logo.png" alt="Kuriftu Resorts" className="h-12" />
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="w-full h-[300px] relative">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"
          alt="Resort Room"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Date Selection */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-light mb-4">Select Date</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={selectedDates}
                onChange={(e) => setSelectedDates(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <button
              onClick={handleCheckAvailability}
              className="bg-[#1a1a1a] text-white px-6 py-2 rounded-lg hover:bg-black transition"
            >
              Check Availability
            </button>
          </div>
        </div>

        {/* Available Rooms */}
        {!showNoRooms && (
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-light">Available Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{room.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.map((amenity, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-semibold">${room.price}</p>
                        <p className="text-sm text-gray-500">per night</p>
                      </div>
                      <button
                        onClick={() => handleReserveClick(room)}
                        className="bg-[#1a1a1a] text-white px-6 py-2 rounded-lg hover:bg-black transition"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Rooms Available Message */}
        {showNoRooms && (
          <div className="mt-8 text-center">
            <div className="inline-block p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 text-[#CD7F32]">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h10v2H7v-2zm2-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
              </div>
              <h3 className="text-2xl text-gray-600 mb-2">No Room available</h3>
              <p className="text-gray-500">Please Select Different Dates and Try Again</p>
            </div>
          </div>
        )}
      </div>

      {/* Reservation Modal */}
      {selectedRoom && (
        <ReservationModal
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          onConfirm={handleConfirmReservation}
          roomName={selectedRoom.name}
          price={selectedRoom.price}
        />
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}