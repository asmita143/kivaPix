import React, { useState } from 'react';
import SideBarItemList, { sidebarItems } from './Sidebar';

const PhotoGallery = () => {
  const images = [
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
    "https://picsum.photos/400/400",
  ];


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="sidebar">
          <div className="w-64 bg-white shadow-md pt-6 pb-6 px-4">
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-900">Events</h1>
              <input
                type="text"
                placeholder="Search Events"
                className="mt-4 p-2 w-full border border-gray-100 rounded-lg bg-gray-200 focus:bg-white hover:bg-gray-100 width-full"
              />
            </div>
            <nav className="mt-6">
              <ul>
                {sidebarItems.map((item, index) => (
                  <SideBarItemList
                    key={index}
                    label={item.label}
                    dropdownItems={
                      item.isDropdown ? item.dropdownItems : undefined
                    }
                  />
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex overflow-auto p-3">
          <div className="max-h-screen overflow-y-auto bg-white">
            {/* Fixed Header */}
            <div className="sticky top-0 bg-white z-20 shadow-md ">
              <div className="p-5 border-red-50">
                <h1 className="font-bold">Photo Gallery</h1>
              </div>
            </div>
            {/* Scrollable Grid */}
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

    </div>
  );
};

export default PhotoGallery;