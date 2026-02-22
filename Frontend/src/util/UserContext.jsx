import { useState, useEffect, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        setUser(userInfo);
      } catch (error) {
        console.error("Error parsing userInfo:", error);
        localStorage.removeItem("userInfo");
        setUser(null);
      }
    } else {
      const path = location.pathname.replace(/^\//, "");
      if (path !== "about_us" && path !== "" && path !== "discover" && path !== "register") {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext) ?? { user: null, setUser: () => {} };

export { UserContextProvider, useUser };
