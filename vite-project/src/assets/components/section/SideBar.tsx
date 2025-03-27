import { Dispatch, SetStateAction, useState } from "react";
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
  ChevronRightOutlined,
  Close,
} from "@mui/icons-material";

import { Role } from "../utils/Role";
import useUser from "../hooks/useUser";
import { Button } from "@radix-ui/themes";

interface SidebarProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, setIsVisible }) => {
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
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static`}
    >
      <div className="w-64 bg-white px-2 h-screen pt-2 b-neutral-100">
        <div className="p-2">
          <div className="flex justify-between">
            <p className="text-xl font-semibold text-gray-900">Menu</p>
            <Button
              size="1"
              color="gray"
              variant="ghost"
              className="!cursor-pointer lg:!hidden"
              onClick={() => setIsVisible(!isVisible)}
            >
              <Close />
            </Button>
          </div>
          <ul className="mt-4">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <div
                  className={`px-4 py-2 rounded-md flex items-center gap-6 text-black hover:bg-neutral-100 cursor-pointer transition duration-200 
                  ${item.isDropdown ? "relative" : ""}
                  ${
                    location.pathname === item.path
                      ? "bg-neutral-100 rounded-md"
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
                  {item.icon && <item.icon className="!size-5" />}
                  <span>{item.label}</span>

                  {item.isDropdown && (
                    <ChevronRightOutlined
                      className={`transition-all duration-200 ${
                        openDropdown === index ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  )}
                </div>
                {item.isDropdown && openDropdown === index && (
                  <ul className="ml-6">
                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                      <li
                        key={dropdownIndex}
                        className={`px-4 py-2 rounded-md flex items-center gap-6 hover:text-black hover:bg-gray-100 cursor-pointer transition duration-200
                      ${
                        location.pathname === dropdownItem.path
                          ? "bg-gray-300 rounded-md hover:bg-gray-300"
                          : ""
                      }
                      `}
                        onClick={() => navigate(dropdownItem.path)}
                      >
                        {dropdownItem.icon && (
                          <dropdownItem.icon className="!size-5" />
                        )}
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
    </div>
  );
};

export default Sidebar;
