import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[100px] w-full flex items-center justify-center p-[0.1rem] bg-neutral-50  border-b border-black ">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
};

const HeaderLeft = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home"); // Navigates to the /home route
  };

  return (
    <div
      className="font-bold flex-none w-1/4 text-xl px-10 cursor-pointer hover:text-green-500 transition duration-200"
      onClick={handleLogoClick}
      aria-label="Go to Home"
    >
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
  return (
    <div className="flex items-center gap-2">
      <HeaderUserName />
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden ">
        <img
          src="https://picsum.photos/200/300"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const HeaderUserName = () => {
  return <div className="font-medium cursor-pointer">Asmita Shrestha</div>;
};

export default Header;
