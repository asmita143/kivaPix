import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useUser from "../hooks/useUser"; // Import user data hook
import { useNavigate } from "react-router-dom";
import useImage from "../hooks/useImage";
import { useEffect } from "react";

// Define the UserData interface
interface UserData {
  name: string;
  phone?: string;
  email: string;
  about?: string;
  role?: string;
}

const Header = () => {
  const { user, userData } = useUser();
  const id = user?.uid || ""; // Get the userId from the current user
  const { profilePicture, fetchProfilePicture, loading } = useImage("", id);

  useEffect(() => {
    if (id) {
      fetchProfilePicture();
    }
  }, [id]);

  return (
    <div className="w-full flex items-center justify-center p-[0.1rem] bg-neutral-50 border-b border-black">
      <HeaderLeft />
      <HeaderRight
        userData={userData}
        profilePicture={profilePicture}
        logout={useUser().logout}
      />
    </div>
  );
};

const HeaderLeft = () => {
  return (
    <div className="font-bold flex-none w-1/4 text-xl px-16 lg:px-10 cursor-pointer hover:text-green-500 transition duration-200">
      KIVAPIX
    </div>
  );
};

const HeaderRight = ({
  userData,
  profilePicture,
  logout,
}: {
  userData: UserData | null;
  profilePicture: string | null;
  logout: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const profileImage = profilePicture || "https://i.pravatar.cc/300"; // Fallback image

  return (
    <div className="flex-1 flex items-center justify-end gap-2">
      <Menu as="div" className="relative z-30">
        <MenuButton className="flex items-center gap-2 focus:outline-none">
          <span className="font-medium hidden sm:block">
            {userData?.name || "User"}
          </span>
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md p-2 ring-1 ring-gray-300 focus:outline-none">
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
    </div>
  );
};

export default Header;
