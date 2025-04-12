import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import {
  Menu,
  X,
  Bird,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  Palmtree,
  Utensils,
  Globe,
  Space as Spa,
  Facebook,
  Instagram,
  Twitter,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState("Bishoftu");
  const [selectedDates, setSelectedDates] = React.useState(
    "04/11/2023 - 04/12/2023"
  );
  const [guestCount, setGuestCount] = React.useState("2 Adults");

  const handleCheckAvailability = () => {
    navigate(`/rooms/bishoftu?dates=${selectedDates}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // ChatBot component with local chat language independent of homepage language.
  const ChatBot = () => {
    const [chatOpen, setChatOpen] = React.useState(false);
    // Maintain a separate state for the chat popup language.
    const [chatLanguage, setChatLanguage] = React.useState("en");

    // Chat translations for the popup texts.
    const chatTranslations = {
      en: {
        chatSupport: "Chat Support",
        typeYourMessage: "Type your message...",
        send: "Send",
      },
      am: {
        chatSupport: "የውጭ ድጋፍ",
        typeYourMessage: "መልእክት ያስገቡ...",
        send: "ላክ",
      },
      fr: {
        chatSupport: "Assistance Chat",
        typeYourMessage: "Tapez votre message...",
        send: "Envoyer",
      },
      om: {
        chatSupport: "Gargaarsa Chat",
        typeYourMessage: "Ergaa barreessi...",
        send: "Ergi",
      },
    };

    // State to manage chat messages and current input.
    const [messages, setMessages] = React.useState([]);
    const [currentMessage, setCurrentMessage] = React.useState("");

    const sendMessage = async () => {
      if (!currentMessage.trim()) return;

      // Add user's message
      const userMessage = { text: currentMessage, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      const textToSend = currentMessage;
      setCurrentMessage("");

      try {
        const response = await fetch(
          "https://api.mistral.ai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer 7pe3roabiqOZV3bUCcVsevNwX3D3pyxL`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "mistral-medium",
              messages: [{ role: "user", content: textToSend }],
            }),
          }
        );

        const data = await response.json();
        const botReply =
          data?.choices?.[0]?.message?.content ||
          "Sorry, I couldn't get a response.";

        setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      } catch (err) {
        console.error("API error:", err);
        setMessages((prev) => [
          ...prev,
          {
            text: "Oops! Something went wrong. Please try again later.",
            sender: "bot",
          },
        ]);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    };

    return (
      <div className="fixed bottom-4 right-4 z-50">
        {chatOpen ? (
          <div className="bg-white shadow-xl rounded-lg w-80 h-96 flex flex-col">
            <div className="bg-[#1a1a1a] text-white p-4 flex flex-col rounded-t-lg">
              <div className="flex justify-between items-center">
                <span>{chatTranslations[chatLanguage].chatSupport}</span>
                <button onClick={() => setChatOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2">
                <select
                  value={chatLanguage}
                  onChange={(e) => setChatLanguage(e.target.value)}
                  className="text-sm p-1 rounded bg-white text-black border border-gray-300"
                >
                  <option value="en">English</option>
                  <option value="am">አማርኛ</option>
                  <option value="fr">Français</option>
                  <option value="om">Afaan Oromoo</option>
                </select>
              </div>
            </div>
            <div className="p-4 flex-grow overflow-y-auto space-y-2">
              {messages.length === 0 && (
                <div className="text-gray-500">
                  Hello! How can I help you today?
                  <br />
                  <p className="text-blue-500 text-sm text-center  underline hover:text-blue-400 hover:cursor-pointer">
                    Talk to live support
                  </p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-xs p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-100 self-end text-right"
                      : "bg-gray-100 self-start text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-4 flex">
              <input
                type="text"
                placeholder={chatTranslations[chatLanguage].typeYourMessage}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border rounded-l-lg px-3 py-2 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-[#1a1a1a] text-white px-4 py-2 rounded-r-lg hover:bg-black transition"
              >
                {chatTranslations[chatLanguage].send}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-[#1a1a1a] p-3 rounded-full shadow-lg hover:bg-black transition"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      <nav className="fixed w-full bg-[#FAF7F5]/90 backdrop-blur-sm z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-12">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Bird className="w-8 h-8 text-[#1a1a1a]" />
              <span className="ml-2 text-xl font-semibold">
                KURIFTU RESORTS
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-50">
                <Globe className="w-5 h-5" />
                <span className="capitalize">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 px-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => setLanguage("en")}
                  className="w-full text-left py-2 hover:bg-gray-50"
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("am")}
                  className="w-full text-left py-2 hover:bg-gray-50"
                >
                  አማርኛ
                </button>
                <button
                  onClick={() => setLanguage("fr")}
                  className="w-full text-left py-2 hover:bg-gray-50"
                >
                  Français
                </button>
                <button
                  onClick={() => setLanguage("om")}
                  className="w-full text-left py-2 hover:bg-gray-50"
                >
                  Afaan Oromoo
                </button>
              </div>
            </div>

            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center space-x-2 px-4 py-2 border border-[#1a1a1a] rounded-full hover:bg-gray-50"
                >
                  <User className="w-5 h-5" />
                  <span>{user.user_metadata?.full_name || "Dashboard"}</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 border border-[#1a1a1a] rounded-full hover:bg-gray-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t("signOut")}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 border border-[#1a1a1a] rounded-full hover:bg-gray-50"
              >
                {t("login")}
              </button>
            )}

            <button
              onClick={() => navigate("/resorts")}
              className="px-6 py-2 bg-[#1a1a1a] text-white rounded-full hover:bg-black"
            >
              {t("reserve")}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="mt-20 space-y-6">
            <a href="#" className="block text-lg">
              {t("destinations")}
            </a>
            <a href="#" className="block text-lg">
              {t("resorts")}
            </a>
            <a href="#" className="block text-lg">
              {t("experiences")}
            </a>
            <a href="#" className="block text-lg">
              {t("wellness")}
            </a>
            <a href="#" className="block text-lg">
              {t("events")}
            </a>
            <div className="pt-6 mt-6 border-t border-gray-200 flex flex-col space-y-4">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/dashboard");
                    }}
                    className="flex items-center space-x-2 text-lg text-[#1a1a1a]"
                  >
                    <User className="w-5 h-5" />
                    <span>{user.user_metadata?.full_name || "Dashboard"}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center space-x-2 text-lg text-[#1a1a1a]"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t("signOut")}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                  }}
                  className="block text-lg text-[#1a1a1a]"
                >
                  {t("login")}
                </button>
              )}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/resorts");
                }}
                className="mt-4 w-full bg-[#1a1a1a] text-white rounded-full py-2 hover:bg-black"
              >
                {t("reserve")}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="relative h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/969906959?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            className="w-[102%] h-[102%] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Kuriftu Resorts Background Video"
            style={{
              objectFit: "cover",
              width: "102%",
              height: "102%",
              transform: "translate(-50%, -50%) scale(1.02)",
            }}
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-light mb-6 drop-shadow-lg">
              {t("welcome")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              {t("experience")}
            </p>
          </div>
        </div>
      </section>

      <div className="relative -mt-24 z-10 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border-b md:border-b-0 md:border-r border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">{t("location")}</p>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="text-lg font-medium bg-transparent"
                    >
                      <option>Bishoftu</option>
                      <option>Lake Tana</option>
                      <option>Entoto</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">{t("checkInOut")}</p>
                  <input
                    type="text"
                    value={selectedDates}
                    onChange={(e) => setSelectedDates(e.target.value)}
                    className="text-lg font-medium bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">{t("guests")}</p>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="text-lg font-medium bg-transparent"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                    <option>2 Adults, 2 Children</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center">
              <button
                onClick={handleCheckAvailability}
                className="w-full bg-[#1a1a1a] text-white rounded-full py-3 hover:bg-black transition"
              >
                {t("checkAvailability")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Palmtree className="w-12 h-12 text-[#1a1a1a]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {t("extraordinaryDestinations")}
              </h3>
              <p className="text-gray-600">
                {t("extraordinaryDestinationsDesc")}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Utensils className="w-12 h-12 text-[#1a1a1a]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {t("exceptionalDining")}
              </h3>
              <p className="text-gray-600">{t("exceptionalDiningDesc")}</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Spa className="w-12 h-12 text-[#1a1a1a]" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {t("luxuryWellness")}
              </h3>
              <p className="text-gray-600">{t("luxuryWellnessDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-6">{t("storyTitle")}</h2>
              <p className="text-gray-600 mb-6">{t("storyDescription")}</p>
              <button className="text-[#1a1a1a] font-medium hover:text-black">
                {t("learnMore")}
              </button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"
                alt="Resort Overview"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("aboutUs")}</h3>
              <p className="text-gray-400">{t("aboutUsDesc")}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
              <p className="text-gray-400">{t("address")}</p>
              <p className="text-gray-400">{t("phone")}</p>
              <p className="text-gray-400">{t("email")}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("followUs")}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("newsletter")}</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="px-4 py-2 rounded-l-full bg-white/10 text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="px-4 py-2 bg-white text-[#1a1a1a] rounded-r-full hover:bg-gray-200">
                  {t("subscribe")}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Kuriftu Resorts.{" "}
              {t("allRightsReserved")}
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot Assistance */}
      <ChatBot />
    </div>
  );
}

export default HomePage;
