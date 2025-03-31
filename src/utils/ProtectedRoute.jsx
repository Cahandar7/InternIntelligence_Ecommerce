import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const authUserData = () => {
    const data = localStorage.getItem("isAdmin");
    return data ? JSON.parse(data) : null;
  };

  const user = authUserData();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Access Denied",
        text: "Please log in to access this page.",
        icon: "warning",
      }).then(() => {
        navigate("/account/login");
      });
    }
  }, [navigate, user]);

  return user ? children : null;
};

export default ProtectedRoute;
