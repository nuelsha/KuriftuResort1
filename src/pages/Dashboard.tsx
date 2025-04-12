import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bird,
  Settings,
  CreditCard,
  Star,
  Calendar,
  LogOut,
  User as UserIcon,
  Sun,
  Cloud,
  Phone,
  BellRing,
  Brush,
  DoorOpen,
  MapPin,
  Camera,
  Clock,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Heart,
  Thermometer,
  Mic,
  Upload,
  Trophy,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

// Define location data interface
interface WeatherData {
  temp: number;
  condition: string;
}

interface LocationsData {
  [key: string]: WeatherData;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [weather, setWeather] = useState({ temp: 23, condition: "Sunny" });
  const [suggestion, setSuggestion] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("Bishoftu");
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Check if user is logged in, if not redirect to login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Mock data for the dashboard - in a real app this would come from APIs
  const guestData = {
    name: user?.user_metadata?.full_name || "Guest",
    loyaltyPoints: 150,
    room: "105",
    roomType: "Ethiopia-Kenya Villa",
    checkIn: "Nov 10, 2023",
    checkOut: "Nov 15, 2023",
    loyaltyTier: "Gold",
    stamps: 7,
    feedbackSent: 4,
    activitiesDone: 7,
  };

  const suggestions = [
    { title: "Relaxing Spa at 4 PM?", icon: Heart, color: "bg-pink-100" },
    { title: "Sunset Kayaking", icon: Sun, color: "bg-orange-100" },
    {
      title: "Live Cultural Music Tonight",
      icon: MessageCircle,
      color: "bg-purple-100",
    },
    { title: "Breakfast by the Lake", icon: Cloud, color: "bg-blue-100" },
  ];

  const offers = [
    {
      title: "Family Movie Night",
      discount: "30% off popcorn 🍿",
      expires: "Today",
    },
    { title: "VIP Pool Access Unlocked", icon: "🌊", expires: "48 hours" },
    {
      title: "Spa Package",
      discount: "Buy 1 Get 1 Free",
      expires: "This stay",
    },
  ];

  const resortAreas = [
    {
      name: "Dining",
      photo:
        "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800",
    },
    {
      name: "Spa",
      photo: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    },
    {
      name: "Kids Club",
      photo:
        "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?w=800",
    },
    {
      name: "Waterpark",
      photo:
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
    },
    {
      name: "Events",
      photo:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    },
  ];

  const handleNextSuggestion = () => {
    setSuggestion((prev) => (prev + 1) % suggestions.length);
  };

  const handlePrevSuggestion = () => {
    setSuggestion(
      (prev) => (prev - 1 + suggestions.length) % suggestions.length
    );
  };

  const handleVoiceCommand = () => {
    setIsRecording(true);
    // In a real implementation, this would activate speech recognition
    setTimeout(() => {
      setIsRecording(false);
      // Mock displaying a result
      alert("Voice command recognized: 'Show me activities for kids'");
    }, 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleFeedback = (emoji: string) => {
    setFeedback(emoji);
    setTimeout(() => {
      setFeedback(null);
      alert("Thank you for your feedback!");
    }, 1500);
  };

  // Simulating weather update
  useEffect(() => {
    const locations: LocationsData = {
      Bishoftu: { temp: 23, condition: "Sunny" },
      "Lake Tana": { temp: 21, condition: "Partly Cloudy" },
      Entoto: { temp: 19, condition: "Cool" },
    };

    setWeather(locations[currentLocation]);
  }, [currentLocation]);

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Header/Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <Bird className="h-8 w-8 text-[#1a1a1a]" />
                <span className="ml-2 text-xl font-semibold">
                  KURIFTU RESORTS
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language selector would go here */}
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {t("signOut")}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-gray-800 rounded-xl text-white p-6 mb-6 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-light">
                {`Welcome back, ${guestData.name}!`}
              </h1>
              <p className="text-gray-300 mt-1">
                Ready for another unforgettable stay?
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="flex items-center mr-6">
                <MapPin className="h-5 w-5 mr-1 text-gray-300" />
                <span className="text-sm">{`Kuriftu ${currentLocation}`}</span>
              </div>
              <div className="flex items-center">
                {weather.condition === "Sunny" ? (
                  <Sun className="h-5 w-5 mr-1 text-yellow-300" />
                ) : (
                  <Cloud className="h-5 w-5 mr-1 text-gray-300" />
                )}
                <span className="text-sm">{`${weather.temp}°C | ${weather.condition}`}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/10 rounded-lg inline-block">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-300 mr-2" />
              <span>{`Kuriftu Stars: ${guestData.loyaltyPoints} 🌟 – 1 free spa awaits!`}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Stay Info & Quick Actions */}
          <div className="space-y-6">
            {/* Stay Snapshot */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#1a1a1a]" />
                Your Stay
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Room</span>
                  <span className="font-medium">{`${guestData.room} – ${guestData.roomType}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">{guestData.checkIn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">{guestData.checkOut}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    Remember check-out time is 11:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <DoorOpen className="h-6 w-6 text-[#1a1a1a] mb-2" />
                  <span className="text-sm text-center">Room Services</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <Brush className="h-6 w-6 text-[#1a1a1a] mb-2" />
                  <span className="text-sm text-center">Request Cleaning</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <Phone className="h-6 w-6 text-[#1a1a1a] mb-2" />
                  <span className="text-sm text-center">Call Front Desk</span>
                </button>
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Feedback
              </h2>
              <p className="text-gray-600 mb-4">How's your stay so far?</p>
              <div className="flex justify-center space-x-6 mb-4">
                <button
                  onClick={() => handleFeedback("great")}
                  className={`text-3xl transition transform hover:scale-110 ${
                    feedback === "great" ? "scale-125" : ""
                  }`}
                >
                  😍
                </button>
                <button
                  onClick={() => handleFeedback("okay")}
                  className={`text-3xl transition transform hover:scale-110 ${
                    feedback === "okay" ? "scale-125" : ""
                  }`}
                >
                  😐
                </button>
                <button
                  onClick={() => handleFeedback("poor")}
                  className={`text-3xl transition transform hover:scale-110 ${
                    feedback === "poor" ? "scale-125" : ""
                  }`}
                >
                  😞
                </button>
              </div>
              <button className="w-full py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-black transition flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Give Detailed Feedback
              </button>
            </div>
          </div>

          {/* Column 2: Smart Suggestions & Offers */}
          <div className="space-y-6">
            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-[#1a1a1a]" />
                Personalized For You
              </h2>
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className={`flex transition-all duration-500 transform`}
                    style={{ transform: `translateX(-${suggestion * 100}%)` }}
                  >
                    {suggestions.map((item, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div
                          className={`${item.color} p-4 rounded-lg flex items-center`}
                        >
                          <item.icon className="h-8 w-8 text-gray-700 mr-3" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handlePrevSuggestion}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-3 bg-white rounded-full p-1 shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextSuggestion}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-3 bg-white rounded-full p-1 shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center">
                <button
                  onClick={handleVoiceCommand}
                  className={`flex items-center justify-center px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition ${
                    isRecording ? "animate-pulse bg-red-100" : ""
                  }`}
                >
                  <Mic
                    className={`h-5 w-5 mr-2 ${
                      isRecording ? "text-red-500" : "text-gray-700"
                    }`}
                  />
                  <span>
                    {isRecording
                      ? "Listening..."
                      : "Hey Kuriftu, what can I do today?"}
                  </span>
                </button>
              </div>
            </div>

            {/* Exclusive Offers */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Exclusive Guest Offers
              </h2>
              <div className="space-y-4">
                {offers.map((offer, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-lg"
                  >
                    <h3 className="font-medium text-lg">{offer.title}</h3>
                    <p className="text-pink-600 font-medium">
                      {offer.discount}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        Expires: {offer.expires}
                      </span>
                      <button className="text-[#1a1a1a] hover:text-black font-medium text-sm flex items-center">
                        Redeem <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-[#1a1a1a]" />
                My Experience Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#1a1a1a]">
                    {guestData.stamps}
                  </div>
                  <div className="text-gray-500 text-sm">Stamps Collected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#1a1a1a]">
                    {guestData.loyaltyTier}
                  </div>
                  <div className="text-gray-500 text-sm">Loyalty Tier</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#1a1a1a]">
                    {guestData.feedbackSent}
                  </div>
                  <div className="text-gray-500 text-sm">Feedback Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#1a1a1a]">
                    {guestData.activitiesDone}
                  </div>
                  <div className="text-gray-500 text-sm">Activities Done</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Resort Exploration & Photo Memories */}
          <div className="space-y-6">
            {/* Interactive Resort Map */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#1a1a1a]" />
                Explore Kuriftu
              </h2>
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8cmVzb3J0fHx8fHx8MTcwMDY2NTYwNQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=400"
                  alt="Resort Map"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {resortAreas.map((area, index) => (
                  <button
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 p-2 rounded-md flex flex-col items-center justify-center transition"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
                      <img
                        src={area.photo}
                        alt={area.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium">{area.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Memories */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-[#1a1a1a]" />
                Photo Memories
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500 text-center">
                  Share your moment with us
                </p>
                <button className="mt-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-md hover:bg-black transition">
                  Upload Photo
                </button>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                Previous Memories
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-100 rounded-md overflow-hidden"
                    >
                      {i < 3 && (
                        <img
                          src={`https://images.unsplash.com/photo-${
                            1570000000000 + i * 100
                          }?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&w=100&q=80`}
                          alt={`Memory ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Weather & Activities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Sun className="h-5 w-5 mr-2 text-[#1a1a1a]" />
                Today's Weather
              </h2>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  {weather.condition === "Sunny" ? (
                    <Sun className="h-10 w-10 text-yellow-500 mr-4" />
                  ) : (
                    <Cloud className="h-10 w-10 text-blue-500 mr-4" />
                  )}
                  <div>
                    <div className="text-2xl font-light">{`${weather.temp}°C`}</div>
                    <div className="text-gray-600">{weather.condition}</div>
                  </div>
                </div>
                <div>
                  <select
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="p-2 border rounded-md"
                  >
                    <option value="Bishoftu">Bishoftu</option>
                    <option value="Lake Tana">Lake Tana</option>
                    <option value="Entoto">Entoto</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Perfect for today:</h3>
                <div className="flex justify-between text-sm">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    Outdoor Dining
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    Boat Tour
                  </div>
                  <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                    Sunset View
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
