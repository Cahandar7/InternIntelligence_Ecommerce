import React from "react";
import AdminSidebar from "../layouts/AdminSidebar";
import AdminProducts from "./AdminProducts";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <AdminSidebar />
      <AdminProducts />
    </div>
  );
};

export default AdminPanel;
