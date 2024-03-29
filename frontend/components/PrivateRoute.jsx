import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthorized, isLoading } = useAuth();

  isLoading && <p>Loading....</p>;

  return isAuthorized ? element : <Navigate to="/auth" />;
};

export default PrivateRoute;
