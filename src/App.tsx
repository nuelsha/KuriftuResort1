import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  X,
  Bird,
  Calendar,
  Users,
  MapPin,
  ChevronDown,
  Palmtree as PalmTree,
  Utensils,
  Space as Spa,
  Globe,
} from "lucide-react"
import ResortSelection from "./pages/ResortSelection";
import RoomAvailability from "./pages/RoomAvailability";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resorts" element={<ResortSelection />} />
          <Route path="/rooms/:resortId" element={<RoomAvailability />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
