import { useState } from "react";
import "./App.css";
const products = [
  {
    id: 1,
    name: "Football Competition",
    location: "Leppavaara ´Football Ground",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
    date: "11.02.2024",
  },
  {
    id: 2,
    name: "Wedding of X and Y",
    location: "Huopalahti Hall",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    date: "12.05.2024",
  },
  {
    id: 3,
    name: "Birthday of a Kid",
    location: "Kilonkallio 10 E 39, Espoo",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
    date: "20.10.2025",
  },
  {
    id: 4,
    name: " Naming Cremony",
    location: "Kilonkuja 10 E 20, Espoo",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
    date: "10.11.2025.",
  },
  {
    id: 5,
    name: "Earthen Bottle",
    location: "#",
    imageSrc: "https://picsum.photos/200/300",
    date: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 6,
    name: "Earthen Bottle",
    location: "#",
    imageSrc: "https://picsum.photos/200/300",
    date: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 7,
    name: "Earthen Bottle",
    location: "#",
    imageSrc: "https://picsum.photos/200/300",
    date: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 8,
    name: "Earthen Bottle",
    location: "#",
    imageSrc: "https://picsum.photos/200/300",
    date: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 9,
    name: "Earthen Bottle",
    location: "#",
    imageSrc: "https://picsum.photos/200/300",
    date: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
];
const sidebarItems = [
  { label: "Home", isDropdown: false },
  {
    label: "Your Events",
    isDropdown: true,
    dropdownItems: ["Accepted", "Interested", "Past Events"],
  },
  { label: "Notifications", isDropdown: false },
];

interface SideBarItemListProps {
  label: string;
  dropdownItems?: string[];
}

const SideBarItemList: React.FC<SideBarItemListProps> = ({
  label,
  dropdownItems,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <li
        className={`px-4 py-2 text-black hover:text-black hover:bg-gray-100 cursor-pointer transition duration-200 ${
          dropdownItems ? "relative" : ""
        }`}
        onClick={dropdownItems ? toggleDropdown : undefined}
      >
        {label}
      </li>
      {isDropdownOpen && dropdownItems && (
        <ul className="ml-6 mt-1 space-y-1">
          {dropdownItems.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
const StarRating = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected); // Toggle the star color
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-8 cursor-pointer ${
        isSelected ? "text-yellow-500" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
      onClick={handleClick}
    >
      <path
        fillRule="evenodd"
        d="M10 15l-3.5 2 1-4.5L3 8.5l4.5-.5L10 3l2.5 4.5 4.5.5-3.5 4.5 1 4.5L10 15z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Home: React.FC = () => {
  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="header">
        <div className="left-header flex items-start">🌟 kivaPix</div>
        <div className="right-header flex items-end">
          <span className="username">Asmita Shrestha</span>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="layout">
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
        <main className="main-content">
          <div className="sub-main-content overflow-y-auto max-h-screen">
            <div className="bg-white">
              <h1 className="p-5 font-bold">All Events</h1>
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {products.map((product) => (
                    <a key={product.id} className="group">
                      <img
                        alt={product.name}
                        src={product.imageSrc}
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                      />
                      <h3 className="mt-4 text-md text-gray-700 font-bold">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 font-bold">
                        Date: {product.date}
                      </p>
                      <p className="mt-1 text-sm text-black-100">
                        Location: {product.location}
                      </p>
                      {/* Buttons for Accept and Interested */}
                      <div className="mt-4 flex space-x-4">
                        <button className="px-10 py-2 bg-gray-200 text-black rounded-lg hover:bg-green-700 w-4/5">
                          Accept
                        </button>
                        <StarRating />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
