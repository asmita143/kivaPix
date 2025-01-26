import { useState } from "react";

const StarRating = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected); // Toggle the star color
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-8 cursor-pointer ${
        isSelected ? "text-yellow-500" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
      onClick={handleClick}
    >
      <path
        fillRule="evenodd"
        d="M10 15l-3.5 2 1-4.5L3 8.5l4.5-.5L10 3l2.5 4.5 4.5.5-3.5 4.5 1 4.5L10 15z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export default StarRating;
