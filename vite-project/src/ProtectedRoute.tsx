import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isGuest: boolean;
  isLoading: boolean;
}

const ProtectedRoute = ({ isGuest, isLoading }: ProtectedRouteProps) => {
  if (isLoading) {
    console.log('Showing loading state'); 
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isGuest ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedRoute;