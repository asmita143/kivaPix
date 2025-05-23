// HamburgerMenu.tsx
import { Close, Menu } from "@mui/icons-material";
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
        className="p-2 mr-2 bg-white text-black rounded-md lg:hidden"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? <Close /> : <Menu />}
      </button>
    </div>
  );
};

export default HamburgerMenu;
