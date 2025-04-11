import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, Check } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (guestOption: string) => void; // pass guest option to confirm
  roomName: string;
  price: number;
}

const guestOptions = [
  "1 Adult",
  "2 Adults",
  "1 Adult, 1 Kid",
  "2 Adults, 1 Kid",
  "2 Adults, 2 Kids",
  "3 Adults",
  "Family of 4",
];

export default function ReservationModal({
  isOpen,
  onClose,
  onConfirm,
  roomName,
  price,
}: ReservationModalProps) {
  const [selectedGuests, setSelectedGuests] = useState(guestOptions[0]);

  const handleConfirm = () => {
    onConfirm(selectedGuests);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              Confirm Reservation
            </Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">Are you sure you want to reserve:</p>
            <p className="font-medium mt-2">{roomName}</p>
            <p className="text-gray-600 mt-1">Price: ${price} per night</p>

            <div className="mt-4">
              <label
                htmlFor="guests"
                className="block text-sm text-gray-700 mb-1"
              >
                Select Guests
              </label>
              <select
                id="guests"
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {guestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              className="w-full bg-[#1a1a1a] text-white py-2 rounded-lg hover:bg-black transition flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Confirm Reservation
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
