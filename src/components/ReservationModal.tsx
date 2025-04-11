import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Check } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  roomName: string;
  price: number;
}

export default function ReservationModal({ isOpen, onClose, onConfirm, roomName, price }: ReservationModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">Confirm Reservation</Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">Are you sure you want to reserve:</p>
            <p className="font-medium mt-2">{roomName}</p>
            <p className="text-gray-600 mt-1">Price: ${price} per night</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onConfirm}
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