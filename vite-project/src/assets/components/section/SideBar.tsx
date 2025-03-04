import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";

import { Role } from "../utils/Role";
import useUser from "../hooks/useUser";

const Sidebar: React.FC<{ showButton?: boolean }> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData } = useUser();

  const isHomePage = location.pathname === "/home";
  const isAdmin = userData?.role === Role.Admin;

  const sidebarItems = [
    { label: "Home", isDropdown: false, path: "/home", icon: HomeIcon },
    {
      label: "Events",
      isDropdown: true,
      dropdownItems: [
        {
          label: "Accepted",
          path: "/events/accepted",
          icon: EventAvailableIcon,
        },
        {
          label: "Interested",
          path: "/events/interested",
          icon: StarBorderPurple500Icon,
        },
        { label: "Past Events", path: "/events/past", icon: EventRepeatIcon },
      ],
      icon: EventIcon,
    },
    {
      label: "Notifications",
      isDropdown: false,
      path: "/notifications",
      icon: NotificationsActiveIcon,
    },
    {
      label: "Settings",
      isDropdown: false,
      path: "/settings",
      icon: SettingsIcon,
    },
    {
      label: "Profile",
      isDropdown: false,
      path: "/profile",
      icon: PersonOutlineIcon,
    },
  ];

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const isDropdownActive = (dropdownItems: { path: string }[]) =>
    dropdownItems.some((item) => location.pathname === item.path);

  const [openDropdown, setOpenDropdown] = useState<number | null>(
    sidebarItems.findIndex(
      (item) => item.isDropdown && isDropdownActive(item.dropdownItems || [])
    )
  );

  return (
    <div className="w-64 bg-[#FAF9F6] px-4 h-screen pt-6 b-black-100">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900">Menu</h1>
        <ul className="mt-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <div
                className={`px-4 py-3 hover:shadow-md flex items-center gap-10 text-black hover:bg-gray-100 cursor-pointer transition duration-200 
                  ${item.isDropdown ? "relative" : ""}
                  ${
                    location.pathname === item.path
                      ? "bg-gray-300 rounded-md hover:bg-gray-300"
                      : ""
                  }
                  `}
                onClick={() => {
                  if (!item.isDropdown && item.path) {
                    navigate(item.path);
                  } else {
                    toggleDropdown(index);
                  }
                }}
                role="button"
                aria-expanded={openDropdown === index}
                aria-label={
                  item.isDropdown ? `${item.label} dropdown` : item.label
                }
              >
                {item.icon && <item.icon className="" />}
                <span>{item.label}</span>

                {item.isDropdown && (
                  <span
                    className={`transform transition-transform duration-200${
                      openDropdown === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                )}
              </div>
              {item.isDropdown && openDropdown === index && (
                <ul className="ml-7 mt-1 space-y-1">
                  {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                    <li
                      key={dropdownIndex}
                      className={`px-4 py-2 flex items-center gap-5 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer transition duration-200
                        ${
                          location.pathname === dropdownItem.path
                            ? "bg-gray-300 rounded-md hover:bg-gray-300"
                            : ""
                        }
                        `}
                      onClick={() => navigate(dropdownItem.path)}
                    >
                      {dropdownItem.icon && <dropdownItem.icon className="" />}
                      {dropdownItem.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ "Create Event" Button - Visible ONLY on Homepage */}
      {isAdmin && isHomePage && (
        <div className="p-4 mt-6 flex-row">
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate("/eventForm")} // Navigate to event creation page
          >
            + Create Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
