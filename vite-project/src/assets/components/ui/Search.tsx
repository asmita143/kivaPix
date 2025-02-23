import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchListProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchDate: string;
  setSearchDate: (value: string) => void;
  searchLocation: string;
  setSearchLocation: (value: string) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  searchTerm,
  setSearchTerm,
  searchDate,
  setSearchDate,
  searchLocation,
  setSearchLocation,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const clearSearchField = (field: string) => {
    if (field === "name") setSearchTerm("");
    if (field === "date") setSearchDate("");
    if (field === "location") setSearchLocation("");
  };

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  // Close the search menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="relative" ref={searchRef}>
      <button onClick={toggleSearch} className="p-2">
        <FaSearch />
      </button>
      {isSearchOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-2 space-y-2 z-30 w-64">
          <div className="flex items-center space-x-2 relative">
            <input
              type="text"
              name="name"
              placeholder="By name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 w-full pr-10"
            />
            <button
              onClick={() => clearSearchField("name")}
              className="absolute right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center space-x-2 relative">
            <input
              type="date"
              name="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border rounded px-3 py-2 w-full pr-10"
            />
            <button
              onClick={() => clearSearchField("date")}
              className="absolute right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center space-x-2 relative">
            <input
              type="text"
              name="location"
              placeholder="By location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="border rounded px-3 py-2 w-full pr-10"
            />
            <button
              onClick={() => clearSearchField("location")}
              className="absolute right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
