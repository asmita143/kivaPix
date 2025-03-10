import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"; // Import a success icon

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-84 md:w-96 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircleOutlineIcon className="text-green-500" style={{ fontSize: "4rem" }} />
        </div>

        {/* Success Message */}
        <h2 className="text-base md:text-lg font-bold mb-4">Success!</h2>
        <p className="mb-6 text-sm md:text-base">{message}</p>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:text-base hover:bg-blue-600 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;