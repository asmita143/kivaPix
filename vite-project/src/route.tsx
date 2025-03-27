// src/route.tsx
import { Route, Routes } from "react-router-dom";
import Login from "./assets/components/screen/Login";
import Home from "./assets/components/screen/Home";
import Register from "./assets/components/screen/Register";
import PhotoGallery from "./assets/components/screen/Photogallery";
import EventForm from "./assets/components/screen/EventForm";
import Profile from "./assets/components/screen/Profile";
import InterestedEvents from "./assets/components/screen/InterestedEventScreen";
import AcceptedEvents from "./assets/components/screen/AcceptedScreen";
import Notification from "./assets/components/screen/NotificationScreen";
import Setting from "./assets/components/screen/Settings";
import AllProfiles from "./assets/components/screen/AllProfiles";
import EventDescriptionScreen from "./assets/components/screen/EventDescriptionScreen";
import EditEvent from "./assets/components/screen/EditEvent";
import PastEvents from "./assets/components/screen/PastEventsScreen";
import useUser from "./assets/components/hooks/useUser";
import GuestGallery from "./assets/components/screen/GuestGallery";
import ProtectedRoute from "./ProtectedRoute";

const RouteConfig = () => {
  const { isGuest } = useUser();
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/guest-gallery/:id" element={<GuestGallery />} />
      <Route path="/" element={<Login />} /> {/* Default route */}
      {/* Protected routes */}
      <Route element={<ProtectedRoute isGuest={isGuest} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/event/:id" element={<EventDescriptionScreen />} />
        <Route path="/eventform" element={<EventForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events/interested" element={<InterestedEvents />} />
        <Route path="/events/accepted" element={<AcceptedEvents />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/allProfiles" element={<AllProfiles />} />
        <Route path="/editEvent/:id" element={<EditEvent />} />
        <Route path="/events/past" element={<PastEvents />} />
        <Route path="/PhotoGallery/:id" element={<PhotoGallery />} />
      </Route>
    </Routes>
  );
};

export default RouteConfig;
