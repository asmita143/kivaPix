import { useEffect, useState } from "react";

interface StarRatingProps {
  isInterested: boolean;
  onClick: (newState: boolean) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ isInterested, onClick }) => {
  const [isSelected, setIsSelected] = useState(isInterested);

  useEffect(() => {
    setIsSelected(isInterested);
  }, [isInterested]);

  const handleClick = () => {
    const newState = !isSelected;
    setIsSelected(newState);   
    onClick(newState);      
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-12 cursor-pointer hover:shadow-lg rounded-lg ${
        isSelected ? "text-yellow-500" : "text-gray-400"
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
