import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthorized } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
    setIsAuthorized(false);
  };

  return {
    handleLogout,
  };
};

export default useLogout;
