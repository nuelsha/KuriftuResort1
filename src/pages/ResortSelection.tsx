import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, Star } from "lucide-react";
import ReviewModal from "../components/ReviewModal";

type ResortId = "awash" | "bishoftu" | "entoto";

export default function ResortSelection() {
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedResort, setSelectedResort] = useState<ResortId>("awash");

  // Reviews for each resort
  const [resortReviews, setResortReviews] = useState<
    Record<ResortId, number[]>
  >({
    awash: [4, 5, 5],
    bishoftu: [3, 4],
    entoto: [5, 5, 4, 4],
  });

  const [resortComments, setResortComments] = useState<
    Record<ResortId, string[]>
  >({
    awash: ["Beautiful scenery!", "Amazing place.", "Loved the spa."],
    bishoftu: ["Nice view.", "Peaceful environment."],
    entoto: [
      "Excellent service!",
      "Great value.",
      "Clean rooms.",
      "Will visit again!",
    ],
  });

  const resorts = [
    {
      id: "awash",
      name: "Kuriftu Resort & Spa Awash Falls",
      location: "Awash, Ethiopia",
      price: 250,
      image:
        "https://kurifturesorts.com/_nuxt/img/awash-cover.8aba739.webp",
      available: false,
    },
    {
      id: "bishoftu",
      name: "Kuriftu Resort & Spa Bishoftu",
      location: "Bishoftu, Ethiopia",
      price: 173,
      image:
        "https://kurifturesorts.com/_nuxt/img/2.46e7606.webp",
      available: true,
    },
    {
      id: "entoto",
      name: "Kuriftu Resort & Spa Entoto",
      location: "Addis Ababa, Ethiopia",
      price: 135,
      image:
        "https://kurifturesorts.com/_nuxt/img/Glamping.75aadd4.webp",
      available: true,
    },
    {
      id: "entoto",
      name: "Kuriftu Resort & Spa and Lake Tana",
      location: "Addis Ababa, Ethiopia",
      price: 135,
      image:
        "https://kurifturesorts.com/_nuxt/img/Tana.303f00c.webp",
      available: true,
    },
  ];

  const openReviewModal = (resortName: string) => {
    setSelectedResort(resortName as ResortId);
    setIsReviewModalOpen(true);
  };

  const getAverageRating = (resortId: string) => {
    const ratings = resortReviews[resortId as ResortId];
    if (!ratings || ratings.length === 0) return null;
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return avg.toFixed(1);
  };

  const handleAddReview = (
    resortId: string,
    rating: number,
    comment: string
  ) => {
    setResortReviews((prev) => ({
      ...prev,
      [resortId as ResortId]: [...(prev[resortId as ResortId] || []), rating],
    }));

    setResortComments((prev) => ({
      ...prev,
      [resortId as ResortId]: [...(prev[resortId as ResortId] || []), comment],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-light mb-12">Select a Resort</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort) => {
            const avgRating = getAverageRating(resort.id);
            return (
              <div
                key={resort.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={resort.image}
                  alt={resort.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{resort.name}</h3>
                  <p className="text-gray-600 mb-2">{resort.location}</p>

                  {avgRating && (
                    <div className="flex items-center text-sm text-yellow-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(Number(avgRating))
                              ? ""
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-gray-700 ml-2">{avgRating}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-sm text-gray-500">
                        From ${resort.price}
                      </p>
                      <p className="text-xs text-gray-400">Per Night</p>
                      <p className="text-xs text-gray-400">
                        Including Taxes & Fees
                      </p>
                    </div>
                    <button
                      onClick={() => openReviewModal(resort.id)}
                      className="text-sm text-[#1a1a1a] hover:underline"
                    >
                      View Reviews
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      resort.available && navigate(`/rooms/${resort.id}`)
                    }
                    className={`w-full py-2 rounded-lg text-center ${
                      resort.available
                        ? "bg-[#1a1a1a] text-white hover:bg-black"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {resort.available ? "View Rooms" : "Unavailable Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        resortName={selectedResort}
        reviews={resortReviews[selectedResort] || []}
        comments={resortComments[selectedResort] || []}
        onAddReview={(rating: number, comment: string) =>
          handleAddReview(selectedResort, rating, comment)
        }
      />
    </div>
  );
}
