import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (!screenLoading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, screenLoading, navigate]);

  // Show loader while checking auth
  if (screenLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Block rendering if not authenticated
  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;
