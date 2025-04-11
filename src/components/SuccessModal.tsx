import React from "react";
import { Dialog } from "@headlessui/react";
import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm bg-white rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <Dialog.Title className="text-xl font-semibold mb-2">
            Reserved Successfully!
          </Dialog.Title>
          <p className="text-gray-600 mb-6">
            Your room has been reserved. We look forward to welcoming you and
            hope you have a wonderful stay!
          </p>

          <button
            onClick={onClose}
            className="w-full bg-[#1a1a1a] text-white py-2 rounded-lg hover:bg-black transition"
          >
            Done
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
