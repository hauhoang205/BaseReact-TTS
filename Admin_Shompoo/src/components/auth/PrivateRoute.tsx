import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const adminUserStr = localStorage.getItem("adminUser");
  const token = localStorage.getItem("token");

  const adminUser = adminUserStr ? JSON.parse(adminUserStr) : null;

  // Kiểm tra trực tiếp adminUser.role
  if (!token || !adminUser || adminUser.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
};

export default PrivateRoute;
