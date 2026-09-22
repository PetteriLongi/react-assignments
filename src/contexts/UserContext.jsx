import { createContext, useState } from "react";
import { useAuthentication, useUser } from "../hooks/apiHooks";
import { useNavigate } from "react-router";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    try {
      const loginResult = await postLogin(credentials);
      localStorage.setItem("token", loginResult.token);
      const userData = await getUserByToken(loginResult.token);
      setUser(userData);

      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await getUserByToken(token);
        setUser(userData);
        navigate("/");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, handleLogin, handleLogout, handleAutoLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
