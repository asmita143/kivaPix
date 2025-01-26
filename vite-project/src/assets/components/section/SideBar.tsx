import { useState } from "react";

const sidebarItems = [
  { label: "Home", isDropdown: false },
  {
    label: "Your Events",
    isDropdown: true,
    dropdownItems: ["Accepted", "Interested", "Past Events"],
  },
  { label: "Notifications", isDropdown: false },
];

interface SideBarItemListProps {
  label: string;
  dropdownItems?: string[];
}

const SideBarItemList: React.FC<SideBarItemListProps> = ({
  label,
  dropdownItems,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <li
        className={`px-4 py-2 text-black hover:text-black hover:bg-gray-100 cursor-pointer transition duration-200 ${
          dropdownItems ? "relative" : ""
        }`}
        onClick={dropdownItems ? toggleDropdown : undefined}
      >
        {label}
      </li>
      {isDropdownOpen && dropdownItems && (
        <ul className="ml-6 mt-1 space-y-1">
          {dropdownItems.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { sidebarItems, SideBarItemList };
