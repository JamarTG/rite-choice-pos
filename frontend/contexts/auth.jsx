import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Define AuthContext
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (token) => {
    try {
   
      const response = await axios.post("http://localhost:3000/auth/verify", { token });

     
      if (response.data.success) {
        console.log("YES")
        setIsAuthorized(true);
      } else {
        console.log("nooo")
        setIsAuthorized(false);
        setToken(null);
        // localStorage.removeItem("token");
      }

      setIsLoading(false);
    } catch (error) {
      setIsAuthorized(false);
      setToken(null);
      console.log(error)
    //   localStorage.removeItem("token");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken(token);

    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, [token]);

  const value = {
    isAuthorized,
    setIsAuthorized,
    isLoading,
  };

  console.log(value)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
