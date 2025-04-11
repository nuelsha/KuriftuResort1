import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import ReviewModal from '../components/ReviewModal';

export default function ResortSelection() {
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedResort, setSelectedResort] = useState('');

  const resorts = [
    {
      id: 'awash',
      name: 'Kuriftu Resort & Spa Awash Falls',
      location: 'Awash, Ethiopia',
      price: 250,
      image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80&w=2070',
      available: false
    },
    {
      id: 'bishoftu',
      name: 'Kuriftu Resort & Spa Bishoftu',
      location: 'Bishoftu, Ethiopia',
      price: 173,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070',
      available: true
    },
    {
      id: 'entoto',
      name: 'Kuriftu Resort & Spa Entoto',
      location: 'Addis Ababa, Ethiopia',
      price: 135,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2070',
      available: true
    }
  ];

  const openReviewModal = (resortName: string) => {
    setSelectedResort(resortName);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-light mb-12">Select a Resort</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort) => (
            <div key={resort.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img 
                src={resort.image} 
                alt={resort.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">{resort.name}</h3>
                <p className="text-gray-600 mb-4">{resort.location}</p>
                
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-sm text-gray-500">From ${resort.price}</p>
                    <p className="text-xs text-gray-400">Per Night</p>
                    <p className="text-xs text-gray-400">Including Taxes & Fees</p>
                  </div>
                  <button 
                    onClick={() => openReviewModal(resort.name)}
                    className="text-sm text-[#1a1a1a] hover:underline"
                  >
                    View Reviews
                  </button>
                </div>

                <button
                  onClick={() => resort.available && navigate(`/rooms/${resort.id}`)}
                  className={`w-full py-2 rounded-lg text-center ${
                    resort.available 
                      ? 'bg-[#1a1a1a] text-white hover:bg-black' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {resort.available ? 'View Rooms' : 'Unavailable Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        resortName={selectedResort}
      />
    </div>
  );
}