import { CalendarMonthSharp, LocationOnOutlined } from "@mui/icons-material";
import React from "react";

interface AcceptEventProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  location: string;
  date: string;
}

const AcceptEvent: React.FC<AcceptEventProps> = ({ isOpen, onClose, onConfirm, location,date }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-84 md:w-96">
        <h2 className="text-base md:text-lg font-bold mb-2 md:mb-4">Are you sure?</h2>
        <p className="mb-4 md:mb-6 text-sm md:text-base ">Do you really want to accept this event?</p>
        <div className="mb-4">
          <p className="text-xs md:text-sm text-gray-700 mb-3 flex items-center gap-3"><LocationOnOutlined /><span className="font-semibold">{location}</span></p>
          <p className="text-xs md:text-sm text-gray-700 flex items-center gap-3"><CalendarMonthSharp /> <span className="font-semibold">{date}</span></p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-2 md:px-4 py-1 md:py-2 bg-gray-300 rounded-md text-xs md:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded-md text-xs md:text-sm"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptEvent;
