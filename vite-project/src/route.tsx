// src/route.tsx
import { Route, Routes } from "react-router-dom";
import Login from "./assets/components/screen/Login";
import Home from "./assets/components/screen/Home";
import Register from "./assets/components/screen/Register";
import SingleEvent from "./assets/components/screen/SingleEvent";
import PhotoGallery from "./assets/components/screen/Photogallery";
import EventForm from "./assets/components/screen/EventForm";
import Profile from "./assets/components/screen/Profile";
import InterestedEvents from "./assets/components/screen/InterestedEventScreen";
import AcceptedEvents from "./assets/components/screen/AcceptedScreen";

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
      <Route path="/events/interested" element={<InterestedEvents />} />
      <Route path="/events/accepted" element={<AcceptedEvents />} />
    </Routes>
  );
};

export default RouteConfig;
