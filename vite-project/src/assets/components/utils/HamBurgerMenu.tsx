// HamburgerMenu.tsx
import { Dispatch, SetStateAction } from "react";

interface HamburgerMenuProps {
  setSidebarVisible: Dispatch<SetStateAction<boolean>>;
  isSidebarVisible: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  setSidebarVisible,
  isSidebarVisible,
}) => {
  return (
    <div>
      {/* Hamburger Menu Button */}
      <button
        className="absolute top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-md lg:hidden"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? (
          <span className="text-xl">✕</span> // Close icon
        ) : (
          <span className="text-xl">☰</span> // Hamburger icon
        )}
      </button>
    </div>
  );
};

export default HamburgerMenu;
