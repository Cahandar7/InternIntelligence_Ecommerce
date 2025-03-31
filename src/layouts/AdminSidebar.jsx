import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import xstore_logo from "../assets/images/xstore_logo.png";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <img src={xstore_logo} alt="xstore_logo" />

      <ul>
        <li
          onClick={() => {
            navigate("/admin/");
          }}
          className={
            location.pathname === "/admin/" ? "active-sidebar-section" : ""
          }
        >
          Products
        </li>
        <li
          onClick={() => {
            navigate("/");
          }}
        >
          Back home
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
