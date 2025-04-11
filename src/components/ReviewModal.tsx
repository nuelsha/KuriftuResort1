import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Star } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resortName: string;
}

interface Review {
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export default function ReviewModal({ isOpen, onClose, resortName }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState<Review[]>([
    {
      rating: 5,
      comment: "Amazing experience! The resort exceeded all expectations. The staff was incredibly attentive and the facilities were world-class.",
      author: "Sarah M.",
      date: "2 days ago"
    },
    {
      rating: 4,
      comment: "Beautiful location and excellent service. The spa treatments were particularly memorable.",
      author: "John D.",
      date: "1 week ago"
    }
  ]);

  const handleSubmitReview = () => {
    if (!comment || !name) return;

    const newReview: Review = {
      rating,
      comment,
      author: name,
      date: "Just now"
    };

    setReviews([newReview, ...reviews]);
    setComment('');
    setName('');
    setRating(5);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">Reviews for {resortName}</Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Add Review Form */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-medium mb-3">Add Your Review</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 h-24"
                  placeholder="Share your experience..."
                />
              </div>
              <button
                onClick={handleSubmitReview}
                className="w-full bg-[#1a1a1a] text-white py-2 rounded-lg hover:bg-black transition"
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* Existing Reviews */}
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i + review.rating} className="w-4 h-4 text-gray-300 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                </div>
                <p className="text-gray-700">"{review.comment}"</p>
                <p className="text-sm text-gray-500 mt-1">- {review.author}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}