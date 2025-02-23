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

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/PhotoGallery/:id" element={<PhotoGallery />} />
      <Route path="/" element={<Login />} /> {/* Default route */}
      <Route path="/event/:id" element={<EventDescriptionScreen />} />
      <Route path="/eventform" element={<EventForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/events/interested" element={<InterestedEvents />} />
      <Route path="/events/accepted" element={<AcceptedEvents />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/allProfiles" element={<AllProfiles />} />
      <Route path="/editEvent/:eventId" element={<EditEvent />} />
      <Route path="/events/past" element={<PastEvents />} />
    </Routes>
  );
};

export default RouteConfig;
