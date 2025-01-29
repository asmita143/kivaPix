import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC<{ showButton?: boolean }> = ({ showButton }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: "Home", isDropdown: false, onClick: () => navigate("") },
    {
      label: "Your Events",
      isDropdown: true,
      dropdownItems: ["Accepted", "Interested", "Past Events"],
    },
    { label: "Notifications", isDropdown: false },
    { label: "Settings", isDropdown: false },
    { label: "Profile", isDropdown: false },
  ];

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="w-64 bg-white shadow-md pt-16 pb-16 px-4 mt-12 m-6 b-black-100">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900">Menu</h1>
        <ul className="mt-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <div
                className={`px-4 py-2 flex items-center justify-between text-black hover:bg-gray-100 cursor-pointer transition duration-200 ${
                  item.isDropdown ? "relative" : ""
                }`}
                onClick={() => item.isDropdown && toggleDropdown(index)}
                role={item.isDropdown ? "button" : undefined}
                aria-expanded={openDropdown === index}
                aria-label={
                  item.isDropdown ? `${item.label} dropdown` : item.label
                }
              >
                <span>{item.label}</span>
                {item.isDropdown && (
                  <span
                    className={`transform transition-transform duration-200 ${
                      openDropdown === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                )}
              </div>
              {item.isDropdown && openDropdown === index && (
                <ul className="ml-6 mt-1 space-y-1">
                  {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                    <li
                      key={dropdownIndex}
                      className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer transition duration-200"
                    >
                      {dropdownItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Button Appears Only When `showButton` is True */}
      {showButton && (
        <div className="p-4 mt-6">
          <button
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => navigate("/Photogallery")}
          >
            View Gallery
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
