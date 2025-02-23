import { useState } from "react";
import { FaCalendarAlt, FaSort } from "react-icons/fa";

const SortList: React.FC<{
  sortOrder: string;
  setSortOrder: (order: string) => void;
  sortBy: string;
  setSortBy: (type: string) => void;
}> = ({ sortOrder, setSortOrder, sortBy, setSortBy }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortBy = (type: string) => {
    setSortBy(type);
    setIsSortOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsSortOpen(!isSortOpen)} className="">
        <FaSort />
      </button>
      {isSortOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-2 space-y-2 z-30">
          <button
            onClick={() => handleSortBy("date")}
            className="flex items-center justify-center"
          >
            <FaCalendarAlt
              className={sortBy === "date" ? "text-blue-500" : ""}
            />
          </button>
          <div className="border-t my-2"></div>
          <button
            onClick={handleSortToggle}
            className="flex items-center justify-center"
          >
            <FaSort className={sortOrder === "asc" ? "text-blue-500" : ""} />
          </button>
        </div>
      )}
    </div>
  );
};
export default SortList;
