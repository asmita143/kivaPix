// src/route.tsx
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import SingleEvent from "./assets/components/screen/SingleEvent";
import PhotoGallery from "./Photogallery";
import EventForm from "./assets/components/screen/EventForm";
import Profile from "./assets/components/screen/Profile";

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/PhotoGallery/:id" element={<PhotoGallery />} />
      <Route path="/" element={<Login />} /> {/* Default route */}
      <Route path="/event/:id" element={<SingleEvent />} />
      <Route path="/eventform" element={<EventForm />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default RouteConfig;
