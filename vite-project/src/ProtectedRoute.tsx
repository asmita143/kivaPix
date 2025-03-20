import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isGuest }: { isGuest: boolean }) => {
  if (isGuest) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render child routes if the user is authenticated
};

export default ProtectedRoute;