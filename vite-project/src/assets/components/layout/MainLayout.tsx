import React, { useState } from "react";
import Header from "../ui/Header";
import Sidebar from "../section/SideBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isVisible={isSidebarVisible}
          setIsVisible={setSidebarVisible}
        />
        <div className="bg-neutral-100 flex-1">
          <div className="">
            <Header
              isSidebarVisible={isSidebarVisible}
              setSidebarVisible={setSidebarVisible}
            />
          </div>
          <main className="py-2 px-4 h-[93dvh] overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export { MainLayout };
