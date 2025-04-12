// Import React and React Router hooks
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

// Import icons from lucide-react
import {
  Menu,
  Search,
  Calendar,
  Wifi,
  Coffee,
  Tv,
  Bath,
  X,
} from "lucide-react";

// Import modal components
import ReservationModal from "../components/ReservationModal";
import SuccessModal from "../components/SuccessModal";

// Import firebase Firestore functions
import { getFirestore, collection, addDoc } from "firebase/firestore";
// Import your Firebase app from your firebase config file.
// For example, if your firebase config is in ../lib/firebaseConfig.js:
import app from "../lib/firebaseConfig";

const db = getFirestore(app);

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
    searchParams.get("dates") || "04/11/2025 - 04/17/2025"
  );
  const [showNoRooms, setShowNoRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // New states for check-in and check-out times.
  const [checkInTime, setCheckInTime] = useState("14:00");
  const [checkOutTime, setCheckOutTime] = useState("11:00");

  // New state to control the feedback popup.
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  // Convert the rooms array into state so that we can update each room's availability.
  const [roomsData, setRoomsData] = useState<Room[]>([
    {
      id: "lake-view-suite",
      name: "Ethiopia",
      description:
        "Luxurious suite overlooking the serene lake with a private balcony, perfect for romantic getaways or peaceful retreats.",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2070",
      amenities: [
        "Lake View",
        "Private Balcony",
        "King Size Bed",
        "Premium WiFi",
      ],
      available: true,
    },
    {
      id: "garden-villa",
      name: "Djibuti",
      description:
        "Spacious villa surrounded by lush gardens, featuring traditional Ethiopian architecture with modern amenities.",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2070",
      amenities: [
        "Private Garden",
        "Living Room",
        "Mini Bar",
        "Outdoor Shower",
      ],
      available: true,
    },
    {
      id: "presidential-suite",
      name: "Eritrea",
      description:
        "Our most exclusive accommodation with panoramic views, butler service, and the ultimate luxury experience.",
      price: 500,
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070",
      amenities: ["Butler Service", "Private Pool", "Dining Room", "Spa Bath"],
      available: true,
    },
  ]);

  const handleCheckAvailability = () => {
    setShowNoRooms(false);
  };

  const handleReserveClick = (room: Room) => {
    setSelectedRoom(room);
    setShowReservationModal(true);
  };

  const handleConfirmReservation = () => {
    if (selectedRoom) {
      // Update the room's availability status in the state
      const updatedRooms = roomsData.map((room) =>
        room.id === selectedRoom.id ? { ...room, available: false } : room
      );
      setRoomsData(updatedRooms);
      // Close the reservation modal and show the success modal
      setShowReservationModal(false);
      setShowSuccessModal(true);

      // After confirming, simulate a random delay (3 to 6 seconds) then show the feedback popup.
      const randomDelay = Math.floor(Math.random() * 3000) + 3000;
      setTimeout(() => {
        setShowFeedbackPopup(true);
      }, randomDelay);
    }
  };

  // Feedback popup component.
  const FeedbackPopup = () => {
    const feedbackOptions = [
      "Food",
      "Pool",
      "Waterpark",
      "Customer Service",
      "Other",
    ];
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [suggestionText, setSuggestionText] = useState("");
    const [showPopup, setShowPopup] = useState(true);

    const handleFeedback = (option: string) => {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    };

    const handleSubmitFeedback = async () => {
      try {
        const docRef = await addDoc(collection(db, "feedbacks"), {
          options: selectedOptions,
          suggestion: suggestionText,
          timestamp: new Date(),
        });
        console.log("Feedback submitted with ID:", docRef.id);
        setShowFeedbackPopup(false);
      } catch (error) {
        console.error("Error adding feedback:", error);
        // Show error message to user
        alert(
          "Unable to submit feedback. Please try again later or contact support."
        );
        setShowFeedbackPopup(false);
      }
    };

    if (!showPopup) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-center text-[#1a1a1a]">
              😊 We hope you're enjoying your stay!
            </h3>
            <button
              onClick={() => setShowFeedbackPopup(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4 text-center">
            What did you enjoy the most? (Select multiple if you like!)
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {feedbackOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleFeedback(option)}
                className={`py-2 rounded transition ${
                  selectedOptions.includes(option)
                    ? "bg-green-600 text-white"
                    : "bg-[#1a1a1a] text-white hover:bg-black"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              💬 Any comments, suggestions or thoughts?
            </label>
            <textarea
              placeholder="We'd love to hear your feedback!"
              className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
              rows={3}
              value={suggestionText}
              onChange={(e) => setSuggestionText(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmitFeedback}
              className="flex-1 bg-[#1a1a1a] text-white py-2 rounded hover:bg-black transition"
            >
              Submit Feedback 🙌
            </button>
            <button
              onClick={() => setShowFeedbackPopup(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
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
            <img src="https://kurifturesorts.com/_nuxt/img/logo.9415905.svg" alt="Kuriftu Resorts" className="h-12" />
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

      {/* Date and Time Selection */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-light mb-4">Select Date & Time</h2>
          <div className="flex gap-4 mb-4">
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
          {/* New Check-in and Checkout Time Fields */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Check-in Time</label>
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Check-out Time</label>
              <input
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Available Rooms */}
        {!showNoRooms && (
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-light">Available Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roomsData.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{room.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {room.description}
                    </p>

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
                        disabled={!room.available}
                        className={`px-6 py-2 rounded-lg transition text-white ${
                          room.available
                            ? "bg-[#1a1a1a] hover:bg-black"
                            : "bg-green-600 cursor-not-allowed"
                        }`}
                      >
                        {room.available ? "Reserve" : "Reserved by You"}
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
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h10v2H7v-2zm2-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
              </div>
              <h3 className="text-2xl text-gray-600 mb-2">No Room available</h3>
              <p className="text-gray-500">
                Please Select Different Dates and Try Again
              </p>
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

      {/* Feedback Popup Modal */}
      {showFeedbackPopup && <FeedbackPopup />}
    </div>
  );
}
