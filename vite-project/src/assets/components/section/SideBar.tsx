import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NotificationsActive,
  Home,
  Event,
  EventAvailable,
  EventRepeat,
  Add,
  StarBorder,
  Settings,
  PersonOutline,
} from "@mui/icons-material";

import { Role } from "../utils/Role";
import useUser from "../hooks/useUser";
import { Button } from "@radix-ui/themes";

const Sidebar: React.FC<{ isVisible?: boolean }> = ({ isVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData } = useUser();

  const isHomePage = location.pathname === "/home";
  const isAdmin = userData?.role === Role.Admin;

  const sidebarItems = [
    { label: "Home", isDropdown: false, path: "/home", icon: Home },
    {
      label: "Events",
      isDropdown: true,
      dropdownItems: [
        {
          label: "Accepted",
          path: "/events/accepted",
          icon: EventAvailable,
        },
        {
          label: "Interested",
          path: "/events/interested",
          icon: StarBorder,
        },
        { label: "Past Events", path: "/events/past", icon: EventRepeat },
      ],
      icon: Event,
    },
    {
      label: "Notifications",
      isDropdown: false,
      path: "/notifications",
      icon: NotificationsActive,
    },
    {
      label: "Settings",
      isDropdown: false,
      path: "/settings",
      icon: Settings,
    },
    {
      label: "Profile",
      isDropdown: false,
      path: "/profile",
      icon: PersonOutline,
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
    <div className="w-64 bg-white px-4 h-screen pt-6 b-black-100">
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
          <Button
            onClick={() => navigate("/eventForm")} // Navigate to event creation page
          >
            <Add /> Create Event
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
