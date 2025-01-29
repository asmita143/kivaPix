// src/route.tsx
import { Route, Routes } from "react-router-dom"; // Import Routes and Route
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import SingleEvent from "./assets/components/screen/SingleEvent";
import PhotoGallery from "./Photogallery";

const RouteConfig = () => {
  return (
    <Routes>
      {" "}
      {/* Just use Routes here without another Router */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/PhotoGallery" element={<PhotoGallery />} />
      <Route path="/" element={<Login />} /> {/* Default route */}
      <Route path="/event/:id" element={<SingleEvent />} />
      <Route path="/" element={<Home />} /> {/* Default route */}
    </Routes>
  );
};

export default RouteConfig;
