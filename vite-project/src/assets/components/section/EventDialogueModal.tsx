import { CalendarMonthSharp, LocationOnOutlined } from "@mui/icons-material";
import { Button } from "@radix-ui/themes";
import React from "react";

interface EventDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  location: string;
  date: string;
  message: string;
}

const EventDialogueModal: React.FC<EventDialogueProps> = ({
  isOpen,
  onClose,
  onConfirm,
  location,
  date,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-84 md:w-96">
        <h2 className="text-base md:text-lg font-bold mb-2 md:mb-4">
          Are you sure?
        </h2>
        <p className="mb-4 md:mb-6 text-sm md:text-base ">
          Do you really want to {message} this event?
        </p>
        <div className="mb-4">
          <p className="text-xs md:text-sm text-gray-700 mb-3 flex items-center gap-3">
            <LocationOnOutlined />
            <span className="font-semibold">{location}</span>
          </p>
          <p className="text-xs md:text-sm text-gray-700 flex items-center gap-3">
            <CalendarMonthSharp /> <span className="font-semibold">{date}</span>
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="soft" onClick={onClose}>
            Cancel
          </Button>
          {message === "delete" ? (
            <Button color="red" onClick={onConfirm}>
              Delete
            </Button>
          ) : (
            <Button onClick={onConfirm}>Yes, accept</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDialogueModal;
