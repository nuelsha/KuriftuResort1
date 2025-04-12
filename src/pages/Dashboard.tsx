"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bird,
  Settings,
  CreditCard,
  Star,
  Calendar,
  LogOut,
  Sun,
  Phone,
  DoorOpen,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Heart,
  X,
  Globe,
  Utensils,
  Home,
  Waves,
  Leaf,
  Users,
  Bell,
  Search,
  Menu,
  Coffee,
  Scroll,
  Mail,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useLanguage } from "../contexts/LanguageContext"

// Define location data interface
interface WeatherData {
  temp: number
  condition: string
}

interface LocationsData {
  [key: string]: WeatherData
}

// Add animation to the CSS at the top of the file
const fadeInStyle = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 1s ease infinite;
}
`

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("home")
  const [weather, setWeather] = useState({ temp: 23, condition: "Sunny" })
  const [suggestion, setSuggestion] = useState(0)
  const [currentLocation, setCurrentLocation] = useState("Bishoftu")
  const [isRecording, setIsRecording] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Modal states
  const [showResortInfoModal, setShowResortInfoModal] = useState(false)
  const [showRestaurantModal, setShowRestaurantModal] = useState(false)
  const [showResortMapModal, setShowResortMapModal] = useState(false)

  // Add a new state for the detailed feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedRating, setSelectedRating] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Format time as "8:45 AM"
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  // Format date as "Monday, April 12"
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  // Check if user is logged in, if not redirect to login page
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  // Mock data for the dashboard - in a real app this would come from APIs
  const guestData = {
    name: user?.user_metadata?.full_name || "Selam",
    loyaltyPoints: 150,
    room: "105",
    roomType: "Ethiopia-Kenya Villa",
    checkIn: "Apr 10, 2023",
    checkOut: "Apr 15, 2023",
    loyaltyTier: "Gold",
    stamps: 7,
    feedbackSent: 4,
    activitiesDone: 7,
  }

  const suggestions = [
    {
      title: "Live Cultural Music Tonight",
      description: "Experience authentic Ethiopian melodies under the stars",
      time: "8:00 PM",
      icon: Scroll,
      color: "bg-indigo-50",
      textColor: "text-indigo-900",
      accentColor: "bg-indigo-600",
    },
    {
      title: "Relaxing Spa at 4 PM",
      description: "Book your rejuvenating treatment with our expert therapists",
      time: "4:00 PM",
      icon: Heart,
      color: "bg-rose-50",
      textColor: "text-rose-900",
      accentColor: "bg-rose-600",
    },
    {
      title: "Sunset Kayaking",
      description: "Glide across our tranquil lake as the sun sets",
      time: "5:30 PM",
      icon: Sun,
      color: "bg-amber-50",
      textColor: "text-amber-900",
      accentColor: "bg-amber-600",
    },
    {
      title: "Breakfast by the Lake",
      description: "Start your day with a gourmet meal with panoramic views",
      time: "7:00 AM - 10:00 AM",
      icon: Coffee,
      color: "bg-emerald-50",
      textColor: "text-emerald-900",
      accentColor: "bg-emerald-600",
    },
  ]

  const offers = [
    {
      title: "Family Movie Night",
      discount: "30% off popcorn & drinks",
      expires: "Today",
      image: "https://images.unsplash.com/photo-1585647347384-2542c9c937e8?w=800",
      badge: "Limited Time",
    },
    {
      title: "VIP Pool Access",
      discount: "Complimentary Cocktails",
      expires: "48 hours",
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800",
      badge: "Gold Members",
    },
    {
      title: "Luxury Spa Package",
      discount: "Buy 1 Get 1 Free",
      expires: "This stay",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      badge: "Popular",
    },
  ]

  const resortAreas = [
    {
      name: "Dining",
      icon: Utensils,
      description: "Fine dining with local flavors",
      photo: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800",
    },
    {
      name: "Spa",
      icon: Leaf,
      description: "Relaxation & rejuvenation",
      photo: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    },
    {
      name: "Kids Club",
      icon: Users,
      description: "Fun activities for children",
      photo: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?w=800",
    },
    {
      name: "Waterpark",
      icon: Waves,
      description: "Aquatic adventures for all ages",
      photo: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
    },
    {
      name: "Events",
      icon: Calendar,
      description: "Cultural experiences & entertainment",
      photo: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    },
  ]

  const handleNextSuggestion = () => {
    setSuggestion((prev) => (prev + 1) % suggestions.length)
  }

  const handlePrevSuggestion = () => {
    setSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length)
  }

  const handleVoiceCommand = () => {
    setIsRecording(true)
    // In a real implementation, this would activate speech recognition
    setTimeout(() => {
      setIsRecording(false)
      // Mock displaying a result
      alert("Voice command recognized: 'Show me activities for kids'")
    }, 3000)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
  }

  const handleFeedback = (emoji: string) => {
    setFeedback(emoji)
    setTimeout(() => {
      setFeedback(null)
      alert("Thank you for your feedback!")
    }, 1500)
  }

  // Add a function to handle feedback submission
  const handleFeedbackSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowFeedbackModal(false)
      setSelectedRating(null)
      setFeedbackText("")
      // Show success message
      alert("Thank you for your valuable feedback!")
    }, 1500)
  }

  // Simulating weather update
  useEffect(() => {
    const locations: LocationsData = {
      Bishoftu: { temp: 23, condition: "Sunny" },
      "Lake Tana": { temp: 21, condition: "Partly Cloudy" },
      Entoto: { temp: 19, condition: "Cool" },
    }

    setWeather(locations[currentLocation])
  }, [currentLocation])

  // Resort Info Modal Component
  const ResortInfoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resort Information</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">About</h4>
              <p className="mt-1 text-gray-600 text-sm">
                Kuriftu Resort and Spa is a luxury destination nestled in the heart of Ethiopia, offering a perfect
                blend of traditional Ethiopian hospitality and modern luxury.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Check-in & Check-out</h4>
              <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Check-in:</span>
                  <span className="ml-2 text-gray-900">14:00</span>
                </div>
                <div>
                  <span className="text-gray-500">Check-out:</span>
                  <span className="ml-2 text-gray-900">11:00</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Facilities</h4>
              <div className="mt-1 grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Waves className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Swimming Pool</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Leaf className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Spa & Wellness</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Utensils className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Restaurant</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Coffee className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Cafe & Bar</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Contact</h4>
              <div className="mt-1 space-y-1 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-amber-600" />
                  <span>+251 116 670 000</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-amber-600" />
                  <span>info@kuriftugroup.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="h-4 w-4 mr-2 text-amber-600" />
                  <span>www.kuriftugroup.com</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowResortInfoModal(false)}
            className="mt-6 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  // Restaurant Hours Modal Component
  const RestaurantHoursModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080"
            alt="Restaurant"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <button
            onClick={() => setShowRestaurantModal(false)}
            className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-serif">Dining Hours</h2>
            <p className="text-sm text-white text-opacity-90">Kuriftu {currentLocation}</p>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Restaurant Hours</h3>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-amber-900">Main Restaurant</h4>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">Open Now</span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Breakfast</span>
                  <span className="text-gray-900">6:30 AM - 10:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunch</span>
                  <span className="text-gray-900">12:00 PM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dinner</span>
                  <span className="text-gray-900">6:00 PM - 10:00 PM</span>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-amber-900">Lakeside Cafe</h4>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">Open Now</span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily</span>
                  <span className="text-gray-900">10:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-amber-900">Sky Lounge Bar</h4>
                <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full">Opens at 4 PM</span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily</span>
                  <span className="text-gray-900">4:00 PM - 12:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowRestaurantModal(false)}
            className="mt-6 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  // Resort Map Modal Component
  const ResortMapModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-gray-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium text-gray-900">Resort Map</h2>
          <button
            onClick={() => setShowResortMapModal(false)}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-1 bg-gray-50">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1580674684089-5c8b0a83b6b7?w=1080"
              alt="Resort Map"
              className="w-full object-cover"
              style={{ height: "60vh" }}
            />

            {/* Map overlay elements - these would be positioned absolutely */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg max-w-xs">
              <h3 className="font-medium text-gray-900 mb-2">Map Key</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-600 mr-2"></div>
                  <span>Main Building</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                  <span>Pools & Water Features</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                  <span>Gardens & Recreation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                  <span>Villas & Accommodation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-wrap gap-2">
          {resortAreas.map((area, index) => (
            <button
              key={index}
              className="flex items-center px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <area.icon className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium">{area.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // Add the DetailedFeedbackModal component
  const DetailedFeedbackModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-fadeIn">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-16 opacity-20"></div>
          <div className="pt-12 px-8 pb-6 relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-600 to-amber-400"></div>
            <h2 className="text-2xl font-serif text-center text-gray-900 mb-2">Share Your Experience</h2>
            <p className="text-center text-gray-500 text-sm mb-6">Your feedback helps us enhance your future stays</p>

            <div className="mb-8">
              <h3 className="text-gray-700 font-medium mb-4">How would you rate your experience?</h3>
              <div className="flex justify-between items-center px-4">
                {[
                  { emoji: "😍", label: "Excellent", value: "excellent" },
                  { emoji: "😊", label: "Good", value: "good" },
                  { emoji: "🙂", label: "Okay", value: "okay" },
                  { emoji: "😔", label: "Poor", value: "poor" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedRating(option.value)}
                    className={`flex flex-col items-center transition-all transform ${
                      selectedRating === option.value ? "scale-110" : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <div className={`text-4xl mb-2 ${selectedRating === option.value ? "animate-bounce" : ""}`}>
                      {option.emoji}
                    </div>
                    <span
                      className={`text-sm ${
                        selectedRating === option.value ? "text-amber-700 font-medium" : "text-gray-500"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-gray-700 font-medium mb-3">Tell us about your experience</h3>
              <div className="relative">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="We value your feedback! Please share your thoughts, suggestions, or concerns about your stay..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500 text-gray-700 text-sm resize-none bg-gray-50"
                ></textarea>
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">{feedbackText.length}/500</div>
              </div>
            </div>

            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 sm:justify-end">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={!selectedRating || isSubmitting}
                className={`px-5 py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center ${
                  !selectedRating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600"
                } transition-all`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 px-8 py-4 border-t border-amber-100">
          <div className="flex items-start">
            <div className="bg-amber-100 rounded-full p-2 mr-3 mt-1">
              <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
            </div>
            <div>
              <p className="text-xs text-amber-800">
                As a valued guest, your feedback earns you <span className="font-medium">25 Kuriftu Stars</span> which
                you can redeem for exclusive perks during your next stay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F5F2]">
      {/* Main Content Area - No Sidebar */}
      <div>
        {/* Header Bar with Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
              <div className="flex items-center">
            <img src="https://kurifturesorts.com/_nuxt/img/logo.9415905.svg" alt="Kuriftu Resorts" className="h-12" />
          </div>
              </div>
              <div className="hidden md:flex ml-8 items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <div className="text-sm text-gray-500">{formattedDate}</div>
                  <div className="text-sm font-medium">{formattedTime}</div>
                </div>
              </div>

              <div className="hidden md:flex ml-6">
                <a
                  href="#"
                  onClick={() => setActiveTab("home")}
                  className={`px-3 py-2 rounded-lg ${
                    activeTab === "home" ? "bg-amber-50 text-amber-900" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>Home</span>
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex bg-gray-50 rounded-lg p-2 items-center">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:ring-0 text-sm w-32"
                />
              </div>

              <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-amber-500"></span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-medium">{weather.temp}°C</div>
                  <div className="text-xs text-gray-500">{weather.condition}</div>
                </div>
                <span className="text-2xl hidden md:block">
                  {weather.condition === "Sunny" ? "☀️" : weather.condition === "Partly Cloudy" ? "⛅️" : "🌥"}
                </span>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              {/* User profile and sign out - Hidden on mobile, shown inside mobile menu */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-sm border border-amber-200">
                  {guestData.name.charAt(0)}
                </div>
                <button onClick={handleSignOut} className="text-gray-600 hover:text-gray-900 p-2">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile navigation menu (shown when menu is open) */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center pb-4 mb-2 border-b border-gray-100">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-lg mr-3 border border-amber-200">
                    {guestData.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{guestData.name}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                      <span>Gold Member</span>
                    </div>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          setActiveTab("home")
                          setIsMenuOpen(false)
                        }}
                        className={`flex items-center p-3 rounded-lg ${
                          activeTab === "home" ? "bg-amber-50 text-amber-900" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Home className="h-5 w-5 mr-3" />
                        <span>Home</span>
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50 w-full"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>{t("signOut")}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto">
          {/* Welcome Banner - Luxurious Design */}
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1080')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative z-10 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs text-white inline-block mb-3">
                    {guestData.checkIn} - {guestData.checkOut}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif font-light text-white">
                    Welcome back, <span className="font-normal">{guestData.name}</span>
                  </h1>
                  <p className="text-white text-opacity-90 mt-2">
                    Enjoy your luxurious stay at <span className="font-medium">Kuriftu {currentLocation}</span>
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white border-opacity-20">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-amber-300 fill-amber-300 mr-1" />
                      <span className="text-white font-medium">{guestData.loyaltyPoints}</span>
                    </div>
                    <span className="text-white text-opacity-80 text-xs">Kuriftu Stars</span>
                  </div>
                  <div className="h-8 w-px bg-white bg-opacity-20 mx-4"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-white font-medium mb-1">Room {guestData.room}</span>
                    <span className="text-white text-opacity-80 text-xs">{guestData.roomType}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex overflow-x-auto pb-2 space-x-4 scrollbar-hide">
                <button className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 text-white px-4 py-2 rounded-lg whitespace-nowrap transition-all">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Call Front Desk</span>
                </button>
                <button className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 text-white px-4 py-2 rounded-lg whitespace-nowrap transition-all">
                  <Utensils className="h-4 w-4 mr-2" />
                  <span>Order Room Service</span>
                </button>
                <button className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 text-white px-4 py-2 rounded-lg whitespace-nowrap transition-all">
                  <Leaf className="h-4 w-4 mr-2" />
                  <span>Book Spa Treatment</span>
                </button>
                <button className="flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 text-white px-4 py-2 rounded-lg whitespace-nowrap transition-all">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Resort Map</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Today's Recommendations - Elegant Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif text-gray-900">Today's Recommendations</h2>
                    <div className="flex">
                      <button
                        onClick={handlePrevSuggestion}
                        className="bg-gray-100 rounded-full p-2 mx-1 hover:bg-gray-200 transition-all"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleNextSuggestion}
                        className="bg-gray-100 rounded-full p-2 mx-1 hover:bg-gray-200 transition-all"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden pb-6">
                  <div
                    className="flex transition-all duration-500 ease-in-out transform"
                    style={{ transform: `translateX(-${suggestion * 100}%)` }}
                  >
                    {suggestions.map((item, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className={`${item.color} flex flex-col md:flex-row md:items-center px-6 py-4`}>
                          <div
                            className={`${item.accentColor} rounded-full p-3 text-white md:mr-4 mb-4 md:mb-0 self-start`}
                          >
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-grow">
                            <h3 className={`font-medium text-lg ${item.textColor}`}>{item.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                            <div className="mt-3 flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-500">{item.time}</span>
                            </div>
                          </div>
                          <button
                            className={`mt-4 md:mt-0 self-start md:self-center px-4 py-2 rounded-lg ${item.accentColor} text-white text-sm whitespace-nowrap`}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Cultural Music Feature - Cinematic Style */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
                    alt="Live Cultural Music"
                    className="w-full h-full object-cover transition-transform duration-15000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center mb-2">
                      <span className="bg-amber-500 text-xs text-white px-2 py-1 rounded-md mr-2">TONIGHT</span>
                      <span className="text-sm text-white text-opacity-90">8:00 PM | Main Terrace</span>
                    </div>
                    <h2 className="text-2xl font-serif mb-2">Live Cultural Music</h2>
                    <p className="text-sm text-white text-opacity-90 mb-4 max-w-lg">
                      Experience the soul-stirring sounds of traditional Ethiopian instruments and melodies under the
                      stars.
                    </p>
                    <button className="bg-white text-amber-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to My Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Exclusive Offers Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif text-gray-900">Exclusive Offers</h2>
                  <a href="#" className="text-amber-600 text-sm hover:text-amber-700">
                    View All
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {offers.map((offer, index) => (
                    <div
                      key={index}
                      className="rounded-xl overflow-hidden border border-gray-100 group hover:shadow-md transition-all"
                    >
                      <div className="relative h-32">
                        <img
                          src={offer.image || "/placeholder.svg"}
                          alt={offer.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-white text-xs text-amber-700 px-2 py-1 rounded-md font-medium">
                          {offer.badge}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{offer.title}</h3>
                        <p className="text-amber-600 text-sm mt-1">{offer.discount}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-500">Expires: {offer.expires}</span>
                          <button className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded hover:bg-amber-100 transition-colors">
                            Redeem
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Your Stay Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <h2 className="text-xl font-serif text-gray-900 mb-5">Your Stay</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-amber-50 rounded-lg p-2 mr-3">
                        <DoorOpen className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Room {guestData.room}</div>
                        <div className="font-medium">{guestData.roomType}</div>
                      </div>
                    </div>
                    <button className="text-amber-600 hover:text-amber-700">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex justify-between pb-4 border-b border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500">Check-in</div>
                      <div className="font-medium">{guestData.checkIn}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Check-out</div>
                      <div className="font-medium">{guestData.checkOut}</div>
                    </div>
                  </div>

                  <div>
                    <button className="w-full bg-amber-600 text-white rounded-lg py-3 font-medium hover:bg-amber-700 transition-colors flex items-center justify-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      View Reservation
                    </button>
                  </div>
                </div>
              </div>

              {/* Weather & Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <div className="flex items-center mb-6">
                  <div className={`text-4xl mr-3 ${weather.condition === "Sunny" ? "rotate-0" : "rotate-0"}`}>
                    {weather.condition === "Sunny" ? "☀️" : weather.condition === "Partly Cloudy" ? "⛅️" : "🌥"}
                  </div>
                  <div>
                    <div className="text-2xl font-light">{weather.temp}°C</div>
                    <div className="text-sm text-gray-500">{currentLocation}, Ethiopia</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowResortInfoModal(true)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Resort Information</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setShowRestaurantModal(true)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Utensils className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Restaurant Hours</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setShowResortMapModal(true)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Resort Map</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Quick Feedback */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <h2 className="text-xl font-serif text-gray-900 mb-3">Quick Feedback</h2>
                <p className="text-sm text-gray-500 mb-4">How is your stay so far?</p>

                <div className="flex justify-around mb-4">
                  <button
                    onClick={() => handleFeedback("excellent")}
                    className={`flex flex-col items-center transition-all ${
                      feedback === "excellent" ? "scale-110" : ""
                    }`}
                  >
                    <div className="text-3xl mb-1">😍</div>
                    <span className="text-xs text-gray-500">Excellent</span>
                  </button>
                  <button
                    onClick={() => handleFeedback("good")}
                    className={`flex flex-col items-center transition-all ${feedback === "good" ? "scale-110" : ""}`}
                  >
                    <div className="text-3xl mb-1">😊</div>
                    <span className="text-xs text-gray-500">Good</span>
                  </button>
                  <button
                    onClick={() => handleFeedback("okay")}
                    className={`flex flex-col items-center transition-all ${feedback === "okay" ? "scale-110" : ""}`}
                  >
                    <div className="text-3xl mb-1">😐</div>
                    <span className="text-xs text-gray-500">Okay</span>
                  </button>
                  <button
                    onClick={() => handleFeedback("poor")}
                    className={`flex flex-col items-center transition-all ${feedback === "poor" ? "scale-110" : ""}`}
                  >
                    <div className="text-3xl mb-1">😞</div>
                    <span className="text-xs text-gray-500">Poor</span>
                  </button>
                </div>

                {feedback && <div className="text-center text-sm text-gray-500 mb-4">Thank you for your feedback!</div>}

                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="bg-amber-50 text-amber-800 text-sm px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  Share Detailed Feedback
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Components */}
      {showResortInfoModal && <ResortInfoModal />}
      {showRestaurantModal && <RestaurantHoursModal />}
      {showResortMapModal && <ResortMapModal />}
      {showFeedbackModal && <DetailedFeedbackModal />}
    </div>
  )
}
