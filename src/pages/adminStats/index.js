import React, { useState } from "react";
import AdminLogin from "./AdminLogin"; // ajuste le chemin selon ton arborescence
import AdminStats from "./AdminStats"; // ta page actuelle

const AdminWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return isAuthenticated ? (
    <AdminStats />
  ) : (
    <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  );
};

export default AdminWrapper;