import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "@/lib/auth";

const ProtectedRoute = () => {
  return getAuthToken() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
