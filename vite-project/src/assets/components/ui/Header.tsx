import useUser from "../hooks/useUser"; // Import user data hook
import { useNavigate } from "react-router-dom";
import useImage from "../hooks/useImage";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { DropdownMenu } from "@radix-ui/themes";
import HamburgerMenu from "../utils/HamBurgerMenu";

// Define the UserData interface
interface UserData {
  name: string;
  phone?: string;
  email: string;
  about?: string;
  role?: string;
}

interface HeaderProps {
  setSidebarVisible: Dispatch<SetStateAction<boolean>>;
  isSidebarVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({
  setSidebarVisible,
  isSidebarVisible,
}) => {
  const { user, userData, logout } = useUser();
  const id = user?.uid || ""; // Get the userId from the current user
  const { profilePicture, fetchProfilePicture } = useImage("", id);

  useEffect(() => {
    if (id) {
      fetchProfilePicture();
    }
  }, [id]);

  return (
    <div className="w-full flex items-center justify-between py-1.5 px-4 bg-neutral-50 border-b border-neutral-200">
      <div className="flex items-center">
        <HamburgerMenu
          setSidebarVisible={setSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />
        <HeaderLeft />
      </div>
      <HeaderRight
        userData={userData}
        profilePicture={profilePicture}
        logout={logout}
      />
    </div>
  );
};

const HeaderLeft = () => {
  return <div className="font-medium text-lg">KivaPix</div>;
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
  const backgroundColor = "#4CAF50";
  const profileImage =
    profilePicture ||
    `https://api.dicebear.com/6.x/initials/svg?seed=${
      userData?.name || "User"
    }&background=${backgroundColor}`; // Fallback image

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="cursor-pointer flex items-center gap-1.5 py-1.5 bg-neutral-100 px-2 rounded-md">
          <img
            src={profileImage}
            alt="Profile"
            className="size-8 rounded-full object-cover"
          />
          <span className="hidden sm:block">{userData?.name}</span>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-36">
        <DropdownMenu.Item onClick={() => navigate("/profile")}>
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
          color="red"
        >
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Header;
