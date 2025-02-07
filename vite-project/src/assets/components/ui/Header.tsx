import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useUser from "../hooks/useUser"; // Import user data hook
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[100px] w-full flex items-center justify-center p-[0.1rem] bg-neutral-50 border-b border-black">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
};

const HeaderLeft = () => {
  return (
    <div className="font-bold flex-none w-1/4 text-xl px-10 cursor-pointer hover:text-green-500 transition duration-200">
      KIVAPIX
    </div>
  );
};

const HeaderRight = () => {
  return (
    <div className="flex-1 flex items-center justify-end gap-2 px-10">
      <HeaderProfile />
    </div>
  );
};

const HeaderProfile = () => {
  const { user, logout } = useUser(); // Get user data
  const profileImage = user?.photoURL || "https://i.pravatar.cc/300"; // Fallback image
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 focus:outline-none">
        <span className="font-medium">Asmita</span>
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
      </MenuButton>

      {/* Dropdown Menu */}
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 ring-1 ring-gray-300 focus:outline-none">
        <MenuItem
          as="a"
          href="/profile"
          className="block px-4 py-2 text-sm data-focus:bg-gray-100"
        >
          Profile
        </MenuItem>
        <MenuItem
          as="button"
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
          className="block w-full text-left px-4 py-2 text-sm data-focus:bg-gray-100"
        >
          Logout
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Header;
