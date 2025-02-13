import { useEffect, useState } from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

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
    <div className="">
      {isSelected ? (
        <StarIcon
          style={{ width: "32px", height: "32px", color:"#f59e0b" }}
          className="w-12 h-12 cursor-pointer hover:shadow-lg rounded-lg"
          onClick={handleClick}
        />
      ):(
        <StarBorderIcon
        style={{ width: "32px", height: "32px" }}
          className="w-8 h-8  cursor-pointer hover:shadow-lg rounded-lg"
          onClick={handleClick}
        />
      )}
  </div>

  );
};
export default StarRating;
